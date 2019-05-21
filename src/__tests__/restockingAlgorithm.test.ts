import * as fs from 'fs';
import { resolve } from 'path';
import { testRestockingAlgorithm } from '../utils/testRestockingAlgorithm';
import { InMemoryInventoryManager } from '../inventoryManager/InMemoryInventoryManager';
import { Order, Restock } from '../types/inventory';

const readJson = function(fpath: string) {
  return JSON.parse(fs.readFileSync(
    resolve('./src/__tests__/', fpath), 'utf-8'
  ));
};

test('Success', () => {
  const inventoryManager = new InMemoryInventoryManager();
  const orders: Order[] = readJson('./fixtures/success/givenSampleOrders.json');
  const restocks: Restock[] = readJson('./fixtures/success/givenSampleRestocks.json');
  const { success, inventory } = testRestockingAlgorithm(orders,
    restocks, inventoryManager);
    expect(success).toBe(true);
    expect(inventory['shovel']).toBe(4);
    expect(inventory['snowblower']).toBe(4);
    expect(inventory['tires']).toBe(2);
    expect(inventory['sled']).toBe(1);
    expect(inventory['skis']).toBe(undefined);
    expect(inventoryManager.checkInventoryItem('skis')).toBe(0);
});

test('Sucess, restock after all order fulfilled', () => {
  const inventoryManager = new InMemoryInventoryManager();
  const orders: Order[] = readJson('./fixtures/success/simpleOrder.json');
  const restocks: Restock[] = readJson('./fixtures/success/restockAfterOrder.json');
  const { success, inventory } = testRestockingAlgorithm(orders,
    restocks, inventoryManager);
    console.log(JSON.stringify(inventory));
    expect(success).toBe(true);
    expect(inventory['shovel']).toBe(45);
    expect(inventoryManager.checkInventoryItem('sled')).toBe(0);
});


test('Failure, Out of stock', () => {
  const orders: Order[] = readJson('./fixtures/failure/orders.json');
  const restocks: Restock[] = readJson('./fixtures/failure/restocks.json');
  const { success, order } = testRestockingAlgorithm(orders,
    restocks, new InMemoryInventoryManager());
    expect(success).toBe(false);
    expect(order.item_ordered).toBe('sled');
    expect(order.order_date).toBe('2018-03-09T13:13:29');
});

test('Failure, simultaneous order and restock', () => {
  const orders: Order[] = readJson('./fixtures/failure/sameTimeOrder.json');
  const restocks: Restock[] = readJson('./fixtures/failure/sameTimeRestock.json');
  const { success, order } = testRestockingAlgorithm(orders,
    restocks, new InMemoryInventoryManager());
    expect(success).toBe(false);
    expect(order.item_ordered).toBe('sled');
    expect(order.order_date).toBe('2018-03-09T13:13:29');
});