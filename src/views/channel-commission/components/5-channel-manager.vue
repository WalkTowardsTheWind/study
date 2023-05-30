<template>
  <div class="p-[24px]">
    <zxn-table :tab-data="tableData" :column-list="columnList"></zxn-table>
  </div>
</template>

<script lang="ts" setup>
const tableData = reactive([]);
const columnList = [
  { label: "渠道", prop: "value" },
  { label: "销售业绩" },
  { label: "利润" },
];
</script>
