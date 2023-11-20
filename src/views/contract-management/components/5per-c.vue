<template>
  <div class="p-24px">
    <zxn-search
      :formItem="formItem"
      @on-reset="handleReset"
      @on-search="handleSearch"
    >
      <el-form-item>
        <el-input
          placeholder="请输入甲方、乙方、身份证号"
          v-model="formItem.keyword"
        >
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="合同状态">
        <el-select v-model="formItem.status" @change="handleSearch">
          <el-option
            v-for="item of contract_status"
            :key="item.status"
            :label="item.label"
            :value="item.status"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="创建日期">
        <zxn-date-range v-model="formItem.date" />
      </el-form-item>
    </zxn-search>

    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :pageInfo="pageInfo"
      @page-change="pageChange"
      @selection-change="handleSelect"
    >
      <template #type>
        <span>个人合同</span>
      </template>
      <template #is_online>
        <span>{{ "线上签署" }}</span>
      </template>
      <template #caozuo="{ row }">
        <!-- <el-button
          v-if="row.contract_url"
          type="primary"
          link
          @click="checkUrl(row.contract_url)"
          >查看证书</el-button
        > -->
        <el-button
          v-if="row.pdf_url"
          type="primary"
          link
          @click="checkUrl(row.pdf_url)"
          >查看合同</el-button
        >
      </template>
    </zxn-table>
  </div>
</template>

<script lang="ts" setup>
import { getPerContractList } from "@/api/contract-m/index";
const route = useRoute();
import { contract_status, percolor } from "./options";
import { useRoute } from "vue-router";

const formItem = reactive({
  keyword: "",
  status: "",
  date: [],
});
const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});
const handleReset = () => {
  formItem.keyword = "";
  formItem.status = "";
  formItem.date = [];
  handleSearch();
};
const handleSearch = () => {
  let params = {
    keyword: formItem.keyword,
    start_time: formItem.date[0] || "",
    end_time: formItem.date[1] || "",
    status: formItem.status,
    limit: pageInfo.limit,
    page: pageInfo.page,
  };
  tableData.length = 0;
  getPerContractList(params).then((res) => {
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  });
};
const tableData = reactive([] as any);
const columnList = [
  { label: "合同类型", slot: "type", width: 100 },
  {
    label: "状态",
    prop: "status",
    type: "enum",
    path: "contractListEnum.percontractStatus",
    color: percolor,
    width: 100,
  },
  { label: "签署形式", slot: "is_online", width: 100 },
  { label: "甲方", prop: "tax_land_name", width: 250 },
  { label: "乙方", prop: "real_name" },
  { label: "签约时间", prop: "sign_time", width: 200 },
  {
    label: "操作",
    slot: "caozuo",
    minWidth: 220,
    align: "right",
    fixed: "right",
  },
];

const handleSelect = (val: any) => {
  console.log(val);
};

const checkUrl = (url: string) => {
  window.open(url, "_blank");
};

const pageChange = (cur) => {
  const { limit, page } = cur;
  pageInfo.limit = limit;
  pageInfo.page = page;
  handleSearch();
};

const getListByRoute = () => {
  const company_name: any = route.query.company_name || "";
  formItem.keyword = company_name;
  handleSearch();
};

if (route.query.company_name && route.query.type == "5") {
  getListByRoute();
} else {
  handleSearch();
}
// handleSearch();
</script>
