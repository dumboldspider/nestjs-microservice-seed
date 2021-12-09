import { MessagesModule } from './messages/messages.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MessagesModule],
  controllers: [],
  providers: [],
})
export class AppMicroserviceModule {}
