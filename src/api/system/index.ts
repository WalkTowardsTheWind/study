import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { RoleQuery, LogQuery, menusQuery } from "./types";

/**
 * 获取角色数据
 * @param params
 */

export function getRolePage(params: RoleQuery): AxiosPromise {
  return request({
    url: "/adminapi/setting/role",
    method: "GET",
    params,
  });
}

export function systemLog(params: LogQuery): AxiosPromise {
  return request({
    url: "/adminapi/system/log",
    method: "GET",
    params,
  });
}

/**
 * 菜单列表
 * @param params
 */
export function menusIndex(params: menusQuery): AxiosPromise {
  return request({
    url: "/adminapi/setting/menus",
    method: "GET",
    params,
  });
}

/**
 * 新增菜单
 * @param data
 */
export function setMenus(data: any): AxiosPromise {
  return request({
    url: "/adminapi/setting/menus",
    method: "POST",
    data,
  });
}
