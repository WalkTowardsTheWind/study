import request from "@/utils/request";
import {
  selfOperatedTaxLandList,
  selfOperatedTaxLandAdd,
  selfOperatedTaxLandEditType,
} from "./types";

/**
 * 获取税地列表
 *
 * @param data {selfOperatedTaxLandList}
 * @returns
 */
export function getSelfOperatedTaxLandList(data: selfOperatedTaxLandList) {
  return request({
    url: "/adminapi/tax/taxLand",
    method: "get",
    params: data,
  });
}
/**
 * 新建税地
 *
 * @param data {selfOperatedTaxLandAdd}
 * @returns
 */
export function selfOperatedTaxLandAdd(data: selfOperatedTaxLandAdd) {
  return request({
    url: "/adminapi/tax/taxLand",
    method: "post",
    params: data,
  });
}
/**
 * 编辑税地
 *
 * @param data {selfOperatedTaxLandEditType}
 * @returns
 */
export function selfOperatedTaxLandEdit(
  id: number,
  data: selfOperatedTaxLandEditType
) {
  return request({
    url: `/adminapi/tax/taxLand/${id}`,
    method: "put",
    params: data,
  });
}
/**
 * 获取税地详情
 *
 * @param data {}
 * @returns
 */
export function selfOperatedTaxLandDetails(id: number) {
  return request({
    url: `/adminapi/tax/taxLand/${id}`,
    method: "get",
  });
}
