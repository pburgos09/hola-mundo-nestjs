import { Module } from '@nestjs/common';
import { ProductsPracticeController } from './products-practice.controller';
import { ProductsPracticeService } from './services/products-practice/products-practice.service';

@Module({
  controllers: [ProductsPracticeController],
  providers: [ProductsPracticeService],
})
export class ProductsPracticeModule {}
