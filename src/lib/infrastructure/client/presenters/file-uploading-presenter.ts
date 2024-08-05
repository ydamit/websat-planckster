import { TSignal } from "~/lib/core/entity/signals";
import { FileUploadingOutputPort } from "~/lib/core/ports/primary/file-uploading-input-port";
import { TFileUploadingProgressResponse } from "~/lib/core/usecase-models/file-uploading-usecase-models";
import { TFileUploadingViewModel } from "~/lib/core/view-models/file-uploading-view-model";


export default class FileUploadingPresenter implements FileUploadingOutputPort<TSignal<TFileUploadingViewModel>>{
    response: TSignal<TFileUploadingViewModel>;
    constructor(response: TSignal<TFileUploadingViewModel>) {
        this.response = response;
    }

    presentProgress(progress: TFileUploadingProgressResponse): void {
        this.response.value.value = {
            status: "progress",
            message: progress.message,
            progress: progress.progress
        }
    }

    presentError(error: { message: string }): void {
        this.response.value.value = {
            status: "error",
            message: error.message
        }
    }

    presentSuccess(success: { message: string; fileName: string }): void {
        this.response.value.value = {
            status: "success",
            message: success.message,
            fileName: success.fileName
        }
    }

}