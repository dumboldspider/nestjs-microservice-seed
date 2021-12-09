import { PostsResolver } from './posts.resolver';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [PrismaModule],
  providers: [PostsService, PostsResolver],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
