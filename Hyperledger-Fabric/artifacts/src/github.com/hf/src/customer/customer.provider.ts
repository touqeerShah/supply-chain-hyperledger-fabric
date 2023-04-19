import { Context } from "fabric-contract-api";
import { CustomerEntity, CustomerEntityCount } from "./customer.entity";
import { CreateCustomerArg } from "./customer.interface";

import { userVerificationRepository } from "./customer.repository";
import { CustomerValidators } from "./customer.validator";
import { BadRequestError } from "../core/eror/bad-request-error";
import { ErrorStatusCode } from "../core/eror/base-error";
export class CustomerProvider {
    private userRepository: userVerificationRepository;
    private userValidators: CustomerValidators;

    constructor(ctx: Context) {
        this.userRepository = new userVerificationRepository(ctx, CustomerEntity);
        this.userValidators = new CustomerValidators();
    }
    /**
     * this function check comapny exist or not
     * @param customerId 
     * @returns 
     */
    public async customerExists(customerId: string): Promise<boolean> {
        const query = {
            customerId: customerId,
        } as CustomerEntity;
        return await this.userRepository.exists(query);
    }

    /**
     * function return status of user not all details 
     * @paramtransactionId 
     * @returns 
     */
    public async getCustomerStatus(customerId: string): Promise<string> {
        const query = {
            customerId: customerId,
        } as CustomerEntity;
        let mspID = this.userRepository.getMSPID();
        var response = await this.userRepository.get(query, "UserVerification" + mspID);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }
        let lotData: CustomerEntity = response
        return lotData.status;
    }

    /**
    * This function is  get detials of user
    * @paramtransactionId 
    * @returns 
    */
    public async getCustomerDetails(customerId: string): Promise<CustomerEntity | string> {
        const query = {
            customerId: customerId,
        } as CustomerEntity;
        let mspID = this.userRepository.getMSPID();
        return await this.userRepository.get(query, "Customer" + mspID);

    }


    /**
 * This function is  get detials of production
 * @paramtransactionId 
 * @returns 
 */
    public async getCustomerEntityCount(): Promise<CustomerEntityCount | string> {
        let mspID = this.userRepository.getMSPID();
        return await this.userRepository.getCustomerEntityCount("Customer" + mspID);
    }
    /**
* This function is  get detials of production
* @paramtransactionId 
* @returns 
*/
    public async updateCustomerEntityCount() {
        let mspID = this.userRepository.getMSPID();
        return await this.userRepository.updateCustomerEntityCount("Customer" + mspID);
    }
    /**
      * function return status of document not all details 
      * @paramtransactionId 
      * @returns 
      */
    public async getByQuery(query: string): Promise<any[] | string> {
        let mspID = this.userRepository.getMSPID();
        var documentData = await this.userRepository.getDataByQuery(query, "Customer" + mspID);
        if (typeof documentData === 'string') {
            // 👇️ myVar has type string here
            return documentData;
        }
        documentData as any[]
        // let documentData: CustomerEntity = response
        return documentData;
    }

    /**
     * Create user first validate the object the passed it to add more attribut and store into blockchain
     * @param user 
     * @returns 
     */
    public async createCustomer(createCustomerArg: CreateCustomerArg): Promise<CustomerEntity | string> {
        // let location = new Location();
        let user = new CustomerEntity()
        user.customerId = createCustomerArg.customerId;
        user.name = createCustomerArg.name;
        user.date = createCustomerArg.date;
        user.price = createCustomerArg.price;
        user.deliveryData = createCustomerArg.deliveryData;
        user.quantity = createCustomerArg.quantity;
        user.status = "Active"
        console.log("user", user)
        let response = await this.userValidators.createUserRecord(user);
        if (typeof response === 'string') {
            // 👇️ myVar has type string here
            return response;
        }
        let lotData: CustomerEntity = user
        console.log("After Validation", lotData)
        let mspID = this.userRepository.getMSPID();
        // return user;
        await this.userRepository.updateCustomerEntityCount("Customer" + mspID)
        return await this.userRepository.create(lotData, "Customer" + mspID);
    }


}
