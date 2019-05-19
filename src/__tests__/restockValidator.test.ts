import * as fs from 'fs';
import { resolve } from 'path';
import { RestocksValidator } from '../validators/restocks.validator';

const readFile = function(fpath: string) {
  return fs.readFileSync(
    resolve('./src/__tests__/', fpath), 'utf-8'
  );
};

test('Restocks: extra fields are ignored', () => {
  const orders = RestocksValidator.validateJson(
    readFile('./fixtures/validator/extraFieldRestocks.json')
  );
  expect(orders).toBeDefined();
  expect(orders.length).toBe(2);
});

test('Restocks: missing required fields', () => {
  const validate = () => {
    RestocksValidator.validateJson(
      readFile('./fixtures/validator/missingFieldRestocks.json')
    );
  };

  expect(validate).toThrow(Error);
});

test('Restocks: item_quantity is not an integer', () => {
  const validate = () => {
    RestocksValidator.validateJson(
      readFile('./fixtures/validator/wrongFieldTypeRestocks.json')
    );
  };
  expect(validate).toThrow(Error);
});