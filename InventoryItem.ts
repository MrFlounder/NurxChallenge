class InventoryItem {
    drug: string;
    cost: number;
    constructor(drug: string, cost: number) {
        this.drug = drug;
        this.cost = cost;
    }
}

export { InventoryItem };