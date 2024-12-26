import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Cadres, Expert, Review, Score } from 'src/entities';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Cadres) private readonly cadres: Repository<Cadres>,
    @InjectRepository(Expert) private readonly expert: Repository<Expert>,
    @InjectRepository(Review) private readonly review: Repository<Review>,
    @InjectRepository(Score) private readonly score: Repository<Score>,
    private readonly authService: AuthService,
  ) {}

  // 新增一条评审规则
  async addReview(
    reviewName: string,
    duration: number,
    isEnabled: boolean,
    description: string,
    memo: string,
    judges: { key: string; value: string }[],
  ): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    // 判空
    if (
      reviewName == undefined ||
      reviewName.trim() == '' ||
      duration == undefined ||
      isEnabled == undefined ||
      description == undefined ||
      description.trim() == '' ||
      judges == undefined ||
      judges.length <= 0
    ) {
      return { flag, msg: '请检查表单是否填写完整' };
    }

    // 判断评审名称是否存在
    const oldReview = await this.review.findOne({
      where: {
        reviewName: reviewName,
      },
    });
    if (oldReview != undefined) {
      return { flag, msg: '该评审名称已存在' };
    }

    // 数据库添加字段
    const newReview = new Review();
    newReview.reviewName = reviewName;
    newReview.duration = duration;
    newReview.isEnabled = isEnabled == true ? 1 : 0;
    newReview.description = description;
    newReview.createDate = new Date().getTime().toString();
    newReview.memo = memo;
    newReview.judges = JSON.stringify(judges);
    try {
      await this.review.save(newReview);
    } catch {
      return { flag, msg: '数据库错误' };
    }

    flag = true;
    return { flag, msg: '添加成功' };
  }

  // 删除评审规则
  async deleteReviews(ids: number[]): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    let res: any;
    try {
      await this.review.manager.transaction(async () => {
        res = await this.review
          .createQueryBuilder('review')
          .delete()
          .from(Review)
          .where('reviewId IN (:...ids)', { ids })
          .execute();
        await this.expert
          .createQueryBuilder('expert')
          .delete()
          .from(Expert)
          .where('reviewId IN (:...ids)', { ids })
          .execute();
        await this.cadres
          .createQueryBuilder('cadres')
          .delete()
          .from(Cadres)
          .where('reviewId IN (:...ids)', { ids })
          .execute();
        await this.score
          .createQueryBuilder('score')
          .delete()
          .from(Score)
          .where('reviewId IN (:...ids)', { ids })
          .execute();
      });
    } catch {
      return { flag, msg: '数据库错误' };
    }

    if (res.affected <= 0) {
      return { flag, msg: '未找到该字段' };
    }

    flag = true;
    return { flag, msg: '删除成功' };
  }

  // 修改评审规则
  async updateReview(
    id: number,
    reviewName: string,
    duration: number,
    isEnabled: boolean,
    description: string,
    memo: string,
    judges: { key: string; value: string }[],
  ): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    // 判空
    if (
      id == undefined ||
      reviewName == undefined ||
      reviewName.trim() == '' ||
      duration == undefined ||
      isEnabled == undefined ||
      description == undefined ||
      description.trim() == '' ||
      judges == undefined ||
      judges.length <= 0
    ) {
      return { flag, msg: '请检查表单是否填写完整' };
    }

    // 判断评审名称是否存在
    const oldReview = await this.review.findOne({
      where: {
        reviewName: reviewName,
      },
    });
    if (oldReview != undefined && oldReview.reviewId != id) {
      return { flag, msg: '该评审名称已存在' };
    }

    // 上报数据库
    let res: any;
    try {
      res = await this.review
        .createQueryBuilder()
        .update(Review)
        .set({
          reviewName: reviewName,
          duration: duration,
          isEnabled: isEnabled == true ? 1 : 0,
          description: description,
          memo: memo,
          judges: JSON.stringify(judges),
        })
        .where('reviewId = :id', { id })
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

  // 查询评审规则
  async getReviews(
    currentPage: number,
    size: number,
    search: string,
  ): Promise<{
    flag: boolean;
    msg: string;
    data: {
      total: number;
      list: any[];
    };
  }> {
    let flag = false;
    let reviews: any;
    let total: number;
    try {
      total = await this.review
        .createQueryBuilder('review')
        .where({
          reviewName: Like(`%${search}%`),
        })
        .getCount();
      reviews = await this.review.find({
        skip: (currentPage - 1) * size,
        take: size,
        where: {
          reviewName: Like(`%${search}%`),
        },
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
        list: reviews,
      },
    };
  }

  // 只获取评审规则的id和名称
  async getReviewsBasic(search: string): Promise<{
    flag: boolean;
    msg: string;
    data: {
      list: any[];
    };
  }> {
    let flag = false;
    let reviews: any;
    try {
      reviews = await this.review.find({
        select: ['reviewId', 'reviewName', 'isEnabled'],
        where: {
          reviewName: Like(`%${search}%`),
        },
      });
    } catch {
      return { flag, msg: '数据库错误', data: null };
    }

    flag = true;
    return {
      flag,
      msg: '查询成功',
      data: {
        list: reviews,
      },
    };
  }

  // 查询某次评审的详细信息
  async getReviewDetail(reviewId: number): Promise<{
    flag: boolean;
    msg: string;
    data: any;
  }> {
    let flag = false;
    let oldReview: any;
    try {
      oldReview = await this.review.findOne({
        where: {
          reviewId: reviewId,
        },
      });
    } catch {
      return { flag, msg: '数据库错误', data: null };
    }

    flag = true;
    return {
      flag,
      msg: '查询成功',
      data: oldReview,
    };
  }
}
