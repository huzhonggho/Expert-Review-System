import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 专家表
@Entity('expert')
export class Expert {
  @PrimaryGeneratedColumn()
  expertId: number;

  // 专家号
  @Column({ type: 'varchar', length: 255, unique: true })
  expertNumber: string;

  // 专家名称
  @Column({ type: 'varchar', length: 20 })
  expertName: string;

  // 登录密码
  @Column({ type: 'varchar', length: 255 })
  password: string;

  // 专家单位
  @Column({ type: 'varchar', length: 100 })
  affiliate: string;

  // 专家职务
  @Column({ type: 'varchar', length: 20 })
  duty: string;

  // 评审项目Id
  @Column({ type: 'int' })
  reviewId: number;

  // 备注
  @Column({ type: 'varchar', length: 255 })
  memo: string;
}
