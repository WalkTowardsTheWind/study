import { getLandList } from "@/api/common";

/**
 * 获取税地列表
 * @returns []
 */
export default async function useTaxlandList() {
  const { data } = await getLandList();
  return data?.tax_land_list;
}
