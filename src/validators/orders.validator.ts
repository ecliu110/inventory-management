const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);

export class OrdersValidator {
  public static order = Joi.object().keys({
    order_id: [Joi.string().required(), Joi.number().required()],
    customer_id: [Joi.string().required(), Joi.number().required()],
    order_date: Joi.date(),
    item_ordered: Joi.string().required(),
    item_quantity: Joi.number().integer().min(0).required(),
    item_price: Joi.number().required(),
  }).unknown(true);

  public static validator = Joi.array().items(OrdersValidator.order);

  public static validateJson(json: string) {
    const { error, value } = Joi.validate(
      json,
      OrdersValidator.validator
    );
    if (error) throw error;
    return value;
  }
}