<template>
  <div class="p-24px">
    <zxn-search
      :formItem="formItem"
      @on-reset="handleReset"
      @on-search="handleSearch"
    >
      <el-form-item>
        <el-input placeholder="请输入甲方、乙方" v-model="formItem.keyword">
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
      hasSelect
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <el-button type="primary" plain>批量下载</el-button>
      </template>
      <template #type>
        <span>个人合同</span>
      </template>
      <template #is_online="{ row }">
        <span>{{ row.is_online == 1 ? "线上签署" : "线下签署" }}</span>
      </template>
      <template #caozuo="{ row }">
        <el-button
          :disabled="!row.cert_url"
          type="primary"
          link
          @click="checkUrl(row.cert_url)"
          >查看证书</el-button
        >
        <el-button
          :disabled="!row.contract_url"
          type="primary"
          link
          @click="checkUrl(row.contract_url)"
          >查看合同</el-button
        >
        <el-button type="primary" link @click="download(row.id)"
          >下载</el-button
        >
      </template>
    </zxn-table>
  </div>
</template>

<script lang="ts" setup>
import ContractAdd from "./contract-add.vue";

import { getPerContractList } from "@/api/contract-m/index";

import { contract_status, percolor } from "./options";

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
const detailId = ref(0);
const tableData = reactive([] as any);
const columnList = [
  { label: "合同类型", slot: "type" },
  {
    label: "状态",
    prop: "status",
    type: "enum",
    path: "contractListEnum.percontractStatus",
    color: percolor,
  },
  { label: "签署形式", slot: "is_online" },
  { label: "甲方", prop: "tax_land_name", width: 250 },
  { label: "乙方", prop: "real_name" },
  { label: "签约时间", prop: "sign_time", width: 200 },
  {
    label: "操作",
    slot: "caozuo",
    minWidth: 250,
    align: "right",
    fixed: "right",
  },
];

const isAddShow = ref(false);

const detailShow = ref(false);

const detailClose = (visible: boolean) => {
  detailShow.value = visible;
};

const handleSelect = (val: any) => {
  console.log(val);
};

const addClick = () => {
  isAddShow.value = true;
};
const addDialogClose = (visible: boolean) => {
  isAddShow.value = visible;
};
const addDialogConfirm = (visible: boolean) => {
  isAddShow.value = visible;
  handleSearch();
};

const checkUrl = (url: string) => {
  window.open(url, "_blank");
};

const download = (ids) => {
  console.log(ids);
};

handleSearch();
</script>
