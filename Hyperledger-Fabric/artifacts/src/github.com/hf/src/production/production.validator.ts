import { ProductionEntity } from "./production.entity";
import * as Joi from 'joi';
import { BadRequestError } from "../core/eror/bad-request-error";
import { ErrorStatusCode } from "../core/eror/base-error";

// here we will do validation on lot creation and update to verify the data object it valid
export class ProductionEntityValidation {
  public async CreateProductionEntity(lot: ProductionEntity): Promise<ProductionEntity | string> {

    const schema = Joi.object().keys({
      batchesNumber: Joi.string().required(),
      date: Joi.string().required(),
      productionDepartmentEmployerName: Joi.string().required(),
      warehouseDeptEmployerName: Joi.string().required(),
      purchaseOrderNumber: Joi.string().required(),
      customerName: Joi.string().required(),
      productName: Joi.string().required(),
    })

    try {
      const value = await schema.validateAsync(lot)
      console.log("end createLot ", value);
      console.log("end createLot ", value);

      return value
    } catch (ex) {
      return BadRequestError.throw(`ValidationError: ${ex.message} at ${this.constructor.name}`, ErrorStatusCode.badRequest);
    }
  }
  public async update(lot: ProductionEntity): Promise<ProductionEntity | string> {
    const schema = Joi.object().keys({
      batchesNumber: Joi.string().required(),
      date: Joi.string().required(),
      productionDepartmentEmployerName: Joi.string().required(),
      warehouseDeptEmployerName: Joi.string().required(),
      purchaseOrderNumber: Joi.string().required(),
      customerName: Joi.string().required(),
      productName: Joi.string().required(),
    })

    try {
      const value = await schema.validateAsync(lot, { allowUnknown: true })
      return value
    } catch (ex) {
      return BadRequestError.throw(`ValidationError: ${ex.message} at ${this.constructor.name}`, ErrorStatusCode.badRequest);
    }
  }

}