import "server-only";
import type { DownloadFileDTO, UploadFileDTO } from "~/lib/core/dto/file-repository-dto";
import type KernelFileRepositoryOutputPort from "~/lib/core/ports/secondary/kernel-file-repository-output-port";

/**
 * A server-side repository to upload or download files from Kernel Planckster's storage backends.
 */
export default class KernelPlancksterServerSideFileRepository implements KernelFileRepositoryOutputPort {
    downloadFile(remotePath: string): Promise<DownloadFileDTO> {
        throw new Error("Method not implemented.");
    }

    uploadFile(remotePath: string): Promise<UploadFileDTO> {
        throw new Error("Method not implemented.");
    }
}