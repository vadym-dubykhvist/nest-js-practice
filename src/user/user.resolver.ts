import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UserRole, type User } from 'generated/prisma';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorization(UserRole.ADMIN)
  @Query(() => [UserModel], {
    name: 'getAllUsers',
    description: 'Getting all users from database',
  })
  async getUsers() {
    return await this.userService.findAll();
  }

  @Authorization()
  @Query(() => UserModel)
  getMe(@Authorized() user: User) {
    return user;
  }
}
