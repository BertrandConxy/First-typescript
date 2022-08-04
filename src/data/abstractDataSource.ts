import {Order, Product} from './entities';

export type ProductProp = keyof Product;

export abstract class AbstractDataSource {
  private _products: Product[];
  private _categories: Set<string>;
  public order: Order;
  public loading: Promise<void>;

  constructor() {
    this._products = [];
    this._categories = new Set<string>();
    this.order = new Order();
    this.loading = this.getData();
  }

  async getProducts(
    sortProp: ProductProp = "id",
    category?: string
  ): Promise<Product[]> {
    await this.loading;
    return this.selectedProducts(this._products, sortProp, category);
  }

  protected async getData(): Promise<void> {
    const rawData = await this.loadProducts();
    rawData.forEach((product: Product) => {
      this._products.push(product);
      this._categories.add(product.category);
    });
  }

  protected selectedProducts(
    products: Product[],
    sortProp: ProductProp,
    category?: string
  ): Product[] {
    if (category) {
      return products
        .filter((product) => product.category === category)
        .sort((a, b) => (a[sortProp] < b[sortProp] ? -1 : 1));
    }
    return products.sort((a, b) => (a[sortProp] < b[sortProp] ? -1 : 1));
  }

  async getCategories(): Promise<string[]> {
    await this.loading;
    return [...this._categories.values()];
  }
  
  protected abstract loadProducts(): Promise<Product[]>;
  abstract storeOrder(): Promise<number>;
}