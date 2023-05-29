<template>
  <div class="p-[24px]">
    <zxn-table :tab-data="tableData" :column-list="columnList"></zxn-table>
  </div>
</template>

<script lang="ts" setup>
const tableData = reactive([]);
const columnList = [
  { label: "企业ID", prop: "value" },
  {
    label: "状态",
    prop: "state",
    type: "enum",
    path: "statusEnum.AccountType",
    color: { 0: "blue", 1: "green", 2: "浅蓝", 3: "红色", 4: "封停" },
  },
  { label: "客户名称" },
  { label: "产品类型" },
  { label: "客户点位" },
  { label: "渠道点位" },
  { label: "成本点位" },
  { label: "渠道" },
  { label: "渠道管理员" },
  { label: "厂商" },
];
</script>
