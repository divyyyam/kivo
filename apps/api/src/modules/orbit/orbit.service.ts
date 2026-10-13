import { Injectable } from '@nestjs/common';
import { CreateOrbitDto } from './dto/create-orbit.dto';
import { UpdateOrbitDto } from './dto/update-orbit.dto';

@Injectable()
export class OrbitService {
  create(createOrbitDto: CreateOrbitDto) {
    return 'This action adds a new orbit';
  }

  findAll() {
    return `This action returns all orbit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orbit`;
  }

  update(id: number, updateOrbitDto: UpdateOrbitDto) {
    return `This action updates a #${id} orbit`;
  }

  remove(id: number) {
    return `This action removes a #${id} orbit`;
  }
}
