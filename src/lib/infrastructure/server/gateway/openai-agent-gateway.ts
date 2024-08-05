import { injectable } from "inversify";
import OpenAI from "openai";
import type { CreateAgentDTO } from "~/lib/core/dto/agent-dto";
import type AgentGatewayOutputPort from "~/lib/core/ports/secondary/agent-gateway-output-port";
import { env } from "~/env.cjs";


@injectable()
export default class OpenAIAgentGateway implements AgentGatewayOutputPort {
    private openai: OpenAI
    constructor(
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
        const error: CreateAgentDTO = {
            success: false,
            data: {
                code: "500",
                message: "Not implemented",
            }
        }
        return Promise.resolve(error);
    }
}