<template>
  <div class="p-[24px]">
    <div class="m-y-[30px]">
      <span>企业名称</span>
      <span> 武汉某某某有限公司</span>
      <span>企业账户ID</span>
      <span> 0965672821</span>
    </div>
    <zxn-table :tab-data="tableData" :column-list="columnList">
      <template #operation>
        <el-button link>查看</el-button>
      </template>
    </zxn-table>
  </div>
</template>

<script lang="ts" setup>
const tableData = reactive([
  { value: "1", name: "value", state: 1 },
  { value: "2", name: "shshhud", state: 1 },
  { value: "3", name: "shshhud", state: 1 },
  { value: "4", name: "shshhud", state: 1 },
  { value: "5", name: "shshhud", state: 1 },
]);
const columnList = [
  { label: "充值单号", prop: "value" },
  { label: "企业名称" },
  { label: "行业" },
  { label: "税源地" },
  { label: "税地账户" },
  { label: "充值额度" },
  { label: "充值时间" },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];
</script>
