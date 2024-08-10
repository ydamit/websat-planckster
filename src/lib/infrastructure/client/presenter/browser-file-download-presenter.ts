import { type TSignal } from "../../../core/entity/signals";
import { type FileDownloadOutputPort } from "~/lib/core/ports/primary/file-download-primary-ports";
import { type TFileDownloadPartialResponse, type TFileDownloadErrorResponse, type TFileDownloadProgressResponse, type TFileDownloadSuccessResponse } from "~/lib/core/usecase-models/file-download-usecase-models";
import { type TFileDownloadViewModel } from "~/lib/core/view-models/file-download-view-model";


export default class BrowserFileDownloadPresenter implements FileDownloadOutputPort<TSignal<TFileDownloadViewModel>>{
    response: TSignal<TFileDownloadViewModel>;
    constructor(response: TSignal<TFileDownloadViewModel>) {
        this.response = response;
    }

    presentProgress(progress: TFileDownloadProgressResponse): void {
        this.response.update({
            status: "progress",
            message: progress.message,
            progress: progress.progress
        });
    }

    presentError(error: TFileDownloadErrorResponse): void {
        this.response.update({
            status: "error",
            message: error.message
        })
    }

    presentPartial(response: TFileDownloadPartialResponse): void {
        this.response.update({
            status: "partial",
            message: response.message,
            unsuccessfullFileNames: response.unsuccessfullFileNames
        })
    }

    presentSuccess(response: TFileDownloadSuccessResponse): void {
        this.response.update({
            status: "success",
            message: response.message,
        })
    }
}