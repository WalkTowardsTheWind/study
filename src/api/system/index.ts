import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { RoleQuery, LogQuery, menusQuery, SetRoleQuery } from "./types";

/**
 * 获取角色数据
 * @param params
 */

export function getRolePage(params?: RoleQuery): AxiosPromise {
  return request({
    url: "/adminapi/setting/role",
    method: "GET",
    params,
  });
}

/**
 * 新增角色数据
 * @param data
 */
export function setRole(data: SetRoleQuery): AxiosPromise {
  return request({
    url: "/adminapi/setting/role",
    method: "POST",
    data,
  });
}

/**
 * 角色详情
 * @param id
 */
export function roleView(id: number): AxiosPromise {
  return request({
    url: `/adminapi/setting/role/${id}/edit`,
    method: "GET",
  });
}

/**
 * 删除角色
 * @param id
 */
export function removeRole(id: number): AxiosPromise {
  return request({
    url: `/adminapi/setting/role/${id}`,
    method: "DELETE",
  });
}

/**
 * 修改角色状态
 * @param data
 */
export function setRoleStatus(data: any): AxiosPromise {
  return request({
    url: `/adminapi/setting/role/set_status`,
    method: "PUT",
    data,
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

/**
 * 获取税地城市列表
 */
export function getAreaList(): AxiosPromise {
  return request({
    url: "/adminapi/tax/areaList",
    method: "GET",
  });
}

/**
 * 修改当前用户信息
 */
export function updateAdmin(data: any): AxiosPromise {
  return request({
    url: "/adminapi/setting/update_admin",
    method: "PUT",
    data,
  });
}

/**
 * 切换税地
 */
export function setTaxLand(params: any): AxiosPromise {
  return request({
    url: "/adminapi/setTaxLand",
    method: "GET",
    params,
  });
}

// user

/**
 * 获取角色下拉框数据
 * @param params
 */

export function getEnableRole(params?: RoleQuery): AxiosPromise {
  return request({
    url: "/adminapi/setting/role_list",
    method: "GET",
    params,
  });
}
/**
 * 获取所有账号列表
 * @param data
 */

export function getOtherAccountList(params: any) {
  return request({
    url: "/adminapi/setting/admin",
    method: "get",
    params,
  });
}

/**
 * 创建账号
 * @param data
 */

export function createOtherAccount(data: any) {
  return request({
    url: "/adminapi/setting/admin/createAdmin",
    method: "post",
    data,
  });
}

/**
 * 编辑账号
 * @param data
 */

export function updateOtherAccount(data: any) {
  return request({
    url: `/adminapi/setting/admin/${data.id}`,
    method: "put",
    data,
  });
}

/**
 * 获取账号详情
 * @param id
 */

export function getOtherAccountDetail(id: string) {
  return request({
    url: `/adminapi/setting/admin/read/${id}`,
    method: "get",
  });
}

/**
 * 删除账号
 * @param id
 */

export function delOtherAccount(id: string) {
  return request({
    url: `/adminapi/setting/admin/${id}`,
    method: "delete",
  });
}

/**
 * 更新账户状态
 * @param id
 */

export function updateOtherAccountStatus(params: any) {
  return request({
    url: `/adminapi/setting/set_status/${params.id}/${params.status}`,
    method: "put",
  });
}

/**
 * 查省列表传0
 * @param id
 */

export function getAreaIdList(parent_id = "0") {
  return request({
    url: `/adminapi/setting/city/list/${parent_id}`,
    method: "get",
  });
}
