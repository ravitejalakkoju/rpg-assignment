import { Field, ObjectType } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import { NotificationLog } from 'src/notification-logs/entities/notification-log.entity';
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

  @Field(() => [NotificationLog], { nullable: true })
  @OneToMany(() => NotificationLog, (log) => log.blog)
  notificationLogs?: NotificationLog[];
}
