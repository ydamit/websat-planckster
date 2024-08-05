import type { CreateVectorStoreDTO, ListVectorStoresDTO, GetVectorStoreDTO, DeleteVectorStoreDTO, UpdateVectorStoreDTO } from "../../dto/vector-store-dto";

export default interface VectorStoreOutputPort {
    createVectorStore(research_context_id: number, fileIDs: string[]): Promise<CreateVectorStoreDTO>;
    listVectorStores(research_context_id: number): Promise<ListVectorStoresDTO>;
    getVectorStore(research_context_id: number, vector_store_id: string): Promise<GetVectorStoreDTO>;
    deleteVectorStore(research_context_id: number, vector_store_id: string): Promise<DeleteVectorStoreDTO>;
    updateVectorStore(research_context_id: number, vector_store_id: string, fileIDs: string[]): Promise<UpdateVectorStoreDTO>;
}