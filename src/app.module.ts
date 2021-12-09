import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ProxyRMQModule } from './proxyRMQ/proxyRMQ.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolverValidationOptions: {
        requireResolversForResolveType: 'ignore',
      },
    }),
    PrismaModule,
    ProxyRMQModule,
    UsersModule,
    PostsModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
