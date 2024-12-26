import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// PC用户表
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  // 用户名
  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  // 密码
  @Column({ type: 'varchar', length: 255 })
  password: string;

  // 用户类型
  @Column({ type: 'varchar', length: 20 })
  userType: string;

  // 部门
  @Column({ type: 'varchar', length: 50 })
  dept: string;

  // 备注
  @Column({ type: 'varchar', length: 255 })
  memo: string;
}
