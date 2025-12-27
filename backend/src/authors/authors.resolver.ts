import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { hash } from 'bcrypt';
import { AuthorsService } from './authors.service';
import { CreateAuthorInput } from './dto/create-author.input';
import { Author } from './entities/author.entity';

@Resolver()
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Mutation(() => Author)
  async createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    const { name, email, password } = createAuthorInput;
    const existingAuthor = await this.authorsService.findByEmail(email);
    if (existingAuthor) {
      throw new Error('Email is already registered.');
    }
    const passwordHash = await hash(password, 10);
    return await this.authorsService.create(name, email, passwordHash);
  }

  @Query(() => Author, { name: 'author', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.authorsService.findById(id);
  }

  @Query(() => [Author], { name: 'authors', nullable: true })
  findAll() {
    return this.authorsService.findAll();
  }
}
