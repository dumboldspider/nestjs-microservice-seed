import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BaseModule } from './base/base.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BaseModule],
  controllers: [],
  providers: [],
})
export class AppMicroserviceModule {}
