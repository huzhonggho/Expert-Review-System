import {
  Controller,
  Request,
  UseGuards,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { ResType } from 'src/type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body): Promise<ResType> {
    const { flag, msg, token } = await this.userService.login(
      body.username,
      body.password,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: { token } };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getNewToken')
  async getNewToken(@Request() req): Promise<ResType> {
    let id: number;
    let type: string;
    if (req.user.userId != undefined) {
      id = req.user.userId;
      type = 'user';
    } else if (req.user.expertId != undefined) {
      id = req.user.expertId;
      type = 'expert';
    } else {
      return { code: 500, message: '请传递正确的token', data: null };
    }

    const { flag, msg, token } = await this.userService.getNewToken(id, type);

    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: { token } };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('testToken')
  testLogin(): ResType {
    return {
      code: 200,
      message: '请求成功',
      data: null,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async register(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.userService.addNewUser(
      body.username,
      body.password,
      body.userType,
      body.dept,
      body.memo,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('changePassword')
  async changePassword(@Request() req, @Body() body): Promise<ResType> {
    const { flag, msg } = await this.userService.changePassword(
      req.user.userId,
      body.oldPassword,
      body.newPassword,
      body.confirmPassword,
    );
    if (!flag) {
      return { code: 500, message: msg, data: null };
    }
    return { code: 200, message: msg, data: null };
  }
}
