import request from "@/utils/request";
/**
 * 获取税地列表
 *
 * @param data {selfOperatedTaxLandList}
 * @returns
 */
export function getAreaList() {
  return request({
    url: "/adminapi/tax/areaList",
    method: "get",
  });
}
