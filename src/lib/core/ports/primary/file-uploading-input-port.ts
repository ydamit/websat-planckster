import { TFileUploadingErrorResponse, TFileUploadingProgressResponse, TFileUploadingRequest, TFileUploadingSuccessResponse } from "../../usecase-models/file-uploading-usecase-models";

export interface FileUploadingOutputPort<TResponse> {
    response: TResponse;
    presentProgress(progress: TFileUploadingProgressResponse): void;
    presentSuccess(response: TFileUploadingSuccessResponse): void;
    presentError(error: TFileUploadingErrorResponse): void;
}


export interface FileUploadingInputPort {
    presenter: FileUploadingOutputPort<any>;
    execute(request: TFileUploadingRequest): Promise<void>;
}