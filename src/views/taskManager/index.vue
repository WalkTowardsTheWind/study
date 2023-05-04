<template>
  <div class="app-container">
    <div class="app-container-block">
      <zxn-tabs :activeName="activeName" :tabsList="tabsList"></zxn-tabs>
      <zxn-search :formItem="formItem">
        <el-form-item label="任务状态:" style="width: 100%">
          <zxn-button-group :options="statusOption" v-model="formItem.status" />
        </el-form-item>
        <el-form-item label="关键字:">
          <el-input v-model="formItem.user" placeholder="Approved by" />
        </el-form-item>
        <el-form-item label="行业类型:">
          <el-select v-model="formItem.status" class="m-2" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="date" label="申请日期:">
          <el-date-picker
            v-model="formItem.date"
            type="daterange"
            unlink-panels
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </zxn-search>
      <zxn-table :table-data="tableData" :column-list="columnList" hasSelect>
        <template #tableTop>
          <el-dropdown trigger="click">
            <el-button type="primary">批量操作</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>驳回</el-dropdown-item>
                <el-dropdown-item>通过</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template #operation>
          <el-button link type="primary">通过</el-button>
          <el-button link type="primary">驳回</el-button>
          <el-button link type="primary">详情</el-button>
          <el-button link type="primary">编辑</el-button>
          <el-button link type="primary">删除</el-button>
        </template>
      </zxn-table>
    </div>
    <viewDialog />
  </div>
</template>
<script setup lang="ts">
import viewDialog from "./components/viewDialog.vue";
const activeName = "auto";
const tabsList = [
  {
    name: "auto",
    label: "自动任务",
  },
  {
    name: "manual",
    label: "人任务",
  },
];
const statusOption = [
  { label: "申请中", value: 1 },
  { label: "报名中", value: 2 },
  { label: "进行中", value: 3 },
  { label: "已验收", value: 4 },
  { label: "异常", value: 5 },
];
const options = [];
const formItem = reactive({
  user: "",
  status: "",
  date: "",
});
const tableData = reactive([
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5" },
]);
const columnList = [
  { label: "任务编号", prop: "value" },
  { label: "任务名称", prop: "name" },
  { label: "关联企业" },
  { label: "需求人数" },
  { label: "行业" },
  { label: "金额" },
  { label: "申请时间", sortable: "custom" },
  { label: "任务描述" },
  { label: "状态" },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];
</script>
