import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDTO } from './dto';

@Controller('email')
export class EmailController {
  private readonly logger: Logger = new Logger(EmailController.name);
  constructor(private emailService: EmailService) {}

  @Get('verify')
  async verify() {
    return await this.emailService.verify();
  }

  @Post('send')
  sendEmail(@Body() envelope: SendEmailDTO) {
    return this.emailService.sendEmail(envelope);
  }
}
