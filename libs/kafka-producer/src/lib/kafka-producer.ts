import { winstonConfig } from '@school/winston-logger';
import { Admin, Kafka, Producer } from 'kafkajs';
import { Logger } from 'winston';
import winston = require('winston');

export class KafkaProducer {
  private logger: Logger;
  private admin: Admin;
  private producer: Producer;
  producerConnected: boolean;

  constructor(clientId: string, brokers: string[], app: string) {
    try {
      const kafka = new Kafka({
        clientId,
        brokers,
        connectionTimeout: 5000,
      });
      this.logger = winston.createLogger(winstonConfig(`${app}-producer`));

      this.admin = kafka.admin();
      this.producer = kafka.producer();
      this.connectProducer();

      //Log and set producerConnected to false upon producer disconnection
      this.producer.on('producer.disconnect', () => {
        this.producerConnected = false;
        this.logger.warn(`${app}-producer disconnected`);
      });

      //Log and set producerConnected to true upon producer connection
      this.producer.on('producer.connect', () => {
        this.producerConnected = true;
        this.logger.info(`${app}-producer connected`);
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  async connectProducer() {
    await this.producer.connect();
  }

  private async createTopic(topic: string, numPartitions: number) {
    await this.admin.connect();
    this.logger.info('Admin connected successfully');
    await this.admin.createTopics({
      topics: [
        {
          topic,
          numPartitions,
        },
      ],
    });

    this.logger.info(`Topic ${topic} created successfully`);
    await this.admin.disconnect();
    this.logger.warn('Admin disconnected successfully');
  }

  async disconnectProducer() {
    await this.producer.disconnect();
  }

  async publishMessage(topic: string, message: any, partition?: number) {
    if (!this.producerConnected) {
      this.logger.error('Producer not connected');
      return;
    }

    const topicExists = await this.admin
      .listTopics()
      .then((topics) => topics.includes(topic));
    if (!topicExists) {
      await this.createTopic(topic, 2);
    }
    try {
      const topicMetadata = await this.admin.fetchTopicMetadata({
        topics: [topic],
      });
      const partitionMetadata = topicMetadata.topics?.[0].partitions;

      if (
        partition &&
        (partition >= partitionMetadata.length || partition < 0)
      ) {
        this.logger.error('Invalid partition');
        return;
      }

      const produced = await this.producer
        .send({
          topic,
          messages: [{ partition, value: JSON.stringify(message) }],
        })
        .then((e) => e)
        .catch((e) => this.logger.error(e.message));

      this.logger.info(
        `Message published successfully to topic "${produced?.[0].topicName}" and partition "${produced?.[0].partition}"`
      );
    } catch (e) {
      this.logger.error('Error in publishing message', e);
    }
  }
}
