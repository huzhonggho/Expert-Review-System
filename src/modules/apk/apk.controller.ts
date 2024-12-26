import { Controller, Get } from '@nestjs/common';
import { ApkService } from './apk.service';
import { ResType } from 'src/type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Apk')
@Controller('apk')
export class ApkController {
  constructor(private apkService: ApkService) {}

  @Get('checkNew')
  async checkNew(): Promise<ResType> {
    const res = await this.apkService.checkNew();
    return { code: 200, message: '', data: res };
  }
}
