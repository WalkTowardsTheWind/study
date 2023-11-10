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
<script lang="ts">
export default {
  name: "taxLandManagement",
};
</script>
<script setup lang="ts">
import selfOperatedTaxLand from "./selfOperatedTaxLand/selfOperatedTaxLand.vue";
import purchaseTaxLand from "./purchaseTaxLand/purchaseTaxLand.vue";
const activeName = ref("selfOperated");
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
const handleTabChange = (name?: any) => {
  if (name) {
    sessionStorage.setItem("taxLandManagementActiveName", name);
  }
  activeName.value =
    sessionStorage.getItem("taxLandManagementActiveName") ?? "selfOperated";
  if (
    sessionStorage.getItem("taxLandManagementActiveName") === "selfOperated"
  ) {
    selfOperated.value.getTableData();
  } else if (
    sessionStorage.getItem("taxLandManagementActiveName") === "purchase"
  ) {
    purchase.value.getTableData();
  } else if (activeName.value === "selfOperated") {
    selfOperated.value.getTableData();
  }
};
onActivated(() => {
  handleTabChange();
});
</script>
