
import { BaseRepository } from "../core/doc-mangement/base.document.repository";
import { RawMaterialEntity } from "./RawMaterial.entity";

export class RawMaterialRepository extends BaseRepository<RawMaterialEntity> {
    protected getKey(rawMaterial: RawMaterialEntity): string {
        return `${rawMaterial.rawMaterialId}`;
    }

}
