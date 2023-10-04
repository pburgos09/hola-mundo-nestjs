import { Controller, Get, Param } from '@nestjs/common';

// 'products' hace referencia a la ruta que se va a utilizar para acceder a este controlador, en este ejemplo seria http://localhost:3000/products
@Controller('products')
export class ProductsController {
  // Acá irán los métodos que se utilizarán para acceder a los productos

  //A este decorador se le puede pasar un parámetro que es la ruta que se va a utilizar para acceder a este método, en este caso sería http://localhost:3000/products/hot
  @Get('hot')
  getSpecialProducts(): string {
    return 'Te vamos a mostrar los productos en oferta!!';
  }

  //A este decorador se le puede pasar un parámetro dinámico, en este caso el id del producto, a su vez dentro del método find se puede acceder a este parámetro mediante el objeto params utilizando el decorador @Param

  /* 
  - Método sin desestructurar el objeto params

  @Get(':id')
  find(@Param() params): string {
    return `Estás buscando el producto con id ${params.id}`;
  } */

  @Get(':id')
  find(@Param('id') id: number): string {
    return `Estás buscando el producto con id ${id}`;
  }

  //A este decorador se le pueden pasar varios parámetros dinámicos, en este caso el id del producto y el tamaño del mismo, y como en el decorador anterior se puede acceder a estos parámetros mediante el objeto params utilizando el decorador @Param
  /*
   - Método sin desestructurar el objeto params
   
  @Get(':id/:size')
  findWithSize(@Param() params): string {
    return `Estás buscando el producto con id ${params.id} y el tamaño ${params.size}`;
  } */

  @Get(':id/:size')
  findWithSize(@Param('id') id: number, @Param('size') size: string): string {
    return `Estás buscando el producto con id ${id} y el tamaño ${size}`;
  }

  @Get()
  //el nombre que le proporcionemos a este método no tiene tanta relevancia dentro del decorador @Get, pero si es importante que sea descriptivo para que se entienda que es lo que hace
  getHelloInProducts(): string {
    return 'Estamos en productos!!!';
  }
}
