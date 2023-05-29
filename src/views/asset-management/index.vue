<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName">
      <template #1>
        <PlatformAssetView />
      </template>
      <template #2>
        <BusinesstView />
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import PlatformAssetView from "./components/platform-assets.vue";
import BusinesstView from "./components/business.vue";

const tabsList = [
  {
    name: "1",
    label: "平台资产",
  },
  {
    name: "2",
    label: "企业列表",
  },
];

const activeName = ref("1");
</script>
