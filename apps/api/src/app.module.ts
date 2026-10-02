import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [AuthModule, LogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
