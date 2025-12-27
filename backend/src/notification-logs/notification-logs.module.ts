import { Module } from '@nestjs/common';
import { NotificationLogsService } from './notification-logs.service';
import { NotificationLogsResolver } from './notification-logs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationLog } from './entities/notification-log.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationLog]), AuthModule],
  providers: [NotificationLogsResolver, NotificationLogsService],
})
export class NotificationLogsModule {}
