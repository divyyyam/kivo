import { Module } from '@nestjs/common';
import { OrbitService } from './orbit.service';
import { OrbitController } from './orbit.controller';

@Module({
  controllers: [OrbitController],
  providers: [OrbitService],
})
export class OrbitModule {}
