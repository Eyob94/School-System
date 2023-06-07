import winston from 'winston';
import { WinstonModuleOptions } from 'nest-winston';

const customColors = {
  info: 'green',
  error: 'red',
  warn: 'yellow',
  silly: 'gray',
  debug: 'cyan',
  verbose: 'white',
};

const colorizer = winston.format.colorize({ colors: customColors });

export const winstonConfig = (app: string): WinstonModuleOptions => {
  return {
    level: 'info',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: `logs/${app}/${app}-${new Date().toDateString()}.log`,
      }),
    ],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf((info) => {
        const { timestamp, level, message } = info;
        return `${new Date(
          timestamp
        ).toLocaleTimeString()} ${colorizer.colorize(
          level,
          `[${level.toUpperCase()}]: ${message}`
        )} `;
      })
    ),
  };
};
