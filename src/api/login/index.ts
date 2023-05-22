import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { LoginData, RegisterData, GetPhone } from "./types";

/**
 * 登录API
 *
 * @param data {LoginData,LoginResult}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<any> {
  return request({
    url: "/adminapi/login",
    method: "post",
    params: data,
  });
}

/**
 * 忘记密码
 *
 * @param data {RegisterData}
 * @returns
 */
export function login(data: RegisterData) {
  return request({
    url: "/adminapi/forgotPwd",
    method: "post",
    params: data,
  });
}

/**
 * 获取手机验证码{GetPhone}
 */
export function getPhone(data: GetPhone) {
  return request({
    url: "/adminapi/notify/sms/captcha",
    method: "post",
    params: data,
  });
}
/**
 * 注销API
 */
export function logoutApi() {
  return request({
    url: "/adminapi/admin/logout",
    method: "get",
  });
}
