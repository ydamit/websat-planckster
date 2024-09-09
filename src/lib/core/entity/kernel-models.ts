import { z } from "zod";

export const ResearchContextSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});
export type TResearchContext = z.infer<typeof ResearchContextSchema>;

export const ConversationSchema = z.object({
  id: z.number(),
  title: z.string(),
});
export type TConversation = z.infer<typeof ConversationSchema>;

export const BaseMessageSchema = z.object({
  id: z.number(),
  content: z.string(),
  timestamp: z.string(),
  sender: z.string(),
});

export const UserMessageSchema = z.object({
  senderType: z.literal("user"),
});

export const AgentMessageSchema = z.object({
  senderType: z.literal("agent"),
});

export const MessageSchema = z.discriminatedUnion("senderType", [UserMessageSchema, AgentMessageSchema]);
export type TMessage = z.infer<typeof MessageSchema>;

export const SourceDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  relative_path: z.string(),
  type: z.string(),
  protocol: z.enum(["s3", "nas", "local"]),
  status: z.enum(["created", "unavailable", "available", "inconsistent_dataset"]),
});
export type TSourceData = z.infer<typeof SourceDataSchema>;