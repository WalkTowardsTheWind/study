import request from "@/utils/request";
import {
  channelContractAdd,
  channelContractList,
  channelContractEdit,
} from "./types";

/**
 * 新建渠道合同
 *
 * @param data {contractAdd}
 * @returns
 */
export function channelContractAdd(data: channelContractAdd) {
  return request({
    url: "/adminapi/contract/channel_contract",
    method: "post",
    params: data,
  });
}

/**
 * 获取渠道合同列表
 *
 *
 */
export function getChannelContractList(data: channelContractList) {
  return request({
    url: "/adminapi/contract/channel_contract",
    method: "get",
    params: data,
  });
}

/**
 * 修改渠道合同
 * @param data {contractEdit}
 * @returns
 */
export function channelContractEdit(id: number, data: channelContractEdit) {
  return request({
    url: `/adminapi/contract/channel_contract/${id}`,
    method: "put",
    params: data,
  });
}
