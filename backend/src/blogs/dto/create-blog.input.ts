import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBlogInput {
  @Field()
  content: string;
}
