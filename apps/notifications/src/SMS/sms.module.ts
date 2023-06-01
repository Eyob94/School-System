import { DynamicModule, Module } from '@nestjs/common';
import { SMSController } from './sms.controller';
import { SMSService } from './sms.service';
import { SMS_CONFIG_OPTIONS } from './constants';
import { SMSAsyncOptions } from './types';

@Module({})
export class SMSModule {
  static registerAsync(options: SMSAsyncOptions): DynamicModule {
    return {
      module: SMSModule,
      imports: options.imports,
      controllers: [SMSController],
      providers: [
        {
          provide: SMS_CONFIG_OPTIONS,
          inject: options.inject,
          useFactory: options.useFactory,
        },
        SMSService,
      ],
      exports: [SMSModule],
    };
  }
}
