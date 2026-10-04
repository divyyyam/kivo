import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { LogsModule } from './logs/logs.module';
import { KivLogsModule } from './kiv-logs/kiv-logs.module';

@Module({
  imports: [AuthModule, LogsModule, KivLogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
