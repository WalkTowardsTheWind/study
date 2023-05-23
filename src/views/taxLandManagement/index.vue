<template>
  <zxn-plan>
    <zxn-tabs :activeName="activeName" :tabsList="tabsList"> </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import selfOperatedTaxLand from "./selfOperatedTaxLand/selfOperatedTaxLand.vue";
import purchaseTaxLand from "./purchaseTaxLand/purchaseTaxLand.vue";
const activeName = "1";
const tabsList = reactive([
  {
    name: "1",
    label: "自营税地",
    subassembly: selfOperatedTaxLand,
  },
  {
    name: "2",
    label: "采购税地",
    subassembly: purchaseTaxLand,
  },
]);

onMounted(() => {});
</script>
