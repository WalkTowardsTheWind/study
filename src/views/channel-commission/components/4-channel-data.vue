<template>
  <div class="p-[24px]">
    <zxn-table :tab-data="tableData" :column-list="columnList"></zxn-table>
  </div>
</template>

<script lang="ts" setup>
const tableData = reactive([]);
const columnList = [
  { label: "渠道", prop: "value" },
  { label: "渠道结算税前" },
  { label: "渠道结算税后" },
  { label: "销售部业绩" },
  { label: "渠道结算合计" },
];
</script>
