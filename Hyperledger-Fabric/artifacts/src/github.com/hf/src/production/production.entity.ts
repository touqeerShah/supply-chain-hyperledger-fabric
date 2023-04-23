
import { BaseEntity } from "../core/doc-mangement/base.entity";

export class ProductionEntity extends BaseEntity {
    batchesNumber: string
    date: string
    productionDepartmentEmployerName: string
    warehouseDeptEmployerName: string
    purchaseOrderNumber: string
    customerName: string
    productName: string
    startProductionDate?: string
    mixTheOil?: string
    fillBottle?: string
    sprayCoileer?: string
    barcode?: string
    batchSize?: string
    isComplete?: boolean
    mfgDate?: string
    expDate?: string
    issuedByDate?: string
    QAckhDate?: string

}

export class ProductionFinishedArg {
    startProductionDate: string
    mixTheOil: string
    fillBottle: string
    sprayCoileer: string
    batchesNumber: string
    barcode: string
    batchSize: string
    isComplete: boolean
    mfgDate: string
    expDate: string
    issuedByDate: string
    QAckhDate: string
}
export class ProductionEntityCount {
    count: number;
}


export class ProductionTransactionArg {
    batchesNumber: string
    date: string
}