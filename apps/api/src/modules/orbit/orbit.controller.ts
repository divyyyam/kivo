import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrbitService } from './orbit.service';
import { CreateOrbitDto } from './dto/create-orbit.dto';
import { UpdateOrbitDto } from './dto/update-orbit.dto';

@Controller('orbit')
export class OrbitController {
  constructor(private readonly orbitService: OrbitService) {}

  @Post()
  create(@Body() createOrbitDto: CreateOrbitDto) {
    return this.orbitService.create(createOrbitDto);
  }

  @Get()
  findAll() {
    return this.orbitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orbitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrbitDto: UpdateOrbitDto) {
    return this.orbitService.update(+id, updateOrbitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orbitService.remove(+id);
  }
}
