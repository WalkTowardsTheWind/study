export enum personCheckStatus {
  "认证中",
  "成功",
  "失败",
}

export enum auth_type {
  "二要素（姓名、身份证）" = 1,
  "三要素（姓名、手机号、身份证）",
  "三要素（姓名、身份证、银行卡）",
  "四要素（姓名、手机号、身份证、银行卡）",
}
