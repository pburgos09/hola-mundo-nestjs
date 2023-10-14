import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product/product.interface';

//Los servicios son clases que se encargan de la lógica de negocio de la aplicación, en este caso se encargan de la lógica de negocio de los productos, aca es el lugar ideal para hacer todas las comprobaciones necesarias antes de realizar operaciones

//Inicialmente se crea un arreglo de productos con dos productos
//Luego se crea el método getAll que devuelve el arreglo de productos
//Luego se crea el método insert que recibe un producto y lo agrega al arreglo de productos

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Vela aromática',
      description: 'Esta vela lanza ricos olores',
      stock: 20,
    },
    {
      id: 2,
      name: 'Marco de fotos pequeño',
      description: 'Marco ideal para tus fotos 10x15',
      stock: 10,
    },
  ];

  getAll(): Product[] {
    return this.products;
  }
  insert(product: Product) {
    this.products = [...this.products, product];
  }
}
