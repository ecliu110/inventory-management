export interface InventoryManager {
  addInventoryItem(type: string, amount: number) : number;
  getInventoryItem(type: string, amount: number) : boolean;
  checkInventoryItem(type: string): number;
  getInventory(): { [key: string]: number };
}

export interface Order {
  order_id: string;
  customer_id: string;
  order_date: string;
  item_ordered: string;
  item_quantity: string;
  item_price: string;
}

export interface Restock {
  restock_date: string,
  item_stocked: string,
  item_quantity: string,
  manufacturer: string,
  wholesale_price: string
}

export interface TestInventoryResponse {
  success: boolean,
  order?: Order,
  inventory?: { [key: string] : number }
}