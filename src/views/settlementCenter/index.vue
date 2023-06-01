<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList"></zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
// import { useRouter } from "vue-router";
import enterpriseSettlement from "./enterpriseSettlement/index.vue";
import channelSettlement from "./channelSettlement/index.vue";
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "企业结算",
    subassembly: enterpriseSettlement,
  },
  {
    name: "2",
    label: "渠道结算",
    subassembly: channelSettlement,
  },
];

onMounted(() => {
  // rou()
});
</script>
