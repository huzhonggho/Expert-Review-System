import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 参评人员表
@Entity('cadres')
export class Cadres {
  @PrimaryGeneratedColumn()
  cadresId: number;

  // 干部工号
  @Column({ type: 'varchar', length: 20 })
  cadresNumber: string;

  // 姓名
  @Column({ type: 'varchar', length: 20 })
  cadresName: string;

  // 部门
  @Column({ type: 'varchar', length: 50 })
  dept: string;

  // 职称
  @Column({ type: 'varchar', length: 20 })
  position: string;

  // 简介
  @Column({ type: 'varchar', length: 255 })
  introduction: string;

  // 序号
  @Column({ type: 'int' })
  orders: number;

  // 性别
  @Column({ type: 'varchar', length: 20 })
  gender: string;

  // 出生年月
  @Column({ type: 'varchar', length: 20 })
  birth: string;

  // 民族
  @Column({ type: 'varchar', length: 20 })
  nation: string;

  // 党派
  @Column({ type: 'varchar', length: 20 })
  party: string;

  // 来院工作时间
  @Column({ type: 'varchar', length: 20 })
  joinTime: string;

  // 职称级别
  @Column({ type: 'varchar', length: 20 })
  title: string;

  // 任职时间
  @Column({ type: 'varchar', length: 20 })
  dutyTime: string;

  // 取得资格时间
  @Column({ type: 'varchar', length: 20 })
  getTime: string;

  // 公示时间
  @Column({ type: 'varchar', length: 20 })
  publishTime: string;

  // 教学职称
  @Column({ type: 'varchar', length: 20 })
  teachingTitle: string;

  // 职务
  @Column({ type: 'varchar', length: 20 })
  duties: string;

  // 学历
  @Column({ type: 'varchar', length: 20 })
  education: string;

  // 学位
  @Column({ type: 'varchar', length: 20 })
  degree: string;

  // 毕业学校
  @Column({ type: 'varchar', length: 50 })
  graduation: string;

  // 毕业专业
  @Column({ type: 'varchar', length: 50 })
  major: string;

  // 毕业时间
  @Column({ type: 'varchar', length: 20 })
  graduateTime: string;

  // 籍贯
  @Column({ type: 'varchar', length: 255 })
  nativePlace: string;

  // 其他
  @Column({ type: 'varchar', length: 255 })
  description: string;

  // 所属评审项目
  @Column({ type: 'int' })
  reviewId: number;

  // 备注
  @Column({ type: 'varchar', length: 255 })
  memo: string;
}
