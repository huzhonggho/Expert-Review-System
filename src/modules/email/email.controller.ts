import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { ResType } from 'src/type';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  // @Post('send')
  // sendEmail(): ResType {
  //   this.emailService.sendEmail();

  //   return {
  //     code: 200,
  //     message: '邮件已发送',
  //     data: null,
  //   };
  // }
}
