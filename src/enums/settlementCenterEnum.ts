// 企业
export enum settlementCenterList {
  "结算中",
  "结算成功",
  "部分结算成功",
  "结算失败",
  "冻结",
}
export enum settlementCenterTaskEnum {
  "待结算",
  "已成功",
  "失败",
  "结算中",
}
export enum invoiceStatusEnum {
  "未申请",
  "申请中",
  "已发票",
}
// 渠道
// 渠道佣金结算
export enum channelCommissionSettlementList {
  "待确认",
  "确认中",
  "待下发",
  "已下发",
  "驳回",
}
export enum settlement_type {
  "企业" = 1,
  "渠道",
}
// 渠道结算状态
export enum channelSettlementStatus {
  "待确认",
  "确认中",
  "待下发",
  "已下发",
  "驳回",
  "未结算",
}
// 渠道结算详情
export enum settleTaskType {
  "待申请",
  "申请中",
  "驳回",
  "报名中",
  "已验收",
  "封停",
  "关闭",
}
export enum settlePerson {
  "结算中",
  "结算成功",
  "结算失败",
}
export enum InvoiceType {
  "普通发票",
  "6%增值税发票",
  "普通发票/6%增值税发票",
}
