import { Inject, Injectable, Logger } from '@nestjs/common';
import { EMAIL_CONFIG_OPTIONS } from './constants';
import { EmailOptions } from './types';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { SendEmailDTO } from './dto';

@Injectable()
export class EmailService {
  private mailer: Mail;
  private readonly logger: Logger = new Logger(EmailService.name);

  constructor(@Inject(EMAIL_CONFIG_OPTIONS) private options: EmailOptions) {
    this.mailer = nodemailer.createTransport({
      host: this.options.host,
      port: this.options.port,
      secure: this.options.port == 465,
      auth: {
        user: this.options.user,
        pass: this.options.password,
      },
    });
  }

  async verify() {
    return new Promise((resolve, reject) => {
      this.mailer.verify((err, _success) => {
        if (err) {
          this.logger.error('Verification failed');
          reject({ verfication: 'failed', err });
        } else {
          this.logger.log('Verification succeeded');
          resolve({
            verification: 'successful',
            message: 'Server accepting Emails',
          });
        }
      });
    });
  }

  async sendEmail(envelope: SendEmailDTO) {
    return await this.mailer.sendMail({
      from: 'eyobmalik@gmail.com',
      to: envelope.recipients,
      ...envelope,
    });
  }
}
