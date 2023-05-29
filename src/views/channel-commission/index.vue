<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName">
      <template #1>
        <channel />
      </template>
      <template #2>
        <commission />
      </template>
      <template #3>
        <product />
      </template>
      <template #4>
        <channelData />
      </template>
      <template #5>
        <channelManager />
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import channel from "./components/1-channel.vue";
import commission from "./components/2-commission.vue";
import product from "./components/3-product.vue";
import channelData from "./components/4-channel-data.vue";
import channelManager from "./components/5-channel-manager.vue";

const tabsList = [
  {
    name: "1",
    label: "渠道佣金",
  },
  {
    name: "2",
    label: "发佣统计",
  },
  {
    name: "3",
    label: "产品数据合计",
  },
  {
    name: "4",
    label: "渠道数据合计",
  },
  {
    name: "5",
    label: "渠道管理员数据合计",
  },
];
const activeName = ref("1");
</script>
