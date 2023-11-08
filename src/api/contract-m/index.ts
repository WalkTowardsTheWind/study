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
