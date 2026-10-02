import { Test, TestingModule } from '@nestjs/testing';
import { KivLogsService } from './kiv-logs.service';

describe('KivLogsService', () => {
  let service: KivLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KivLogsService],
    }).compile();

    service = module.get<KivLogsService>(KivLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
