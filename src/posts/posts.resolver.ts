import { CreatePostDto } from './dtos/createPost.dto';
import { PostsService } from './posts.service';
import { Post } from '@prisma/client';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';

@Resolver('posts')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query('posts')
  async getPosts(): Promise<Post[]> {
    return this.postsService.getAllPosts();
  }
}
