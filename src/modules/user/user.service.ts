import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Expert } from 'src/entities';
import { encryptPassword, judgePassword } from '../../utils/bcrypt-util';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Expert) private readonly expert: Repository<Expert>,
    private readonly authService: AuthService,
  ) {}

  // 获取所有用户信息
  async getAllUsers(): Promise<any> {
    const res = await this.user.find();
    return res;
  }

  // 登录
  async login(
    username: string,
    password: string,
  ): Promise<{ flag: boolean; msg: string; token?: string }> {
    let flag = false;

    // username 和 password 是否为空
    if (
      username == undefined ||
      username.trim() == '' ||
      password == undefined ||
      password.trim() == ''
    ) {
      return { flag, msg: '用户名或密码不可为空' };
    }

    // 在数据库里查找用户相关信息
    const user = await this.user.findOne({
      where: {
        username: username,
      },
    });
    if (user == undefined) {
      return { flag, msg: '用户名或密码错误' };
    }
    if (!judgePassword(password, user.password)) {
      return { flag, msg: '用户名或密码错误' };
    }

    const { token } = await this.authService.login(user);

    flag = true;
    return { flag, msg: '登录成功', token };
  }

  // 根据原来的token请求一个新的token
  async getNewToken(
    id: number,
    type: string,
  ): Promise<{ flag: boolean; msg: string; token?: string }> {
    let flag = false;

    // 在数据库里查找用户相关信息
    let user = undefined;
    if (type == 'user') {
      user = await this.user.findOne({
        where: {
          userId: id,
        },
      });
    } else if (type == 'expert') {
      user = await this.expert.findOne({
        where: {
          expertId: id,
        },
      });
    }
    if (user == undefined) {
      return { flag, msg: '该用户不存在' };
    }

    const { token } = await this.authService.login(user);

    flag = true;
    return { flag, msg: '登录成功', token };
  }

  // 添加新用户
  async addNewUser(
    username: string,
    password: string,
    userType: string,
    dept: string,
    memo: string,
  ): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    // username 和 password 是否为空
    if (
      username == undefined ||
      username.trim() == '' ||
      password == undefined ||
      password.trim() == ''
    ) {
      return { flag, msg: '用户名或密码不可为空' };
    }

    // 过滤最高级管理员
    if (userType === 'admin') {
      return { flag, msg: '不可以添加最高级管理员' };
    }

    // 判断用户名是否存在
    const oldUser = await this.user.findOne({
      where: {
        username: username,
      },
    });
    if (oldUser != undefined) {
      return { flag, msg: '该用户名已存在' };
    }

    // 密码加密
    const hashPwd = encryptPassword(password);

    // 数据库添加字段
    const newUser = new User();
    newUser.username = username;
    newUser.password = hashPwd;
    newUser.userType = userType;
    newUser.dept = dept;
    newUser.memo = memo;
    try {
      await this.user.save(newUser);
    } catch {
      return { flag, msg: '数据库错误' };
    }

    flag = true;
    return { flag, msg: '添加成功' };
  }

  // 修改密码
  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<{ flag: boolean; msg: string }> {
    let flag = false;
    let oldUser: User;

    if (
      oldPassword == undefined ||
      oldPassword.trim() == '' ||
      newPassword == undefined ||
      newPassword.trim() == '' ||
      confirmPassword == undefined ||
      confirmPassword.trim() == ''
    ) {
      return { flag, msg: '请检查表单是否填写完整' };
    }

    if (newPassword !== confirmPassword) {
      return { flag, msg: '两次密码不相同' };
    }

    try {
      oldUser = await this.user.findOne({
        where: {
          userId: userId,
        },
      });
    } catch {
      return { flag, msg: '数据库错误' };
    }

    if (!judgePassword(oldPassword, oldUser.password)) {
      return { flag, msg: '原密码错误' };
    }

    try {
      await this.user
        .createQueryBuilder()
        .update(User)
        .set({
          password: encryptPassword(newPassword),
        })
        .where({
          userId: userId,
        })
        .execute();
    } catch {
      return { flag, msg: '数据库错误' };
    }

    flag = true;
    return { flag, msg: '修改成功' };
  }
}
