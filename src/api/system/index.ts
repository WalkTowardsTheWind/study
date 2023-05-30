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

/**
 * 修改菜单
 * @param data
 * @param id
 */
export function editMenus(data: any, id: number): AxiosPromise {
  return request({
    url: `/adminapi/setting/menus/${id}`,
    method: "PUT",
    data,
  });
}

/**
 *  删除菜单
 * @param id
 */
export function removeMenu(id: number): AxiosPromise {
  return request({
    url: `/adminapi/setting/menus/${id}`,
    method: "DELETE",
  });
}

/**
 *  菜单详情
 */
export function menusView(id: number): AxiosPromise {
  return request({
    url: `/adminapi/setting/menus/${id}`,
    method: "GET",
  });
}
