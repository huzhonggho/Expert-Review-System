import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cadres, Review, Expert, Score } from 'src/entities';
import { AuthService } from '../auth/auth.service';
import * as XLSX from 'xlsx';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Review) private readonly review: Repository<Review>,
    @InjectRepository(Expert) private readonly expert: Repository<Expert>,
    @InjectRepository(Cadres) private readonly cadres: Repository<Cadres>,
    @InjectRepository(Score) private readonly score: Repository<Score>,
    private readonly authService: AuthService,
  ) {}

  // 批量添加评分记录
  async addScores(
    data: {
      reviewId: number;
      expertId: number;
      cadresId: number;
      scores: string;
      memo: string;
    }[],
  ): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    const scores: Score[] = [];
    data.forEach((item) => {
      let itemScores = JSON.parse(item.scores);
      if (itemScores['skip'] == true) {
        itemScores = '';
      } else {
        delete itemScores['skip'];
        itemScores = JSON.stringify(itemScores);
      }
      item.scores = itemScores;
      const newScore = new Score();
      newScore.reviewId = item.reviewId;
      newScore.expertId = item.expertId;
      newScore.cadresId = item.cadresId;
      newScore.scores = item.scores;
      newScore.reviewDate = new Date().getTime().toString();
      newScore.memo = item.memo;
      scores.push(newScore);
    });

    try {
      await this.score.save(scores);
    } catch {
      return { flag, msg: '数据库错误' };
    }

    flag = true;
    return { flag, msg: '添加成功' };
  }

  // 通过多表联查获取评分记录(某位专家的某次评审)
  async getScoresAndCadres(
    reviewId: number,
    expertId: number,
  ): Promise<{
    flag: boolean;
    msg: string;
    data: {
      list: any;
    };
  }> {
    let flag = false;
    let scores: any;

    try {
      scores = await this.score
        .createQueryBuilder('score')
        .select(['score'])
        .where({
          reviewId: reviewId,
        })
        .andWhere({
          expertId: expertId,
        })
        .getMany();
      const cadresIds = [];
      scores.forEach((item: any) => {
        cadresIds.push(item.cadresId);
      });
      const cadresList = await this.cadres.find({
        where: {
          cadresId: In(cadresIds),
        },
      });
      scores.forEach((item: any) => {
        for (const i in cadresList) {
          if (item.cadresId == cadresList[i].cadresId) {
            for (const j in cadresList[i]) {
              item[j] = cadresList[i][j];
            }
            break;
          }
        }
      });
    } catch {
      return { flag, msg: '数据库错误', data: null };
    }

    flag = true;
    return { flag, msg: '查询成功', data: { list: scores } };
  }

  // 检查当前专家是否已经评分过了
  async checkExpertOccur(
    reviewId: number,
    expertId: number,
  ): Promise<{
    flag: boolean;
    msg: string;
  }> {
    let flag = false;
    let oldSocre;
    try {
      oldSocre = await this.score.findOne({
        where: {
          reviewId: reviewId,
          expertId: expertId,
        },
      });
    } catch {
      return { flag, msg: '数据库错误' };
    }

    if (oldSocre != undefined) {
      return { flag, msg: '当前评审已经结束' };
    }

    flag = true;
    return { flag, msg: '可以评审' };
  }

  // 获取评分记录(某次评审)
  async getScores(reviewId: number): Promise<{
    flag: boolean;
    msg: string;
    data: {
      list: any;
      experts: any;
    };
  }> {
    let flag = false;
    let scores: any;

    try {
      scores = await this.score
        .createQueryBuilder('score')
        .innerJoinAndSelect(Review, 'review', 'review.reviewId=score.reviewId')
        .innerJoinAndSelect(Expert, 'expert', 'expert.expertId=score.expertId')
        .innerJoinAndSelect(Cadres, 'cadres', 'cadres.cadresId=score.cadresId')
        .select([
          'score.*',
          'reviewName',
          'expertName',
          'cadresName',
          'cadresNumber',
        ])
        .where({
          reviewId: reviewId,
        })
        .getRawMany();
    } catch {
      return { flag, msg: '数据库错误', data: null };
    }

    if (scores.length <= 0) {
      return {
        flag: true,
        msg: '查询成功',
        data: { list: [], experts: [] },
      };
    }

    let review: Review;
    try {
      review = await this.review.findOne({
        where: {
          reviewId: reviewId,
        },
      });
    } catch {
      return { flag, msg: '数据库错误', data: null };
    }

    const newData: any[] = [];
    const newExperts: any[] = [];
    const initScore = {};
    let scoresNum = 0;
    const reviewJudge = JSON.parse(review.judges);
    for (const i in reviewJudge) {
      initScore[reviewJudge[i]['key']] = '';
      scoresNum++;
    }
    scores.forEach((item: any) => {
      let isHave = false;
      let that;
      for (const i in newData) {
        that = newData[i];
        if (newData[i].cadresId == item.cadresId) {
          isHave = true;
          break;
        }
      }
      if (isHave) {
        const scoresObj = item.scores == '' ? {} : JSON.parse(item.scores);
        that['评审专家: ' + item.expertName + '#' + item.expertId] = {
          ...scoresObj,
        };
      } else {
        const newItem: any = {
          cadresId: item.cadresId,
          cadresNumber: item.cadresNumber,
          cadresName: item.cadresName,
          reviewName: item.reviewName,
          expertId: item.expertId,
        };
        const scoresObj = item.scores == '' ? {} : JSON.parse(item.scores);
        newItem['评审专家: ' + item.expertName + '#' + item.expertId] = {
          ...scoresObj,
        };
        newData.push(newItem);
      }
      newExperts.push('评审专家: ' + item.expertName + '#' + item.expertId);
    });

    newData.forEach((item: object[]) => {
      let totalNum = 0;
      let num = 0;
      for (const i in item) {
        if (i.includes('评审专家: ')) {
          if (JSON.stringify(item[i]) === '{}') {
            item[i] = initScore;
            continue;
          }
          num++;
          for (const j in item[i]) {
            totalNum += parseInt(item[i][j]);
          }
        }
      }
      num *= scoresNum;
      if (num == 0) item['averageScore'] = 0;
      else item['averageScore'] = (totalNum / num).toFixed(2);
    });
    newData.sort((a, b) => b['averageScore'] - a['averageScore']);
    let i = 1;
    newData.forEach((item) => {
      item['index'] = i;
      i += 1;
    });

    flag = true;
    return {
      flag,
      msg: '查询成功',
      data: { list: newData, experts: Array.from(new Set(newExperts)) },
    };
  }

  // 导出某次评审的评分记录
  async exportExcelOfScoresByReviewId(reviewId: number): Promise<{
    flag: boolean;
    msg: string;
    data: any;
  }> {
    let flag = false;
    let scores: any;

    try {
      scores = await this.score
        .createQueryBuilder('score')
        .innerJoinAndSelect(Review, 'review', 'review.reviewId=score.reviewId')
        .innerJoinAndSelect(Expert, 'expert', 'expert.expertId=score.expertId')
        .innerJoinAndSelect(Cadres, 'cadres', 'cadres.cadresId=score.cadresId')
        .select([
          'score.*',
          'reviewName',
          'expertName',
          'cadresName',
          'cadresNumber',
        ])
        .where({
          reviewId: reviewId,
        })
        .getRawMany();
    } catch {
      return { flag, msg: '数据库错误', data: null };
    }

    if (scores.length <= 0) {
      return { flag, msg: '该评审暂无结果', data: null };
    }

    let review: Review;
    try {
      review = await this.review.findOne({
        where: {
          reviewId: reviewId,
        },
      });
    } catch {
      return { flag, msg: '数据库错误', data: null };
    }

    const newData: any[] = [];
    const newExperts: any[] = [];
    const initScore = {};
    let scoresNum = 0;
    const reviewJudge = JSON.parse(review.judges);
    for (const i in reviewJudge) {
      initScore[reviewJudge[i]['key']] = '';
      scoresNum++;
    }
    scores.forEach((item: any) => {
      let isHave = false;
      let that;
      for (const i in newData) {
        that = newData[i];
        if (newData[i].cadresId == item.cadresId) {
          isHave = true;
          break;
        }
      }
      if (isHave) {
        const scoresObj = item.scores == '' ? {} : JSON.parse(item.scores);
        that['评审专家: ' + item.expertName + '#' + item.expertId] = {
          ...scoresObj,
        };
      } else {
        const newItem: any = {
          cadresId: item.cadresId,
          cadresNumber: item.cadresNumber,
          cadresName: item.cadresName,
          reviewName: item.reviewName,
        };
        const scoresObj = item.scores == '' ? {} : JSON.parse(item.scores);
        newItem['评审专家: ' + item.expertName + '#' + item.expertId] = {
          ...scoresObj,
        };
        newData.push(newItem);
      }
      newExperts.push('评审专家: ' + item.expertName + '#' + item.expertId);
    });

    newData.forEach((item) => {
      delete item.cadresId;
    });
    newData.forEach((item) => {
      let totalNum = 0;
      let num = 0;
      for (const i in item) {
        if (i.includes('评审专家: ')) {
          if (JSON.stringify(item[i]) === '{}') {
            item[i] = initScore;
            continue;
          }
          num++;
          for (const j in item[i]) {
            totalNum += parseInt(item[i][j]);
          }
        }
      }
      num *= scoresNum;
      if (num == 0) item['平均分'] = 0;
      else item['平均分'] = (totalNum / num).toFixed(2);
    });
    newData.sort((a, b) => b['平均分'] - a['平均分']);
    let i = 1;
    newData.forEach((item) => {
      item['排名'] = i;
      i += 1;
    });

    let addItem: string[] = [];
    newData.forEach((e: any) => {
      for (const i in e) {
        if (i.includes('评审专家: ')) {
          for (const j in e[i]) {
            addItem.push(j);
          }
          break;
        }
      }
    });
    addItem = Array.from(new Set(addItem));
    const resData = [];
    const resExperts = Array.from(new Set(newExperts));
    for (let i = -2; i < newData.length; i++) {
      let item = [];
      if (i === -2) {
        item = ['干部工号', '姓名'];
        for (let j = 0; j < resExperts.length; j++) {
          item = [...item, resExperts[j].split('#')[0]];
          for (let i = 0; i < addItem.length - 1; i++) {
            item.push('');
          }
        }
        item = [...item, '平均分', '排名'];
      } else if (i === -1) {
        item = ['', ''];
        for (let j = 0; j < resExperts.length; j++) {
          item = [...item, ...addItem];
        }
        item = [...item, '', ''];
      } else {
        for (const e in newData[i]) {
          if (e.includes('评审专家: ')) {
            for (const innerE in newData[i][e]) {
              item.push(newData[i][e][innerE]);
            }
          } else {
            if (e == 'reviewName') continue;
            item.push(newData[i][e]);
          }
        }
      }
      resData.push(item);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(resData);
    worksheet['!cols'] = [{ wch: 15 }];
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
      { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
    ];
    let column = 0;
    for (column = 0; column < resExperts.length; column++) {
      worksheet['!merges'].push({
        s: { r: 0, c: column * addItem.length + 2 },
        e: { r: 0, c: column * addItem.length + 2 + addItem.length - 1 },
      });
    }
    column = column * addItem.length + 2;
    worksheet['!merges'].push({
      s: { r: 0, c: column },
      e: { r: 1, c: column },
    });
    worksheet['!merges'].push({
      s: { r: 0, c: column + 1 },
      e: { r: 1, c: column + 1 },
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, scores[0].reviewName);
    const binary = XLSX.write(workbook, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary',
    });

    flag = true;
    return { flag, msg: '导出成功', data: binary };
  }
}
