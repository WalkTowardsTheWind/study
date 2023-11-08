<template>
  <div class="p-24px">
    <zxn-search
      :formItem="formItem"
      @on-reset="handleReset"
      @on-search="handleSearch"
    >
      <el-form-item>
        <el-input placeholder="请输入">
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="合同状态">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="税源地">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="创建日期">
        <zxn-date-range v-model="date" />
      </el-form-item>
    </zxn-search>

    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
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
    <ContractDetail :visible="detailShow" @close="detailClose" />
  </div>
</template>

<script lang="ts" setup>
import ContractAdd from "./contract-add.vue";
import OnlineSign from "./online-sign.vue";
import ContractDetail from "./contract-detail.vue";

const formItem = reactive({});
const handleReset = () => {};
const handleSearch = () => {};
const date = ref([]);
const tableData = reactive([] as any);
const columnList = [
  { label: "合同编号" },
  { label: "状态" },
  { label: "合同类型" },
  { label: "签署形式" },
  { label: "甲方" },
  { label: "乙方" },
  { label: "签约时间" },
  { label: "到期时间" },
  { label: "备注" },
  { label: "操作" },
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
const addDialogConfirm = () => {};

const onlineClose = (visible: boolean) => {
  isOnline.value = visible;
};
const onlineConfirm = () => {};
</script>
