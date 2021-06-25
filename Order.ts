import { OrderItem } from "./OrderItem"

class Order {
    items: Array<OrderItem>;
    constructor(orderItems: string[][]) {
        const items = [];
        orderItems.forEach(item => items.push(new OrderItem(item[0], parseInt(item[1]))));
        this.items = items;
    }
}

export { Order }