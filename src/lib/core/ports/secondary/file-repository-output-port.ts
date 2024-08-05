import type { DownloadFileDTO, UploadFileDTO } from "../../dto/file-dto";


/**
 * Represents the output port for the file repository.
 */
export default interface FileRepositoryOutputPort {

    uploadFile(signedUrl: string, file: File): Promise<UploadFileDTO>;

    downloadFile(signedUrl: string, filePath: string): Promise<DownloadFileDTO>;
}
