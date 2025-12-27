import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field(() => String, { description: 'Author name' })
  name: string;

  @Field(() => String, { description: 'Author email' })
  email: string;

  @Field(() => String, { description: 'Author password' })
  password: string;
}
