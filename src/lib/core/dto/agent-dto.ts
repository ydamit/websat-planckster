import type { z } from "zod";
import { DTOSchemaFactory, BaseErrorDTOSchema } from "@/sdk/core/dto";
import { AgentSchema } from "../entity/dadbod/agent";


/**
 * Creates a DTOSchema for creating an agent.
 * 
 * @param {AgentSchema} agentSchema - The schema for the agent.
 * @param {BaseErrorDTOSchema} baseErrorDTOSchema - The schema for the base error DTO.
 * @returns {DTOSchema} - The created DTOSchema.
 */
export const CreateAgentDTOSchema = DTOSchemaFactory(
    AgentSchema,
    BaseErrorDTOSchema,
);

export type CreateAgentDTO = z.infer<typeof CreateAgentDTOSchema>;


