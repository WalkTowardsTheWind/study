<template>
  <div class="p-24px">
    <zxn-search
      :formItem="formItem"
      @on-reset="handleReset"
      @on-search="handleSearch"
    >
      <el-form-item>
        <el-input placeholder="请输入" v-model="formItem.keyword">
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="合同状态">
        <el-select v-model="formItem.status">
          <el-option
            v-for="item of contract_status"
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
        <el-button type="primary" @click="addClick">合同归档</el-button>
        <el-button type="primary" plain @click="onlineSignClick"
          >在线签署</el-button
        >
        <el-button type="primary" plain>下载</el-button>
      </template>
      <template #type>
        <span>企业合同</span>
      </template>
      <template #is_online="{ row }">
        <span>{{ row.is_online == 1 ? "线上签署" : "线下签署" }}</span>
      </template>
      <template #caozuo="{ row }">
        <el-button v-if="row.status == 0" type="primary" link
          >发起签署</el-button
        >
        <el-button
          v-if="row.status == 1"
          type="primary"
          link
          @click="setStatus(row.id, 0)"
          >撤回</el-button
        >
        <el-button
          v-if="row.status != 1 && row.status != 2"
          type="primary"
          link
          @click="delClick(row.id)"
          >删除</el-button
        >

        <el-button
          v-if="row.status == 2 || row.status == 3"
          type="primary"
          link
          @click="checkUrl(row.contract_url)"
          >查看证书</el-button
        >
        <el-button
          v-if="row.status == 2"
          type="primary"
          link
          @click="setStatus(row.id, 3)"
          >合同解除</el-button
        >
        <el-button type="primary" link>下载</el-button>
        <el-button type="primary" link @click="toDetail(row.id)"
          >详情</el-button
        >
      </template>
    </zxn-table>
    <!-- 合同归档 -->
    <ContractAdd
      :visible="isAddShow"
      @add-close="addDialogClose"
      @add-confirm="addDialogConfirm"
    />
    <!-- 在线签署 -->
    <OnlineSign
      :visible="isOnline"
      @close="onlineClose"
      @confirm="onlineConfirm"
    />
    <!-- 合同详情 -->
    <ContractDetail
      :visible="detailShow"
      @close="detailClose"
      :detailId="detailId"
    />
  </div>
</template>

<script lang="ts" setup>
import ContractAdd from "./contract-add.vue";
import OnlineSign from "./online-sign.vue";
import ContractDetail from "./contract-detail.vue";

import { getLandList } from "@/api/common";

import {
  getContractList,
  setContractStatus,
  delContract,
} from "@/api/contract-m/index";

import { contract_status } from "./options";

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
const handleReset = () => {};
const handleSearch = () => {
  let params = {
    keyword: formItem.keyword,
    start_time: formItem.date[0] || "",
    end_time: formItem.date[1] || "",
    status: formItem.status,
    tax_land_id: formItem.tax_land_id,
    type: "1", // 1企业合同 2渠道合同 3其他合同
  };
  tableData.length = 0;
  getContractList(params).then((res) => {
    console.log(res);
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
    color: {
      0: {
        color: "#35C5F3",
        background: "#DFF6FD",
      },
      1: {
        color: "#1EE585",
        background: "#DBFBEB",
      },
      2: {
        color: "#356FF3",
        background: "#DFE8FD",
      },
      3: {
        color: "#333333",
        background: "#DEDEDE",
      },
    },
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

const handleSelect = (val) => {
  console.log(val);
};
const isOnline = ref(false);
const onlineSignClick = () => {
  isOnline.value = true;
};

const addClick = () => {
  isAddShow.value = true;
};
const addDialogClose = (visible: boolean) => {
  isAddShow.value = visible;
};
const addDialogConfirm = () => {
  handleSearch();
};

const onlineClose = (visible: boolean) => {
  isOnline.value = visible;
};
const onlineConfirm = () => {};

const checkUrl = (url) => {
  window.open(url, "_blank");
};
const setStatus = (id, status) => {
  switch (status) {
    case 0:
      ElMessageBox.confirm("是否撤回当前合同?", "", {
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

const delClick = (id) => {
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

const toDetail = (id) => {
  detailId.value = id;
  detailShow.value = true;
};
handleSearch();
</script>
