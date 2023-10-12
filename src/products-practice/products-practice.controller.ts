import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsPracticeService } from './services/products-practice/products-practice.service';
import { Product } from 'src/products/interfaces/product/product.interface';

@Controller('products-practice')
export class ProductsPracticeController {
  constructor(
    private readonly productsPracticeService: ProductsPracticeService,
  ) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productsPracticeService.getAll();
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: string): Promise<Product> {
    return this.productsPracticeService.getiId(parseInt(id));
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  createProduct(@Body() body) {
    this.productsPracticeService.insert(body);
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() body,
  ) {
    this.productsPracticeService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.productsPracticeService.delete(id);
  }
}
