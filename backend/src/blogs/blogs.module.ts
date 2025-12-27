import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from 'src/authors/authors.module';
import { BlogsResolver } from './blogs.resolver';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), AuthorsModule],
  providers: [BlogsResolver, BlogsService],
})
export class BlogsModule {}
