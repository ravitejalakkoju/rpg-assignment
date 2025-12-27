import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { hash } from 'bcrypt';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async getHash(password: string) {
    return await hash(password, 10);
  }

  create(name: string, email: string, passwordHash: string): Promise<Author> {
    const author = this.authorsRepository.create({ name, email, passwordHash });
    return this.authorsRepository.save(author);
  }

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  findById(id: string): Promise<Author | null> {
    return this.authorsRepository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<Author | null> {
    return this.authorsRepository.findOne({ where: { email } });
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
