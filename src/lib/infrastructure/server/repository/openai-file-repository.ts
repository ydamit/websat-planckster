import { inject, injectable } from "inversify";
import type { UploadFileDTO, DownloadFileDTO } from "~/lib/core/dto/file-repository-dto";
import type { LocalFile, RemoteFile } from "~/lib/core/entity/file";
import type FileRepositoryOutputPort from "~/lib/core/ports/secondary/file-repository-output-port";
import { OPENAI } from "../config/ioc/server-ioc-symbols";
import OpenAI from "openai";

@injectable()
export default class OpenAIFileRepository implements FileRepositoryOutputPort {
    constructor(
        @inject(OPENAI.OPENAI_CLIENT) private openai: OpenAI
    ) {
    }
    uploadFile(file: LocalFile): Promise<UploadFileDTO> {
        const errorDTO: UploadFileDTO = {
            success: false,
            data: {
                operation: "upload",
                message: "Method not implemented."
            }
        }
        return Promise.resolve(errorDTO);
    }
    downloadFile(file: RemoteFile): Promise<DownloadFileDTO> {
        const errorDTO: DownloadFileDTO = {
            success: false,
            data: {
                operation: "download",
                message: "Method not implemented."
            }
        }
        return Promise.resolve(errorDTO);
    }
}