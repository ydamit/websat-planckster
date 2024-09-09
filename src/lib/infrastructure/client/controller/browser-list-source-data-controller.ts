import { injectable } from "inversify";
import { TSignal } from "~/lib/core/entity/signals";
import { TListSourceDataViewModel } from "~/lib/core/view-models/list-source-data-view-models";
import BrowserListSourceDataPresenter from "../presenter/browser-list-source-data-presenter";
import clientContainer from "../config/ioc/client-container";
import BrowserSourceDataGateway from "../gateway/browser-source-data-gateway";
import { GATEWAYS } from "../config/ioc/client-ioc-symbols";
import { appRouter } from 'src/lib/infrastructure/server/trpc/app-router';

export interface TBrowserListSourceDataControllerParameters {
    researchContextID?: string;
    response: TSignal<TListSourceDataViewModel>;
}

@injectable()
export default class BrowserListSourceDataController {

    async execute(params: TBrowserListSourceDataControllerParameters): Promise<void> {

        try {
            await appRouter.controllers.listSourceData.query({ researchContextID: params.researchContextID } );

        } catch (error) {
            const err = error as Error;
            const presenter = new BrowserListSourceDataPresenter(params.response);
            presenter.presentError({
                message: err.message,
                operation: "list-source-data",
                context: {
                    researchContextId: params.researchContextID,
                },
            });
        }




    }
}