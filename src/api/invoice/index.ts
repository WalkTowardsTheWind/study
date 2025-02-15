import request from "@/utils/request";
import { AxiosPromise } from "axios";
import {
  invoiceQuery,
  uploadQuery,
  invoiceStatus,
  invoiceExcel,
} from "./types";

/**
 * 企业发票列表
 * @param params
 */
export function getInvoiceInCompany(params: invoiceQuery): AxiosPromise {
  return request({
    url: "/adminapi/invoice/company",
    method: "GET",
    params,
  });
}

/**
 * 渠道发票列表
 * @param params
 */
export function getInvoiceInChannel(params: invoiceQuery): AxiosPromise {
  return request({
    url: "/adminapi/invoice/channel",
    method: "GET",
    params,
  });
}

/**
 * 企业发票详情
 * @param id
 */
export function getInvoiceCompanyView(id: number): AxiosPromise {
  return request({
    url: `/adminapi/invoice/company/${id}`,
    method: "GET",
  });
}

/**
 * 企业发票详情
 * @param id
 */
export function getInvoiceChannelView(id: number): AxiosPromise {
  return request({
    url: `/adminapi/invoice/channel/${id}`,
    method: "GET",
  });
}

/**
 * 获取物流公司
 */
export function getLogisticsCompany(): AxiosPromise {
  return request({
    url: `/adminapi/invoice/express`,
    method: "GET",
  });
}

/**
 * 上传发票
 */
export function uploadInvoice(id: number, data: uploadQuery): AxiosPromise {
  return request({
    url: `/adminapi/invoice/upload_invoice/${id}`,
    method: "PUT",
    data,
  });
}

/**
 * 查询发票物流信息
 */
export function getExpressDetail(id: number): AxiosPromise {
  return request({
    url: `/adminapi/invoice/get_express_detail/${id}`,
    method: "GET",
  });
}

/**
 *  修改渠道发票状态
 */
export function channelSetStatus(data: invoiceStatus): AxiosPromise {
  return request({
    url: `/adminapi/invoice/channel_set_status`,
    method: "PUT",
    data,
  });
}

/**
 *  修改企业发票状态
 */
export function setStatus(data: invoiceStatus): AxiosPromise {
  return request({
    url: `/adminapi/invoice/set_status`,
    method: "PUT",
    data,
  });
}

/**
 * 个人发票列表
 */
export function getPersonInvoiceList(params: any): AxiosPromise {
  return request({
    url: `/adminapi/invoice/person_list`,
    method: "GET",
    params,
  });
}
/**
 * 上传完税凭证
 */
export function uploadCredentials(params: any): AxiosPromise {
  return request({
    url: `/adminapi/invoice/upload_receipt`,
    method: "PUT",
    params,
  });
}
/**
 * 完税凭证列表
 */
export function getCredentialsList(params: any): AxiosPromise {
  return request({
    url: `/adminapi/invoice/receipt_list`,
    method: "GET",
    params,
  });
}
/**
 * 获取完税凭证信息
 */
export function getCredentialsDetails(id: any): AxiosPromise {
  return request({
    url: `/adminapi/invoice/editReceipt/${id}`,
    method: "GET",
  });
}
/**
 * 删除完税凭证
 */
export function delCredentials(id: any): AxiosPromise {
  return request({
    url: `/adminapi/invoice/deleteReceipt/${id}`,
    method: "DELETE",
  });
}
/**
 * 修改完税凭证
 */
export function editCredentials(data: any): AxiosPromise {
  return request({
    url: `/adminapi/invoice/updateReceipt`,
    method: "POST",
    data,
  });
}
/**
 * 获取企业列表
 */
export function getCompanyList(params: any): AxiosPromise {
  return request({
    url: `/adminapi/invoice/getCompany`,
    method: "GET",
    params,
  });
}
