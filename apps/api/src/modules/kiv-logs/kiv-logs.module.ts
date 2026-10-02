import { Module } from '@nestjs/common';
import { KivLogsService } from './kiv-logs.service';
import { KivLogsController } from './kiv-logs.controller';

@Module({
  controllers: [KivLogsController],
  providers: [KivLogsService],
})
export class KivLogsModule {}
