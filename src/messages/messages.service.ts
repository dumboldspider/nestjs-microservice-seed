import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  private messages: string[] = [];

  // get messages from the client
  async getMessages(): Promise<string[]> {
    return this.messages;
  }

  // save a message to the client
  async saveMessage(message: string) {
    this.messages.push(message);
  }
}
