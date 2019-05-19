const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);

export class RestocksValidator {
  public static restock = Joi.object().keys({
    restock_date: Joi.date().required(),
    item_stocked: Joi.string().required(),
    manufacturer: Joi.string().required(),
    item_quantity: Joi.number().integer().min(0).required(),
    wholesale_price: Joi.number().required(),
  }).unknown(true);

  public static validator = Joi.array().items(RestocksValidator.restock);

  public static validateJson(json: string) {
    const { error, value } = Joi.validate(
      json,
      RestocksValidator.validator
    );
    if (error) throw error;
    return value;
  }
}