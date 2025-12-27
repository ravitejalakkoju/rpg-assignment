import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorsService } from '../authors/authors.service';
import { Author } from '../authors/entities/author.entity';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CurrentAuthorId } from './current-author.decorator';
import { AuthInput } from './dto/auth.input';
import { AuthPayload } from './dto/auth.payload';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly authorsService: AuthorsService,
  ) {}

  @Mutation(() => AuthPayload)
  async register(@Args('input') input: AuthInput): Promise<AuthPayload> {
    const author = await this.authService.register(
      input.name!,
      input.email,
      input.password,
    );
    const accessToken = await this.authService.createAccessToken(author);
    return { accessToken, author };
  }

  @Mutation(() => AuthPayload)
  async login(@Args('input') input: AuthInput): Promise<AuthPayload> {
    const author = await this.authService.validateAuthor(
      input.email,
      input.password,
    );
    const accessToken = await this.authService.createAccessToken(author);
    return { accessToken, author };
  }

  @UseGuards(AuthGuard)
  @Query(() => Author)
  async me(@CurrentAuthorId() authorId: string): Promise<Author> {
    const author = await this.authorsService.findById(authorId);
    if (!author) {
      throw new Error('Author not found.');
    }
    return author;
  }
}
