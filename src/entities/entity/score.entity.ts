import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 评分表
@Entity('score')
export class Score {
  @PrimaryGeneratedColumn()
  scoreId: number;

  // 对应评审ID
  @Column({ type: 'int' })
  reviewId: number;

  // 对应专家ID
  @Column({ type: 'int' })
  expertId: number;

  // 对应干部ID
  @Column({ type: 'int' })
  cadresId: number;

  // 得分项目
  @Column({ type: 'varchar', length: 255 })
  scores: string;

  // 创建时间
  @Column({ type: 'varchar', length: 20 })
  reviewDate: string;

  // 备注
  @Column({ type: 'varchar', length: 255 })
  memo: string;
}
