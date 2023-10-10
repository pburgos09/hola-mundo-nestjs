import { Test, TestingModule } from '@nestjs/testing';
import { ProductsPracticeService } from './products-practice.service';

describe('ProductsPracticeService', () => {
  let service: ProductsPracticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsPracticeService],
    }).compile();

    service = module.get<ProductsPracticeService>(ProductsPracticeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
