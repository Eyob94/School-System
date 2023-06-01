import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendEmailDTO {
  @IsArray()
  @IsNotEmpty()
  recipients: string[];

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString()
  html: string;
}
