import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { RoleQuery } from "./types";

/**
 * 获取角色数据
 *
 * @param params
 *
 */

export function getRolePage(params: RoleQuery): AxiosPromise {
  return request({
    url: "/adminapi/setting/role",
    method: "get",
    params,
  });
}
