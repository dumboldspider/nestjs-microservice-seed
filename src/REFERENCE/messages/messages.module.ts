import { MessagesListenerController } from './messages.listener';
import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxyRMQ/proxyRMQ.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [ProxyRMQModule],
  controllers: [MessagesController, MessagesListenerController],
  providers: [MessagesService],
})
export class MessagesModule {}
