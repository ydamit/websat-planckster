import { injectable } from "inversify";
import { CreateVectorStoreDTO, ListVectorStoresDTO, GetVectorStoreDTO, DeleteVectorStoreDTO, UpdateVectorStoreDTO } from "~/lib/core/dto/vector-store-dto";
import type VectorStoreOutputPort from "~/lib/core/ports/secondary/vector-store-output-port";

@injectable()
export default class OpenAIVectorRepository implements VectorStoreOutputPort{
    createVectorStore(research_context_id: number, fileIDs: string[]): Promise<CreateVectorStoreDTO> {
        throw new Error("Method not implemented.");
    }
    listVectorStores(research_context_id: number): Promise<ListVectorStoresDTO> {
        throw new Error("Method not implemented.");
    }
    getVectorStore(research_context_id: number, vector_store_id: string): Promise<GetVectorStoreDTO> {
        throw new Error("Method not implemented.");
    }
    deleteVectorStore(research_context_id: number, vector_store_id: string): Promise<DeleteVectorStoreDTO> {
        throw new Error("Method not implemented.");
    }
    updateVectorStore(research_context_id: number, vector_store_id: string, fileIDs: string[]): Promise<UpdateVectorStoreDTO> {
        throw new Error("Method not implemented.");
    }
}

