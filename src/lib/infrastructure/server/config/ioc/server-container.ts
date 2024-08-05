import "reflect-metadata";
import { Container } from "inversify";
import { CONSTANTS, GATEWAYS, REPOSITORY, TRPC } from "./server-ioc-symbols";
import { authOptions } from "~/lib/infrastructure/server/config/auth/next-auth-config";
import type AuthGatewayOutputPort from "~/lib/core/ports/secondary/auth-gateway-output-port";
import NextAuthGateway from "~/lib/infrastructure/server/gateway/next-auth-gateway";
import { appRouter } from "~/lib/infrastructure/server/trpc/app-router";
import { api } from "~/lib/infrastructure/server/trpc/server-api";
import OpenAIAgentGateway from "~/lib/infrastructure/server/gateway/openai-agent-gateway";
import KernelPlancksterServerSideFileRepository from "~/lib/infrastructure/server/repository/file-repository";
import type AgentGatewayOutputPort from "~/lib/core/ports/secondary/agent-gateway-output-port";
import type KernelFileRepositoryOutputPort from "~/lib/core/ports/secondary/kernel-file-repository-output-port";


const serverContainer = new Container();

/**NextAuthOptions */
serverContainer.bind(CONSTANTS.NEXT_AUTH_OPTIONS).toConstantValue(authOptions);

/** TRPC Server Side Router */
serverContainer.bind(TRPC.APP_ROUTER).toConstantValue(appRouter);

/** TRPC Server API : Should be used ONLY in Server Components */
serverContainer.bind(TRPC.REACT_SERVER_COMPONENTS_API).toConstantValue(api);

/**AuthGatewayOutputPort */
serverContainer.bind<AuthGatewayOutputPort>(GATEWAYS.AUTH_GATEWAY).to(NextAuthGateway).inSingletonScope();

/**AgentGatewayOutputPort */
serverContainer.bind<AgentGatewayOutputPort>(GATEWAYS.AGENT_GATEWAY).to(OpenAIAgentGateway);

/** File Repository */
// serverContainer.bind<KernelFileRepositoryOutputPort>(REPOSITORY.KP_FILE_REPOSITORY).toConstantValue(KernelPlancksterServerSideFileRepository);

export default serverContainer;

