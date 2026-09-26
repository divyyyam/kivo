import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { connectProducer, disconnectProducer, publish } from '@repo/kafka';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await connectProducer();
  }
  async onModuleDestroy() {
    await disconnectProducer();
  }

  async publish<T>(topic: string, key: string, event: T) {
    return publish(topic, key, event);
  }
}
