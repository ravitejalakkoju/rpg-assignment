import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BlogEventsResolver } from './blog-events.resolver';
import { BlogEventsService } from './blog-events.service';
import { BlogEvent } from './entities/blog-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEvent]), AuthModule],
  providers: [BlogEventsResolver, BlogEventsService],
})
export class BlogEventsModule {}
