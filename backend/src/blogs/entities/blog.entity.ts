import { Field, ObjectType } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import { BlogEvent } from 'src/blog-events/entities/blog-event.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Blog {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column('text')
  title: string;

  @Field()
  @Column('text')
  content: string;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.blogs, { eager: true })
  author: Author;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Date)
  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => [BlogEvent], { nullable: true })
  @OneToMany(() => BlogEvent, (log) => log.blog)
  blogEvents?: BlogEvent[];
}
