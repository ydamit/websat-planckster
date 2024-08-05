import { z } from "zod";
import { messageRouter } from "~/lib/infrastructure/server/trpc/routers/messages";

export const FileUploadingRequestSchema = z.object({
    file: z.instanceof(File),
});

export type TFileUploadingRequest = z.infer<typeof FileUploadingRequestSchema>;


export const FileUploadingSuccessResponseSchema = z.object({
    message: z.string(),
    fileName: z.string(),
});

export type TFileUploadingSuccessResponse = z.infer<typeof FileUploadingSuccessResponseSchema>;

export const FileUploadingErrorResponseSchema = z.object({
    message: z.string(),
});

export type TFileUploadingErrorResponse = z.infer<typeof FileUploadingErrorResponseSchema>;

export const FileUploadingProgressResponseSchema = z.object({
    message: z.string(),
    progress: z.number(),
});

export type TFileUploadingProgressResponse = z.infer<typeof FileUploadingProgressResponseSchema>;


