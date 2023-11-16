<template>
  <zxn-plan>
    <zxn-tabs
      v-model:activeName="activeName"
      :tabsList="tabsList"
      @tab-change="handleChange"
    >
      <template #1>
        <BussinessView />
      </template>
      <template #3>
        <ChannelView />
      </template>
      <template #2>
        <PersonalView />
      </template>
      <!-- <template #4>
        <PlatformView />
      </template> -->
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import BussinessView from "./business/index.vue";
import PersonalView from "./personal/index.vue";
import ChannelView from "./channel/index.vue";
// import PlatformView from "./platform/index.vue";
import { ref } from "vue";

const activeName = ref("1");

const tabsList = [
  {
    name: "1",
    label: "企业账户",
  },
  {
    name: "3",
    label: "渠道账户",
  },
  {
    name: "2",
    label: "自由职业者",
  },
  // {
  //   name: "4",
  //   label: "其他账户",
  // },
];

const handleChange = (activeName: string) => {
  sessionStorage.setItem("account", activeName);
};

onMounted(() => {
  activeName.value = sessionStorage.getItem("account") || "1";
});
</script>
