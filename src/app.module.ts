import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsPracticeController } from './products-practice/products-practice.controller';
import { ProductsPracticeService } from './products-practice/services/products-practice/products-practice.service';
import { ProductsModule } from './products/products.module';
import { ProductsPracticeModule } from './products-practice/products-practice.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [ProductsModule, ProductsPracticeModule, TagsModule],
  controllers: [AppController, ProductsController, ProductsPracticeController],
  providers: [AppService, ProductsService, ProductsPracticeService],
})
export class AppModule {}
