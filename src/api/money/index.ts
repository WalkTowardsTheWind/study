import request from "@/utils/request";

// 企业列表
export function getBusinessList(params: any) {
  return request({
    url: "/adminapi/finance/company/index",
    method: "get",
    params,
  });
}
// 企业列表详情
export function getBusinessDetail(params: any) {
  return request({
    url: "/adminapi/finance/company/recharge",
    method: "get",
    params,
  });
}

// 上面三个和下面的图
export function getFinanceList(params: any) {
  return request({
    url: "/adminapi/finance/index",
    method: "get",
    params,
  });
}
// 上面三个和下面的图
export function getChannelList(params: any) {
  return request({
    url: "/adminapi/finance/channel/commission",
    method: "get",
    params,
  });
}

/**
 * 渠道佣金统计列表
 * @param params
 * @returns
 */
export function getChannelCommissionList(params: any) {
  return request({
    url: "/adminapi/finance/channel/commissionList",
    method: "get",
    params,
  });
}

/**
 * 企业佣金统计列表
 * @param params
 * @returns
 */
export function getCompanyCommissionList(params: any) {
  return request({
    url: "/adminapi/finance/company/coompanyList",
    method: "get",
    params,
  });
}
