import { RMQClientProxy } from './../proxyRMQ/RMQClientProxy';
import { MessagesService } from './messages.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  constructor(
    private clientProxy: RMQClientProxy,
    private readonly messagesService: MessagesService,
  ) {}

  private messagensClient = this.clientProxy.getClient('messages-queue');

  @Post()
  async saveMessage(@Body('message') message: string) {
    this.messagensClient.emit('saveMessage', message);
  }
}
