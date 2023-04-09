
import { BaseRepository } from "../core/doc-mangement/base.production.repository";
import { ProductionEntity } from "./production.entity";

export class ProductionRepository extends BaseRepository<ProductionEntity> {
    protected getKey(production: ProductionEntity): string {
        return `${production.batchesNumber}`;
    }

}
