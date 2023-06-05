import { Admin, Kafka, Producer } from 'kafkajs';
import { logger } from '../lib';

class KafkaService {
  private admin: Admin;
  private producer: Producer;
  constructor(clientId: string, brokers: string[]) {
    try {
      const kafka = new Kafka({
        clientId,
        brokers,
        connectionTimeout: 5000,
      });

      this.admin = kafka.admin();
      this.producer = kafka.producer();
      this.connectProducer();
    } catch (e) {
      logger.error(e);
    }
  }

  private async connectProducer() {
    await this.producer.connect();
    logger.info('Producer connected successfully');
  }

  private async createTopic(topic: string, numPartitions: number) {
    await this.admin.connect();
    logger.info('Admin connected successfully');
    await this.admin.createTopics({
      topics: [
        {
          topic,
          numPartitions,
        },
      ],
    });

    logger.info(`Topic ${topic} created successfully`);
    await this.admin.disconnect();
    logger.warn('Admin disconnected successfully');
  }

  private async disconnectProducer() {
    await this.producer.disconnect();
    logger.warn('Producer disconnected successfully');
  }

  async publishMessage(topic: string, message) {
    const topicExists = await this.admin
      .listTopics()
      .then((topics) => topics.includes(topic));
    if (!topicExists) {
      await this.createTopic(topic, 1);
    }
    try {
      await this.producer
        .send({
          topic,
          messages: [{ value: message }],
        })
        .catch((e) => logger.error(e.message));

      logger.info('Message published successfully');
    } catch (e) {
      logger.error('Error in publishing message', e);
    } finally {
      this.disconnectProducer();
    }
  }
}

export default KafkaService;
