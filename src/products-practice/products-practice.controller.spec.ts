import { Test, TestingModule } from '@nestjs/testing';
import { ProductsPracticeController } from './products-practice.controller';

describe('ProductsPracticeController', () => {
  let controller: ProductsPracticeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsPracticeController],
    }).compile();

    controller = module.get<ProductsPracticeController>(ProductsPracticeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
