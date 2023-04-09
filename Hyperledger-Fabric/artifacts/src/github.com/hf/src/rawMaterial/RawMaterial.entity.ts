
import { BaseEntity } from "../core/doc-mangement/base.entity";

export class RawMaterialEntity extends BaseEntity {
    rawMaterialId: string
    date: string
    purchaseOrderNumber: string
    customerName: string
    productName: string
    glassNumber: string
    sprayKollerNumber: string
    coverNumber: string
    StickerAndBarcode: string
    cartonOrBoxNumber: string
    rawMaterialNote: string
    receiverNote: string
}


export class RawMaterialEntityCount {
    count: number;
}


export class RecevingArg {
    rawMaterialId: string
    receiverNote: string
}