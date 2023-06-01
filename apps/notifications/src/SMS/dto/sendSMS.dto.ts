import { IsNotEmpty, IsString } from 'class-validator';

export class SendSMSDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
