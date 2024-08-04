import { inject, injectable } from "inversify";
import OpenAI from "openai";
import type { CreateAgentDTO } from "~/lib/core/dto/agent-dto";
import type AgentGatewayOutputPort from "~/lib/core/ports/secondary/agent-gateway-output-port";
import { env } from "~/env";
import { TRPC } from "../config/ioc/server-ioc-symbols";
import type { TServerComponentAPI } from "../trpc/server-api";


@injectable()
export default class OpenAIAgentGateway implements AgentGatewayOutputPort {
    private openai: OpenAI
    constructor(
        @inject(TRPC.REACT_SERVER_COMPONENTS_API) private api: TServerComponentAPI , 
    ) {
        this.openai = new OpenAI({
            apiKey: env.OPENAI_API_KEY,
        });
    }        


    /**
     * 
     * @param research_context_id The research context id to bind the agent to.
     */
    createAgent(research_context_id: number): Promise<CreateAgentDTO> {
        throw new Error("Method not implemented.");
    }
}