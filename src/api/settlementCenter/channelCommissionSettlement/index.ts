import request from "@/utils/request";
import {
  keywords,
  addkeywords,
  updateStatus,
  company_settlement_id,
  ids,
  idsStatus,
} from "./types";

/**
 *渠道结算列表
 *
 * @param data {keywords}
 * @returns
 */
export function getChannelSettlementList(data: keywords) {
  return request({
    url: "/adminapi/finance/channel",
    method: "get",
    params: data,
  });
}

// /**
//  *下载渠道结算列表Excel
//  *
//  */
// export function getChannelSettlementListExcel(params: ids) {
//   return request({
//     url: `/adminapi/invoice/get_invoice_list_excel`,
//     method: "GET",
//     params,
//     responseType: "arraybuffer",
//   });
// }

/**
 * 渠道结算详情
 *
 * @param data
 * @returns
 */
export function getChannelSettlementDetails(id: number) {
  return request({
    url: `/adminapi/finance/channel/${id}`,
    method: "get",
  });
}

/**
 * 发送佣金确认单信息
 *
 * @param data
 * @returns
 */
export function getDocDetails(id: number) {
  return request({
    url: `/adminapi/finance/channel/getConfirm/${id}`,
    method: "get",
  });
}

// /**
//  *下载渠道结算单Excel
//  */
// export function getChannelSettlementDocExcel(params: ids) {
//   return request({
//     url: `/adminapi/invoice/get_invoice_list_excel`,
//     method: "GET",
//     params,
//     responseType: "arraybuffer",
//   });
// }
/**
 *获取新建渠道结算单列表
 *
 * @param data {keywords}
 * @returns
 */
export function getAddChannelSettlementDocList(data: addkeywords) {
  return request({
    url: "/adminapi/finance/channel/create",
    method: "get",
    params: data,
  });
}
/**
 * 获取渠道结算单详情
 *
 * @param data
 * @returns
 */
export function getChannelSettlementDocDetails(data: company_settlement_id) {
  return request({
    url: "/adminapi/finance/channel/getCommissionInfo",
    method: "get",
    params: data,
  });
}
/**
 * 新建保存渠道结算单
 *
 * @param data {updateStatus}
 * @returns
 */
export function addChannelSettlementDoc(data: idsStatus) {
  return request({
    url: "/adminapi/finance/channel",
    method: "post",
    params: data,
  });
}
/**
 * 修改渠道结算状态
 *
 * @param data {updateStatus}
 * @returns
 */
export function updateChannelSettlementStatus(data: updateStatus) {
  return request({
    url: "/adminapi/finance/channel/updateStatus",
    method: "post",
    params: data,
  });
}
/**
 * 删除渠道结算
 *
 * @param data {updateStatus}
 * @returns
 */
export function deleteChannelSettlementDoc(id: number) {
  return request({
    url: `/adminapi/finance/channel/${id}`,
    method: "delete",
  });
}
