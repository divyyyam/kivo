import { Injectable } from '@nestjs/common';
import { CreateKivLogDto } from './dto/create-kiv-log.dto';
import { UpdateKivLogDto } from './dto/update-kiv-log.dto';

@Injectable()
export class KivLogsService {
  create(createKivLogDto: CreateKivLogDto) {
    return 'This action adds a new kivLog';
  }

  findAll() {
    return `This action returns all kivLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kivLog`;
  }

  update(id: number, updateKivLogDto: UpdateKivLogDto) {
    return `This action updates a #${id} kivLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} kivLog`;
  }
}
