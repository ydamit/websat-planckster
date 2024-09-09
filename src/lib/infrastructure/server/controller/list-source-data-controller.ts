import { injectable } from "inversify";
import { TSignal } from "~/lib/core/entity/signals";
import { TListSourceDataViewModel } from "~/lib/core/view-models/list-source-data-view-models";
import serverContainer from "../config/ioc/server-container";
import KernelSourceDataGateway from "../gateway/kernel-source-data-gateway";
import { GATEWAYS, USECASE_FACTORY } from "../config/ioc/server-ioc-symbols";
import ListSourceDataPresenter from "../presenter/list-source-data-presenter";
import { TListSourceDataRequest } from "~/lib/core/usecase-models/list-source-data-usecase-models";
import { ListSourceDataInputPort } from "~/lib/core/ports/primary/list-source-data-primary-ports";

export interface TListSourceDataControllerParameters {
    researchContextID?: string;
    clientID: string;
    response: TSignal<TListSourceDataViewModel>;
}

@injectable()
export default class ListSourceDataController {

    async execute(params: TListSourceDataControllerParameters): Promise<void> {

        const requestModel: TListSourceDataRequest = {
            clientID: params.clientID,
            researchContextID: params.researchContextID,
        }

        const usecaseFactory = serverContainer.get<(response: TSignal<TListSourceDataViewModel>) => ListSourceDataInputPort>(USECASE_FACTORY.LIST_SOURCE_DATA_USECASE_FACTORY);
        const usecase = usecaseFactory(params.response);
        await usecase.execute(requestModel);

    }
}
