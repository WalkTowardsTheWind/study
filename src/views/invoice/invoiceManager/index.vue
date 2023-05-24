<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList">
      <template #enterprise>
        <invoiceTable type="enterprise" />
      </template>
      <template #channel>
        <invoiceTable type="channel" />
      </template>
    </zxn-tabs>
    <task-dialog ref="taskDialogRef" />
    <addinvoice />
  </zxn-plan>
</template>
<script setup lang="ts">
import taskDialog from "./components/taskDialog.vue";
import addinvoice from "./components/addinvoice.vue";
import invoiceTable from "./components/invoiceTable.vue";
const activeName = "enterprise";
const tabsList = [
  {
    name: "enterprise",
    label: "企业发票",
  },
  {
    name: "channel",
    label: "渠道发票",
  },
];
// const taskDialogRef = ref(null);
// const handleSearch = () => {
//   taskDialogRef.value.init([]);
// };
</script>
