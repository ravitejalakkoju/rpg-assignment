import { Field, ObjectType } from '@nestjs/graphql';
import { Blog } from 'src/blogs/entities/blog.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class BlogEvent {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column('text')
  event: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Blog)
  @ManyToOne(() => Blog, (blog) => blog.notificationLogs, { eager: true })
  blog: Blog;
}
