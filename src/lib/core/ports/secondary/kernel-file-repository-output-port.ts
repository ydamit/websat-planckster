import type { DownloadFileDTO, UploadFileDTO } from "~/lib/core/dto/file-repository-dto";

export default interface KernelFileRepositoryOutputPort {
    /**
     * Uploads a file to the file repository managed by Kernel.
     * @param file The file to upload.
     * @returns The file upload result.
     */
    uploadFile(remotePath: string): Promise<UploadFileDTO>;
    /**
     * Downloads a file from the file repository managed by Kernel.
     * @param file The file to download.
     * @returns The file download result.
     */
    downloadFile(remotePath: string): Promise<DownloadFileDTO>;
}