<template>
  <zxn-plan>
    <zxn-tabs
      :tabs-list="tabsList"
      :activeName="activeName"
      @tab-change="handleChange"
    >
      <template #1>
        <businessContract />
      </template>
      <template #2>
        <channelContract />
      </template>
      <template #3>
        <otherContract />
      </template>
      <template #4>
        <xieyiContract />
      </template>
      <template #5>
        <personContract />
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import businessContract from "./components/1bus-c.vue";
import channelContract from "./components/2cha-c.vue";
import otherContract from "./components/3other-c.vue";
import xieyiContract from "./components/4xieyi-c.vue";
import personContract from "./components/5per-c.vue";

import { useRoute } from "vue-router";
const route = useRoute();
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
  {
    name: "4",
    label: "委托代征协议",
  },
  {
    name: "5",
    label: "个人合同",
  },
];
const activeName = ref("1");

const handleChange = (activeName: string) => {
  sessionStorage.setItem("contract", activeName);
};

onMounted(() => {
  if (route.query.type) {
    activeName.value = route.query.type as string;
  }
  handleChange(activeName.value);
});
</script>

<style scoped></style>
