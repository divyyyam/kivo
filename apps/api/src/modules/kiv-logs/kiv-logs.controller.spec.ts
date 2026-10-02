import { Test, TestingModule } from '@nestjs/testing';
import { KivLogsController } from './kiv-logs.controller';
import { KivLogsService } from './kiv-logs.service';

describe('KivLogsController', () => {
  let controller: KivLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KivLogsController],
      providers: [KivLogsService],
    }).compile();

    controller = module.get<KivLogsController>(KivLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
