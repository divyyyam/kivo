import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KivLogsService } from './kiv-logs.service';
import { CreateKivLogDto } from './dto/create-kiv-log.dto';
import { UpdateKivLogDto } from './dto/update-kiv-log.dto';

@Controller('kiv-logs')
export class KivLogsController {
  constructor(private readonly kivLogsService: KivLogsService) {}

  @Post()
  create(@Body() createKivLogDto: CreateKivLogDto) {
    return this.kivLogsService.create(createKivLogDto);
  }

  @Get()
  findAll() {
    return this.kivLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kivLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKivLogDto: UpdateKivLogDto) {
    return this.kivLogsService.update(+id, updateKivLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kivLogsService.remove(+id);
  }
}
