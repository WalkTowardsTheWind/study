import request from "@/utils/request";
import { keywords, updateStatus, Excel } from "./types";

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
/**
 *下载渠道结算列表Excel
 *
 */
export function getChannelSettlementListExcel(params: Excel) {
  return request({
    url: `/adminapi/invoice/get_invoice_list_excel`,
    method: "GET",
    params,
    responseType: "arraybuffer",
  });
}

/**
 * 查看渠道结算详情
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
 *下载渠道结算单Excel
 */
export function getChannelSettlementDocExcel(params: Excel) {
  return request({
    url: `/adminapi/invoice/get_invoice_list_excel`,
    method: "GET",
    params,
    responseType: "arraybuffer",
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
 * 删除渠道结算单
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
