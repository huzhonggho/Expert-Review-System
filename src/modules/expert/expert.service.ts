import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Expert, Review } from 'src/entities';
import { AuthService } from '../auth/auth.service';
import { encryptPassword, judgePassword } from 'src/utils/bcrypt-util';
import * as XLSX from 'xlsx';

@Injectable()
export class ExpertService {
  constructor(
    @InjectRepository(Expert) private readonly expert: Repository<Expert>,
    @InjectRepository(Review) private readonly review: Repository<Review>,
    private readonly authService: AuthService,
  ) {}

  // 新增一位专家
  async addExpert(
    expertNumber: string,
    expertName: string,
    password: string,
    affiliate: string,
    duty: string,
    reviewId: number,
    memo: string,
  ): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    // 判空
    if (
      expertNumber == undefined ||
      expertNumber.trim() == '' ||
      expertName == undefined ||
      expertName.trim() == '' ||
      password == undefined ||
      password.trim() == '' ||
      affiliate == undefined ||
      affiliate.trim() == '' ||
      duty == undefined ||
      duty.trim() == '' ||
      reviewId == undefined
    ) {
      return { flag, msg: '请检查表单是否填写完整' };
    }

    // 判断reviewId是否存在
    const oldReview = await this.review.findOne({
      where: {
        reviewId: reviewId,
      },
    });
    if (oldReview == undefined) {
      return { flag, msg: '该评审规则字段不存在' };
    }

    // 判断expertNumber是否存在
    const oldExpert = await this.expert.findOne({
      where: {
        expertNumber: expertNumber,
      },
    });
    if (oldExpert != undefined) {
      const oldReview = await this.review.findOne({
        where: {
          reviewId: oldExpert.reviewId,
        },
      });
      return {
        flag,
        msg: `该专家号在评审项目《${oldReview.reviewName}》中已存在`,
      };
    }

    // 密码加密
    const hashPwd = encryptPassword(password);

    // 数据库添加字段
    const newExpert = new Expert();
    newExpert.expertNumber = expertNumber;
    newExpert.expertName = expertName;
    newExpert.password = hashPwd;
    newExpert.affiliate = affiliate;
    newExpert.duty = duty;
    newExpert.reviewId = reviewId;
    newExpert.memo = memo;
    try {
      await this.expert.save(newExpert);
    } catch {
      return { flag, msg: '数据库错误' };
    }

