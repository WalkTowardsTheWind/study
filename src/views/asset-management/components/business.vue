<template>
  <div class="p-[24px]">
    <zxn-table :tab-data="tableData" :column-list="columnList">
      <template #operation>
        <el-button link>详情</el-button>
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
  { label: "企业ID", prop: "value" },
  {
    label: "状态",
    prop: "state",
    type: "enum",
    path: "statusEnum.AccountType",
    color: { 0: "blue", 1: "green", 2: "浅蓝", 3: "红色", 4: "封停" },
  },
  { label: "企业名称" },
  { label: "累计充值" },
  { label: "累计结算" },
  { label: "企业余额", sortable: "custom", width: 120 },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];
</script>
