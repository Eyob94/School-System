import { KafkaConsumer } from '@school/kafka-consumer';
import { Kafka, logLevel } from 'kafkajs';

const consumer = new KafkaConsumer(
  'consumer-app',
  ['localhost:29092', 'localhost:39092'],
  `group-2`,
  logLevel.INFO,
  'main'
);

consumer.subscribe('paritioning', true);

const log = async (topic: string, partition: number, message: string | any) => {
  new Promise((resolve, _reject) => {
    resolve(
      console.log(`Received message:`, {
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    );
  });
};

consumer.run(log);
