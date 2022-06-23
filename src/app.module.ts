import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { GraphQLModule } from '@nestjs/graphql';
// import { join } from 'path';
import { ProxyRMQModule } from './proxyRMQ/proxyRMQ.module';
import { PrismaModule } from './prisma/prisma.module';
import { BaseModule } from './base/base.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   resolverValidationOptions: {
    //     requireResolversForResolveType: 'ignore',
    //   },
    // }),
    BaseModule,
    PrismaModule,
    ProxyRMQModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
