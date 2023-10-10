import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/interfaces/product/product.interface';

@Injectable()
export class ProductsPracticeService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Vela aromática',
      description: 'Vela aromática de vainilla',
    },
    {
      id: 2,
      name: 'Marco de fotos pequeño',
      description: 'Marcon ideal para tus fotos de 10x15',
    },
  ];

  getAll(): Product[] {
    return this.products;
  }

  getiId(id: number): Product {
    return this.products.find((product: Product) => product.id === id);
  }

  insert(product: Product): void {
    this.products = [
      ...this.products,
      {
        id: this.lastId() + 1,
        name: product.name,
        description: product.description,
      },
    ];
  }

  update(id: number, product: Product): void {
    const index = this.products.findIndex(
      (product: Product) => product.id === id,
    );
    this.products[index] = {
      ...this.products[index],
      ...product,
    };
  }

  delete(id: number): void {
    this.products = this.products.filter(
      (product: Product) => product.id !== id,
    );
  }

  private lastId(): number {
    return this.products[this.products.length - 1].id;
  }
}
