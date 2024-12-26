import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Cadres, Review } from 'src/entities';
import { AuthService } from '../auth/auth.service';
import * as XLSX from 'xlsx';
import { timeFormat } from 'src/utils/time-format';

@Injectable()
export class CadresService {
  constructor(
    @InjectRepository(Cadres) private readonly cadres: Repository<Cadres>,
    @InjectRepository(Review) private readonly review: Repository<Review>,
    private readonly authService: AuthService,
  ) {}

  // 新增一位参评人员
  async addCadres(
    cadresNumber: string,
    cadresName: string,
    dept = '',
    position = '',
    orders: number,
    reviewId: number,
    introduction = '',
    gender = '',
    birth = '',
    nation = '',
    party = '',
    joinTime = '',
    title = '',
    dutyTime = '',
    getTime = '',
    publishTime = '',
    teachingTitle = '',
    duties = '',
    education = '',
    degree = '',
    graduation = '',
    major = '',
    graduateTime = '',
    nativePlace = '',
    description = '',
    memo = '',
  ) {
    let flag = false;

    // 判空
    if (
      cadresNumber == undefined ||
      cadresNumber.trim() == '' ||
      cadresName == undefined ||
      cadresName.trim() == '' ||
      orders == undefined ||
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

    // 判断在该 reviewId 中 cadresNumber 是否存在
    const oldCadres = await this.cadres.findOne({
      where: {
        reviewId: reviewId,
        cadresNumber: cadresNumber,
      },
    });
    if (oldCadres != undefined) {
      return { flag, msg: '该干部工号已存在' };
    }

    // 判断在该 reviewId 中 orders 是否存在
    const oldCadres2 = await this.cadres.findOne({
      where: {
        reviewId: reviewId,
        orders: orders,
      },
    });
    if (oldCadres2 != undefined) {
      return { flag, msg: '该序号已存在' };
    }

    // 数据库添加字段
    const newCadres = new Cadres();
    newCadres.cadresNumber = cadresNumber;
    newCadres.cadresName = cadresName;
    newCadres.dept = dept;
    newCadres.position = position;
    newCadres.orders = orders;
    newCadres.reviewId = reviewId;
    newCadres.introduction = introduction;
    newCadres.gender = gender == null ? '' : gender;
    newCadres.birth = birth == null ? '' : birth;
    newCadres.nation = nation == null ? '' : nation;
    newCadres.party = party == null ? '' : party;
    newCadres.joinTime = joinTime == null ? '' : joinTime;
    newCadres.title = title;
    newCadres.dutyTime = dutyTime == null ? '' : dutyTime;
    newCadres.getTime = getTime == null ? '' : getTime;
    newCadres.publishTime = publishTime == null ? '' : publishTime;
    newCadres.teachingTitle = teachingTitle;
    newCadres.duties = duties;
    newCadres.education = education;
    newCadres.degree = degree;
    newCadres.graduation = graduation;
    newCadres.major = major;
    newCadres.graduateTime = graduateTime == null ? '' : graduateTime;
    newCadres.nativePlace = nativePlace;
    newCadres.description = description;
    newCadres.memo = memo;
    try {
      await this.cadres.save(newCadres);
    } catch {
      return { flag, msg: '数据库错误' };
    }

    flag = true;
    return { flag, msg: '添加成功' };
  }

  // 通过文件导入参评人员表
  async addManyCadres(
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
      干部工号: 'cadresNumber',
      姓名: 'cadresName',
      部门: 'dept',
      职称: 'position',
      序号: 'orders',

      性别: 'gender',
      出生年月: 'birth',
      籍贯: 'nativePlace',
      民族: 'nation',
      党派: 'party',
      职务: 'duties',
      职称级别: 'title',
      教学职称: 'teachingTitle',
      来院工作时间: 'joinTime',
      任职时间: 'dutyTime',
      取得资格时间: 'getTime',
      公示时间: 'publishTime',
      学历: 'education',
      学位: 'degree',
      毕业学校: 'graduation',
      毕业专业: 'major',
      毕业时间: 'graduateTime',
      简介: 'introduction',
      其他: 'description',
      备注: 'memo',
    };

    const cadresList: {
      cadresNumber?: any;
      cadresName?: any;
      dept?: any;
      position?: any;
      orders?: any;

      gender?: any;
      birth?: any;
      nativePlace?: any;
      nation?: any;
      party?: any;
      duties?: any;
      title?: any;
      teachingTitle?: any;
      joinTime?: any;
      dutyTime?: any;
      getTime?: any;
      publishTime?: any;
      education?: any;
      degree?: any;
      graduation?: any;
      major?: any;
      graduateTime?: any;
      introduction?: any;
      description?: any;
      memo?: any;
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
              cadresList[cadresList.length - 1][nameMap[column]] =
                item.value.toString();
            } else {
              currentRow = row;
              cadresList[cadresList.length] = {};
              cadresList[cadresList.length - 1][nameMap[column]] =
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
    const cadresTest = {
      cadresNumber: '',
      cadresName: '',
      dept: '',
      position: '',
      orders: '',

      gender: '',
      birth: '',
      nativePlace: '',
      nation: '',
      party: '',
      duties: '',
      title: '',
      teachingTitle: '',
      joinTime: '',
      dutyTime: '',
      getTime: '',
      publishTime: '',
      education: '',
      degree: '',
      graduation: '',
      major: '',
      graduateTime: '',
      introduction: '',
      description: '',
      memo: '',
    };
    for (const i in cadresList) {
      if (
        cadresList[i].cadresNumber == undefined ||
        cadresList[i].cadresNumber.trim() == '' ||
        cadresList[i].cadresName == undefined ||
        cadresList[i].cadresName.trim() == '' ||
        cadresList[i].orders == undefined ||
        cadresList[i].orders.trim() == ''
      ) {
        isPass = false;
        break;
      }
      for (const j in cadresTest) {
        if (cadresList[i][j] == undefined) {
          cadresList[i][j] = '';
        }
      }
      cadresList[i]['birth'] =
        cadresList[i]['birth'] == ''
          ? ''
          : new Date(cadresList[i]['birth']).getTime();
      cadresList[i]['joinTime'] =
        cadresList[i]['joinTime'] == ''
          ? ''
          : new Date(cadresList[i]['joinTime']).getTime();
      cadresList[i]['dutyTime'] =
        cadresList[i]['dutyTime'] == ''
          ? ''
          : new Date(cadresList[i]['dutyTime']).getTime();
      cadresList[i]['getTime'] =
        cadresList[i]['getTime'] == ''
          ? ''
          : new Date(cadresList[i]['getTime']).getTime();
      cadresList[i]['publishTime'] =
        cadresList[i]['publishTime'] == ''
          ? ''
          : new Date(cadresList[i]['publishTime']).getTime();
      cadresList[i]['graduateTime'] =
        cadresList[i]['graduateTime'] == ''
          ? ''
          : new Date(cadresList[i]['graduateTime']).getTime();
      if (
        Number.isNaN(cadresList[i]['birth']) ||
        Number.isNaN(cadresList[i]['joinTime']) ||
        Number.isNaN(cadresList[i]['dutyTime']) ||
        Number.isNaN(cadresList[i]['getTime']) ||
        Number.isNaN(cadresList[i]['publishTime']) ||
        Number.isNaN(cadresList[i]['graduateTime'])
      ) {
        return { flag, msg: '时间格式有误' };
      }
    }
    if (!isPass) {
      return {
        flag,
        msg: '数据格式有误, 请检查是否有必填项(干部工号、姓名、序号)未填写',
      };
    }

    function duplicate(arr) {
      return new Set(arr).size == arr.length;
    }

    const cadresNumberList = [];
    const ordersList = [];
    cadresList.forEach((item) => {
      cadresNumberList.push(item.cadresNumber);
      ordersList.push(item.orders);
    });
    if (!duplicate(cadresNumberList)) {
      return { flag, msg: '干部工号中存在重复数据' };
    }
    if (!duplicate(ordersList)) {
      return { flag, msg: '序号中存在重复数据' };
    }
    const checkNumber = await this.cadres.findOne({
      where: {
        cadresNumber: In(cadresNumberList),
        reviewId: reviewId,
      },
    });
    if (checkNumber != undefined) {
      return {
        flag,
        msg: `在该评审项目中, 干部工号${checkNumber.cadresNumber}已经存在`,
      };
    }
    const checkOrder = await this.cadres.findOne({
      where: {
        orders: In(ordersList),
        reviewId: reviewId,
      },
    });
    if (checkOrder != undefined) {
      return { flag, msg: `在该评审项目中, 序号${checkOrder.orders}已经存在` };
    }

    const cadres: Cadres[] = [];
    cadresList.forEach((item) => {
      const newCadres = new Cadres();
      newCadres.cadresNumber = item.cadresNumber;
      newCadres.cadresName = item.cadresName;
      newCadres.dept = item.dept;
      newCadres.position = item.position;
      newCadres.orders = item.orders;
      newCadres.reviewId = reviewId;
      newCadres.introduction = item.introduction;
      newCadres.gender = item.gender;
      newCadres.birth = item.birth;
      newCadres.nation = item.nation;
      newCadres.party = item.party;
      newCadres.joinTime = item.joinTime;
      newCadres.title = item.title;
      newCadres.dutyTime = item.dutyTime;
      newCadres.getTime = item.getTime;
      newCadres.publishTime = item.publishTime;
      newCadres.teachingTitle = item.teachingTitle;
      newCadres.duties = item.duties;
      newCadres.education = item.education;
      newCadres.degree = item.degree;
      newCadres.graduation = item.graduation;
      newCadres.major = item.major;
      newCadres.graduateTime = item.graduateTime;
      newCadres.nativePlace = item.nativePlace;
      newCadres.description = item.description;
      newCadres.memo = item.memo;
      cadres.push(newCadres);
    });

    try {
      await this.cadres.save(cadres);
    } catch {
      return { flag, msg: '数据库错误' };
    }

    flag = true;
    return { flag, msg: '导入成功' };
  }

  // 删除一位参评人员
  async deleteCadres(ids: number[]): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    let res: any;
    try {
      res = await this.cadres
        .createQueryBuilder('cadres')
        .delete()
        .from(Cadres)
        .where('cadresId IN (:...ids)', { ids })
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

  // 修改参评人员
  async updateCadres(
    id: number,
    cadresNumber: string,
    cadresName: string,
    dept = '',
    position = '',
    orders: number,
    reviewId: number,
    introduction = '',
    gender = '',
    birth = '',
    nation = '',
    party = '',
    joinTime = '',
    title = '',
    dutyTime = '',
    getTime = '',
    publishTime = '',
    teachingTitle = '',
    duties = '',
    education = '',
    degree = '',
    graduation = '',
    major = '',
    graduateTime = '',
    nativePlace = '',
    description = '',
    memo = '',
  ): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    // 判空
    if (
      id == undefined ||
      cadresNumber == undefined ||
      cadresNumber.trim() == '' ||
      cadresName == undefined ||
      cadresName.trim() == '' ||
      orders == undefined ||
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

    // 判断在该 reviewId 中 cadresNumber 是否存在
    const oldCadres = await this.cadres.findOne({
      where: {
        reviewId: reviewId,
        cadresNumber: cadresNumber,
      },
    });
    if (oldCadres != undefined && oldCadres.cadresId != id) {
      return { flag, msg: '该干部工号已存在' };
    }

    // 判断在该 reviewId 中 orders 是否存在
    const oldCadres2 = await this.cadres.findOne({
      where: {
        reviewId: reviewId,
        orders: orders,
      },
    });
    if (oldCadres2 != undefined && oldCadres2.cadresId != id) {
      return { flag, msg: '该序号已存在' };
    }

    // 上报数据库
    let res: any;
    try {
      res = await this.review
        .createQueryBuilder()
        .update(Cadres)
        .set({
          cadresNumber: cadresNumber,
          cadresName: cadresName,
          dept: dept == null ? '' : dept,
          position: position == null ? '' : position,
          orders: orders,
          reviewId: reviewId,
          introduction: introduction,
          gender: gender == null ? '' : gender,
          birth: birth == null ? '' : birth,
          nation: nation == null ? '' : nation,
          party: party == null ? '' : party,
          joinTime: joinTime == null ? '' : joinTime,
          title: title,
          dutyTime: dutyTime == null ? '' : dutyTime,
          getTime: getTime == null ? '' : getTime,
          publishTime: publishTime == null ? '' : publishTime,
          teachingTitle: teachingTitle,
          duties: duties,
          education: education,
          degree: degree,
          graduation: graduation,
          major: major,
          graduateTime: graduateTime == null ? '' : graduateTime,
          nativePlace: nativePlace,
          description: description,
          memo: memo,
        })
        .where('cadresId = :id', { id })
        .execute();
    } catch (res) {
      return { flag, msg: '数据库错误' };
    }

    if (res.affected <= 0) {
      return { flag, msg: '未找到该字段' };
    }

    flag = true;
    return { flag, msg: '修改成功' };
  }

  // 获取参评人员基本信息
  async getCadresBasic(
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
    let cadresList: any;
    let total: number;
    const getCount = this.cadres.createQueryBuilder('cadres').where({
      cadresName: Like(`%${search}%`),
    });
    const getList = this.cadres
      .createQueryBuilder('cadres')
      .select([
        'cadresId',
        'cadresNumber',
        'cadresName',
        'dept',
        'position',
        'orders',
        'reviewId',
      ])
      .take(size)
      .skip((currentPage - 1) * size)
      .where({
        cadresName: Like(`%${search}%`),
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
      cadresList = await getList.getRawMany();
      const ids = [];
      if (reviewId != 0) {
        ids.push(reviewId);
      } else {
        cadresList.forEach((item: any) => {
          ids.push(item.reviewId);
        });
      }
      const reviewNames = await this.review.find({
        select: ['reviewId', 'reviewName'],
        where: {
          reviewId: In(ids),
        },
      });
      cadresList.forEach((item: any) => {
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
        list: cadresList,
      },
    };
  }

  // 根据reviewId获取相关参评人员所有信息
  async getCadresDetailByReviewId(reviewId: number): Promise<{
    flag: boolean;
    msg: string;
    data: {
      list: any;
    };
  }> {
    let flag = false;
    let cadresList: any;
    try {
      cadresList = await this.cadres.find({
        order: {
          orders: 'ASC',
        },
        where: {
          reviewId: reviewId,
        },
      });
    } catch {
      return { flag, msg: '数据库错误', data: null };
    }

    cadresList.forEach((item: Cadres) => {
      item.birth = timeFormat(item.birth, 'YYYY-MM-DD');
      item.graduateTime = timeFormat(item.graduateTime, 'YYYY-MM-DD');
      item.getTime = timeFormat(item.getTime, 'YYYY-MM-DD');
      item.dutyTime = timeFormat(item.dutyTime, 'YYYY-MM-DD');
      item.joinTime = timeFormat(item.joinTime, 'YYYY-MM-DD');
      item.publishTime = timeFormat(item.publishTime, 'YYYY-MM-DD');
    });

    flag = true;
    return {
      flag,
      msg: '查询成功',
      data: {
        list: cadresList,
      },
    };
  }

  // 根据cadresId获取某位参评人员所有信息
  async getCadresDetailByCadresId(cadresId: number): Promise<{
    flag: boolean;
    msg: string;
    data: any;
  }> {
    let flag = false;
    let cadresDetail: Cadres | any;
    try {
      cadresDetail = await this.cadres.findOne({
        where: {
          cadresId: cadresId,
        },
      });
    } catch {
      return { flag, msg: '数据库错误', data: null };
    }

    if (cadresDetail == null) {
      return { flag, msg: '未找到该参评人员', data: null };
    }

    let reviewName;
    try {
      reviewName = await this.review
        .createQueryBuilder('review')
        .select('review.reviewName')
        .where({
          reviewId: cadresDetail.reviewId,
        })
        .getOne();
    } catch {
      return { flag, msg: '数据库错误', data: null };
    }

    cadresDetail.reviewName = reviewName.reviewName;

    flag = true;
    return {
      flag,
      msg: '查询成功',
      data: cadresDetail,
    };
  }
}
