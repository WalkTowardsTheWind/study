import request from "@/utils/request";
import { enterpriseContractAdd, enterpriseContractEdit } from "./types";

/**
 * 新建企业合同
 *
 * @param data {contractAdd}
 * @returns
 */
export function enterpriseContractAdd(data: enterpriseContractAdd) {
  return request({
    url: "/adminapi/contract/contract",
    method: "post",
    params: data,
  });
}

/**
 * 获取企业合同列表
 *
 *
 */
export function getEnterpriseContractList() {
  return request({
    url: "/adminapi/contract/contract",
    method: "get",
  });
}

/**
 * 修改企业合同
 * @param data {contractEdit}
 * @returns
 */
export function enterpriseContractEdit(
  id: number,
  data: enterpriseContractEdit
) {
  return request({
    url: `/adminapi/contract/contract/${id}`,
    method: "put",
    params: data,
  });
}
