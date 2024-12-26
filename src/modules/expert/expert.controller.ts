import {
  Controller,
  UseGuards,
  Get,
  Post,
  Query,
  Param,
  Body,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResType } from 'src/type';
import { ApiTags } from '@nestjs/swagger';
import { ExpertService } from './expert.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Expert')
@Controller('expert')
export class ExpertController {
  constructor(private expertService: ExpertService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('addExpert')
  async addExpert(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.expertService.addExpert(
      body.expertNumber,
      body.expertName,
      body.password,
      body.affiliate,
      body.duty,
      body.reviewId,
      body.memo,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('addManyExperts')
  @UseInterceptors(FileInterceptor('file'))
  async addManyExperts(@UploadedFile() file, @Body() body): Promise<ResType> {
    const { flag, msg } = await this.expertService.addManyExperts(
      file,
      body.reviewId,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deleteExperts')
  async deleteExperts(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.expertService.deleteExperts(body.ids);
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('updateExpert')
  async updateExpert(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.expertService.updateExpert(
      body.expertId,
      body.expertName,
      body.password,
      body.affiliate,
      body.duty,
      body.reviewId,
      body.memo,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('resetExpertPassword')
  async resetExpertPassword(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.expertService.resetExpertPassword(
      body.expertId,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getExperts/:currentPage/:size')
  async getExperts(
    @Param('currentPage') currentPage: number,
    @Param('size') size: number,
    @Query('search') search: string,
    @Query('reviewId') reviewId: number,
  ): Promise<ResType> {
    const { flag, msg, data } = await this.expertService.getExperts(
      currentPage,
      size,
      search,
      reviewId,
    );
    if (!flag) {
      return { code: 500, message: msg, data };
    }
    return { code: 200, message: msg, data };
  }

  @UseGuards(AuthGuard('local'))
  @Post('expertLogin')
  async login(@Body() body): Promise<ResType> {
    const { flag, msg, token } = await this.expertService.expertLogin(
      body.username,
      body.password,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: { token } };
  }
}
