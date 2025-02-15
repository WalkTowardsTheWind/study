export enum businessType {
  "申请中" = 0,
  "未认证",
  "正常",
  "预警",
  "封停",
}
export enum channelType {
  "正常" = 1,
  "封停" = 0,
}

export enum personalType {
  "未认证" = 0,
  "已认证",
  "封停",
  "未注册" = 5,
}

export enum taxpayerType {
  "小规模" = 1,
  "一般人",
}
export enum invoice_requireType {
  "下发开票" = 0,
  "预开票/充值开票",
}

export enum statusType {
  "关闭" = 0,
  "启用",
}

export enum taxLandStatusType {
  "已解绑" = 0,
  "已绑定" = 1,
}

export enum taskType {
  "未到账" = 0,
  "已到账",
  "异常充值",
  "服务费退回",
  "财务退款",
  "退款",
}

export enum settleStatus {
  "结算中",
  "已结算",
  "部分结算",
  "结算失败",
  "冻结",
}

export enum taskStaus {
  "待申请",
  "申请中",
  "驳回",
  "报名中",
  "已验收",
  "封停",
  "关闭",
}

export enum signType {
  "静默签" = 1,
  "二维码签约",
  "短信签约",
}
export enum authType {
  "二要素（姓名、身份证）" = 1,
  "三要素（姓名、手机号、身份证）",
  "三要素（姓名、身份证、银行卡）",
  "四要素（姓名、手机号、身份证、银行卡）",
}

export enum perContractEnum {
  "已失效",
  "已生效",
}
