import request from "@/utils/request";

// 人员认证列表
export function getAuthList(params: any) {
  return request({
    url: "/adminapi/member/user_list",
    method: "get",
    params,
  });
}

// 人员认证导出
export function getAuthExcel(params: any) {
  return request({
    url: "/adminapi/member/get_user_excel",
    method: "get",
    params,
  });
}
