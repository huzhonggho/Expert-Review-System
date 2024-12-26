import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apk } from 'src/entities';

@Injectable()
export class ApkService {
  constructor(@InjectRepository(Apk) private readonly apk: Repository<Apk>) {}

  async checkNew(): Promise<any> {
    const res = await this.apk.findOne({
      where: {
        appId: 1,
      },
    });
    return res;
  }
}
