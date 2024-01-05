import request from "@/utils/request";
import { AxiosPromise } from "axios";
import type { NotifyQuery } from "./types";

/**
 * 消息接受列表
 */
export function notifyIndex(params: NotifyQuery): AxiosPromise {
  return request({
    url: "/adminapi/notify/index",
    method: "GET",
    params,
  });
}

/**
 * 消息详情
 */
export function notifyView(id: number): AxiosPromise {
  return request({
    url: `/adminapi/notify/read/${id}`,
    method: "GET",
  });
}

/**
 * 消息发送列表
 */
export function sendIndex(params: NotifyQuery): AxiosPromise {
  return request({
    url: "/adminapi/notify/send/index",
    method: "GET",
    params,
  });
}
/**
 * 消息发送详情
 */
export function sendView(id: number): AxiosPromise {
  return request({
    url: `/adminapi/notify/send/read/${id}`,
    method: "GET",
  });
}
/**
 * 消息已读
 */
export function read(id: number): AxiosPromise {
  return request({
    url: `/adminapi/notify/seen/${id}`,
    method: "GET",
  });
}
/**
 * 消息全部已读
 */
export function allRead(): AxiosPromise {
  return request({
    url: "/adminapi/notify/all/read",
    method: "GET",
  });
}
/**
 * 消息置顶
 */
export function topPing(id: number): AxiosPromise {
  return request({
    url: `/adminapi/notify/top/${id}`,
    method: "GET",
  });
}
/**
 * 消息取消置顶
 */
export function cancelTopPing(id: number): AxiosPromise {
  return request({
    url: `/adminapi/notify/top/cancel/${id}`,
    method: "GET",
  });
}
/**
 * 消息撤回
 */
export function withdraw(id: number): AxiosPromise {
  return request({
    url: `/adminapi/notify/revoke/${id}`,
    method: "GET",
  });
}
/**
 * 发送公告
 */
export function sendNotice(data: any): AxiosPromise {
  return request({
    url: "/adminapi/notify/notice/send",
    method: "post",
    data,
  });
}
/**
 * 发送消息
 */
export function sendMsg(data: any): AxiosPromise {
  return request({
    url: "/adminapi/notify/msg/send",
    method: "post",
    data,
  });
}

/**
 * 获取企业列表
 */
export function getCompanyList(params?: any): AxiosPromise {
  return request({
    url: `/adminapi/account/company/list`,
    method: "GET",
    params,
  });
}

/**
 * 消息置顶
 */
export function notifyTop(id: any): AxiosPromise {
  return request({
    url: `/adminapi/notify/top/${id}`,
    method: "GET",
  });
}

/**
 * 取消置顶
 */
export function notifyUnTop(id: any): AxiosPromise {
  return request({
    url: `/adminapi/notify/top/cancel/${id}`,
    method: "GET",
  });
}

/**
 * 消息标记已读
 */
export function notifyRead(id: any): AxiosPromise {
  return request({
    url: `/adminapi/notify/seen/${id}`,
    method: "GET",
  });
}
