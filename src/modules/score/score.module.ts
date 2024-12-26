import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cadres, Review, Expert, Score } from 'src/entities';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([Expert]),
    TypeOrmModule.forFeature([Cadres]),
    TypeOrmModule.forFeature([Score]),
    AuthModule,
  ],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
