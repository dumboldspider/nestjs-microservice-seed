import { RMQClientProxy } from './RMQClientProxy';
import { Module } from '@nestjs/common';

@Module({
  providers: [RMQClientProxy],
  exports: [RMQClientProxy],
})
export class ProxyRMQModule {}
