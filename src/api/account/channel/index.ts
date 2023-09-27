import request from "@/utils/request";
/**
 * 获取渠道账户列 * * @param params
 * @returns
 */
export function getChannelAccountList(params: any) {
  return request({
    url: "/adminapi/account/channel/index",
    method: "get",
    params,
  });
}

/**
 * 个人渠道账户创建
 * @param data
 * @returns
 */
export function createPersonChannelAccount(data: any) {
  return request({
    url: "/adminapi/account/channel/user/create",
    method: "post",
    data,
  });
}

/**
 * 个人渠道账户编辑
 * @param data
 * @returns
 */
export function updatePersonChannelAccount(data: any) {
  return request({
    url: "/adminapi/account/channel/user/update",
    method: "post",
    data,
  });
}

/**
 * 企业渠道账户创建
 * @param data
 * @returns
 */
export function createCompanyChannelAccount(data: any) {
  return request({
    url: "/adminapi/account/channel/company/create",
    method: "post",
    data,
  });
}

/**
 * 企业渠道账户编辑
 * @param data
 * @returns
 */
export function updateCompanyChannelAccount(data: any) {
  return request({
    url: "/adminapi/account/channel/company/update",
    method: "post",
    data,
  });
}

/**
 * 获取渠道账号详情
 * @param id
 * @returns
 */
export function getChannelAccountInfo(id: string) {
  return request({
    url: `/adminapi/account/channel/read/${id}`,
    method: "get",
  });
}

/**
 * 渠道账户启用停用
 * @param params
 * @returns
 */
export function setChannelAccountStatus(params: any) {
  return request({
    url: `/adminapi/account/channel/set_status/${params.id}/${params.status}`,
    method: "get",
  });
}

/**
 * 获取详情税地信息
 * @param params
 * @returns
 */
export function getChannelAccountTaxland(params: any) {
  return request({
    url: `/adminapi/account/channel/taxland/index`,
    method: "get",
    params,
  });
}

/**
 * 渠道税地新增
 * @param data
 * @returns
 */
export function addChannelTaxland(data: any) {
  return request({
    url: `/adminapi/account/channel/taxland`,
    method: "post",
    data,
  });
}

/**
 * 渠道税地更新
 * @param data
 * @returns
 */
export function updateChannelTaxland(data: any) {
  return request({
    url: `/adminapi/account/channel/taxland/update`,
    method: "post",
    data,
  });
}

/**
 * 渠道税地启用禁用
 * @param params
 * @returns
 */
export function setChannelTaxlandStatus(params: any) {
  return request({
    url: `/adminapi/account/channel/taxland/${params.id}/${params.status}`,
    method: "get",
  });
}

/**
 * 获取渠道信息卡片页面数据
 * @param params
 * @returns
 */
export function getChannelAccountInfoTopAndBottomList(params: any) {
  return request({
    url: `/adminapi/account/channel/level/index`,
    method: "get",
    params,
  });
}

/**
 * 绑定上下级渠道
 * @param data
 * @returns
 */
export function bindChannel(data: any) {
  return request({
    url: `/adminapi/account/channel/level`,
    method: "post",
    data,
  });
}

/**
		渠道信息 渠道上下级编辑
 * @param data 
 * @returns 
 */
export function editTopAndBottomChannel(data: any) {
  return request({
    url: `/adminapi/account/channel/level/update`,
    method: "post",
    data,
  });
}
/**
 * 获取代理企业信息
 * @param params
 * @returns
 */
export function getChannelProxyCompanyInfo(params: any) {
  return request({
    url: `/adminapi/account/channel/company/index`,
    method: "get",
    params,
  });
}

/**
 * 根据税地选择渠道 渠道信息新增
 * @param params
 * @returns
 */
export function bindChannelByTaxland(params: any) {
  return request({
    url: `/adminapi/account/channel/level/bind/index`,
    method: "get",
    params,
  });
}

/**
 * 设置上下级渠道状态
 * @param params
 * @returns
 */
export function setStatusChannelTopAndBottom(params: any) {
  return request({
    url: `/adminapi/account/channel/level/${params.id}/${params.status}`,
    method: "get",
  });
}

/**
 * 代理企业信息 根据企业选择税地
 * @returns
 */
export function getCompanyByTaxland(params) {
  return request({
    url: `/adminapi/account/channel/company/bind/index`,
    method: "get",
    params,
  });
}

/**
 * 代理企业信息 渠道绑定企业
 * @param data
 * @returns
 */
export function channelBindCompanyByTaxland(data: any) {
  return request({
    url: `/adminapi/account/channel/bind/company`,
    method: "post",
    data,
  });
}

/**
 * 代理企业信息 企业解绑 绑定
 */
export function setStatusChannelByCompany(params: any) {
  return request({
    url: `/adminapi/account/channel/set_company_status/${params.id}/${params.status}`,
    method: "get",
  });
}

/**
 * 获取渠道账号 税地信息 点位日志
 * @param id
 * @returns
 */
export function getTaxlandInfoLogByChannelAccount(id: any) {
  return request({
    url: `/adminapi/account/channel/tax/log/${id}`,
    method: "get",
  });
}
/**
 * 获取渠道账号 渠道信息 点位日志
 * @param id
 * @returns
 */
export function getChannelInfoLogByChannel(id: any) {
  return request({
    url: `/adminapi/account/channel/point/log/${id}`,
    method: "get",
  });
}

/**
 * 重置渠道账户密码
 * @param id
 * @returns
 */
export function resetChannelPWD(id: any) {
  return request({
    url: `/adminapi/account/channel/reset_pwd/${id}`,
    method: "get",
  });
}
