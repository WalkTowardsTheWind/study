<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList"> </zxn-tabs>
    <div class="p-[24px] p-b-[0]">
      <zxn-search
        :formItem="formItem"
        @on-search="handleSearch"
        :label-width="100"
      >
        <el-form-item label="">
          <el-input v-model="formItem.user" placeholder="请输入关键字">
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="开票状态">
          <el-select v-model="formItem.status" placeholder="请选择">
            <el-option
              v-for="item in proxy.$const['statusEnum.IndustryType']"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="税源地区">
          <el-select v-model="formItem.status" placeholder="请选择">
            <el-option
              v-for="item in proxy.$const['statusEnum.IndustryType']"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开票类型">
          <el-select v-model="formItem.status" placeholder="请选择">
            <el-option
              v-for="item in proxy.$const['statusEnum.IndustryType']"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开票行业类目">
          <el-select v-model="formItem.status" placeholder="请选择">
            <el-option
              v-for="item in proxy.$const['statusEnum.IndustryType']"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="date" label="申请日期">
          <zxn-date-range v-model="formItem.date" />
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
          <el-button link type="primary">驳回</el-button>
          <el-button link type="primary">上传发票</el-button>
          <el-button link type="primary">查看物流</el-button>
          <el-button link type="primary">详情</el-button>
          <el-button link type="primary">导出</el-button>
        </template>
      </zxn-table>
    </div>
    <task-dialog ref="taskDialogRef" />
    <addinvoice />
  </zxn-plan>
</template>
<script setup lang="ts">
import taskDialog from "./components/taskDialog.vue";
import addinvoice from "./components/addinvoice.vue";
import type { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const activeName = "enterprise";
const tabsList = [
  {
    name: "enterprise",
    label: "企业发票",
  },
  {
    name: "channel",
    label: "渠道发票",
  },
];
const formItem = reactive({});
const taskDialogRef = ref(null);
const handleSearch = () => {
  taskDialogRef.value.init([]);
};
const columnList: any[] = reactive([
  { label: "发票任务编号", prop: "value", minWidth: 110 },
  { label: "关联任务数量", prop: "name", minWidth: 110 },
  { label: "申请开票企业", minWidth: 110 },
  { label: "开票样式", minWidth: 80 },
  { label: "申请开票金额", minWidth: 110 },
  { label: "税地发票面额", minWidth: 110 },
  { label: "发票张数", minWidth: 80 },
  { label: "开票要求", minWidth: 80 },
  { label: "申请时间", sortable: "custom", minWidth: 120 },
  { label: "结算确认函", minWidth: 120 },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.IndustryType",
    prop: "status",
    color: { 0: "blue", 1: "red" },
    minWidth: 80,
  },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
]);
const tableData: any[] = reactive([]);
</script>
