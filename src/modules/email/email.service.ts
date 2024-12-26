import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail() {
    this.mailerService.sendMail({
      to: '3036646021@qq.com',
      from: 'lichengmingisme@foxmail.com',
      subject: '傻逼，别叫。我只是试试后端发送邮件',
      // html: '<b>*^____^*</b>',
      template: 'welcome',
    });
  }
}
