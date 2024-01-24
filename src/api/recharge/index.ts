import request from "@/utils/request";

export function getRechargeTaskList(params: any) {
  return request({
    url: "/adminapi/finance/recharge/index",
    method: "get",
    params,
  });
}

export function getBusinessRefund() {
  return request({
    url: "/adminapi/finance/recharge/only_company_list",
    method: "get",
  });
}

export function getTaxlandByCompanyId(params) {
  return request({
    url: "/adminapi/finance/recharge/company_tax_land",
    method: "get",
    params,
  });
}

export function getBusinessMoney(params) {
  return request({
    url: "/adminapi/finance/recharge/company_amount",
    method: "get",
    params,
  });
}

export function businessReturnMoney(data) {
  return request({
    url: "/adminapi/finance/recharge/return_rechange",
    method: "post",
    data,
  });
}
