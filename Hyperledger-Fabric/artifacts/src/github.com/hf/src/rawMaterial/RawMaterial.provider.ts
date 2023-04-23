import { Context } from "fabric-contract-api";
import { RawMaterialEntity, RawMaterialEntityCount } from "./RawMaterial.entity";
import { RawMaterialRepository } from "./RawMaterial.repository";
import { RawMaterialEntityValidation } from "./RawMaterial.validator";
import { BadRequestError } from "../core/eror/bad-request-error";
import { ErrorStatusCode } from "../core/eror/base-error";
export class RawMaterialProvider {
    private rawMaterialRepository: RawMaterialRepository;
    private rawMaterialValidators: RawMaterialEntityValidation;

    constructor(ctx: Context) {
        this.rawMaterialRepository = new RawMaterialRepository(ctx, RawMaterialEntity);
        this.rawMaterialValidators = new RawMaterialEntityValidation();
    }
    /**
     * this function check comapny exist or not
     * @param rawMaterialId 
     * @returns 
     */
    public async existsRawMaterial(rawMaterialId: string): Promise<boolean> {
        const query = {
            rawMaterialId: rawMaterialId,
        } as RawMaterialEntity;
        return await this.rawMaterialRepository.exists(query);
    }


    /**
     * function return status of rawMaterial not all details 
     * @param transactionId 
     * @returns 
     */
    public async getByQuery(query: string): Promise<any[] | string> {
        let mspID = this.rawMaterialRepository.getMSPID();
        var rawMaterialData = await this.rawMaterialRepository.getDataByQuery(query, "RawMaterial" + mspID);
        if (typeof rawMaterialData === 'string') {
            // 👇️ myVar has type string here
            return rawMaterialData;
        }
        rawMaterialData as any[]
        // let rawMaterialData: RawMaterialEntity = response
        return rawMaterialData;
    }
    /**
    * This function is  get detials of rawMaterial
    * @paramtransactionId 
    * @returns 
    */
    public async getRawMaterialDetails(rawMaterialId: string): Promise<RawMaterialEntity | string> {
        const query = {
            rawMaterialId: rawMaterialId,
        } as RawMaterialEntity;
        let mspID = this.rawMaterialRepository.getMSPID();
        return await this.rawMaterialRepository.get(query, "RawMaterial" + mspID);
    }

    /**
 * This function is  get detials of rawMaterial
 * @paramtransactionId 
 * @returns 
 */
    public async getRawMaterialEntityCount(): Promise<RawMaterialEntityCount | string> {
        let mspID = this.rawMaterialRepository.getMSPID();
        return await this.rawMaterialRepository.getRawMaterialEntityCount("RawMaterial" + mspID);
    }


    /**
     * Create rawMaterial first validate the object the passed it to add more attribut and store into blockchain
     * @param rawMaterial 
     * @returns 
     */
    public async createRawMaterial(
        _rawMaterial: RawMaterialEntity): Promise<RawMaterialEntity | string> {
        // let location = new Location();
        let mspID = this.rawMaterialRepository.getMSPID();

        let rawMaterial = new RawMaterialEntity()
        rawMaterial.rawMaterialId = _rawMaterial.rawMaterialId;
        rawMaterial.date = _rawMaterial.date;
        rawMaterial.purchaseOrderNumber = _rawMaterial.purchaseOrderNumber;
        rawMaterial.customerName = _rawMaterial.customerName;
        rawMaterial.productName = _rawMaterial.productName;
        rawMaterial.glassNumber = _rawMaterial.glassNumber;
        rawMaterial.sprayKollerNumber = _rawMaterial.sprayKollerNumber;
        rawMaterial.coverNumber = _rawMaterial.coverNumber;
        rawMaterial.StickerAndBarcode = _rawMaterial.StickerAndBarcode;
        rawMaterial.cartonOrBoxNumber = _rawMaterial.cartonOrBoxNumber;
        rawMaterial.rawMaterialNote = _rawMaterial.rawMaterialNote;


        console.log("RawMaterial", rawMaterial)
        let response = await this.rawMaterialValidators.CreateRawMaterialEntity(rawMaterial);
        rawMaterial.receiverNote = "";

        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }
        let rawMaterialData: RawMaterialEntity = rawMaterial
        console.log("After Validation", rawMaterialData)
        // return rawMaterial;
        await this.rawMaterialRepository.updateRawMaterialEntityCount("RawMaterial" + mspID)
        return await this.rawMaterialRepository.create(rawMaterialData, "RawMaterial" + mspID);
    }

    /**
  * update Document  first validate the object the passed it to add more attribut and store into blockchain
  * @param rawMaterial 
  * @returns 
  */
    public async receiving(
        rawMaterialId: string,
        receiverNote: string,

    ): Promise<RawMaterialEntity | string> {
        // let location = new Location();
        var response = await this.getRawMaterialDetails(rawMaterialId);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }

        let rawMaterialData: RawMaterialEntity = response;
        rawMaterialData.receiverNote = receiverNote
        response = await this.rawMaterialValidators.update(rawMaterialData);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }
        let mspID = this.rawMaterialRepository.getMSPID();
        return await this.rawMaterialRepository.update(rawMaterialData, "RawMaterial" + mspID);
    }



}
