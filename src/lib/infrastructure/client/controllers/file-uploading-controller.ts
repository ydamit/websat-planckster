import { injectable } from 'inversify';
import { FileUploadingInputPort } from '~/lib/core/ports/primary/file-uploading-input-port';
import clientContainer from '../config/ioc/client-container';
import { TSignal } from '~/lib/core/entity/signals';
import { TFileUploadingViewModel } from '~/lib/core/view-models/file-uploading-view-model';
import { REPOSITORIES } from '../config/ioc/client-ioc-symbols';

export interface TFileUploadingControllerParameters {
    file: File;
    response: TSignal<TFileUploadingViewModel>;
}

@injectable()
export default class FileUploadingController {

    async execute(
        controllerParameters: TFileUploadingControllerParameters
    ): Promise<void> {

        const { file, response } = controllerParameters;

        const fileUploadingRequest = {
            file: file
        }

        const usecaseFactory: (response: TSignal<TFileUploadingViewModel>) => FileUploadingInputPort = clientContainer.get(REPOSITORIES.FILE_UPLOADING_USECASE_FACTORY);
        const usecase = usecaseFactory(response);

        await usecase.execute(fileUploadingRequest);

    }
}