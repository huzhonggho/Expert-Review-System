import { Controller, UseGuards, Get, Post, Query, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResType } from 'src/type';
import { ApiTags } from '@nestjs/swagger';
import { ScoreService } from './score.service';

@ApiTags('Score')
@Controller('score')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('addScores')
  async addScores(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.scoreService.addScores(body.data);
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getScoresAndCadres')
  async getScoresAndCadres(
    @Query('reviewId') reviewId,
    @Query('expertId') expertId,
  ): Promise<ResType> {
    const { flag, msg, data } = await this.scoreService.getScoresAndCadres(
      reviewId,
      expertId,
    );
    if (!flag) {
      return { code: 500, message: msg, data };
    }
    return { code: 200, message: msg, data };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('checkExpertOccur')
  async checkExpertOccur(
    @Query('reviewId') reviewId,
    @Query('expertId') expertId,
  ): Promise<ResType> {
    const { flag, msg } = await this.scoreService.checkExpertOccur(
      reviewId,
      expertId,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getScores')
  async getScores(@Query('reviewId') reviewId): Promise<ResType> {
    const { flag, msg, data } = await this.scoreService.getScores(reviewId);
    if (!flag) {
      return { code: 500, message: msg, data };
    }
    return { code: 200, message: msg, data };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('exportExcel')
  async exportExcel(@Query('reviewId') reviewId): Promise<ResType> {
    const { flag, msg, data } =
      await this.scoreService.exportExcelOfScoresByReviewId(reviewId);
    if (!flag) {
      return { code: 500, message: msg, data };
    }
    return { code: 200, message: msg, data };
  }
}
