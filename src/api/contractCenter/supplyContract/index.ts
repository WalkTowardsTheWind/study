import request from "@/utils/request";
import {
  supplyContractAdd,
  supplyContractList,
  supplyContractEdit,
} from "./types";

/**
 * 新建企业合同
 *
 * @param data {supplyContractAdd}
 * @returns
 */
export function supplyContractAdd(data: supplyContractAdd) {
  return request({
    url: "/adminapi/contract/supply_contract",
    method: "post",
    params: data,
  });
}

/**
 * 获取企业合同列表
 *
 *
 */
export function getSupplyContractList(data: supplyContractList) {
  return request({
    url: "/adminapi/contract/supply_contract",
    method: "get",
    params: data,
  });
}

/**
 * 修改供应合同
 * @param data {supplyContractEdit}
 * @returns
 */
export function supplyContractEdit(id: number, data: supplyContractEdit) {
  return request({
    url: `/adminapi/contract/channel_contract/${id}`,
    method: "put",
    params: data,
  });
}
