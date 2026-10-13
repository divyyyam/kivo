import { Test, TestingModule } from '@nestjs/testing';
import { OrbitController } from './orbit.controller';
import { OrbitService } from './orbit.service';

describe('OrbitController', () => {
  let controller: OrbitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrbitController],
      providers: [OrbitService],
    }).compile();

    controller = module.get<OrbitController>(OrbitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
