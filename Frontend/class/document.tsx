import { type } from "os"

export type DocumentSigner = {
    userId: string
}
type AddDivFields = {
    id: number
}


export type TypeDocumentSignerFields = AddDivFields & DocumentSigner

type Basic = {
    createdBy: string;
    updatedBy: string;
    updatedAt: any;
    createdAt: any;
    txID: string;
}

type Customer = {
    customerId: string;
    name: string;
    date: string;
    price: string;
    deliveryData: string;
    quantity: string;
    status: string

}


type RawMaterial = {
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
type Productions = {
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
export type RawMaterialEntity = RawMaterial & Basic;
export type CustomerEntity = Customer & Basic;
export type ProductionsEntity = Productions & Basic;



export type Signer = {
    tokenId: number;
    signature: string;
    status: string;
}

export type UriData = {
    file: string,
    fileName: string,
}