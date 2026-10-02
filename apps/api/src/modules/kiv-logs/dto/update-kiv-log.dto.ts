import { PartialType } from '@nestjs/mapped-types';
import { CreateKivLogDto } from './create-kiv-log.dto';

export class UpdateKivLogDto extends PartialType(CreateKivLogDto) {}
