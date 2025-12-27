import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationLog } from './entities/notification-log.entity';

@Injectable()
export class NotificationLogsService {
  constructor(
    @InjectRepository(NotificationLog)
    private readonly blogsRepository: Repository<NotificationLog>,
  ) {}

  create() {
    return 'This action adds a new notificationLog';
  }

  findAll() {
    return `This action returns all notificationLogs`;
  }
}
