import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRole, type User } from 'generated/prisma';
import { BaseModel } from 'src/common/models/base.model';

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType({
  description: 'User model',
})
export class UserModel extends BaseModel implements User {
  @Field(() => String, {
    nullable: false,
    description: 'User full name',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'User email',
  })
  email: string;

  @Field(() => String, {
    nullable: false,
    description: 'User password',
  })
  password: string;

  @Field(() => UserRole, {
    nullable: false,
    description: 'User role',
  })
  role: UserRole;
}
