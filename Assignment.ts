import { Pharmacy } from "./Pharmacy";
import { OrderItem } from "./OrderItem";

class Assignment {
    items: Array<OrderItem>;
    pharmacy: Pharmacy;

    constructor(items: Array<OrderItem>, pharmacy: Pharmacy) {
        this.items = items;
        this.pharmacy = pharmacy;
    }
}

export { Assignment }
