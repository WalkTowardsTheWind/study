/**
 * 企业结算列表
 */
export interface keywords {
  keywords: string;
}
/**
 *
 * 获取任务成员详情
 */
export interface getUserInfo {
  id: string;
}
/**
 *
 * 获取任务列表
 */
export interface getTaskList {
  company_id: string;
  tax_land_id: string;
}
/**
 * 修改结算状态
 */
export interface updateStatus {
  id: string;
  status: string;
}
