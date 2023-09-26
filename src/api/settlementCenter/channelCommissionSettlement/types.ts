/**
 * 渠道结算列表
 */
export interface keywords {
  keywords: string;
  start_time: string;
  end_time: string;
  settlement_time_start: string;
  settlement_time_end: string;
  settlement_type: string;
  status: string;
  page: string;
  limit: string;
}
/**
 * 渠道结算列表
 */
export interface addkeywords {
  keywords: string;
  status: string;
  settlement_type: string;
  page: string;
  limit: string;
}

/**
 * 修改渠道结算状态
 */
export interface updateStatus {
  id: string;
  status: string;
  transfer_certificate?: string;
}
/**
 * 获取渠道结算单详情
 */
export interface company_settlement_id {
  company_settlement_id: string;
}
/**
 * ids参数
 */
export interface ids {
  ids: Array<string>;
}
/**
 * 新建保存渠道结算单
 */
export interface idsStatus {
  ids: Array<string>;
  status: number;
}
