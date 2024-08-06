import { LocalFile } from "~/lib/core/entity/file";
import FileRepositoryOutputPort from "~/lib/core/ports/secondary/file-repository-output-port";
import clientContainer from "~/lib/infrastructure/client/config/ioc/client-container";
import { REPOSITORY } from "~/lib/infrastructure/client/config/ioc/client-ioc-symbols";

describe('<ListResearchContextPage />', () => {
  it('should upload a file', async () => {
    const fileRepository = clientContainer.get<FileRepositoryOutputPort>(REPOSITORY.FILE_REPOSITORY)
    const localFile: LocalFile = {
      type: "local",
      path: "path",
    }

    const uploadFileDTO = await fileRepository.uploadFile(localFile)
    expect(uploadFileDTO.success).toBe(false)
  });
});