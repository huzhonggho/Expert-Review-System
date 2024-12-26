import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { User, Review, Expert, Cadres, Score, Apk } from 'src/entities';

// 数据库配置
export const escrowTypeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: '81.69.160.126',
  port: 3306,
  username: 'judge_demo',
  password: '123456',
  database: 'judge_demo',
  entities: [User, Review, Expert, Cadres, Score, Apk],
  synchronize: true,
});

// 邮箱配置(当前项目不需要)
export const escrowMailerModule = MailerModule.forRootAsync({
  useFactory: () => ({
    transport: '',
    defaults: {
      from: '',
    },
    template: {
      dir: join(__dirname, '../templates/email'),
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  }),
});

// 静态服务器配置
export const escrowServeStaticModule = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '../wwwroot'),
});
