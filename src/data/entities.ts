export type Product = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
}

 export class OrderLine {
    constructor( public product: Product, public quantity: number ) {
        // no statement required
     }

     get totalAmount(): number {
        return this.product.price * this.quantity;
     }

}

export class Order {
    private lines = new Map<number, OrderLine>();

    constructor(initialLines?: OrderLine[]){
       initialLines ?  initialLines.forEach(line => this.lines.set(line.product.id, line)) : null;
        
    }

    public addProduct(product: Product, quantity: number): void {
        const line = this.lines.get(product.id);
        if(line) {
            line.quantity += quantity;
        }
        else {
            this.lines.set(product.id,  new OrderLine(product, quantity))
        }
    }

    public removeProduct(id: number) {
        this.lines.delete(id);
    }

    public sellProduct(id: number, quantity: number): void {
        const line = this.lines.get(id);
        if(line) {
            line.quantity -= quantity;
            if(line.quantity <= 0) {
                this.lines.delete(id);
            }
        }
    }

    get orderlines(): OrderLine[] {
        return [...this.lines.values()];
    }

    get productCount(): number {
        return this.lines.size;
    }

    get totalProductCount(): number {
        return [...this.lines.values()].reduce((total, prod) => total += prod.quantity,0);    
    }

    get totalPrice(): number {
        return [...this.lines.values()].reduce((total, prod) => total += prod.totalAmount,0);
    }
}