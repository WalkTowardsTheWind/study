import request from "@/utils/request";

// 模板列表
export function getContractTempList(params) {
	return request({
		url: `/adminapi/contract/tpl/index`,
		method: "GET",
		params,
	});
}

// 模板详情
export function getContractTempListDetail(id) {
	return request({
		url: `/adminapi/contract/tpl/read/${id}`,
		method: "GET",
	});
}

// 模板删除
export function deleteContractTemp(id) {
	return request({
		url: `/adminapi/contract/tpl/del/${id}`,
		method: "DELETE",
	});
}

// 模板创建
export function createContractTemp(data) {
	return request({
		url: `/adminapi/contract/tpl/create`,
		method: "POST",
		data,
	});
}

// 模板编辑
export function editContractTemp(data) {
	return request({
		url: `/adminapi/contract/tpl/save`,
		method: "POST",
		data,
	});
}

// 模板pdf上传
// /adminapi/contract/tpl/upload

// 合同列表
export function getContractList(params) {
	return request({
		url: `/adminapi/contract/index`,
		method: "get",
		params,
	});
}

// 合同归档
export function archiveContract(data) {
	return request({
		url: `/adminapi/contract/archive`,
		method: "post",
		data,
	});
}

// 合同状态变更
export function setContractStatus(id, status) {
	return request({
		url: `/adminapi/contract/set_status/${id}/${status}`,
		method: "get",
	});
}

// 合同删除
export function delContract(id) {
	return request({
		url: `/adminapi/contract/del/${id}`,
		method: "DELETE",
	});
}

// 合同详情
export function contractDetail(id) {
	return request({
		url: `/adminapi/contract/read/${id}`,
		method: "get",
	});
}

// 合同个人印章生成
export function createContractSeal(data) {
	return request({
		url: `/adminapi/contract/seal`,
		method: "post",
		data
	});
}
// 合同发起签署
export function goContractOnline(data) {
	return request({
		url: `/adminapi/contract/sign`,
		method: "post",
		data
	});
}

// 合同在线签署
export function signContractOnline(data) {
	return request({
		url: `/adminapi/contract/create`,
		method: "post",
		data
	});
}
