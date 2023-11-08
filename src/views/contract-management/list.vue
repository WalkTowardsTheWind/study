<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" :activeName="activeName">
      <template #1>
        <businessContract />
      </template>
      <template #2>
        <channelContract />
      </template>
      <template #3>
        <otherContract />
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import businessContract from "./components/1bus-c.vue";
import channelContract from "./components/2cha-c.vue";
import otherContract from "./components/3other-c.vue";

const tabsList = [
  {
    name: "1",
    label: "企业合同",
  },
  {
    name: "2",
    label: "渠道合同",
  },
  {
    name: "3",
    label: "其他合同",
  },
];

const activeName = ref("1");
</script>

<style scoped></style>
