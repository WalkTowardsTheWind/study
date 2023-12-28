import request from "@/utils/request";
import { AxiosPromise } from "axios";

export function getDataCenter(params): AxiosPromise {
  return request({
    url: "/adminapi/data_center",
    method: "GET",
    params,
  });
}

export function getPlanList(params): AxiosPromise {
  return request({
    url: "/adminapi/sales_plan_list",
    method: "GET",
    params,
  });
}

export function getPlanByTaxLandId(params): AxiosPromise {
  return request({
    url: "/adminapi/sales_plan_detail",
    method: "GET",
    params,
  });
}

export function savePlan(data): AxiosPromise {
  return request({
    url: "/adminapi/set_sales_plan",
    method: "post",
    data,
  });
}

export function cleanPlan(data): AxiosPromise {
  return request({
    url: "/adminapi/delete_sales_plan",
    method: "delete",
    data,
  });
}
