import request from "@/utils/request";

// 列表
export function getDownloadList(params: any) {
  return request({
    url: `/adminapi/file/download/index`,
    method: "get",
    params,
  });
}
