import { CreatePostDto } from './dtos/createPost.dto';
import { PostsService } from './posts.service';
import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Get all posts
  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  // Get a post by id
  @Get('/:id')
  async getPostById(@Param('id') id: string) {
    return await this.postsService.getPostById(id);
  }

  // create a post
  @Post()
  @UsePipes(ValidationPipe)
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.createPost(createPostDto);
  }

  @Put('/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: CreatePostDto,
  ) {
    return await this.postsService.updatePost(id, updatePostDto);
  }

  // Delete a post by id
  @Delete('/:id')
  async deletePostById(@Param('id') id: string) {
    await this.postsService.deletePostById(id);
  }
}
