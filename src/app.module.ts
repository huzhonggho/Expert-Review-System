import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleWare } from './common/middleware/logger.middleware';
import {
  AuthModule,
  // EmailModule,
  // FileModule,
  UserModule,
  ReviewModule,
  ExpertModule,
  CadresModule,
  ScoreModule,
  ApkModule,
} from './modules';
import {
  // escrowMailerModule,
  escrowServeStaticModule,
  escrowTypeOrmModule,
} from './escrow-modules';
// import { ScheduleModule } from '@nestjs/schedule';
// import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    escrowServeStaticModule,
    escrowTypeOrmModule,
    // escrowMailerModule,
    // ScheduleModule.forRoot(),
    // TasksModule,
    AuthModule,
    UserModule,
    // EmailModule,
    // FileModule,
    ReviewModule,
    ExpertModule,
    CadresModule,
    ScoreModule,
    ApkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      // .exclude({ path: 'hello', method: RequestMethod.GET })
      .forRoutes('hello');
  }
}
