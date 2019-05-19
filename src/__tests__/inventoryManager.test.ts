import { InMemoryInventoryManager } from '../inventoryManager/InMemoryInventoryManager';

const inventoryManager = new InMemoryInventoryManager();

test('Restock inventory', () => {
  expect(inventoryManager.addInventoryItem('tires', 4)).toBe(4);
  expect(inventoryManager.checkInventoryItem('tires')).toBe(4);
});

test('Get inventory successfully', () => {
  expect(inventoryManager.getInventoryItem('tires', 3)).toBe(true);
  expect(inventoryManager.checkInventoryItem('tires')).toBe(1);
});

test('Get inventory unsuccessfully', () => {
  expect(inventoryManager.getInventoryItem('tires', 2)).toBe(false);
  expect(inventoryManager.checkInventoryItem('tires')).toBe(1);
});