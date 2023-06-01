import { DynamicModule, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EMAIL_CONFIG_OPTIONS } from './constants';
import { EmailAsyncOptions } from './types';
import { EmailController } from './email.controller';

@Module({})
export class EmailModule {
  static registerAsync(options: EmailAsyncOptions): DynamicModule {
    return {
      module: EmailModule,
      imports: options.imports,
      controllers: [EmailController],
      providers: [
        {
          provide: EMAIL_CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        EmailService,
      ],
      exports: [EmailModule],
    };
  }
}
