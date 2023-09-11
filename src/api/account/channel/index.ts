import request from "@/utils/request";
/**
 * 获取渠道账户列表
 * @param params 
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
		params
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
		data
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
		data
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
