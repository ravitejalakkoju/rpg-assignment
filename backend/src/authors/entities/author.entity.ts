import { Field, ObjectType } from '@nestjs/graphql';
import { Blog } from 'src/blogs/entities/blog.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Author {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String, { description: 'Author email' })
  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => [Blog], { nullable: true })
  @OneToMany(() => Blog, (blog) => blog.author)
  blogs?: Blog[];
}
