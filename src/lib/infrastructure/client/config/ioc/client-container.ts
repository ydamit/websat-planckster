import "reflect-metadata";
import { Container, interfaces } from "inversify";
import { CONTROLLERS, REPOSITORIES, TRPC, USECASES } from "./client-ioc-symbols";
import { api } from "~/lib/infrastructure/client/trpc/react-api";
import FileRepositoryOutputPort from "~/lib/core/ports/secondary/file-repository-output-port";
import FileSystemRepository from "../../repository/filesystem-repository";
import FileUploadingController from "../../controllers/file-uploading-controller";
import { FileUploadingInputPort } from "~/lib/core/ports/primary/file-uploading-input-port";
import { TSignal } from "~/lib/core/entity/signals";
import { TFileUploadingViewModel } from "~/lib/core/view-models/file-uploading-view-model";
import FileUploadingUseCase from "~/lib/core/usecase/file-upload-usecase";
import FileUploadingPresenter from "../../presenters/file-uploading-presenter";
import serverContainer from "~/lib/infrastructure/server/config/ioc/server-container";
import { TRPC as SERVER_TRPC } from "~/lib/infrastructure/server/config/ioc/server-ioc-symbols";
import { TServerComponentAPI } from "~/lib/infrastructure/server/trpc/server-api";

const clientContainer = new Container();

clientContainer.bind(TRPC.REACT_CLIENT_COMPONENTS_API).toConstantValue(api);

clientContainer.bind<FileRepositoryOutputPort>(REPOSITORIES.FILE_REPOSITORY).to(FileSystemRepository).inSingletonScope();

/**
 * Feature: File Uploading
 */
clientContainer.bind<FileUploadingController>(CONTROLLERS.FILE_UPLOADING_CONTROLLER).to(FileUploadingController);

clientContainer
  .bind<interfaces.Factory<FileUploadingInputPort>>(USECASES.FILE_UPLOADING_USECASE_FACTORY)
  .toFactory<FileUploadingInputPort, [TSignal<TFileUploadingViewModel>]>((
    context: interfaces.Context
  ) => (response: TSignal<TFileUploadingViewModel>) => {
    const presenter = new FileUploadingPresenter(response);
    const fileRepository = context.container.get<FileRepositoryOutputPort>(REPOSITORIES.FILE_REPOSITORY);
    const serverApi = serverContainer.get<TServerComponentAPI>(SERVER_TRPC.REACT_SERVER_COMPONENTS_API)
    return new FileUploadingUseCase(presenter, fileRepository, serverApi);
  });


export default  clientContainer;