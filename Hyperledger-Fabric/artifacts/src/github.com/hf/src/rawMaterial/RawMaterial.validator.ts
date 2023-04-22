import { RawMaterialEntity } from "./RawMaterial.entity";
import * as Joi from 'joi';
import { BadRequestError } from "../core/eror/bad-request-error";
import { ErrorStatusCode } from "../core/eror/base-error";

// here we will do validation on lot creation and update to verify the data object it valid
export class RawMaterialEntityValidation {
  public async CreateRawMaterialEntity(lot: RawMaterialEntity): Promise<RawMaterialEntity | string> {

    const schema = Joi.object().keys({
      rawMaterialId: Joi.string().required(),
      date: Joi.string().required(),
      purchaseOrderNumber: Joi.string().required(),
      customerName: Joi.string().required(),
      productName: Joi.string().required(),
      glassNumber: Joi.string().required(),
      sprayKollerNumber: Joi.string().required(),
      coverNumber: Joi.string().required(),
      StickerAndBarcode: Joi.string().required(),
      cartonOrBoxNumber: Joi.string().required(),
      rawMaterialNote: Joi.string().required(),
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
  public async update(lot: RawMaterialEntity): Promise<RawMaterialEntity | string> {
    const schema = Joi.object().keys({
      rawMaterialId: Joi.string().required(),
      date: Joi.string().required(),
      purchaseOrderNumber: Joi.string().required(),
      customerName: Joi.string().required(),
      productName: Joi.string().required(),
      glassNumber: Joi.string().required(),
      sprayKollerNumber: Joi.string().required(),
      coverNumber: Joi.string().required(),
      StickerAndBarcode: Joi.string().required(),
      cartonOrBoxNumber: Joi.string().required(),
      rawMaterialNote: Joi.string().required(),
      receiverNote: Joi.string().required(),
    })

    try {
      const value = await schema.validateAsync(lot, { allowUnknown: true })
      return value
    } catch (ex) {
      return BadRequestError.throw(`ValidationError: ${ex.message} at ${this.constructor.name}`, ErrorStatusCode.badRequest);
    }
  }

}