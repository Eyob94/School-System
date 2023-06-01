import { Module } from '@nestjs/common';
import { SMSModule } from './SMS/sms.module';
import { EmailModule } from './Email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    SMSModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        VONAGE_API_KEY: configService.get('VONAGE_API_KEY'),
        VONAGE_API_SECRET: configService.get('VONAGE_API_SECRET'),
      }),
    }),
    EmailModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('host'),
        port: configService.get('mail_port'),
        user: configService.get('user'),
        password: configService.get('password'),
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        host: Joi.string().required(),
        mail_port: Joi.number().required(),
        user: Joi.string().required(),
        password: Joi.string().required(),
        VONAGE_API_KEY: Joi.string().required(),
        VONAGE_API_SECRET: Joi.string().required(),
        VONAGE_PHONE: Joi.string().required(),
        VONAGE_BRAND: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
