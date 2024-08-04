import { z } from "zod";

import { ClientService as sdk } from "@maany_shr/kernel-planckster-sdk-ts";
import { downloadFile, uploadFile } from "~/lib/infrastructure/server/repository/file-repository";
import { createTRPCRouter, protectedProcedure } from "../server";
import serverContainer from "../../config/ioc/server-container";
import type AuthGatewayOutputPort from "~/lib/core/ports/secondary/auth-gateway-output-port";
import { GATEWAYS } from "../../config/ioc/server-ioc-symbols";

export const sourceDataRouter = createTRPCRouter({

    listForClient: protectedProcedure
    .query(async () => {

        const authGateway = serverContainer.get<AuthGatewayOutputPort>(GATEWAYS.AUTH_GATEWAY);
        const kpCredentialsDTO = await authGateway.extractKPCredentials();

        if (!kpCredentialsDTO.success) {
            return [];
        }

        const viewModel = await sdk.listSourceData({
            id: kpCredentialsDTO.data.clientID, 
            xAuthToken: kpCredentialsDTO.data.xAuthToken,
        });
        if(viewModel.status) {
            const sources = viewModel.source_data_list
            return sources;
        }
        // TODO: handle errors
        return [];

    }),

    create: protectedProcedure
      .input(
        z.object({
            protocol: z.string(),
            relativePath: z.string(), // TODO: validate that's a path that KP likes
            sourceDataName: z.string(),
            localFilePath: z.string(),
        }),
      )
      .mutation(async ({ input }) => {

        const authGateway = serverContainer.get<AuthGatewayOutputPort>(GATEWAYS.AUTH_GATEWAY);
        const kpCredentialsDTO = await authGateway.extractKPCredentials();

        if (!kpCredentialsDTO.success) {
            return [];
        }

        const clientID = kpCredentialsDTO.data.clientID
        const authToken = kpCredentialsDTO.data.xAuthToken

        // 1. Use KP to get signed URL
        const signedUrlViewModel = await sdk.getClientDataForUpload({
            id: clientID,
            protocol: input.protocol,
            relativePath: input.relativePath,
            xAuthToken: authToken,
        })
        if (signedUrlViewModel.status) {
          const signedUrl = signedUrlViewModel.signed_url

          // 2. Use File Repository to upload
          const uploadDto = await uploadFile(signedUrl, input.localFilePath)
          
          if (uploadDto.status) {

            // 3. Use KP to register the uploaded source data
            const registerSourceDataViewModel = await sdk.registerSourceData({
                id: clientID,
                sourceDataName: input.sourceDataName,
                sourceDataProtocol: input.protocol,
                sourceDataRelativePath: input.relativePath,
                xAuthToken: authToken,
            })

            if (registerSourceDataViewModel.status) {
                return registerSourceDataViewModel;
            }
            // TODO: handle register error; note that this means there's an uploaded file whose metadata is NOT registered
            return [];

          }
          // TODO: handle upload error
          return [];

        }
        // TODO: handle signed URL fail error
        return [];


      }),

    // download logic: (1) use KP to get signed URL, (2) use thin file repository to download the file
    // IN: relative path, client ID, xAuthToken, protocol
    download: protectedProcedure
      .input(
        z.object({
            protocol: z.string(),
            relativePath: z.string(),
            localFilePath: z.string(),
        }),
      )
      .mutation(async ({ input }) => {

        const authGateway = serverContainer.get<AuthGatewayOutputPort>(GATEWAYS.AUTH_GATEWAY);
        const kpCredentialsDTO = await authGateway.extractKPCredentials();

        if (!kpCredentialsDTO.success) {
            return [];
        }

        const clientID = kpCredentialsDTO.data.clientID
        const authToken = kpCredentialsDTO.data.xAuthToken

        // 1. Use KP to get signed URL
        const signedUrlViewModel = await sdk.getClientDataForDownload({
            id: clientID,
            protocol: input.protocol,
            relativePath: input.relativePath,
            xAuthToken: authToken,
        })
        if (signedUrlViewModel.status) {
          const signedUrl = signedUrlViewModel.signed_url

          // 2. Use File Repository to download
          const downloadDto = await downloadFile(signedUrl, input.localFilePath)
          
          if (downloadDto.status) {
            return downloadDto;
          }
          // TODO: handle download error
          return [];
        }
        // TODO: handle signed URL fail error
        return [];
      }),

    listForResearchContext: protectedProcedure
    .input(
        z.object({
            researchContextId: z.number(),
        }),
    )
    .query(async ({ input }) => {

        const authGateway = serverContainer.get<AuthGatewayOutputPort>(GATEWAYS.AUTH_GATEWAY);
        const kpCredentialsDTO = await authGateway.extractKPCredentials();

        if (!kpCredentialsDTO.success) {
            return [];
        }

        const viewModel = await sdk.listSourceDataForResearchContext({
            id: input.researchContextId,
            xAuthToken: kpCredentialsDTO.data.xAuthToken,
        });
        if(viewModel.status) {
            const sources = viewModel.source_data_list
            return sources;
        }
        // TODO: check if error can be handled
        return [];
    }),
});