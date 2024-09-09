import { ListSourceDataInputPort, ListSourceDataOutputPort } from "../ports/primary/list-source-data-primary-ports";
import SourceDataGatewayOutputPort from "../ports/secondary/source-data-gateway-output-port";
import { TListSourceDataRequest } from "../usecase-models/list-source-data-usecase-models";

export default class ListSourceDataUseCase implements ListSourceDataInputPort {
    presenter: ListSourceDataOutputPort<any>;
    sourceDataGateway: SourceDataGatewayOutputPort;
    constructor(presenter: ListSourceDataOutputPort<any>, sourceDataGateway: SourceDataGatewayOutputPort) {
        this.presenter = presenter;
        this.sourceDataGateway = sourceDataGateway;
    }

    async execute(request: TListSourceDataRequest): Promise<void> {

        try {
            let listSourceDataDTO;
        
            if (request.researchContextID) {
                listSourceDataDTO = await this.sourceDataGateway.listForResearchContext(request.researchContextID);
            } else {
                listSourceDataDTO = await this.sourceDataGateway.list();
            }
            
            if (!listSourceDataDTO.success) {
                this.presenter.presentError(
                    {
                        operation: "usecase#list-source-data",
                        message: "Oops! Could not list the source data.",
                        context: listSourceDataDTO
                    }
                )
                return;
            }

            const localFileList = listSourceDataDTO.data.filter((sourceData) => sourceData.type === "local");
            const remoteFileList = listSourceDataDTO.data.filter((sourceData) => sourceData.type === "remote");

            if (localFileList.length > 0) {
                this.presenter.presentSuccess({
                    sourceData: remoteFileList,
                    failedFiles: localFileList,
                    type: "partial"
                })
                return;
            }

            this.presenter.presentSuccess(
                {
                    sourceData: remoteFileList,
                    type: "full"
                }
            )
        }
        
        catch (error) {
            const err = error as Error;
            this.presenter.presentError(
                {
                    operation: "usecase#list-source-data",
                    message: err.message,
                    context: request
                }
            )
        }
    }
}