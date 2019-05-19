import * as fs from 'fs';
import * as _ from 'lodash';
import { InMemoryInventoryManager } from './inventoryManager/InMemoryInventoryManager';
import { Order, Restock } from './types/inventory';
import { testRestockingAlgorithm} from './utils/testRestockingAlgorithm';


const orders: Order[] = JSON.parse(fs.readFileSync('orders.json', 'utf-8'));
const restocks: Restock[] = JSON.parse(fs.readFileSync('restocks.json', 'utf-8'));

const { success, order, inventory} = testRestockingAlgorithm(orders, restocks, new InMemoryInventoryManager());
if (success) {
  console.log(`SUCCESS\n ${JSON.stringify(inventory)}`);
} else {
  console.log(`OUT OF STOCK\n order_date: ${order.order_date}, item_ordered: ${order.item_ordered}`);
}

