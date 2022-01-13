import { Errors } from './../common/errors.enum';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MessagesService {
  private messages: string[] = [];

  // get messages from the client
  async getMessages(): Promise<string[]> {
    return this.messages;
  }

  // save a message to the client
  async saveMessage(message: string) {
    // check if the message is empty
    if (message.trim().length === 0) {
      throw new RpcException(`${Errors.IS_EMPTY}: Message is empty`);
    }

    this.messages.push(message);
  }
}
