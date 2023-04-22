/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { promises } from "dns";
import {
    Context,
    Contract,
    Info,
    Returns,
    Transaction,
} from "fabric-contract-api";
import { Configs } from "./configs";
import { ContextProvider } from "./core/context/context.provider";
import { BadRequestError } from "./core/eror/bad-request-error";
import { ErrorStatusCode } from "./core/eror/base-error"
import { CustomerEntity, CustomerEntityCount } from "./customer/customer.entity";
import { CreateCustomerArg } from "./customer/customer.interface"
import { CustomerProvider } from "./customer/customer.provider";

import { RawMaterialEntity, RawMaterialEntityCount, RecevingArg } from "./rawMaterial/RawMaterial.entity";
import { RawMaterialProvider } from "./rawMaterial/RawMaterial.provider";
import { ProductionEntity, ProductionEntityCount, ProductionFinishedArg, ProductionTransactionArg } from "./production/production.entity";
import { ProductionProvider } from "./production/production.provider";


@Info({ title: "HFContract", description: "HFContract" })
export class HFContract extends Contract {

    /**
        * this function is get details of site
        * siteObject = '{"siteid":"pharmaTrace_786"}'
        * @param ctx 
        * @param userObject  object contain site id
        * @returns 
        */
    @Transaction()
    public async getRawMaterialEntityCount(
        ctx: Context,
    ): Promise<RawMaterialEntityCount | string> {

        const documentProvider = new RawMaterialProvider(ctx); // create object provider
        let requestJson = await documentProvider.getRawMaterialEntityCount();
        if (typeof requestJson === 'string') {
            // 👇️ myVar has type string here
            return requestJson;
        }
        return requestJson;
    }
    /**
     * this function is get details of site
     * siteObject = '{"siteid":"pharmaTrace_786"}'
     * @param ctx 
     * @param userObject  object contain site id
     * @returns 
     */
    @Transaction()
    public async existsRawMaterial(
        ctx: Context,
        userObject: string,
    ): Promise<boolean | string> {
        let requestJson = JSON.parse(userObject);

        const documentProvider = new RawMaterialProvider(ctx); // create object provider
        requestJson = await documentProvider.existsRawMaterial(requestJson.rawMaterialId);
        if (typeof requestJson === 'string') {
            // 👇️ myVar has type string here
            return requestJson;
        }
        return requestJson;
    }



    /**
   * this function is get details of site
   * siteObject = '{"siteid":"pharmaTrace_786"}'
   * @param ctx 
   * @param userObject  object contain site id
   * @returns 
   */
    @Transaction()
    public async getRawMaterialDetails(
        ctx: Context,
        userObject: string,
    ): Promise<RawMaterialEntity | string> {
        let requestJson = JSON.parse(userObject);

        const documentProvider = new RawMaterialProvider(ctx); // create object provider
        requestJson = await documentProvider.getRawMaterialDetails(requestJson.rawMaterialId);
        if (typeof requestJson === 'string') {
            // 👇️ myVar has type string here
            return requestJson;
        }
        return requestJson;
    }


    /**
     * this function is get details of site
     * siteObject = '{"siteid":"pharmaTrace_786"}'
     * @param ctx 
     * @param siteObject  object contain site id
     * @returns 
     */
    @Transaction()
    public async getRawMaterialByQuery(
        ctx: Context,
        siteObject: string,
    ): Promise<any[] | string> {
        let requestJson = JSON.parse(siteObject);

        const documentProvider = new RawMaterialProvider(ctx); // create object provider
        requestJson = await documentProvider.getByQuery(requestJson.query);
        if (typeof requestJson === 'string') {
            // 👇️ myVar has type string here
            return requestJson;
        }



        let lotData: any[] = requestJson

        return lotData;
    }


