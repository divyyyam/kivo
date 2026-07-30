import { Module } from '@nestjs/common';
import { UserAccessGuard } from '../../common/guards/access.guard';
import { SessionModule } from '../sessions/session.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [SessionModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, UserAccessGuard],
  exports: [AuthService],
})
export class AuthModule {}
