import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Repository } from 'typeorm';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';
import { BlogSortField, SortOrder } from './dto/query-blogs.args';

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

  findAll(options?: { orderBy?: BlogSortField; order?: SortOrder }) {
    const { orderBy = BlogSortField.CREATED_AT, order = SortOrder.DESC } =
      options || {};

    return this.blogsRepository.find({
      order: {
        [orderBy]: order,
      },
    });
  }

  findOne(id: number) {
    return this.blogsRepository.findOneBy({ id });
  }

  async update(id: number, updateBlogInput: UpdateBlogInput) {
    const blog = await this.blogsRepository.findOneBy({ id });

    if (!blog) {
      throw new Error('Blog not found');
    }

    Object.assign(blog, updateBlogInput);
    return this.blogsRepository.save(blog);
  }

  async remove(id: number) {
    const blog = await this.blogsRepository.findOneBy({ id });

    if (!blog) {
      throw new Error('Blog not found');
    }

    await this.blogsRepository.softRemove(blog);
    return blog;
  }
}
