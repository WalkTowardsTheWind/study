<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList">
      <template #auto>
        <div class="p-[24px] p-b-[0]">
          <zxn-search :formItem="formItem" @on-search="handleSearch">
            <el-form-item label="">
              <el-input v-model="formItem.user" placeholder="请输入关键字">
                <template #prefix>
                  <el-icon><i-ep-Search /></el-icon>
                </template>
              </el-input>
            </el-form-item>
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
            <el-form-item label="行业类型">
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
          <zxn-table
            :table-data="tableData"
            :column-list="columnList"
            hasSelect
          >
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
      </template>
      <template #manual>
        <div class="p-[24px] p-b-[0]">
          <zxn-search :formItem="formItem" @on-search="handleSearch">
            <el-form-item label="">
              <el-input v-model="formItem.user" placeholder="请输入关键字">
                <template #prefix>
                  <el-icon><i-ep-Search /></el-icon>
                </template>
              </el-input>
            </el-form-item>
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
            <el-form-item label="行业类型">
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
          <zxn-table
            :table-data="tableData"
            :column-list="columnList"
            hasSelect
          >
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
      </template>
    </zxn-tabs>
    <viewDialog />
  </zxn-plan>
</template>
<script setup lang="ts">
import viewDialog from "./components/viewDialog.vue";
const activeName = "auto";
const { proxy } = getCurrentInstance() as any;
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
const options = [];
const formItem = reactive({
  user: "",
  status: "",
  date: ["2023/05/06"],
});
const tableData = reactive([{ value: "2", status: "1" }]);
const columnList = [
  { label: "任务编号", prop: "value" },
  { label: "任务名称", prop: "name" },
  { label: "关联企业" },
  { label: "需求人数" },
  { label: "行业" },
  { label: "金额" },
  { label: "申请时间", sortable: "custom", width: 120 },
  { label: "任务描述" },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.IndustryType",
    prop: "status",
    color: { 0: "blue", 1: "red" },
  },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];
const handleSearch = () => {
  console.log(unref(formItem), "2222");
};
</script>
