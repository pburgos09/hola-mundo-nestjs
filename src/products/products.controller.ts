import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';

// 'products' hace referencia a la ruta que se va a utilizar para acceder a este controlador, en este ejemplo seria http://localhost:3000/products
@Controller('products')
export class ProductsController {
  //Lo que hace la siguiente linea es inyectar el servicio de productos en el controlador, de esta manera se puede acceder a los métodos que se encuentran en el servicio de productos
  constructor(private readonly productsService: ProductsService) {}

  // Acá irán los métodos que se utilizarán para )acceder a los productos

  //MÉTODOS GET

  //A este decorador se le puede pasar un parámetro que es la ruta que se va a utilizar para acceder a este método, en este caso sería http://localhost:3000/products/ruta-error-404. Ademas utilizamos el decorador @HttpCode para devolver un código de estado distinto al 200 por defecto, en este caso se utiliza el código NOT_FOUND que es el 404

  @Get('ruta-error-404')
  @HttpCode(HttpStatus.NOT_FOUND)
  rutaConError404(): string {
    return 'Esto es un error 404';
  }

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

  //Utilizamos el decorador @Res para poder devolver una respuesta personalizada, con un status code, dependiendo de la condición que se cumpla, en este caso si el id es menor a 100 se devuelve un status code 200 y un mensaje personalizado, en caso contrario se devuelve un status code 404 y un mensaje personalizado
  @Get(':id')
  find(@Res() response, @Param('id') id: number): string {
    if (id < 100) {
      return response
        .status(HttpStatus.OK)
        .send(`Página del producto con id ${id}`);
    } else {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(`Producto no encontrado`);
    }
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
  getHelloInProducts() {
    //En este caso se llama al método getAll del servicio de productos para devolver todos los productos
    return this.productsService.getAll();
  }

  // Aca vemos como se puede añadir un query param a la ruta con el decorador @Query, de esta manera se puede acceder a los datos que se pasan por query params por ejemplo en una ruta como http://localhost:3000/products/cars?count=10
  @Get('cars')
  //Dentro del decorador de @Query podemos recibir, en este ejemplo, un parámetro con nombre count, ademas con el pipe ParseIntPipe podemos indicar que el parámetro count debe ser un número entero y pueda validar esto, para que en caso de que no sea un entero nos arroje un error 400 Bad Request y no se ejecute el método
  rutaQuery(@Query('count', ParseIntPipe) carCount: number) {
    return carCount;
  }

  //MÉTODOS POST

  @Post('create')
  //Para devolver un código de estado distinto al 200 por defecto se puede utilizar el decorador @HttpCode y pasarle como parámetro el código de estado que se quiera devolver
  //@HttpCode(204)

  //Se puede utilizar el HttpStatus para devolver un código de estado distinto al 200 por defecto, en este caso se utiliza el código NO_CONTENT que es el 204
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() body) {
    return body;
  }

  @Post()
  //Dentro del método se puede acceder al body, que seria los datos que ingresaria un usuario en un form por ejemplo, mediante el decorador @Body

  /* - Método sin desestructurar el objeto body

  createProduct(@Body() body): string {
    //body contiene los datos que se ingresaron en el form
    return `Creo un producto ${body.name} con descripción ${body.description}`;
  } */
  createProduct(
    @Body('name') name: string,
    @Body('description') description: string,
  ): string {
    //Acá se llama al método insert del servicio de productos para insertar un nuevo producto
    this.productsService.insert({
      id: this.productsService.getAll().length + 1,
      name,
      description,
    });
    return `Creo un producto ${name} con descripción ${description}`;
  }

  //MÉTODOS PUT
  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return `Estás haciendo una operación de actualización del recurso ${id} 
    con ${body.name} y ${body.description}`;
  }

  //MÉTODOS PATCH
  @Patch(':id')
  partialUpdate(@Param('id') id: number, @Body() body) {
    return `Actualización parcial del ítem ${id} con ${body.name} y ${body.description}`;
  }

  //MÉTODOS DELETE
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return `Hemos borrado el producto ${id}`;
  }
}
