import { uuidValidate } from './../utils/uuidValidate';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from '.prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // get all users
  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  // get user by id
  async getUser(id: string): Promise<User> {
    // validate uuid
    uuidValidate(id);

    const existingUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    return existingUser;
  }

  // create user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // check if email is already in use
    const existingUserWithEmail = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (existingUserWithEmail) {
      throw new BadRequestException(
        `Email ${createUserDto.email} is already in use`,
      );
    }

    // create user
    return await this.prisma.user.create({
      data: {
        id: uuidv4(),
        name: createUserDto.name,
        email: createUserDto.email,
      },
    });
  }

  // update user
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // validate uuid
    uuidValidate(id);

    // check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    // if trying to change email, check if email is already in use
    if (updateUserDto.email) {
      const existingUserWithEmail = await this.prisma.user.findUnique({
        where: {
          email: updateUserDto.email,
        },
      });
      if (existingUserWithEmail) {
        throw new BadRequestException(
          `Email ${updateUserDto.email} is already in use`,
        );
      }
    }

    // if everything is ok, update user
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  // delete user
  async deleteUser(id: string): Promise<void> {
    // validate uuid
    uuidValidate(id);

    // check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    // delete user
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
