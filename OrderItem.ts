class OrderItem {
    drug: string;
    quantity: number;
    constructor(drug: string, quantity: number) {
        this.drug = drug;
        this.quantity = quantity;
    }
}

export { OrderItem };