    // This fucntion will use to create lot object into blockchain which details will filled in feture
    // var requestString = 
    // above is the example is for required parameter
    @Transaction()
    public async createRawMaterial(
        ctx: Context,
        requestString: string
    ): Promise<RawMaterialEntity | string> {
        let requestJson: RawMaterialEntity
        try {
            requestJson = JSON.parse(requestString); // convert json string into json

        } catch (error) {
            error = BadRequestError.throw(`Object Not valid`, ErrorStatusCode.badRequest);
            return error;
        }
        // provider is class which will get the argument and call different funcution on that argument like validate the argument and put them into blockchain
        const documentProvider = new RawMaterialProvider(ctx); // create object provider

        console.log("before", requestJson);
        let creationResponse = await documentProvider.createRawMaterial(
            requestJson
        );
        console.log("requestJson", creationResponse);

        if (typeof creationResponse === 'string') {
            // 👇️ myVar has type string here
            return creationResponse;
        }
        let userEntity: RawMaterialEntity = creationResponse
        const eventData = { userEntity: [userEntity] }; // create event on scuccessfull record data into blockchain
        const contextProvider = new ContextProvider(ctx);
        contextProvider.raiseEvent(Configs.events.addSignatureDocument, eventData);

        return userEntity;
    }


    // This fucntion will use to create lot object into blockchain which details will filled in feture
    // var requestString = 
    // above is the example is for required parameter
    @Transaction()
    public async receiving(
        ctx: Context,
        requestString: string
    ): Promise<RawMaterialEntity | string> {
        let requestJson: RecevingArg
        try {
            requestJson = JSON.parse(requestString); // convert json string into json

        } catch (error) {
            error = BadRequestError.throw(`Object Not valid`, ErrorStatusCode.badRequest);
            return error;
        }
        // provider is class which will get the argument and call different funcution on that argument like validate the argument and put them into blockchain
        const documentProvider = new RawMaterialProvider(ctx); // create object provider

        console.log("before", requestJson);
        let creationResponse = await documentProvider.receiving(
            requestJson.rawMaterialId,
            requestJson.receiverNote,
        );
        console.log("requestJson", creationResponse);

        if (typeof creationResponse === 'string') {
            // 👇️ myVar has type string here
            return creationResponse;
        }
        let userEntity: RawMaterialEntity = creationResponse
        const eventData = { userEntity: [userEntity] }; // create event on scuccessfull record data into blockchain
        const contextProvider = new ContextProvider(ctx);
        contextProvider.raiseEvent(Configs.events.addSignatureDocument, eventData);

        return userEntity;
    }


    // This fucntion will use to create lot object into blockchain which details will filled in feture
    // var requestString = 
    // above is the example is for required parameter
    @Transaction()
    public async createProductionEntity(
        ctx: Context,
        requestString: string
    ): Promise<ProductionEntity | string> {
        let requestJson: ProductionEntity
        try {
            requestJson = JSON.parse(requestString); // convert json string into json

        } catch (error) {
            error = BadRequestError.throw(`Object Not valid`, ErrorStatusCode.badRequest);
            return error;
        }
        // provider is class which will get the argument and call different funcution on that argument like validate the argument and put them into blockchain
        const documentProvider = new ProductionProvider(ctx); // create object provider

        console.log("before", requestJson);
        let creationResponse = await documentProvider.CreateProductionEntity(
            requestJson);
        console.log("requestJson", creationResponse);

        if (typeof creationResponse === 'string') {
            // 👇️ myVar has type string here
            return creationResponse;
        }
        let userEntity: ProductionEntity = creationResponse
        const eventData = { userEntity: [userEntity] }; // create event on scuccessfull record data into blockchain
        const contextProvider = new ContextProvider(ctx);
        contextProvider.raiseEvent(Configs.events.documentCreation, eventData);

        return userEntity;
    }


    // This fucntion will use to create lot object into blockchain which details will filled in feture
    // var requestString = 
    // above is the example is for required parameter
    @Transaction()
    public async startProductionDate(
        ctx: Context,
        requestString: string
    ): Promise<ProductionEntity | string> {
        let requestJson: ProductionTransactionArg
        try {
            requestJson = JSON.parse(requestString); // convert json string into json

        } catch (error) {
            error = BadRequestError.throw(`Object Not valid`, ErrorStatusCode.badRequest);
            return error;
        }
        // provider is class which will get the argument and call different funcution on that argument like validate the argument and put them into blockchain
        const userVerificationRequestProvider = new ProductionProvider(ctx); // create object provider

        console.log("before", requestJson);
        let creationResponse = await userVerificationRequestProvider.startProductionDate(
            requestJson.batchesNumber, requestJson.date
        );
        console.log("requestJson", creationResponse);

        if (typeof creationResponse === 'string') {
            // 👇️ myVar has type string here
            return creationResponse;
        }
        let userEntity: ProductionEntity = creationResponse
        const eventData = { userEntity: [userEntity] }; // create event on scuccessfull record data into blockchain
        const contextProvider = new ContextProvider(ctx);
        contextProvider.raiseEvent(Configs.events.createVerificationRecord, eventData);

        return userEntity;
    }

