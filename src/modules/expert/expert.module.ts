import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Expert, Review } from 'src/entities';
import { ExpertController } from './expert.controller';
import { ExpertService } from './expert.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expert]),
    TypeOrmModule.forFeature([Review]),
    AuthModule,
  ],
  controllers: [ExpertController],
  providers: [ExpertService],
})
export class ExpertModule {}
