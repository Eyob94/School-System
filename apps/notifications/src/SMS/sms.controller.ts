import { Body, Controller, Get, Post } from '@nestjs/common';
import { SMSService } from './sms.service';
import { SendSMSDto } from './dto';

@Controller('sms')
export class SMSController {
  constructor(private smsService: SMSService) {}

  @Post('send')
  async sendSMS(@Body() envelope: SendSMSDto) {
    return await this.smsService.sendSMS(envelope);
  }

  @Get('verify')
  async verifyService() {
    return await this.smsService.verify();
  }
}
