import { LocalFile } from "~/lib/core/entity/file";
import FileRepositoryOutputPort from "~/lib/core/ports/secondary/file-repository-output-port";
import serverContainer from "~/lib/infrastructure/server/config/ioc/server-container"
import { GATEWAYS, KERNEL, REPOSITORY } from "~/lib/infrastructure/server/config/ioc/server-ioc-symbols";

import fs from "fs";
import AuthGatewayOutputPort from "~/lib/core/ports/secondary/auth-gateway-output-port";

describe("Kernel File Repository", () => {
    beforeAll(() => {
        // create a test file to upload with sample content
        
    });
    afterAll(() => {
        jest.clearAllMocks();
    });
    it("should fail if file does not exist on local filesystem", async () => {
        const KernelFileRepository = serverContainer.get<FileRepositoryOutputPort>(REPOSITORY.KERNEL_FILE_REPOSITORY)
        const localFile: LocalFile = {
            type: "local",
            path: "test.txt",
        }
        const uploadFileDTO = await KernelFileRepository.uploadFile(localFile, "test.txt")
        expect(uploadFileDTO.success).toBe(false);
        if(uploadFileDTO.success) {
            fail("Upload file should not be successful");
        }
        expect(uploadFileDTO.data.operation).toBe("kp#upload");
        expect(uploadFileDTO.data.message).toBe("File test.txt does not exist on the local filesystem");
    });

    it("should fail if KP credentials are not available", async () => {
        const KernelFileRepository = serverContainer.get<FileRepositoryOutputPort>(REPOSITORY.KERNEL_FILE_REPOSITORY)
        jest.spyOn(fs, "existsSync").mockReturnValue(true);
        jest.spyOn(fs, "readFileSync").mockReturnValue("test content");
        jest.spyOn(serverContainer.get<AuthGatewayOutputPort>(GATEWAYS.AUTH_GATEWAY), "extractKPCredentials").mockResolvedValue({
            success: false,
            data: {
                message: "KP credentials not available",
            } 
        });
        const localFile: LocalFile = {
            type: "local",
            path: "test.txt",
        }

        const uploadFileDTO = await KernelFileRepository.uploadFile(localFile, "test.txt")
        expect(uploadFileDTO.success).toBe(false);
        if(uploadFileDTO.success) {
            fail("Upload file should not be successful");
        }
        expect(uploadFileDTO.data.operation).toBe("kp#upload");
        expect(uploadFileDTO.data.message).toBe("KP credentials not available");
    });

    it
});