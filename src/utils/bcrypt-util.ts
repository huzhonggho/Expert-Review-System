import * as bcrypt from 'bcryptjs';

// 加密
export function encryptPassword(password: string): string {
  // 生成salt值
  const salt = bcrypt.genSaltSync(10);
  // 将密码和salt值一起散列化
  return bcrypt.hashSync(password, salt);
}

// 密码校验
export function judgePassword(password: string, hashPwd: string): boolean {
  return bcrypt.compareSync(password, hashPwd);
}
