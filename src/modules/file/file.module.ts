import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { diskStorage } from 'multer';
import { join } from 'path';
import { timeFormat } from 'src/utils/time-format';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        root: join(__dirname, '../uploads'),
        storage: diskStorage({
          destination: join(
            __dirname,
            `../uploads/${timeFormat(
              new Date().getTime(),
              'YYYY-MM-DD hh:mm:ss',
            )}`,
          ),
          filename: (req, file, cb) => {
            const filename = `${new Date().getTime()}.${
              file.mimetype.split('/')[1]
            }`;
            return cb(null, filename);
          },
        }),
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
