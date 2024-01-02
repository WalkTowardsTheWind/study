<template>
  <zxn-plan>
    <zxn-tabs
      v-model:activeName="activeName"
      :tabsList="tabsList"
      @tabChange="handleTabChange"
    >
      <template #enterprise>
        <enterprise-settlement ref="enterprise"></enterprise-settlement>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import enterpriseSettlement from "./enterpriseSettlement/index.vue";
const route = useRoute();
const activeName = ref("enterprise");
const tabsList = reactive([
  {
    name: "enterprise",
    label: "企业结算",
  },
]);

const enterprise = ref();
const handleTabChange = (tab: string) => {
  sessionStorage.setItem("settlementCenter", tab);
};

onMounted(() => {
  enterprise.value.getTableData();
});
</script>
