import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductPracticeDto } from 'src/products-practice/dto/product-practice.dto/product-practice.dto';
import { Product } from 'src/products/interfaces/product/product.interface';

@Injectable()
export class ProductsPracticeService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Vela aromática',
      description: 'Vela aromática de vainilla',
      stock: 20,
    },
    {
      id: 2,
      name: 'Marco de fotos pequeño',
      description: 'Marcon ideal para tus fotos de 10x15',
      stock: 10,
    },
  ];

  getAll(): Product[] {
    return this.products;
  }

  getiId(id: number): Product {
    const product = this.products.find((product: Product) => product.id === id);
    if (product) {
      return product;
    } else {
      throw new NotFoundException(`No se encontró el producto con id ${id}`);
    }
  }

  insert(product: ProductPracticeDto): void {
    this.products = [
      ...this.products,
      {
        id: this.lastId() + 1,
        name: product.name,
        description: product.description,
        stock: product.stock,
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
    const product = this.products.find((product: Product) => product.id === id);
    if (product) {
      this.products = this.products.filter(
        (product: Product) => product.id !== id,
      );
    } else {
      throw new HttpException(
        `NO existe el producto con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private lastId(): number {
    return this.products[this.products.length - 1].id;
  }
}
