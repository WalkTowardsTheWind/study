<template>
  <div class="p-[24px]">
    <zxn-table :tab-data="tableData" :column-list="columnList"></zxn-table>
  </div>
</template>

<script lang="ts" setup>
const tableData = reactive([]);
const columnList = [
  { label: "产品类型", prop: "value" },
  { label: "打款金额" },
  { label: "结算金额" },
  { label: "利润" },
];
</script>
