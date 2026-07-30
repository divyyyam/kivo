import { IsString } from 'class-validator';

export class ClearSessionDto {
  @IsString()
  userId!: string;
}
