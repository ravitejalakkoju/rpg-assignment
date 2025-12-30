import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { BlogEventsService } from './blog-events.service';
import { BlogEvent } from './entities/blog-event.entity';

@Resolver(() => BlogEvent)
export class BlogEventsResolver {
  constructor(private readonly blogEventsService: BlogEventsService) {}

  @UseGuards(AuthGuard)
  @Query(() => [BlogEvent], { name: 'notificationLogs' })
  findAll() {
    return this.blogEventsService.findAll();
  }
}
