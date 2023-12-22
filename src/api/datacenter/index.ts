import request from "@/utils/request";
import { AxiosPromise } from "axios";

/**
 *
 * @returns
 */
export function getDataCenter(params): AxiosPromise {
  return request({
    url: "/adminapi/data_center",
    method: "GET",
    params,
  });
}