    // This fucntion will use to create lot object into blockchain which details will filled in feture
    // var requestString = 
    // above is the example is for required parameter
    @Transaction()
    public async mixTheOil(
        ctx: Context,
        requestString: string
    ): Promise<ProductionEntity | string> {
        let requestJson: ProductionTransactionArg
        try {
            requestJson = JSON.parse(requestString); // convert json string into json

        } catch (error) {
            error = BadRequestError.throw(`Object Not valid`, ErrorStatusCode.badRequest);
            return error;
        }
        // provider is class which will get the argument and call different funcution on that argument like validate the argument and put them into blockchain
        const userVerificationRequestProvider = new ProductionProvider(ctx); // create object provider

        console.log("before", requestJson);
        let creationResponse = await userVerificationRequestProvider.mixTheOil(
            requestJson.batchesNumber, requestJson.date
        );
        console.log("requestJson", creationResponse);

        if (typeof creationResponse === 'string') {
            // 👇️ myVar has type string here
            return creationResponse;
        }
        let userEntity: ProductionEntity = creationResponse
        const eventData = { userEntity: [userEntity] }; // create event on scuccessfull record data into blockchain
        const contextProvider = new ContextProvider(ctx);
        contextProvider.raiseEvent(Configs.events.createVerificationRecord, eventData);

        return userEntity;
    }// This fucntion will use to create lot object into blockchain which details will filled in feture
    // var requestString = 
    // above is the example is for required parameter
    @Transaction()
    public async fillBottle(
        ctx: Context,
        requestString: string
    ): Promise<ProductionEntity | string> {
        let requestJson: ProductionTransactionArg
        try {
            requestJson = JSON.parse(requestString); // convert json string into json

        } catch (error) {
            error = BadRequestError.throw(`Object Not valid`, ErrorStatusCode.badRequest);
            return error;
        }
        // provider is class which will get the argument and call different funcution on that argument like validate the argument and put them into blockchain
        const userVerificationRequestProvider = new ProductionProvider(ctx); // create object provider

        console.log("before", requestJson);
        let creationResponse = await userVerificationRequestProvider.fillBottle(
            requestJson.batchesNumber, requestJson.date
        );
        console.log("requestJson", creationResponse);

        if (typeof creationResponse === 'string') {
            // 👇️ myVar has type string here
            return creationResponse;
        }
        let userEntity: ProductionEntity = creationResponse
        const eventData = { userEntity: [userEntity] }; // create event on scuccessfull record data into blockchain
        const contextProvider = new ContextProvider(ctx);
        contextProvider.raiseEvent(Configs.events.createVerificationRecord, eventData);

        return userEntity;
    }
    // This fucntion will use to create lot object into blockchain which details will filled in feture
    // var requestString = 
    // above is the example is for required parameter
    @Transaction()
    public async sprayCoileer(
        ctx: Context,
        requestString: string
    ): Promise<ProductionEntity | string> {
        let requestJson: ProductionTransactionArg
        try {
            requestJson = JSON.parse(requestString); // convert json string into json

        } catch (error) {
            error = BadRequestError.throw(`Object Not valid`, ErrorStatusCode.badRequest);
            return error;
        }
        // provider is class which will get the argument and call different funcution on that argument like validate the argument and put them into blockchain
        const userVerificationRequestProvider = new ProductionProvider(ctx); // create object provider

        console.log("before", requestJson);
        let creationResponse = await userVerificationRequestProvider.sprayCoileer(
            requestJson.batchesNumber, requestJson.date
        );
        console.log("requestJson", creationResponse);

        if (typeof creationResponse === 'string') {
            // 👇️ myVar has type string here
            return creationResponse;
        }
        let userEntity: ProductionEntity = creationResponse
        const eventData = { userEntity: [userEntity] }; // create event on scuccessfull record data into blockchain
        const contextProvider = new ContextProvider(ctx);
        contextProvider.raiseEvent(Configs.events.createVerificationRecord, eventData);

        return userEntity;
    }

