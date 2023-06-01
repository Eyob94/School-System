import { Module } from '@nestjs/common';
import { SMSModule } from './SMS/sms.module';
import { EmailModule } from './Email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    SMSModule,
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
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
