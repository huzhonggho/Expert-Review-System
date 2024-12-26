import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cadres, Expert, Review, Score } from 'src/entities';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([Cadres]),
    TypeOrmModule.forFeature([Expert]),
    TypeOrmModule.forFeature([Score]),
    AuthModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
