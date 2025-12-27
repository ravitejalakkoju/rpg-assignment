import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthorsService } from 'src/authors/authors.service';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<Author> {
    const existingAuthor = await this.authorsService.findByEmail(email);
    if (existingAuthor) {
      throw new Error('Email is already registered.');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    return await this.authorsService.create(name, email, passwordHash);
  }

  async validateAuthor(email: string, password: string): Promise<Author> {
    const author = await this.authorsService.findByEmail(email);
    if (!author) {
      throw new Error('Invalid credentials.');
    }
    const matches = await bcrypt.compare(password, author.passwordHash);
    if (!matches) {
      throw new Error('Invalid credentials.');
    }
    return author;
  }

  async createAccessToken(author: Author): Promise<string> {
    return await this.jwtService.signAsync({
      sub: author.id,
      email: author.email,
    });
  }
}
