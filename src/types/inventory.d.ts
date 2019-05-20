export interface InventoryManager {
  addInventoryItem(type: string, amount: number): number;
  getInventoryItem(type: string, amount: number): boolean;
  checkInventoryItem(type: string): number;
  getInventory(): { [key: string]: number };
}

export interface Order {
  order_id: string;
  customer_id: string;
  order_date: Date;
  item_ordered: string;
  item_quantity: number;
  item_price: number;
}

export interface Restock {
  restock_date: Date;
  item_stocked: string;
  item_quantity: number;
  manufacturer: string;
  wholesale_price: number;
}

export interface TestInventoryResponse {
  success: boolean;
  order?: Order;
  inventory?: { [key: string]: number };
}