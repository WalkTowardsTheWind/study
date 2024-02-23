import request from "@/utils/request";

//
export function getPositionList(params: any) {
  return request({
    url: "/adminapi/job/job",
    method: "get",
    params,
  });
}

//
export const setPositionStatus = (params) => {
  return request({
    url: "/adminapi/job/set_status",
    method: "put",
    params,
  });
};

export const getDetailById = (id) => {
  return request({
    url: `/adminapi/job/job/${id}`,
    method: "get",
  });
};
