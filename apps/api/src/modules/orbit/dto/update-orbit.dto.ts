import { PartialType } from '@nestjs/mapped-types';
import { CreateOrbitDto } from './create-orbit.dto';

export class UpdateOrbitDto extends PartialType(CreateOrbitDto) {}
