"use client";
import clientContainer from "~/lib/infrastructure/client/config/ioc/client-container";
import type { TClientComponentAPI } from "~/lib/infrastructure/client/trpc/react-api";
import { TRPC } from "~/lib/infrastructure/client/config/ioc/client-ioc-symbols";
import { useState } from "react";

export type DummyUploadProps = {
    protocol: string,
    relativePath: string,
    sourceDataName: string,
};

export function DummyUploadComponent(
    props: DummyUploadProps
) {
    const api = clientContainer.get<TClientComponentAPI>(TRPC.REACT_CLIENT_COMPONENTS_API);
    const uploadSourceDataMutation = api.kernel.sourceData.create.useMutation({
        onSuccess: () => {
            console.log("Source data uploaded");
        },
    });

  const [localFilePath, setLocalFilePath] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLocalFilePath(file.name); // You can use file.path if you need the full path
    }
  };

    return (
        <div>

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
          <div>
            <p>File selected: {localFilePath}</p>

            <button
                className={"border-2 border-neutral-950 rounded-md"} 
                onClick={() => {
                    uploadSourceDataMutation.mutate({
                        protocol: props.protocol,
                        relativePath: props.relativePath,
                        sourceDataName: props.sourceDataName,
                        localFilePath: localFilePath,
                    });
                }}
            >
                Upload Source Data
            </button>
            {
                uploadSourceDataMutation.isError && (
                    <div>Error: {JSON.stringify(uploadSourceDataMutation.error)}</div>
                )
            }
            {
                !uploadSourceDataMutation.isSuccess && !uploadSourceDataMutation.isError && (
                    <div>Uploading...</div>
                )
            }
            {
                uploadSourceDataMutation.isSuccess && (
                    <div>Upload successful</div>
                )
            }


          </div>
        )
      }


        </div>
    );
}