"use client";

import { SourceDataAGGrid } from "@maany_shr/rage-ui-kit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Signal } from "~/lib/core/entity/signals";
import { TFileUploadViewModel } from "~/lib/core/view-models/file-upload-view-model";
import { TListSourceDataViewModel } from "~/lib/core/view-models/list-source-data-view-models";
import clientContainer from "~/lib/infrastructure/client/config/ioc/client-container";
import { CONTROLLERS } from "~/lib/infrastructure/client/config/ioc/client-ioc-symbols";
import BrowserFileUploadController, { TBrowserFileUploadControllerParameters } from "~/lib/infrastructure/client/controller/browser-file-upload-controller";
import BrowserListSourceDataController, { TBrowserListSourceDataControllerParameters } from "~/lib/infrastructure/client/controller/browser-list-source-data-controller";
import signalsContainer from "~/lib/infrastructure/common/signals-container";
import { SIGNAL_FACTORY } from "~/lib/infrastructure/common/signals-ioc-container";

export function ListSourceDataForClientClientPage(props: { viewModel: TListSourceDataViewModel }) {

  const [uploadSourceDataViewModel, setUploadSourceDataViewModel] = useState<TFileUploadViewModel>({
    status: "request",
  } as TFileUploadViewModel);

  const [listSourceDataViewModel, setListSourceDataViewModel] = useState<TListSourceDataViewModel>(props.viewModel);

  const queryClient = useQueryClient();

  const { isFetching, isLoading, isError } = useQuery<Signal<TListSourceDataViewModel>>({
    queryKey: ["list-source-data"],
    queryFn: async () => {
      const signalFactory = signalsContainer.get<(initialValue: TListSourceDataViewModel, update?: (value: TListSourceDataViewModel) => void) => Signal<TListSourceDataViewModel>>(SIGNAL_FACTORY.KERNEL_LIST_SOURCE_DATA);
      const response: Signal<TListSourceDataViewModel> = signalFactory(
        {
          status: "request",
        },
        setListSourceDataViewModel,
      );
      const controllerParameters: TBrowserListSourceDataControllerParameters = {
        response: response,
      };
      const controller = clientContainer.get<BrowserListSourceDataController>(CONTROLLERS.LIST_SOURCE_DATA_CONTROLLER);
      await controller.execute(controllerParameters);
      return response;
    },
  });

  const mutation = useMutation({
    mutationKey: ["upload-source-data"],
    retry: 3,
    retryDelay: 3000,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["list-source-data"] });
    },
    mutationFn: async (file: File) => {
      const signalFactory = signalsContainer.get<(initialValue: TFileUploadViewModel, update?: (value: TFileUploadViewModel) => void) => Signal<TFileUploadViewModel>>(SIGNAL_FACTORY.KERNEL_FILE_UPLOAD);
      const response: Signal<TFileUploadViewModel> = signalFactory(
        {
          status: "request",
        } as TFileUploadViewModel,
        setUploadSourceDataViewModel,
      );
      const controllerParameters: TBrowserFileUploadControllerParameters = {
        response: response,
        file: file,
      };
      const controller = clientContainer.get<BrowserFileUploadController>(CONTROLLERS.KERNEL_FILE_UPLOAD_CONTROLLER);
      await controller.execute(controllerParameters);
      return response;
    },
  });


  const handleDownloadSourceData = (relativePath: string) => {
    console.log("Download source data", relativePath);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadSourceData = () => {
    console.log("Upload source data");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } 
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];

      if (!file) {
        return;
      }

      mutation.mutate(file);
    }
  }

  const isUploading = mutation.isPending


  if (listSourceDataViewModel.status === "request") {
    return (
      <div>
        <SourceDataAGGrid isLoading={true} isUploading={false} rowData={[]} handleDownloadSourceData={handleDownloadSourceData} handleUploadSourceData={handleUploadSourceData} />
      </div>
    );
  } else if (listSourceDataViewModel.status === "success") {
    return (
      <div>
        <SourceDataAGGrid isLoading={false} isUploading={isUploading} rowData={listSourceDataViewModel.sourceData} handleDownloadSourceData={handleDownloadSourceData} handleUploadSourceData={handleUploadSourceData} />

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    );
  }
}
