import { Pharmacy } from "./Pharmacy";
import { Order } from "./Order";
import { Assignment } from "./Assignment";
import { KeyValueStore } from "./KeyValueStore";
import { OrderItem } from "./OrderItem";
const util = require('util')


class Router {
    pharmacies: Array<Pharmacy>;
    keyValueStore: KeyValueStore;
    constructor(pharmacies: Array<Pharmacy>, keyValueStore: KeyValueStore) {
        this.pharmacies = pharmacies;
        this.keyValueStore = keyValueStore;
    }
    assign(order: Order): Array<Assignment> {
        const assignments = new Array<Assignment>();
        // Assume no discount when ordering multiple same items or group of different items from the same pharmacy
        const orderItemAndPharmacyPair = order.items.map((item): {item: OrderItem, pharmacy: Pharmacy} => {
            const pharmacyAndCostList = this.keyValueStore.map.get(item.drug);
            //console.log(util.inspect(pharmacyAndCostList, {showHidden: false, depth: 3}))
            // Just want to reuse Math.min... this should be rewritten into another function to save mapping process
            const costList = pharmacyAndCostList.map(pair => pair.cost);
            const minCost = Math.min(...costList);
            //console.log(util.inspect(costList, {showHidden: false, depth: 3}))
            //console.log(minCost);
            const pharmacyName = pharmacyAndCostList.find(pair => pair.cost == minCost).name;
            const pharmacy = this.pharmacies.find(pharmancy => pharmancy.name === pharmacyName);
            return {item, pharmacy};
        });
        orderItemAndPharmacyPair.forEach(pair => {
            if (assignments.find(assignement => assignement.pharmacy.name === pair.pharmacy.name) !== undefined) {
                assignments.find(assignement => assignement.pharmacy.name === pair.pharmacy.name).items.push(pair.item);
            } else {
                assignments.push(new Assignment([pair.item], pair.pharmacy));
            }
        });
        return assignments;
    }
}

export { Router }