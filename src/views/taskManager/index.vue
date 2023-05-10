<template>
  <zxn-plan>
    <zxn-tabs :activeName="activeName" :tabsList="tabsList"></zxn-tabs>
    <div class="p-[24px] p-b-[0]">
      <zxn-search :formItem="formItem">
        <el-row>
          <el-col :span="8">
            <el-input v-model="formItem.user" placeholder="请输入关键字">
              <template #prefix>
                <el-icon><i-ep-Search /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务状态">
              <el-select v-model="formItem.status" placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行业类型">
              <el-select v-model="formItem.status" placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="date" label="申请日期">
              <el-date-picker
                v-model="formItem.date"
                type="daterange"
                unlink-panels
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
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
  </zxn-plan>
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
    label: "人工任务",
  },
];
// const statusOption = [
//   { label: "申请中", value: 1 },
//   { label: "报名中", value: 2 },
//   { label: "进行中", value: 3 },
//   { label: "已验收", value: 4 },
//   { label: "异常", value: 5 },
// ];
const options = [] as any;
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
  { label: "申请时间", sortable: "custom", width: 120 },
  { label: "任务描述" },
  { label: "状态" },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];
</script>
