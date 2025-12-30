import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Repository } from 'typeorm';
import { BlogEvent } from './entities/blog-event.entity';

@Injectable()
export class BlogEventsService {
  constructor(
    @InjectRepository(BlogEvent)
    private readonly blogEventsRepository: Repository<BlogEvent>,
  ) {}

  async create(event: 'CREATED', blog: Blog) {
    const log = this.blogEventsRepository.create({ event, blog });
    return await this.blogEventsRepository.save(log);
  }

  findAll() {
    return this.blogEventsRepository.find();
  }
}
