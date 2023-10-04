import { Controller, Get } from '@nestjs/common';

// 'products' hace referencia a la ruta que se va a utilizar para acceder a este controlador, en este ejemplo seria http://localhost:3000/products
@Controller('products')
export class ProductsController {
  // Acá irán los métodos que se utilizarán para acceder a los productos

  //A este decorador se le puede pasar un parámetro que es la ruta que se va a utilizar para acceder a este método, en este caso sería http://localhost:3000/products/hot
  @Get('hot')
  getSpecialProducts(): string {
    return 'Te vamos a mostrar los productos en oferta!!';
  }

  @Get()
  //el nombre que le proporcionamos a la función dentro del método no tiene tanta relevancia, lo que importa es el decorador(en este caso el '@Get'), pero si esta bueno que el nombre de la función sea descriptivo
  getHelloInProducts(): string {
    return 'Estamos en productos!!!';
  }
}
