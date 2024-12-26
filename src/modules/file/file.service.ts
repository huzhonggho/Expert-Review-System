import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  uploadFile(file: File) {
    console.log(file);
  }
}
