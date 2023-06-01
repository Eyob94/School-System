import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { SMS_CONFIG_OPTIONS } from './constants';
import { SMSOptions } from './types';
import { Vonage } from '@vonage/server-sdk';
import { ConfigService } from '@nestjs/config';
import { SendSMSDto } from './dto';

@Injectable()
export class SMSService {
  private readonly messager: Vonage;
  private readonly logger: Logger = new Logger(SMSService.name);
  constructor(
    @Inject(SMS_CONFIG_OPTIONS) private readonly options: SMSOptions,
    private configService: ConfigService
  ) {
    this.messager = new Vonage(
      //@ts-expect-error arss
      {
        apiKey: this.options.VONAGE_API_KEY,
        apiSecret: this.options.VONAGE_API_SECRET,
      }
    );
  }

  async sendSMS(envelope: SendSMSDto) {
    return await this.messager.sms
      .send({
        text: envelope.text,
        to: this.configService.get('VONAGE_PHONE'),
        from: this.configService.get('VONAGE_BRAND'),
      })
      .then((resp) => {
        this.logger.log(resp);
        return { sms: 'successful' };
      })
      .catch((err) => {
        this.logger.error(err);
        throw new HttpException('SMS FAILED', err.code);
      });
  }

  async verify() {
    return await this.messager.verify
      .start({
        number: this.configService.get('VONAGE_PHONE'),
        brand: this.configService.get('VONAGE_BRAND'),
      })
      .then((resp) => {
        this.logger.log('response', resp);
        return { verification: 'successful' };
      })
      .catch((err) => {
        this.logger.error(err);
        throw new HttpException({ verification: 'failed' }, err.code);
      });
  }
}
