import request from "@/utils/request";

/**
 * 获取个人账户列表
 * @param params
 * @returns
 */
export function getPersonalAccountList(params: any) {
  return request({
    url: "/adminapi/member/auth",
    method: "get",
    params,
  });
}

/**
 * 封停 解封
 * @param params
 * @returns
 */
export function setPersonalStatus(params: any) {
  return request({
    url: "/adminapi/account/user/set_status/" + params.id + "/" + params.status,
    method: "get",
  });
}

/**
 * 个人账户 合同信息
 */
export function getContractInfo(params: any) {
  return request({
    url: "/adminapi/contract/person_contract_list",
    method: "get",
    params,
  });
}

/**
 * 个人详情
 */
export function getDetail(params: any) {
  return request({
    url: "/adminapi/member/read/" + params,
    method: "get",
  });
}

/**
 * 个人 结算信息
 */
export function getSettle(params: any) {
  return request({
    url: "/adminapi/finance/getUserSettlementList",
    method: "get",
    params,
  });
}
