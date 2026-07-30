import { IsDate, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  userId!: string;

  @IsString()
  refreshTokenHash!: string;

  @IsDate()
  expiresAt!: Date;
}
