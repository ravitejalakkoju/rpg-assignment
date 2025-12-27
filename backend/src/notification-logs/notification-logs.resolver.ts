import { Query, Resolver } from '@nestjs/graphql';
import { NotificationLog } from './entities/notification-log.entity';
import { NotificationLogsService } from './notification-logs.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => NotificationLog)
export class NotificationLogsResolver {
  constructor(
    private readonly notificationLogsService: NotificationLogsService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [NotificationLog], { name: 'notificationLogs' })
  findAll() {
    return this.notificationLogsService.findAll();
  }
}
