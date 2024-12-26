import {
  Controller,
  UseGuards,
  Get,
  Post,
  Query,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResType } from 'src/type';
import { ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('addReview')
  async addReview(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.reviewService.addReview(
      body.reviewName,
      body.duration,
      body.isEnabled,
      body.description,
      body.memo,
      body.judges,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deleteReviews')
  async deleteReviews(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.reviewService.deleteReviews(body.ids);
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('updateReview')
  async updateReview(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.reviewService.updateReview(
      body.reviewId,
      body.reviewName,
      body.duration,
      body.isEnabled,
      body.description,
      body.memo,
      body.judges,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getReviews/:currentPage/:size')
  async getReviews(
    @Param('currentPage') currentPage: number,
    @Param('size') size: number,
    @Query('search') search: string,
  ): Promise<ResType> {
    const { flag, msg, data } = await this.reviewService.getReviews(
      currentPage,
      size,
      search,
    );
    if (!flag) {
      return { code: 500, message: msg, data };
    }
    return { code: 200, message: msg, data };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getReviewsBasic')
  async getReviewsBasic(@Query('search') search: string): Promise<ResType> {
    const { flag, msg, data } = await this.reviewService.getReviewsBasic(
      search,
    );
    if (!flag) {
      return { code: 500, message: msg, data };
    }
    return { code: 200, message: msg, data };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getReviewDetail')
  async getReviewDetail(@Query('reviewId') reviewId: number): Promise<ResType> {
    const { flag, msg, data } = await this.reviewService.getReviewDetail(
      reviewId,
    );
    if (!flag) {
      return { code: 500, message: msg, data };
    }
    return { code: 200, message: msg, data };
  }
}
