import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 软件更新表
@Entity('apk')
export class Apk {
  @PrimaryGeneratedColumn()
  appId: number;

  // 版本号
  @Column({ type: 'varchar', length: 255, unique: true })
  level: string;

  // 软件下载地址
  @Column({ type: 'varchar', length: 255 })
  address: string;

  // 更新备注
  @Column({ type: 'varchar', length: 255 })
  memo: string;
}
