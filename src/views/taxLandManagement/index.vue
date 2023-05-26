<template>
  <zxn-plan>
    <zxn-tabs
      v-model:activeName="activeName"
      :tabsList="tabsList"
      @tabChange="handleTabChange"
    >
      <template #selfOperated>
        <self-operated-tax-land ref="selfOperated"></self-operated-tax-land>
      </template>
      <template #purchase>
        <purchase-tax-land ref="purchase"></purchase-tax-land>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import selfOperatedTaxLand from "./selfOperatedTaxLand/selfOperatedTaxLand.vue";
import purchaseTaxLand from "./purchaseTaxLand/purchaseTaxLand.vue";
const activeName = "selfOperated";
const tabsList = reactive([
  {
    name: "selfOperated",
    label: "自营税地",
  },
  {
    name: "purchase",
    label: "采购税地",
  },
]);
const selfOperated = ref();
const purchase = ref();
const handleTabChange = () => {
  if (activeName.value === "selfOperated") {
    console.log(1);

    selfOperated.value.getTableData();
  } else if (activeName.value === "purchase") {
    console.log(2);

    purchase.value.getTableData();
  }
};
onMounted(() => {});
</script>
