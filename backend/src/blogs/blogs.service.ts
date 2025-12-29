import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Repository } from 'typeorm';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogsRepository: Repository<Blog>,
  ) {}

  async create(title: string, content: string, author: Author): Promise<Blog> {
    const blog = this.blogsRepository.create({ title, content, author });
    return await this.blogsRepository.save(blog);
  }

  findAll() {
    return this.blogsRepository.find();
  }

  findOne(id: number) {
    return this.blogsRepository.findOneBy({ id });
  }

  update(id: number, updateBlogInput: UpdateBlogInput) {
    return this.blogsRepository.update(id, updateBlogInput);
  }

  remove(id: number) {
    return this.blogsRepository.softRemove({ id });
  }
}
