import * as fs from 'fs';
import * as _ from 'lodash';
import * as inquirer from 'inquirer';
import { InMemoryInventoryManager } from './inventoryManager/InMemoryInventoryManager';
import { Order, Restock } from './types/inventory';
import { testRestockingAlgorithm } from './utils/testRestockingAlgorithm';

async function promptInputs(): Promise<inquirer.Answers> {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'orderFilePath',
      message: 'File path to orders file',
      validate: (input: string) => {
        return !!input;
      },
      default: 'orders.json'
    },
    {
      type: 'input',
      name: 'restockFilePath',
      message: 'File path to restocks file',
      validate: (input: string) => {
        return !!input;
      },
      default: 'restocks.json'
    }
  ]);
}

async function begin() {
  const { orderFilePath, restockFilePath } = await promptInputs();
  const ordersJson = JSON.parse(fs.readFileSync(orderFilePath, 'utf-8'));
  const restocksJson = JSON.parse(fs.readFileSync(restockFilePath, 'utf-8'));

  const { success, order, inventory } = testRestockingAlgorithm(
    ordersJson,
    restocksJson,
    new InMemoryInventoryManager()
  );
  if (success) {
    console.log(`SUCCESS\n ${JSON.stringify(inventory)}`);
  } else {
    console.log(
      `OUT OF STOCK\n order_date: ${order.order_date}, item_ordered: ${
        order.item_ordered
      }`
    );
  }
}

begin();
