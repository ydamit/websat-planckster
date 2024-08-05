"use client";
import clientContainer from "~/lib/infrastructure/client/config/ioc/client-container";
import { CONTROLLERS } from "~/lib/infrastructure/client/config/ioc/client-ioc-symbols";
import { useState } from "react";
import FileUploadingController from "~/lib/infrastructure/client/controllers/file-uploading-controller";
import { TFileUploadingViewModel } from "~/lib/core/view-models/file-uploading-view-model";
import { useSignal } from "@preact/signals-react";
import { DummyUploadButton } from "./dummy-upload-button";


export function DummyUploadComponent(
) {

  const fileUploadingController = clientContainer.get<FileUploadingController>(CONTROLLERS.FILE_UPLOADING_CONTROLLER);

  const fileUploadingViewModel = useSignal<TFileUploadingViewModel>({
    status: "request",
    message: "File uploading test",
  });

  const [localFilePath, setLocalFilePath] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLocalFilePath(file.name); // You can use file.path if you need the full path
    }
  };

    return (
        <div className="flex flex-row gap-md">

          <input type="file" id="file-selector" name="file-selector" onChange={handleFileChange} />

        {
          !localFilePath && (
          <div>
            <p>Please select a file to upload</p>
            <button className={"border-2 border-neutral-950 text-gray-400 rounded-md"} disabled={true}>Upload Source Data</button>
          </div>
          )
        }

        {
          localFilePath && (
            <DummyUploadButton localFilePath={localFilePath} />
           )} 
        </div>
    );
  }