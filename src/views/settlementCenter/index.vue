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

// const router = useRouter();
// //路由跳转
// const rou=()=>{
//   const uid = router.currentRoute.value.meta.title;
//   if(uid=="渠道合同"){
//     activeName.value="2"
//    console.log(uid)
//   }
// }

onMounted(() => {
  // rou()
});
</script>
