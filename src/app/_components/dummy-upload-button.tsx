import { useSignal } from "@preact/signals-react";
import { TFileUploadingViewModel } from "~/lib/core/view-models/file-uploading-view-model";
import clientContainer from "~/lib/infrastructure/client/config/ioc/client-container";
import { CONTROLLERS } from "~/lib/infrastructure/client/config/ioc/client-ioc-symbols";
import FileUploadingController from "~/lib/infrastructure/client/controllers/file-uploading-controller";

export type DummyUploadButtonProps = {
    localFilePath: string,
};


export function DummyUploadButton({
    localFilePath,
}: DummyUploadButtonProps) {

  const fileUploadingController = clientContainer.get<FileUploadingController>(CONTROLLERS.FILE_UPLOADING_CONTROLLER);

  const fileUploadingViewModel = useSignal<TFileUploadingViewModel>({
    status: "request",
    message: "File uploading test",
  });

    return (
            <div>
              <button
                  className={"border-2 border-neutral-950 rounded-md"} 
                  onClick={() => {
                      fileUploadingController.execute({
                          file: new File([new Blob()], localFilePath),
                          response: {
                            name: "file-uploading test",
                            description: "File uploading test",
                            value: fileUploadingViewModel
                          }
                      })
                    .then(() => {
                      console.log("File uploaded");
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                  }}
              >
                  Upload Source Data
              </button>
              <div>
                <p>Status: {fileUploadingViewModel.value.status}</p>
                <p>Message: {fileUploadingViewModel.value.message}</p>
              </div>
              <div>File selected: {localFilePath}</div>
            </div>
    );
  }