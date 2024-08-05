import path from 'path';
import FileRepositoryOutputPort from '~/lib/core/ports/secondary/file-repository-output-port';
import { DownloadFileDTO, UploadFileDTO } from '~/lib/core/dto/file-dto';


export default class FileSystemRepository implements FileRepositoryOutputPort {

    private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(file);
        });
    }

    async uploadFile(signedUrl: string, file: File): Promise<UploadFileDTO> {

        try {
            const fileData = await this.readFileAsArrayBuffer(file);

            const response = await fetch(signedUrl, {
                method: 'PUT',
                body: fileData
            });

            if (!response.ok) {
                const dto: UploadFileDTO = {
                    success: false,
                    data: {
                        message: "Upload failed"
                    }
                };
                return dto;
            }
            const dto: UploadFileDTO = {
                success: true,
                data: {
                    fileName: path.basename(file.name),
                }
            };
            return dto;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            const dto: UploadFileDTO = {
                success: false,
                data: {
                    message: errorMessage
                }
            };
            return dto;
        } 
    }

    async downloadFile(signedUrl: string, fileName: string): Promise<DownloadFileDTO> {

        try {

        const response = await fetch(signedUrl);
            if (!response.ok) {
                const dto: DownloadFileDTO = {
                    success: false,
                    data: {
                        message: "Download failed: fetchNode response is not 'ok'"
                    }
                };
                return dto;
            }

            const blob = await response.blob();

            // Check if response.blob() is null
            if (!blob) {
                const dto: DownloadFileDTO = {
                    success: false,
                    data: {
                        message: "Download failed: response.blob() is null"
                    }
                };
                return dto;
            }

            // Download the file, prompting the user to save it
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;  // default file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            const dto: DownloadFileDTO = {
                success: true,
                data: {
                    fileName: fileName
                }
            };

            return dto;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            const dto: DownloadFileDTO = {
                success: false,
                data: {
                    message: errorMessage
                }
            };
            return dto;

        }
    }
}

