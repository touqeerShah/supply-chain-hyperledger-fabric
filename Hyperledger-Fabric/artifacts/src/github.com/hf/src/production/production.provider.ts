import { Context } from "fabric-contract-api";
import { ProductionEntity, ProductionEntityCount, ProductionFinishedArg } from "./production.entity";
import { ProductionRepository } from "./production.repository";
import { ProductionEntityValidation } from "./production.validator";
import { BadRequestError } from "../core/eror/bad-request-error";
import { ErrorStatusCode } from "../core/eror/base-error";
export class ProductionProvider {
    private productionRepository: ProductionRepository;
    private productionValidators: ProductionEntityValidation;

    constructor(ctx: Context) {
        this.productionRepository = new ProductionRepository(ctx, ProductionEntity);
        this.productionValidators = new ProductionEntityValidation();
    }
    /**
     * this function check comapny exist or not
     * @param batchesNumber 
     * @returns 
     */
    public async existsProduction(batchesNumber: string): Promise<boolean> {
        const query = {
            batchesNumber: batchesNumber,
        } as ProductionEntity;
        return await this.productionRepository.exists(query);
    }


    /**
     * function return status of production not all details 
     * @paramtransactionId 
     * @returns 
     */
    public async getByQuery(query: string): Promise<any[] | string> {
        let mspID = this.productionRepository.getMSPID();
        var productionData = await this.productionRepository.getDataByQuery(query, "Production" + mspID);
        if (typeof productionData === 'string') {
            // 👇️ myVar has type string here
            return productionData;
        }
        productionData as any[]
        // let productionData: ProductionEntity = response
        return productionData;
    }
    /**
    * This function is  get detials of production
    * @paramtransactionId 
    * @returns 
    */
    public async getProductionDetails(batchesNumber: string): Promise<ProductionEntity | string> {
        const query = {
            batchesNumber: batchesNumber,
        } as ProductionEntity;
        let mspID = this.productionRepository.getMSPID();
        return await this.productionRepository.get(query, "Production" + mspID);
    }

    /**
 * This function is  get detials of production
 * @paramtransactionId 
 * @returns 
 */
    public async getProductionEntityCount(): Promise<ProductionEntityCount | string> {
        let mspID = this.productionRepository.getMSPID();
        return await this.productionRepository.getProductionEntityCount("Production" + mspID);
    }


    /**
     * Create production first validate the object the passed it to add more attribut and store into blockchain
     * @param production 
     * @returns 
     */
    public async CreateProductionEntity(
        _roductionEntity: ProductionEntity): Promise<ProductionEntity | string> {
        // let location = new Location();
        let mspID = this.productionRepository.getMSPID();

        let productionEntity = new ProductionEntity()
        productionEntity.batchesNumber = _roductionEntity.batchesNumber;
        productionEntity.date = _roductionEntity.date;
        productionEntity.productionDepartmentEmployerName = _roductionEntity.productionDepartmentEmployerName;
        productionEntity.warehouseDeptEmployerName = _roductionEntity.warehouseDeptEmployerName;
        productionEntity.productName = _roductionEntity.productName;
        productionEntity.purchaseOrderNumber = _roductionEntity.purchaseOrderNumber;
        productionEntity.customerName = _roductionEntity.customerName;


        console.log("Production", productionEntity)
        let response = await this.productionValidators.CreateProductionEntity(productionEntity);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }
        let productionData: ProductionEntity = productionEntity
        console.log("After Validation", productionData)
        // return production;
        await this.productionRepository.updateProductionEntityCount("Production" + mspID)
        return await this.productionRepository.create(productionData, "Production" + mspID);
    }

    /**
* update Production  first validate the object the passed it to add more attribut and store into blockchain
* @param production 
* @returns 
*/
    public async startProductionDate(
        batchesNumber: string,
        startProductionDate: string,

    ): Promise<ProductionEntity | string> {
        // let location = new Location();
        var response = await this.getProductionDetails(batchesNumber);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }

        let productionData: ProductionEntity = response;
        productionData.startProductionDate = startProductionDate
        response = await this.productionValidators.update(productionData);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }
        let mspID = this.productionRepository.getMSPID();
        return await this.productionRepository.update(productionData, "Production" + mspID);
    }

    /**
  * update Production  first validate the object the passed it to add more attribut and store into blockchain
  * @param production 
  * @returns 
  */
    public async mixTheOil(
        batchesNumber: string,
        mixTheOil: string,
    ): Promise<ProductionEntity | string> {
        // let location = new Location();
        var response = await this.getProductionDetails(batchesNumber);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }

        let productionData: ProductionEntity = response;
        productionData.mixTheOil = mixTheOil
        response = await this.productionValidators.update(productionData);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }
        let mspID = this.productionRepository.getMSPID();
        return await this.productionRepository.update(productionData, "Production" + mspID);
    }

    /**
  * update Production  first validate the object the passed it to add more attribut and store into blockchain
  * @param production 
  * @returns 
  */
    public async fillBottle(
        batchesNumber: string,
        fillBottle: string,

    ): Promise<ProductionEntity | string> {
        // let location = new Location();
        var response = await this.getProductionDetails(batchesNumber);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }

        let productionData: ProductionEntity = response;
        productionData.fillBottle = fillBottle
        response = await this.productionValidators.update(productionData);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }
        let mspID = this.productionRepository.getMSPID();
        return await this.productionRepository.update(productionData, "Production" + mspID);
    }


    /**
  * update Production  first validate the object the passed it to add more attribut and store into blockchain
  * @param production 
  * @returns 
  */
    public async sprayCoileer(
        batchesNumber: string,
        sprayCoileer: string,

    ): Promise<ProductionEntity | string> {
        // let location = new Location();
        var response = await this.getProductionDetails(batchesNumber);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }

        let productionData: ProductionEntity = response;
        productionData.sprayCoileer = sprayCoileer
        response = await this.productionValidators.update(productionData);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }
        let mspID = this.productionRepository.getMSPID();
        return await this.productionRepository.update(productionData, "Production" + mspID);
    }


    /**
* update Production  first validate the object the passed it to add more attribut and store into blockchain
* @param production 
* @returns 
*/
    public async finishProduct(
        productionFinishedArg: ProductionFinishedArg,

    ): Promise<ProductionEntity | string> {
        // let location = new Location();
        var response = await this.getProductionDetails(productionFinishedArg.batchesNumber);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }

        let productionData: ProductionEntity = response;
        productionData.startProductionDate = productionFinishedArg.startProductionDate
        productionData.mixTheOil = productionFinishedArg.mixTheOil
        productionData.fillBottle = productionFinishedArg.fillBottle
        productionData.sprayCoileer = productionFinishedArg.sprayCoileer

        productionData.barcode = productionFinishedArg.barcode
        productionData.batchSize = productionFinishedArg.batchSize
        productionData.isComplete = productionFinishedArg.isComplete
        productionData.mfgDate = productionFinishedArg.mfgDate
        productionData.expDate = productionFinishedArg.expDate
        productionData.issuedByDate = productionFinishedArg.issuedByDate
        productionData.QAckhDate = productionFinishedArg.QAckhDate

        response = await this.productionValidators.update(productionData);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }
        let mspID = this.productionRepository.getMSPID();
        return await this.productionRepository.update(productionData, "Production" + mspID);
    }



}
