import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 评审规则表
@Entity('review')
export class Review {
  @PrimaryGeneratedColumn()
  reviewId: number;

  // 评审名称
  @Column({ type: 'varchar', length: 255, unique: true })
  reviewName: string;

  // 评审时长
  @Column({ type: 'int' })
  duration: number;

  // 创建时间
  @Column({ type: 'varchar', length: 20 })
  createDate: string;

  // 是否启用 0-禁用 1-启用
  @Column({ type: 'tinyint' })
  isEnabled: number;

  // 评审要求
  @Column({ type: 'varchar', length: 255 })
  description: string;

  // 评分项目
  @Column({ type: 'varchar', length: 255 })
  judges: string;

  // 备注
  @Column({ type: 'varchar', length: 255 })
  memo: string;
}
