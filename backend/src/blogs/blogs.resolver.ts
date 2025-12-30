import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentAuthorId } from 'src/auth/current-author.decorator';
import { AuthorsService } from 'src/authors/authors.service';
import { BlogsService } from './blogs.service';
import { CreateBlogInput } from './dto/create-blog.input';
import { BlogSortField, SortOrder } from './dto/query-blogs.args';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';

@Resolver(() => Blog)
export class BlogsResolver {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly authorsService: AuthorsService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Blog)
  async createBlog(
    @CurrentAuthorId() authorId: string,
    @Args('createBlogInput') createBlogInput: CreateBlogInput,
    @Context('pubSub') pubSub: PubSub,
  ) {
    const { title, content } = createBlogInput;
    const author = await this.authorsService.findById(authorId);
    if (!author) {
      throw new Error('Author not found.');
    }
    const newBlog = await this.blogsService.create(title, content, author);
    await pubSub.publish('BLOG_CREATED', { blogCreated: newBlog });
    return newBlog;
  }

  @UseGuards(AuthGuard)
  @Query(() => [Blog], { name: 'blogs', nullable: true })
  findAll(
    @Args('orderBy', {
      type: () => BlogSortField,
      nullable: true,
    })
    orderBy?: BlogSortField,

    @Args('order', {
      type: () => SortOrder,
      nullable: true,
    })
    order?: SortOrder,
  ) {
    return this.blogsService.findAll({
      orderBy,
      order,
    });
  }

  @UseGuards(AuthGuard)
  @Query(() => Blog, { name: 'blog' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.blogsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Blog)
  updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return this.blogsService.update(updateBlogInput.id, updateBlogInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Blog)
  removeBlog(@Args('id', { type: () => Int }) id: number) {
    return this.blogsService.remove(id);
  }

  @Subscription(() => Blog, {
    name: 'blogCreated',
    resolve: (value: { blogCreated: Blog }) => value.blogCreated,
  })
  blogCreated(@Context('pubSub') pubSub: PubSub) {
    return pubSub.asyncIterableIterator('BLOG_CREATED');
  }
}
