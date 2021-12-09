import { RMQClientProxy } from './../proxyRMQ/RMQClientProxy';
import { MessagesService } from './messages.service';
import { Controller, Post } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class MessagesListenerController {
  constructor(private readonly messagesService: MessagesService) {}

  @EventPattern('saveMessage')
  async saveMessage(@Payload() message: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef(); // get channel ref
    const originalMessage = context.getMessage(); // get original message

    console.log(message);

    try {
    } catch {}
  }
}
