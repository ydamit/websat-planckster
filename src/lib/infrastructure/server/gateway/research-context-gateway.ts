import { injectable } from "inversify";
import { TListResearchContextDTO, TGetResearchContextDTO, TCreateResearchContextDTO } from "~/lib/core/dto/research-context-gateway-dto";
import { RemoteFile } from "~/lib/core/entity/file";
import ResearchContextGatewayOutputPort from "~/lib/core/ports/secondary/research-context-gateway-output-port";

@injectable()
export default class ResearchContextGateway implements ResearchContextGatewayOutputPort {
    list(): Promise<TListResearchContextDTO> {
        throw new Error("Method not implemented.");
    }
    get(researchContextID: string): Promise<TGetResearchContextDTO> {
        throw new Error("Method not implemented.");
    }
    create(researchContextName: string, researchContextDescription: string, sourceData: RemoteFile[]): Promise<TCreateResearchContextDTO> {
        throw new Error("Method not implemented.");
    }
    
}