    // This fucntion will use to create lot object into blockchain which details will filled in feture
    // var requestString = 
    // above is the example is for required parameter
    @Transaction()
    public async finishProduct(
        ctx: Context,
        requestString: string
    ): Promise<ProductionEntity | string> {
        let requestJson: ProductionFinishedArg
        try {
            requestJson = JSON.parse(requestString); // convert json string into json

        } catch (error) {
            error = BadRequestError.throw(`Object Not valid`, ErrorStatusCode.badRequest);
            return error;
        }
        // provider is class which will get the argument and call different funcution on that argument like validate the argument and put them into blockchain
        const userVerificationRequestProvider = new ProductionProvider(ctx); // create object provider

        console.log("before", requestJson);
        let creationResponse = await userVerificationRequestProvider.finishProduct(
            requestJson
        );
        console.log("requestJson", creationResponse);

        if (typeof creationResponse === 'string') {
            // 👇️ myVar has type string here
            return creationResponse;
        }
        let userEntity: ProductionEntity = creationResponse
        const eventData = { userEntity: [userEntity] }; // create event on scuccessfull record data into blockchain
        const contextProvider = new ContextProvider(ctx);
        contextProvider.raiseEvent(Configs.events.createVerificationRecord, eventData);

        return userEntity;
    }



    /**
      * this function is get details of site
      * siteObject = '{"siteid":"pharmaTrace_786"}'
      * @param ctx 
      * @param userObject  object contain site id
      * @returns 
      */
    @Transaction()
    public async getProductionEntityCount(
        ctx: Context,
    ): Promise<ProductionEntityCount | string> {

        const documentProvider = new ProductionProvider(ctx); // create object provider
        let requestJson = await documentProvider.getProductionEntityCount();
        if (typeof requestJson === 'string') {
            // 👇️ myVar has type string here
            return requestJson;
        }
        return requestJson;
    }
    /**
     * this function is get details of site
     * siteObject = '{"siteid":"pharmaTrace_786"}'
     * @param ctx 
     * @param userObject  object contain site id
     * @returns 
     */
    @Transaction()
    public async existsProduction(
        ctx: Context,
        userObject: string,
    ): Promise<boolean | string> {
        let requestJson = JSON.parse(userObject);

        const documentProvider = new ProductionProvider(ctx); // create object provider
        requestJson = await documentProvider.existsProduction(requestJson.batchesNumber);
        if (typeof requestJson === 'string') {
            // 👇️ myVar has type string here
            return requestJson;
        }
        return requestJson;
    }



    /**
   * this function is get details of site
   * siteObject = '{"siteid":"pharmaTrace_786"}'
   * @param ctx 
   * @param userObject  object contain site id
   * @returns 
   */
    @Transaction()
    public async getProductionDetails(
        ctx: Context,
        userObject: string,
    ): Promise<RawMaterialEntity | string> {
        let requestJson = JSON.parse(userObject);

        const documentProvider = new ProductionProvider(ctx); // create object provider
        requestJson = await documentProvider.getProductionDetails(requestJson.batchesNumber);
        if (typeof requestJson === 'string') {
            // 👇️ myVar has type string here
            return requestJson;
        }
        return requestJson;
    }


    /**
     * this function is get details of site
     * siteObject = '{"siteid":"pharmaTrace_786"}'
     * @param ctx 
     * @param siteObject  object contain site id
     * @returns 
     */
    @Transaction()
    public async getProductionByQuery(
        ctx: Context,
        siteObject: string,
    ): Promise<any[] | string> {
        let requestJson = JSON.parse(siteObject);

        const documentProvider = new ProductionProvider(ctx); // create object provider
        requestJson = await documentProvider.getByQuery(requestJson.query);
        if (typeof requestJson === 'string') {
            // 👇️ myVar has type string here
            return requestJson;
        }



        let lotData: any[] = requestJson

        return lotData;
    }

