import { Router } from "./Router";
import { InventoryItem } from "./InventoryItem";
import { Pharmacy } from "./Pharmacy";
import { KeyValueStore } from "./KeyValueStore";
import { Order } from "./Order";
const inquirer = require('inquirer')
const util = require('util')

class App {
    router: Router;
    initPharmacies(): Array<Pharmacy> {
        // assume there are three pharmacies and five type of drugs
        // pharmacy No.1 has Levothyroxine($50), Atorvastatin($100), Lisinopril($10)
        const inventoryPharmacy1 = [new InventoryItem("Levothyroxine", 50), new InventoryItem("Atorvastatin", 100), new InventoryItem("Lisinopril", 10)]
        const pharmacy1 = new Pharmacy("Walgreens Castro", inventoryPharmacy1);
        // pharmacy No.2 has Levothyroxine($55), Atorvastatin($80), Metformin($20)
        const inventoryPharmacy2 = [new InventoryItem("Levothyroxine", 55), new InventoryItem("Atorvastatin", 80), new InventoryItem("Metformin", 20)]
        const pharmacy2 = new Pharmacy("CVS Soma", inventoryPharmacy2);
        // pharmacy No.3 has Levothyroxine($59), Amlodipine($35), Metoprolol($15) Lisinopril($13)
        const inventoryPharmacy3 = [new InventoryItem("Levothyroxine", 59), new InventoryItem("Amlodipine", 35), new InventoryItem("Metoprolol", 15), new InventoryItem("Lisinopril", 13)]
        const pharmacy3 = new Pharmacy("Safeway Mission", inventoryPharmacy3);
        return [pharmacy1, pharmacy2, pharmacy3];
    }
    initKeyValueStore(pharmacies: Array<Pharmacy>): KeyValueStore {
        const keyValueStore = new KeyValueStore();
        pharmacies.forEach(pharmacy => keyValueStore.importByPharmacy(pharmacy));
        console.log(util.inspect(keyValueStore, {showHidden: false, depth: 3}))
        return keyValueStore;
    }
    constructor() {
        const pharmacies = this.initPharmacies();
        this.router = new Router(pharmacies, this.initKeyValueStore(pharmacies));
    }
}

const app = new App();

var questions = [
    {
      type: 'input',
      name: 'name',
      message: "Place order medications in format 'drug name 1, quantity; drug name 2, [uantity 2; ...'"
    }
  ]

// Test case 1: Levothyroxine,2;Atorvastatin,3;Lisinopril,1

inquirer.prompt(questions).then((answers) => {
console.log(`Placing order of ${answers['name']}!`)
    let orderItemArray = answers['name'].split(";").map(orderItemPlain => orderItemPlain.split(","));
    let order = new Order(orderItemArray);
    let finalAssignments = app.router.assign(order);
    console.log(util.inspect(finalAssignments, {showHidden: false, depth: 4}))
})

