import { injectable } from "inversify";
import { UploadFileDTO, DownloadFileDTO } from "~/lib/core/dto/file-repository-dto";
import { LocalFile, RemoteFile } from "~/lib/core/entity/file";
import type FileRepositoryOutputPort from "~/lib/core/ports/secondary/file-repository-output-port";

@injectable()
export default class BrowserFileRepository implements FileRepositoryOutputPort {
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