    // customer
    /**
        * this function is get details of site
        * siteObject = '{"siteid":"pharmaTrace_786"}'
        * @param ctx 
        * @param userObject  object contain site id
        * @returns 
        */
    @Transaction()
    public async getCustomerEntityCount(
        ctx: Context,
    ): Promise<CustomerEntityCount | string> {

        const documentProvider = new CustomerProvider(ctx); // create object provider
        let requestJson = await documentProvider.getCustomerEntityCount();
        if (typeof requestJson === 'string') {
            // 👇️ myVar has type string here
            return requestJson;
        }
        return requestJson;
    }
    /**
    * this function is get details of site
    * siteObject = '{"siteid":"pharmaTrace_786"}'
    * @param ctx 
    * @param userObject  object contain site id
    * @returns 
    */
    @Transaction()
    public async updateCustomerEntityCount(
        ctx: Context,
    ) {

        const documentProvider = new CustomerProvider(ctx); // create object provider
        let requestJson = await documentProvider.updateCustomerEntityCount();

    }
    /**
     * this function is get details of site
     * siteObject = '{"siteid":"pharmaTrace_786"}'
     * @param ctx 
     * @param userObject  object contain site id
     * @returns 
     */
    @Transaction()
    public async customerExists(
        ctx: Context,
        userObject: string,
    ): Promise<boolean | string> {
        let requestJson = JSON.parse(userObject);

        const documentProvider = new CustomerProvider(ctx); // create object provider
        requestJson = await documentProvider.customerExists(requestJson.customerId);
        if (typeof requestJson === 'string') {
            // 👇️ myVar has type string here
            return requestJson;
        }
        return requestJson;
    }



    /**
   * this function is get details of site
   * siteObject = '{"siteid":"pharmaTrace_786"}'
   * @param ctx 
   * @param userObject  object contain site id
   * @returns 
   */
    @Transaction()
    public async getCustomerDetails(
        ctx: Context,
        userObject: string,
    ): Promise<RawMaterialEntity | string> {
        let requestJson = JSON.parse(userObject);

        const documentProvider = new CustomerProvider(ctx); // create object provider
        requestJson = await documentProvider.getCustomerDetails(requestJson.customerId);
        if (typeof requestJson === 'string') {
            // 👇️ myVar has type string here
            return requestJson;
        }
        return requestJson;
    }


    /**
     * this function is get details of site
     * siteObject = '{"siteid":"pharmaTrace_786"}'
     * @param ctx 
     * @param siteObject  object contain site id
     * @returns 
     */
    @Transaction()
    public async getCustomerByQuery(
        ctx: Context,
        siteObject: string,
    ): Promise<any[] | string> {
        let requestJson = JSON.parse(siteObject);

        const documentProvider = new CustomerProvider(ctx); // create object provider
        requestJson = await documentProvider.getByQuery(requestJson.query);
        if (typeof requestJson === 'string') {
            // 👇️ myVar has type string here
            return requestJson;
        }



        let lotData: any[] = requestJson

        return lotData;
    }


    // This fucntion will use to create lot object into blockchain which details will filled in feture
    // var requestString = 
    // above is the example is for required parameter
    @Transaction()
    public async createCustomer(
        ctx: Context,
        requestString: string
    ): Promise<CustomerEntity | string> {
        let requestJson: CreateCustomerArg
        try {
            requestJson = JSON.parse(requestString); // convert json string into json

        } catch (error) {
            error = BadRequestError.throw(`Object Not valid`, ErrorStatusCode.badRequest);
            return error;
        }
        // provider is class which will get the argument and call different funcution on that argument like validate the argument and put them into blockchain
        const documentProvider = new CustomerProvider(ctx); // create object provider

        console.log("before", requestJson);
        let creationResponse = await documentProvider.createCustomer(
            requestJson
        );
        console.log("requestJson", creationResponse);

        if (typeof creationResponse === 'string') {
            // 👇️ myVar has type string here
            return creationResponse;
        }
        let userEntity: CustomerEntity = creationResponse
        const eventData = { userEntity: [userEntity] }; // create event on scuccessfull record data into blockchain
        const contextProvider = new ContextProvider(ctx);
        contextProvider.raiseEvent(Configs.events.addSignatureDocument, eventData);

        return userEntity;
    }
}
