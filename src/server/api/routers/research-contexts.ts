import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { ClientService as sdk } from "@maany_shr/kernel-planckster-sdk-ts";
import { env } from "~/env";

export const researchContextRouter = createTRPCRouter({
  list: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        xAuthToken: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const viewModel = await sdk.listResearchContexts({
        id: input.id ?? env.KP_CLIENT_ID,
        xAuthToken: input.xAuthToken || env.KP_AUTH_TOKEN,
      });
      if(viewModel.status) {
        const researchContexts = viewModel.research_contexts
        return researchContexts;
      }
      // TODO: handle error
      return [];
    }),
});
