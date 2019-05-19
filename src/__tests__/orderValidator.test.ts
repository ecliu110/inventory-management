import * as fs from 'fs';
import { resolve } from 'path';
import { OrdersValidator } from '../validators/orders.validator';

const readFile = function(fpath: string) {
  return fs.readFileSync(
    resolve('./src/__tests__/', fpath), 'utf-8'
  );
};

test('Orders: extra fields are ignored', () => {
  const orders = OrdersValidator.validateJson(
    readFile('./fixtures/validator/extraFieldOrders.json')
  );
  expect(orders).toBeDefined();
  expect(orders.length).toBe(2);
});

test('Orders: missing required fields', () => {
  const validate = () => {
    OrdersValidator.validateJson(
      readFile('./fixtures/validator/missingFieldOrders.json')
    );
  };
  expect(validate).toThrow(Error);
});

test('Orders: item_quantity is not an integer', () => {
  const validate = () => {
    OrdersValidator.validateJson(
      readFile('./fixtures/validator/wrongFieldTypeOrders.json')
    );
  };
  expect(validate).toThrow(Error);
});