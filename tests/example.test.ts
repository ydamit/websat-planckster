import "reflect-metadata";
import  serverContainer  from "../src/lib/infrastructure/server/config/ioc/server-container";
import { GATEWAYS } from "~/lib/infrastructure/server/config/ioc/server-ioc-symbols";
import type AgentGatewayOutputPort from "~/lib/core/ports/secondary/agent-gateway-output-port";

it("hello world", async() => { 
    serverContainer.load();
    const agentGateway: AgentGatewayOutputPort = serverContainer.get(GATEWAYS.AGENT_GATEWAY);
    const agentDTO = await agentGateway.createAgent(1)
    expect(agentDTO.success).toBe(false);

})