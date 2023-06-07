import { winstonConfig } from '@school/winston-logger';
import { Consumer, Kafka, logLevel } from 'kafkajs';
import { Logger } from 'winston';
import winston = require('winston');

export class KafkaConsumer {
  private consumer: Consumer;
  private logger: Logger;

  constructor(
    clientId: string,
    brokers: string[],
    groupId: string,
    logLevel: logLevel,
    app: string
  ) {
    const kafka = new Kafka({
      clientId,
      brokers,
      logLevel,
    });
    this.consumer = kafka.consumer({ groupId });
    this.consumer.connect();
    this.logger = winston.createLogger(winstonConfig(`${app}-producer`));
  }

  getConsumer() {
    return this.consumer;
  }

  async subscribe(topic: string, fromBeginning = true) {
    await this.consumer.subscribe({ topic, fromBeginning });
  }

  async unsubscribe() {
    await this.consumer.disconnect();
  }

  async run(
    cb: (topic: string, partition: number, message: any) => void | Promise<void>
  ) {
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        await cb(topic, partition, message);
        await this.consumer.commitOffsets([
          { topic, partition, offset: String(Number(message.offset) + 1) },
        ]);
      },
      eachBatchAutoResolve: false,
    });

    this.consumer.on('consumer.crash', (e) =>
      this.logger.error(`Consumer crashed: ${e}`)
    );
  }
}
