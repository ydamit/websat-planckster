import { z } from 'zod'
import { RemoteFileSchema, FileSchema } from '../entity/file'

export const ListSourceDataRequestSchema = z.object({
    clientID: z.string(),
    researchContextID: z.string().optional(),
})
export type TListSourceDataRequest = z.infer<typeof ListSourceDataRequestSchema>

export const ListSourceDataPartialSuccessResponseSchema = z.object({
    type: z.literal("partial"),
    failedFiles: z.array(FileSchema),
    sourceData: z.array(RemoteFileSchema),
})
export type TListSourceDataPartialSuccessResponse = z.infer<typeof ListSourceDataPartialSuccessResponseSchema>

export const ListSourceDataFullSuccessResponseSchema = z.object({
    type: z.literal("full"),
    sourceData: z.array(RemoteFileSchema),
})
export type TListSourceDataFullSuccessResponse = z.infer<typeof ListSourceDataFullSuccessResponseSchema>

export const ListSourceDataSuccessResponseSchema = z.discriminatedUnion(
    "type",
    [ListSourceDataPartialSuccessResponseSchema, ListSourceDataFullSuccessResponseSchema]
)
export type TListSourceDataSuccessResponse = z.infer<typeof ListSourceDataSuccessResponseSchema>

export const ListSourceDataErrorResponseSchema = z.object({
    operation: z.string(),
    message: z.string(),
    context: z.any().optional(),
})
export type TListSourceDataErrorResponse = z.infer<typeof ListSourceDataErrorResponseSchema>
