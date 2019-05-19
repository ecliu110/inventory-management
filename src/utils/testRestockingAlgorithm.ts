import * as _ from 'lodash';
import { Order, Restock, InventoryManager, TestInventoryResponse } from '../types/inventory';

export const testRestockingAlgorithm = function(orders: Order[], restocks: Restock[],
  inventoryManager: InventoryManager): TestInventoryResponse {
  orders = _.sortBy(orders, ['order_date']);
  restocks = _.sortBy(restocks, ['restock_date']);

  // Restock or Get Item until all orders are fulfilled
  while (orders.length > 0) {
    if (restocks.length > 0 && (restocks[0].restock_date <= orders[0].order_date)) {
      const { item_stocked, item_quantity } = restocks.shift();
      inventoryManager.addInventoryItem(item_stocked, parseInt(item_quantity));
    } else {
      const currOrder: Order = orders.shift();
      const fullfilledOrder: boolean = inventoryManager.getInventoryItem(currOrder.item_ordered, parseInt(currOrder.item_quantity));
      if (fullfilledOrder === false) {
        return {
          success: false,
          order: currOrder
        };
      }
    }
  }

  // Restock any remaning restock events
  while (restocks.length > 0) {
    const { item_stocked, item_quantity } = restocks.shift();
    inventoryManager.addInventoryItem(item_stocked, parseInt(item_quantity));
  }
  return {
    success: true,
    inventory: inventoryManager.getInventory()
  };
};