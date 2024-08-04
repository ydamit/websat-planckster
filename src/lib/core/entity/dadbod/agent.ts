import { z } from "zod";

export const AgentSchema = z.object({
    id: z.string(),
    provider: z.enum(["openai"]),
    model: z.string(),
    metadata: z.object({
        researchContextID: z.string(),
        vectorStoreID: z.string(),
    }),
    tools: z.array(z.enum([
        "code_interpreter",
        "file_search",
        "function"
    ])),
    resources: z.object({
        vector_stores: z.array(z.string()),
    }),
    instructions: z.string(),
});