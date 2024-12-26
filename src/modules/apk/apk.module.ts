import { Module } from '@nestjs/common';
import { ApkController } from './apk.controller';
import { ApkService } from './apk.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apk } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Apk])],
  controllers: [ApkController],
  providers: [ApkService],
})
export class ApkModule {}
