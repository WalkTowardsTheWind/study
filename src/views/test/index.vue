<template>
  <div>
    <integration-table :table-data="tableData" :column-list="columnList">
      <template #operation="{ row }">
        <el-button type="text">{{ row.value }}</el-button>
      </template>
    </integration-table>
  </div>
</template>
<script setup lang="ts">
const tableData = [{ value: "2222", name: "wwww" }];
const columnList = [
  { label: "hahah", prop: "value" },
  { label: "哈哈哈", prop: "name" },
  { label: "操作", slot: "operation" },
];
</script>
