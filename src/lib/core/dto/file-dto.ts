import { z } from "zod";
import { DTOSchemaFactory } from "@/sdk/core/dto";
import { FileSchema } from "../entity/file-management/file";


export const UploadFileDTOSchema = DTOSchemaFactory(
    FileSchema,
    z.object({
        message: z.string(),
    })
)

export type UploadFileDTO = z.infer<typeof UploadFileDTOSchema>;

export const DownloadFileDTOSchema = DTOSchemaFactory(
    FileSchema,
    z.object({
        message: z.string(),
    })
)

export type DownloadFileDTO = z.infer<typeof DownloadFileDTOSchema>;
