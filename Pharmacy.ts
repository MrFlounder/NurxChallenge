import { OrderItem } from "./OrderItem";
import { InventoryItem } from "./InventoryItem";
// Assume as long as pharmacy has an item, the stock is infinite

class Pharmacy {
    name: string;
    inventory: Array<InventoryItem>;
    constructor(name: string, inventory: Array<InventoryItem>) {
        this.name = name;
        this.inventory = inventory;
    }

    estimateOrderItemCost(orderItem: OrderItem): number | undefined {
        return this.inventory.find(inStockItem => inStockItem.drug === orderItem.drug)?.cost;
    }
}

export { Pharmacy };