import { BaseErrorDTOSchema, DTOSchemaFactory } from '@/sdk/core/dto'
import { z } from 'zod'

/**
 * Defines the schema for the UploadFileDTO object.
 */
export const UploadFileDTOSchema = DTOSchemaFactory(z.object({}), BaseErrorDTOSchema)

export type UploadFileDTO = z.infer<typeof UploadFileDTOSchema>


/**
 * Defines the schema for the DownloadFileDTO object.
 */
export const DownloadFileDTOSchema = DTOSchemaFactory(z.object({
    localPath: z.string(),
    fileName: z.string(),
    extension: z.string(),
}), BaseErrorDTOSchema)

export type DownloadFileDTO = z.infer<typeof DownloadFileDTOSchema>