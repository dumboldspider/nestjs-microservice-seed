import { Errors } from './../common/errors.enum';
import { uuidValidate } from './../utils/uuidValidate';
import { CreatePostDto } from './dtos/createPost.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Post } from '.prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  // get all posts
  async getAllPosts(): Promise<Post[]> {
    return await this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  // get post by id
  async getPostById(id: string): Promise<Post> {
    // validate uuid
    uuidValidate(id);

    // check if post exists
    const existingPost = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!existingPost) {
      throw new NotFoundException(
        `${Errors.NOT_FOUND}: Post with id ${id} does not exist`,
      );
    }

    return existingPost;
  }

  // create post
  async createPost(data: CreatePostDto): Promise<Post> {
    const existingAuthor = await this.prisma.user.findUnique({
      where: {
        id: data.authorId,
      },
    });
    if (!existingAuthor) {
      throw new NotFoundException(
        `${Errors.NOT_FOUND}: Author with id ${data.authorId} does not exist`,
      );
    }

    return await this.prisma.post.create({
      data: {
        id: uuidv4(),
        title: data.title,
        content: data.content,
        published: data.published,
        authorId: data.authorId,
      },
    });
  }

  // update post
  async updatePost(id: string, data: CreatePostDto): Promise<Post> {
    // validate uuid
    uuidValidate(id);

    // check if post exists
    const existingPost = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!existingPost) {
      throw new NotFoundException(
        `${Errors.NOT_FOUND}: Post with id ${id} does not exist`,
      );
    }

    // if update authorId, check if author exists
    if (data.authorId) {
      const existingAuthor = await this.prisma.user.findUnique({
        where: {
          id: data.authorId,
        },
      });
      if (!existingAuthor) {
        throw new NotFoundException(
          `${Errors.NOT_FOUND}: Author with id ${data.authorId} does not exist`,
        );
      }
    }

    return await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        authorId: data.authorId,
      },
    });
  }

  // delete post
  async deletePostById(id: string): Promise<void> {
    // validate uuid
    uuidValidate(id);

    const existingPost = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!existingPost) {
      throw new NotFoundException(
        `${Errors.NOT_FOUND}: Post with id ${id} does not exist`,
      );
    }

    await this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
