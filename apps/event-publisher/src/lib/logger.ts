import { winstonConfig } from '@school/winston-logger';
import winston from 'winston';

export const logger = winston.createLogger(winstonConfig('event-publisher'));


