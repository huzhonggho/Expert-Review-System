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
import { CadresService } from './cadres.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Cadres')
@Controller('cadres')
export class CadresController {
  constructor(private cadresService: CadresService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('addCadres')
  async addCadres(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.cadresService.addCadres(
      body.cadresNumber,
      body.cadresName,
      body.dept,
      body.position,
      body.orders,
      body.reviewId,
      body.introduction,
      body.gender,
      body.birth,
      body.nation,
      body.party,
      body.joinTime,
      body.title,
      body.dutyTime,
      body.getTime,
      body.publishTime,
      body.teachingTitle,
      body.duties,
      body.education,
      body.degree,
      body.graduation,
      body.major,
      body.graduateTime,
      body.nativePlace,
      body.description,
      body.memo,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('addManyCadres')
  @UseInterceptors(FileInterceptor('file'))
  async addManyCadres(@UploadedFile() file, @Body() body): Promise<ResType> {
    const { flag, msg } = await this.cadresService.addManyCadres(
      file,
      body.reviewId,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deleteCadres')
  async deleteCadres(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.cadresService.deleteCadres(body.ids);
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('updateCadres')
  async updateCadres(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.cadresService.updateCadres(
      body.cadresId,
      body.cadresNumber,
      body.cadresName,
      body.dept,
      body.position,
      body.orders,
      body.reviewId,
      body.introduction,
      body.gender,
      body.birth,
      body.nation,
      body.party,
      body.joinTime,
      body.title,
      body.dutyTime,
      body.getTime,
      body.publishTime,
      body.teachingTitle,
      body.duties,
      body.education,
      body.degree,
      body.graduation,
      body.major,
      body.graduateTime,
      body.nativePlace,
      body.description,
      body.memo,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getCadresBasic/:currentPage/:size')
  async getCadresBasic(
    @Param('currentPage') currentPage: number,
    @Param('size') size: number,
    @Query('search') search: string,
    @Query('reviewId') reviewId: number,
  ): Promise<ResType> {
    const { flag, msg, data } = await this.cadresService.getCadresBasic(
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

  @UseGuards(AuthGuard('jwt'))
  @Get('getCadresDetailByReviewId')
  async getCadresDetailByReviewId(
    @Param('currentPage') currentPage: number,
    @Param('size') size: number,
    @Query('search') search: string,
    @Query('reviewId') reviewId: number,
  ): Promise<ResType> {
    const { flag, msg, data } =
      await this.cadresService.getCadresDetailByReviewId(reviewId);
    if (!flag) {
      return { code: 500, message: msg, data };
    }
    return { code: 200, message: msg, data };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getCadresDetailByCadresId')
  async getCadresDetailByCadresId(
    @Query('cadresId') cadresId: number,
  ): Promise<ResType> {
    const { flag, msg, data } =
      await this.cadresService.getCadresDetailByCadresId(cadresId);
    if (!flag) {
      return { code: 500, message: msg, data };
    }
    return { code: 200, message: msg, data };
  }
}
