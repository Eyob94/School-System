import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_CONFIG_OPTIONS } from './constants';
import { EmailOptions } from './types';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private mailer: Mail;

  constructor(@Inject(EMAIL_CONFIG_OPTIONS) private options: EmailOptions) {
    this.mailer = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      secure: true,
      auth: {
        user: options.user,
        pass: options.password,
      },
    });
  }

  verify() {
    return this.mailer.verify((err, success) => {
      if (err) {
        return false;
      } else {
        console.log('Accepting Emails', success);
        return true;
      }
    });
  }
}
