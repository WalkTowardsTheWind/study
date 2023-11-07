<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" :activeName="activeName">
      <template #1>
        <ContractTemplate></ContractTemplate>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import ContractTemplate from "./components/c-t.vue";
const tabsList = [
  {
    name: "1",
    label: "合同模板",
  },
];

const activeName = ref("1");
</script>

<style scoped></style>
