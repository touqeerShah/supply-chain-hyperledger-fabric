import { Context } from "fabric-contract-api";
import { ContextProvider } from "../context/context.provider";
import { BadRequestError } from "../eror/bad-request-error";
import { NotFoundError } from "../eror/not-found-error";
import { ErrorStatusCode } from "../eror/base-error"
import { CustomerEntity, CustomerEntityCount } from "../../customer/customer.entity";

// const crypto = require('crypto')
import * as crypto from 'crypto';


/**
 * This is wraper class for blockchain function  
 */
export class BaseRepository<T extends CustomerEntity> {
    private contextProvider: ContextProvider;

    constructor(ctx: Context, private type: new () => T) {
        this.contextProvider = new ContextProvider(ctx);
    }

    /**
     * exists is fucntion for check record 
     * @param query 
     * @returns 
     */
    public async exists(query: T): Promise<boolean> {
        const key = this.getKey(query);
        const mspID = this.contextProvider.getTxMSPID();
        const bufferData = await this.contextProvider.get(key, "Customer" + mspID);
        return !!bufferData && bufferData.length > 0;
    }

    /**
      * this fucntion will add extra values to transaction when it is going to create which are more common which should add into
      * transction before add into blockchain
      */
    public async getCustomerEntityCount(privateCollection: string): Promise<CustomerEntityCount> {
        const bufferData = await this.contextProvider.get("customerCount", privateCollection);
        if (bufferData.length === 0) {
            return { count: 0 }

        }
        console.log("bufferData.toString()", bufferData, bufferData.toString());

        const documentCount: CustomerEntityCount =
            bufferData.length !== 0 ? JSON.parse(bufferData.toString()) : null;

        return documentCount;
    }
    /**
   * this fucntion will add extra values to transaction when it is going to create which are more common which should add into
   * transction before add into blockchain
   */
    public async updateCustomerEntityCount(privateCollection: string) {
        let documentCount: CustomerEntityCount = await this.getCustomerEntityCount(privateCollection);

        documentCount.count++

        // const documentCount: ProductionEntityCount = JSON.parse(bufferData.toString())
        let buffer = Buffer.from(JSON.stringify(documentCount));
        console.log("buffer 2", documentCount);

        // here we call function to put data into blockchain
        await this.contextProvider.put("customerCount", buffer, privateCollection);

    }

    public async get(query: T, privateCollection: string): Promise<T | string> {
        const key = this.getKey(query);

        const bufferData = await this.contextProvider.get(key, privateCollection);

        if (bufferData.length === 0) {
            var error = BadRequestError.throw(
                `Record Not Found with id ${key}: ${ErrorStatusCode.notFound}`, ErrorStatusCode.notFound
            );
            return error;
        }
        const document: T =
            bufferData.length !== 0 ? JSON.parse(bufferData.toString()) : null;

        return this.instanceOf(document);
    }

    public async getDataByQuery(query: string, privateCollection: string): Promise<any[] | string> {

        const data = await this.contextProvider.getByQuery(query, privateCollection);

        if (data.length === 0) {
            var error = BadRequestError.throw(
                `Record Not Found with id ${query}: ${ErrorStatusCode.notFound}`, ErrorStatusCode.notFound
            );
            return error;
        }
        return data;
    }
    /**
     * this will return mspID
     * @returns 
     */
    public getMSPID() {
        const mspID = this.contextProvider.getTxMSPID();
        return mspID;
    }

    /**
     * this will help as to get values form certificate attibute
     * @param query 
     * @returns 
     */
    public getAttributeValue(query: string) {
        return this.contextProvider.getTxAttributeValue(query);
    }
    /**
     * this fucntion will add extra values to transaction when it is going to create which are more common which should add into
     * transction before add into blockchain
     */
    public async create(data: T, privateCollection: string): Promise<T | string> {
        // throw error if wallet with this id already exists
        if (await this.exists(data)) {
            var error = BadRequestError.throw(
                `Collection data already exists with key Id: ${this.getKey(
                    data
                )}`, ErrorStatusCode.badRequest
            );
            return error;
        }

        // create wallet object
        // console.log(this.getCollection());

        const document = this.instanceOf(data);
        // document.collection = this.getCollection(); 
        // here we add extra attribute
        document.createdBy = this.contextProvider.getTxAttributeValue("userid");
        document.createdAt = this.contextProvider.getTxTimestamp();
        document.updatedAt = "";
        document.updatedBy = ""
        document.txID = this.contextProvider.getTxID();

        // put document into db
        const key = this.getKey(data);
        // here we call function to put data into blockchain
        await this.contextProvider.put(key, document.toBuffer(), privateCollection);

        return document;
    }

    public updatedAt(): string {
        return this.contextProvider.getTxTimestamp();
    }

    public updatedBy(): string {
        return this.contextProvider.getTxAttributeValue("userid");
    }

    public txID(): string {
        return this.contextProvider.getTxID();
    }
    protected instanceOf(data: T) {
        const instance = new this.type();
        instance.init(data);
        return instance;
    }

    protected getKey(data: T): string {
        return `${data.customerId}`;
    }
    protected getCollection() {
        return this.constructor.name.split("Repository")[0];
    }
}
