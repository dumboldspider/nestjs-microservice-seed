import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
  RmqOptions,
} from '@nestjs/microservices';

@Injectable()
export class RMQClientProxy {
  getClient(
    queue = process.env.RMQ_QUEUE,
    urls = [
      'amqp://' +
        process.env.RMQ_USER +
        ':' +
        process.env.RMQ_PASSWORD +
        '@' +
        process.env.RMQ_URL,
    ],
    options: RmqOptions = {},
  ): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      ...options,
      options: {
        urls,
        queue,
        ...options.options,
      },
    });
  }
}
