// Using keyvalue store & cache(not implemented) here to make order assignment call respond quickly. We don't want customers to wait or tell them item out of stock after return success.
// I assume any pharmacy in US is elegible to accept and ship order item if instock
import { OrderItem } from "./OrderItem";
import { Pharmacy } from "./Pharmacy";

class KeyValueStore {
    map: Map<string, {name: string, cost: number}[]>;
    constructor() {
        this.map = new Map();
    }

    importByPharmacy(pharmacy: Pharmacy) {
        pharmacy.inventory.forEach(item => { this.map.set(item.drug, [...this.map.get(item.drug)??[], {name: pharmacy.name, cost: item.cost}]) });
    }
    /*
    importByItem() {

    }
    */
}

export { KeyValueStore }
