export interface ResType {
  // 参考http状态码
  code: 200 | 403 | 404 | 500;
  // 介绍
  message: string;
  // 数据
  data: any;
}
