import { InventoryManager } from '../types/inventory';
import * as _ from 'lodash';

export class InMemoryInventoryManager implements InventoryManager {
  private _inventory: { [key: string]: number };

  constructor() {
    this._inventory = {};
  }

  addInventoryItem(type: string, amount: number): number {
    if (!this._inventory[type]) return this._inventory[type] = amount;
    return this._inventory[type] += amount;
  }

  getInventoryItem(type: string, amount: number): boolean {
    const currentStock = this._inventory[type] || 0;
    const remainingStock =  currentStock  - amount;
    if (remainingStock < 0) return false;
    this._inventory[type] = remainingStock;
    return true;
  }

  checkInventoryItem(type: string) {
    return this._inventory[type] || 0;
  }

  getInventory(): { [key: string]: number} {
    return _.omitBy(this._inventory, (valueKey) => {
      return valueKey === 0;
    });
  }
}