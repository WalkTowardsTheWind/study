<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName"></zxn-tabs>
    <span class="recharge">累计充值<span class="money">12.4880.00</span></span>
    <div class="p-[24px]">
      <zxn-search :formItem="formItem">
        <el-form-item label="">
          <el-input v-model="formItem.search" placeholder="请输入关键字">
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="税源地">
          <el-select v-model="formItem.state" placeholder="Select">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select v-model="formItem.state" placeholder="Select">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="date" label="创建日期">
          <el-date-picker
            v-model="formItem.date"
            type="daterange"
            unlink-panels
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="行业">
          <el-select v-model="formItem.state" placeholder="Select">
            <el-option
              v-for="(item, index) in []"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </zxn-search>
      <zxn-table :table-data="tableData" :column-list="columnList" hasSelect>
        <template #tableTop>
          <el-dropdown class="" trigger="click">
            <el-button type="primary">批量操作</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="1">删除</el-dropdown-item>
                <el-dropdown-item command="2">下载</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template #operation="scope">
          <el-button link type="primary" @click="toDetail(scope.id)"
            >下载</el-button
          >
          <el-button link type="primary" @click="toDetail(scope.id)"
            >详情</el-button
          >
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
</template>

<script lang="ts" setup>
import router from "@/router";

const tabsList = [
  {
    name: "1",
    label: "任务充值",
  },
];

const activeName = ref("1");

const formItem = reactive({
  search: "",
  state: "",
  manufacturer: "",
  Invoice: "",
  tax: "",
  date: "",
});
const tableData = reactive([
  { value: "1", name: "shshhud", state: 1 },
  { value: "2", name: "shshhud", state: 1 },
  { value: "3", name: "shshhud", state: 1 },
  { value: "4", name: "shshhud", state: 1 },
  { value: "5", name: "shshhud", state: 1 },
]);
const columnList = [
  { label: "充值单号", prop: "value" },
  {
    label: "状态",
    prop: "state",
    type: "enum",
    path: "statusEnum.AccountType",
    color: { 0: "blue", 1: "green", 2: "浅蓝", 3: "红色", 4: "封停" },
  },
  { label: "企业名称" },
  { label: "关联任务" },
  { label: "行业" },
  { label: "税源地" },
  { label: "税地账户" },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];

const toDetail = (status: string) => {
  router.push({ name: "recharge-center-detail", query: { id: status } });
};
</script>

<style lang="scss">
.searchForm {
  margin-top: 10px;
}

.line {
  margin: 0 2px;
  font-size: 1px;
  color: #ccc;
  border: none !important;
}

.recharge {
  position: absolute;
  top: 86px;
  right: 180px;
  font-size: 14px;
}

.money {
  margin-left: 19px;
  font-size: 18px;
  font-weight: 500;
  color: #333;
}
</style>
