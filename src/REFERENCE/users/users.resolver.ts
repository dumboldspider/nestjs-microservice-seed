import { CreateUserDto } from './dtos/createUser.dto';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';

@Resolver('users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  async getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
