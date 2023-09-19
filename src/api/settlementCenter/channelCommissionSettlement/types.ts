/**
 * 渠道结算列表
 */
export interface keywords {
  keywords: string;
  start_time: string;
  end_time: string;
  status: string;
  page: string;
  limit: string;
}

/**
 * 修改渠道结算状态
 */
export interface updateStatus {
  id: string;
  status: string;
  transfer_certificate?: Array<string>;
}
/**
 * ids参数
 */
export interface Excel {
  ids: Array<string>;
}
