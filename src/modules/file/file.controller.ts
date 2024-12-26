import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
} from '@nestjs/common';
// import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { ResType } from 'src/type';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file): ResType {
  //   this.fileService.uploadFile(file);
  //   return {
  //     code: 200,
  //     message: '上传成功',
  //     data: null,
  //   };
  // }
}
