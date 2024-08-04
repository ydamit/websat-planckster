import type { CreateAgentDTO } from "~/lib/core/dto/agent-dto";

export default interface AgentGatewayOutputPort {
    createAgent(research_context_id: number): Promise<CreateAgentDTO>;
}