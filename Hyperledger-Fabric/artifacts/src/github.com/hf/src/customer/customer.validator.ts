import { CustomerEntity } from "./customer.entity";
import * as Joi from 'joi';
import { BadRequestError } from "../core/eror/bad-request-error";
import { ErrorStatusCode } from "../core/eror/base-error";

// here we will do validation on user creation and update to verify the data object it valid
export class CustomerValidators {
  public async createUserRecord(user: CustomerEntity): Promise<CustomerEntity | string> {
    console.log("start createLot ", user);

    const schema = Joi.object().keys({
      customerId: Joi.string().required(),
      name: Joi.string().required(),
      date: Joi.string().required(),
      price: Joi.string().required(),
      deliveryData: Joi.string().required(),
      quantity: Joi.string().required(),
      status: Joi.string().required(),
    })

    try {
      const value = await schema.validateAsync(user)
      console.log("end createLot ", value);
      console.log("end createLot ", value);

      return value
    } catch (ex) {
      return BadRequestError.throw(`ValidationError: ${ex.message} at ${this.constructor.name}`, ErrorStatusCode.badRequest);
    }
  }

}