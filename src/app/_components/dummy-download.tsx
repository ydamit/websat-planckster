"use client";

import clientContainer from "~/lib/infrastructure/client/config/ioc/client-container";
import type { TClientComponentAPI } from "~/lib/infrastructure/client/trpc/react-api";
import { TRPC } from "~/lib/infrastructure/client/config/ioc/client-ioc-symbols";

export type DummyDownloadProps = {
    protocol: string,
    relativePath: string,
    localFilePath: string,
};

export function DummyDownloadComponent(
    props: DummyDownloadProps
) {
    //const api = clientContainer.get<TClientComponentAPI>(TRPC.REACT_CLIENT_COMPONENTS_API);
    //const downloadSourceDataMutation = api.kernel.sourceData.download.useMutation({
        //onSuccess: () => {
            //console.log("Source data downloaded");
        //},
    //});

    return (
        <div> {/*
            <button
                className={"border-2 border-neutral-950 rounded-md"} 
                onClick={() => {
                    downloadSourceDataMutation.mutate({
                        protocol: props.protocol,
                        relativePath: props.relativePath,
                        localFilePath: props.localFilePath,
                    });
                }}
            >
                Download Source Data
            </button>
            {downloadSourceDataMutation.isError && (
                <div>Error: {JSON.stringify(downloadSourceDataMutation.error)}</div>
            )}
        */}
        </div>
    );
}
