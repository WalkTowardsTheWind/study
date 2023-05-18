<template>
  <zxn-plan>
    <zxn-tabs
      :activeName="activeName"
      :tabsList="tabsList"
      :hasBack="true"
      :hasUpdate="false"
    ></zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
// import { useRouter } from "vue-router";
import enterpriseContract from "./enterpriseContract/index.vue";
import channelContract from "./channelContract/index.vue";
import taxContract from "./taxContract/index.vue";
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "企业合同",
    subassembly: enterpriseContract,
  },
  {
    name: "2",
    label: "渠道合同",
    subassembly: channelContract,
  },
  {
    name: "3",
    label: "供应合同",
    subassembly: taxContract,
  },
];
//路由跳转
// const router = useRouter();
// const rou=()=>{
//   const uid = router.currentRoute.value.meta.title;
//   if(uid=="税地合同"){
//     activeName.value="3"
//    console.log(uid)
//   }
// }
onMounted(() => {
  //   rou()
});
</script>
