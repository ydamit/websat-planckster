import { postRouter } from "~/lib/infrastructure/server/trpc/routers/post";
import { researchContextRouter } from "~/lib/infrastructure/server/trpc/routers/kernel/research-contexts";
import { conversationRouter } from "~/lib/infrastructure/server/trpc/routers/kernel/conversations";
import { messageRouter } from "~/lib/infrastructure/server/trpc/routers/kernel/messages";
import { sourceDataRouter } from "~/lib/infrastructure/server/trpc/routers/kernel/source-data";
import { kernelPlancksterHealthCheckRouter } from "./routers/kernel/health-check";
import { createTRPCRouter, protectedProcedure } from "~/lib/infrastructure/server/trpc/server";
import { openAIFileRouter } from "./routers/openai/openai-file-router";
import { openAIVectorStoreRouter } from "./routers/openai/openai-vector-store-router";
import { openAIAssistantRouter } from "./routers/openai/openai-assistant-router";
import { serverFileRouter } from "./routers/server/server-file-router";
import { createResearchContextsRouter } from "./routers/research-contexts/create-research-contexts-router";
import serverContainer from "../config/ioc/server-container";
import { CONTROLLERS, GATEWAYS, UTILS } from "../config/ioc/server-ioc-symbols";
import type ListResearchContextsController from "../controller/list-research-contexts-controller";
import { type TListResearchContextsViewModel } from "~/lib/core/view-models/list-research-contexts-view-models";
import { z } from "zod";
import ListSourceDataController, { TListSourceDataControllerParameters } from "../controller/list-source-data-controller";
import { TSignal } from "~/lib/core/entity/signals";
import { Logger } from "pino";
import AuthGatewayOutputPort from "~/lib/core/ports/secondary/auth-gateway-output-port";
import { TListSourceDataViewModel } from "~/lib/core/view-models/list-source-data-view-models";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  controllers: {
    listSourceData: protectedProcedure
      .input(
        z.object({
          researchContextID: z.string().optional(),
        }),
      )
      .query(async ({input}) => {
        const controller = serverContainer.get<ListSourceDataController>(CONTROLLERS.LIST_SOURCE_DATA_CONTROLLER);
        const authGateway = serverContainer.get<AuthGatewayOutputPort>(GATEWAYS.AUTH_GATEWAY);
        const loggerFactory = serverContainer.get<(module: string) => Logger>(UTILS.LOGGER_FACTORY);
        const logger = loggerFactory("sourceDataRouter");
        const kpCredentialsDTO = await authGateway.extractKPCredentials();
        if (!kpCredentialsDTO.success) {
          logger.error(`Failed to get KP credentials: ${kpCredentialsDTO.data.message}`);
          return {
            success: false,
            data: {
              operation: "sourceDataRouter#getUploadSignedUrl",
              message: "Failed to get KP credentials",
            },
          };
        }
        const clientID = kpCredentialsDTO.data.clientID;
        const S_ViewModel = new TSignal<TListSourceDataViewModel>(
          "Source Data View Model",
          "Source Data from Kernel Planckster",
          { status: "request" },
        )
        const controllerParams: TListSourceDataControllerParameters = {
          researchContextID: input.researchContextID,
          response: S_ViewModel,
          clientID: String(clientID),
        }
        await controller.execute(controllerParams);
        return controllerParams.response;
      }),
  },
  kernel: {
    researchContext: researchContextRouter,
    conversation: conversationRouter,
    message: messageRouter,
    sourceData: sourceDataRouter,
    healthCheck: kernelPlancksterHealthCheckRouter,
  },
  post: postRouter,
  server: {
    file: serverFileRouter,
  },
  // openai: {
  //   file: openAIFileRouter,
  //   vector: openAIVectorStoreRouter,
  //   assistant: openAIAssistantRouter,
  // },
  researchContexts: {
    create: createResearchContextsRouter,
    list: protectedProcedure.query(async () => {
      // call a server controller and usecase to fetch research contexts, try to fix any errors
      const response: TListResearchContextsViewModel = {
        status: "request",
      };
      const controller = serverContainer.get<ListResearchContextsController>(CONTROLLERS.LIST_RESEARCH_CONTEXTS_CONTROLLER);
      await controller.execute({ response: response, clientID: "1234" });
      return response;
    }),
  },
  agent: {
    create: protectedProcedure.input(z.object({})).mutation(async ({ input }) => {
      // call a server controller and usecase to create an agent, try to fix any errors
      return { status: "request" };
    }),
    vectorStores: {
      list: protectedProcedure.query(async () => {
        // call a server controller and usecase to fetch vector stores, try to fix any errors
        return { status: "request" };
      }),
      create: protectedProcedure.input(z.object({})).mutation(async ({ input }) => {
        // call a server controller and usecase to create a vector store, try to fix any errors
        return { status: "request" };
      }),
    },
    list: protectedProcedure.query(async () => {
      return { status: "request" };
    }),
    sendMessage: protectedProcedure.mutation(async ({ input }) => {
      // call a server controller and usecase to send a message, try to fix any errors
      return { status: "request" };
    }),
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