    flag = true;
    return { flag, msg: '添加成功' };
  }

  // 通过文件导入专家表
  async addManyExperts(
    file: File,
    reviewId: number,
  ): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    if (reviewId == undefined) {
      return { flag, msg: '请传递reviewId' };
    }

    // 判断reviewId是否存在
    const oldReview = await this.review.findOne({
      where: {
        reviewId: reviewId,
      },
    });
    if (oldReview == undefined) {
      return { flag, msg: '该评审规则字段不存在' };
    }

    //文件流转BinaryString
    function fixdata(data) {
      let o = '';
      let l = 0;
      const w = 10240;
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w)),
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    }

    // 读取 excel文件
    function outputWorkbook(workbook) {
      const sheetNames = workbook.SheetNames; // 工作表名称集合
      const data: { key: any; value: any }[] = [];
      sheetNames.forEach((name) => {
        const worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
        for (const key in worksheet) {
          // v是读取单元格的原始值
          data.push({
            key: key,
            value: key[0] === '!' ? worksheet[key] : worksheet[key].v,
          });
        }
      });
      return data;
    }

    const workbook = XLSX.read(btoa(fixdata((file as any).buffer)), {
      type: 'base64',
    });

    const res = outputWorkbook(workbook);

    const nameMap = {
      专家号: 'expertNumber',
      专家号码: 'expertNumber',
      专家名称: 'expertName',
      名称: 'expertName',
      姓名: 'expertName',
      登录密码: 'password',
      密码: 'password',
      单位: 'affiliate',
      职务: 'duty',
      备注: 'memo',
    };

    const expertList: {
      expertNumber?: string;
      expertName?: string;
      password?: string;
      affiliate?: string;
      duty?: string;
      memo?: string;
    }[] = [];

    try {
      let currentRow = 0;
      let num = 0;
      res.forEach((item) => {
        if (item.key.indexOf('!') && num <= 1) {
          const column = item.key.replace(/[0-9]/g, '');
          const row = parseInt(item.key.replace(/[A-Z]/g, ''));
          if (row === 1) {
            nameMap[column] = nameMap[item.value];
          } else {
            if (row === currentRow) {
              expertList[expertList.length - 1][nameMap[column]] =
                item.value.toString();
            } else {
              currentRow = row;
              expertList[expertList.length] = {};
              expertList[expertList.length - 1][nameMap[column]] =
                item.value.toString();
            }
          }
        } else {
          num++;
        }
      });
    } catch {
      return { flag, msg: '数据格式有误' };
    }

    let isPass = true;
    for (const i in expertList) {
      if (
        expertList[i].expertNumber == undefined ||
        expertList[i].expertNumber.trim() == '' ||
        expertList[i].expertName == undefined ||
        expertList[i].expertName.trim() == '' ||
        expertList[i].password == undefined ||
        expertList[i].password.trim() == '' ||
        expertList[i].affiliate == undefined ||
        expertList[i].affiliate.trim() == '' ||
        expertList[i].duty == undefined ||
        expertList[i].duty.trim() == ''
      ) {
        isPass = false;
        break;
      }
      if (expertList[i].memo == undefined) {
        expertList[i].memo = '';
      }
      expertList[i].password = encryptPassword(expertList[i].password);
    }
    if (!isPass) {
      return {
        flag,
        msg: '数据格式有误, 请检查是否有必填项(专家号、专家名称、登录密码、单位、职务)未填写',
      };
    }

    function duplicate(arr) {
      return new Set(arr).size == arr.length;
    }

    const expertNumberList = [];
    expertList.forEach((item) => {
      expertNumberList.push(item.expertNumber);
    });
    if (!duplicate(expertNumberList)) {
      return { flag, msg: '专家号中存在重复数据' };
    }
    const checkNumber = await this.expert.findOne({
      where: {
        expertNumber: In(expertNumberList),
      },
    });
    if (checkNumber != undefined) {
      const oldReview = await this.review.findOne({
        where: {
          reviewId: checkNumber.reviewId,
        },
      });
      return {
        flag,
        msg: `在评审项目《${oldReview.reviewName}》中, 专家号${checkNumber.expertNumber}已经存在`,
      };
    }

    const experts: Expert[] = [];
    expertList.forEach((item) => {
      const newExpert = new Expert();
      newExpert.expertNumber = item.expertNumber;
      newExpert.expertName = item.expertName;
      newExpert.password = item.password;
      newExpert.affiliate = item.affiliate;
      newExpert.duty = item.duty;
      newExpert.memo = item.memo;
      newExpert.reviewId = reviewId;
      experts.push(newExpert);
    });

    try {
      await this.expert.save(experts);
    } catch {
      return { flag, msg: '数据库错误' };
    }

    flag = true;
    return { flag, msg: '导入成功' };
  }

  // 删除专家
  async deleteExperts(ids: number[]): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    let res: any;
    try {
      res = await this.expert
        .createQueryBuilder('expert')
        .delete()
        .from(Expert)
        .where('expertId IN (:...ids)', { ids })
        .execute();
    } catch {
      return { flag, msg: '数据库错误' };
    }

    if (res.affected <= 0) {
      return { flag, msg: '未找到该字段' };
    }

    flag = true;
    return { flag, msg: '删除成功' };
  }

  // 修改专家
  async updateExpert(
    id: number,
    expertName: string,
    password: string,
    affiliate: string,
    duty: string,
    reviewId: number,
    memo: string,
  ): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    // 判空
    if (
      id == undefined ||
      expertName == undefined ||
      expertName.trim() == '' ||
      affiliate == undefined ||
      affiliate.trim() == '' ||
      duty == undefined ||
      duty.trim() == '' ||
      reviewId == undefined
    ) {
      return { flag, msg: '请检查表单是否填写完整' };
    }

    // 判断reviewId是否存在
    const oldReview = await this.review.findOne({
      where: {
        reviewId: reviewId,
      },
    });
    if (oldReview == undefined) {
      return { flag, msg: '该评审规则字段不存在' };
    }

    if (password == undefined || password.trim() == '') {
      // 上报数据库
      let res: any;
      try {
        res = await this.review
          .createQueryBuilder()
          .update(Expert)
          .set({
            expertName: expertName,
            affiliate: affiliate,
            duty: duty,
            reviewId: reviewId,
            memo: memo,
          })
          .where('expertId = :id', { id })
          .execute();
      } catch {
        return { flag, msg: '数据库错误' };
      }

      if (res.affected <= 0) {
        return { flag, msg: '未找到该字段' };
      }

      flag = true;
      return { flag, msg: '修改成功' };
    }

    // 密码加密
    const hashPwd = encryptPassword(password);

    // 上报数据库
    let res: any;
    try {
      res = await this.review
        .createQueryBuilder()
        .update(Expert)
        .set({
          expertName: expertName,
          password: hashPwd,
          affiliate: affiliate,
          duty: duty,
          reviewId: reviewId,
          memo: memo,
        })
        .where('expertId = :id', { id })
        .execute();
    } catch {
      return { flag, msg: '数据库错误' };
    }

    if (res.affected <= 0) {
      return { flag, msg: '未找到该字段' };
    }

    flag = true;
    return { flag, msg: '修改成功' };
  }

  // 重置专家密码
  async resetExpertPassword(
    id: number,
  ): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    if (id == undefined) {
      return { flag, msg: '请传递专家id号' };
    }

    // 密码加密
    const hashPwd = encryptPassword('123456');

    // 上报数据库
    let res: any;
    try {
      res = await this.review
        .createQueryBuilder()
        .update(Expert)
        .set({
          password: hashPwd,
        })
        .where('expertId = :id', { id })
        .execute();
    } catch {
      return { flag, msg: '数据库错误' };
    }

    if (res.affected <= 0) {
      return { flag, msg: '未找到该字段' };
    }

    flag = true;
    return { flag, msg: '已重置' };
  }

  // 查询专家
  async getExperts(
    currentPage: number,
    size: number,
    search: string,
    reviewId: number,
  ): Promise<{
    flag: boolean;
    msg: string;
    data: {
      total: number;
      list: any[];
    };
  }> {
    let flag = false;
    let experts: any;
    let total: number;
    const getCount = this.expert.createQueryBuilder('expert').where({
      expertName: Like(`%${search}%`),
    });
    const getList = this.expert
      .createQueryBuilder('expert')
      .select([
        'expertId',
        'expertNumber',
        'expertName',
        'affiliate',
        'duty',
        'reviewId',
        'memo',
      ])
      .take(size)
      .skip((currentPage - 1) * size)
      .where({
        expertName: Like(`%${search}%`),
      });
    if (reviewId != 0) {
      getCount.andWhere({
        reviewId: reviewId,
      });
      getList.andWhere({
        reviewId: reviewId,
      });
    }
    try {
      total = await getCount.getCount();
      experts = await getList.getRawMany();
      const ids = [];
      if (reviewId != 0) {
        ids.push(reviewId);
      } else {
        experts.forEach((item: any) => {
          ids.push(item.reviewId);
        });
      }
      const reviewNames = await this.review.find({
        select: ['reviewId', 'reviewName'],
        where: {
          reviewId: In(ids),
        },
      });
      experts.forEach((item: any) => {
        for (const i in reviewNames) {
          if (item.reviewId == reviewNames[i].reviewId) {
            item.reviewName = reviewNames[i].reviewName;
            break;
          }
        }
      });
    } catch {
      return { flag, msg: '数据库错误', data: null };
    }

    flag = true;
    return {
      flag,
      msg: '查询成功',
      data: {
        total,
        list: experts,
      },
    };
  }

  // 专家登录 username-专家号格式: expertName#expertId
  async expertLogin(
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
    let expert: any;
    try {
      expert = await this.expert.findOne({
        where: {
          expertNumber: username,
        },
      });
    } catch {
      return { flag, msg: '用户名或密码错误' };
    }
    if (expert == undefined) {
      return { flag, msg: '用户名或密码错误' };
    }
    if (!judgePassword(password, expert.password)) {
      return { flag, msg: '用户名或密码错误' };
    }

    const { token } = await this.authService.login(expert);

    flag = true;
    return { flag, msg: '登录成功', token };
  }
}
