import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { invoiceQuery } from "./types";

/**
 * 企业发票列表
 * @param params
 *
 */

export function getInvoiceInCompany(params: invoiceQuery): AxiosPromise {
  return request({
    url: "/adminapi/invoice/company",
    method: "get",
    params,
  });
}
