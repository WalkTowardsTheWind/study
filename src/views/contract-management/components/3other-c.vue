<template>
  <div class="p-24px">
    <zxn-search
      :formItem="formItem"
      @on-reset="handleReset"
      @on-search="handleSearch"
    >
      <el-form-item>
        <el-input
          placeholder="请输入合同编号、合同名称、甲方、乙方"
          v-model="formItem.keyword"
        >
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="合同状态">
        <el-select v-model="formItem.status" filterable clearable @change="handleSearch">
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
      hasSelect
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <el-button type="primary" @click="addClick">合同归档</el-button>
        <el-button type="primary" plain @click="handleExport"
          >批量下载</el-button
        >
      </template>
      <template #type>
        <span>其他合同</span>
      </template>
      <template #is_online="{ row }">
        <span>{{ row.is_online == 1 ? "线上签署" : "线下签署" }}</span>
      </template>
      <template #caozuo="{ row }">
        <el-button
          :disabled="!row.cert_url"
          v-if="row.status == 2 || row.status == 3"
          type="primary"
          link
          @click="checkUrl(row.cert_url)"
          >查看证书</el-button
        >
        <el-button
          v-if="row.status == 2"
          type="primary"
          link
          @click="setStatus(row.id, 3)"
          >合同解除</el-button
        >
        <el-button
          v-if="row.status != 1 && row.status != 2"
          type="primary"
          link
          @click="delClick(row.id)"
          >删除</el-button
        >
        <el-button
          :disabled="!row.contract_url"
          type="primary"
          link
          @click="checkUrl(row.contract_url)"
          >查看合同</el-button
        >
        <el-button type="primary" link @click="toDetail(row.id)"
          >详情</el-button
        >
      </template>
    </zxn-table>
    <!-- 合同归档 -->
    <ContractAdd
      :contract_type="3"
      :visible="isAddShow"
      @add-close="addDialogClose"
      @add-confirm="addDialogConfirm"
    />
    <!-- 合同详情 -->
    <ContractDetail
      :visible="detailShow"
      @detail-close="detailClose"
      :detailId="detailId"
    />
  </div>
</template>

<script lang="ts" setup>
import ContractAdd from "./contract-add.vue";
import ContractDetail from "./contract-detail.vue";

import {
  getContractList,
  delContract,
  setContractStatus,
} from "@/api/contract-m/index";

import { contract_status, color } from "./options";
import { downloadByOnlineUrl } from "@/utils/download";

const formItem = reactive({
  keyword: "",
  status: "",
  date: [],
  tax_land_id: "",
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
    tax_land_id: formItem.tax_land_id,
    type: "3", // 1企业合同 2渠道合同 3其他合同
    limit: pageInfo.limit,
    page: pageInfo.page,
  };
  tableData.length = 0;
  getContractList(params).then((res) => {
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  });
};
const detailId = ref(0);
const tableData = reactive([] as any);
const columnList = [
  { label: "合同编号", prop: "contract_no" },
  { label: "合同名称", prop: "contract_name" },
  { label: "合同类型", slot: "type" },
  {
    label: "状态",
    prop: "status",
    type: "enum",
    path: "contractListEnum.contractStatus",
    color: color,
  },
  { label: "签署形式", slot: "is_online" },
  { label: "甲方", prop: "part_a_name" },
  { label: "乙方", prop: "part_b_name" },
  { label: "签约时间", prop: "sign_time", minWidth: 150 },
  { label: "到期时间", prop: "effective_end_time", minWidth: 150 },
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
const ids = ref([] as any);
const handleSelect = (val: any) => {
  ids.value = val.map((i) => i.id);
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

const delClick = (id: number) => {
  ElMessageBox.confirm("是否删除当前合同?", "", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  }).then(() => {
    delContract(id).then(() => {
      ElMessage({
        type: "success",
        message: "操作成功",
      });
      handleSearch();
    });
  });
};

const pageChange = (cur) => {
  const { limit, page } = cur;
  pageInfo.limit = limit;
  pageInfo.page = page;
  handleSearch();
};

const setStatus = (id: number, status: number) => {
  switch (status) {
    case 3:
      ElMessageBox.confirm("是否解除当前合同?", "", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        setContractStatus(id, status).then(() => {
          ElMessage({
            type: "success",
            message: "操作成功",
          });
          handleSearch();
        });
      });

      break;
  }
};

const toDetail = (id: number) => {
  detailId.value = id;
  detailShow.value = true;
};

const handleExport = async () => {
  if (ids.value.length == 0) {
    return ElMessage.warning("请先选择要下载的合同");
  }
  await downloadByOnlineUrl("/adminapi/contract/get_contract_download", {
    ids: ids.value,
  });
};

handleSearch();
</script>
