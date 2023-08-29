<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName">
      <template #0>
        <BasicView />
      </template>
      <template #1>
        <TaxlandView />
      </template>
      <template #2>
        <ChannelView />
      </template>
      <template #3>
        <ProxyView />
      </template>
      <template #4>
        <HistoryView />
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import BasicView from "./components/1basic.vue";
import TaxlandView from "./components/2taxland.vue";
import ChannelView from "./components/3channel.vue";
import ProxyView from "./components/4proxy.vue";
import HistoryView from "./components/5history.vue";

const route = useRoute();

const isEdit = ref(false);

if (route.query.status === "edit") {
  isEdit.value = true;
}

const tabsList = [
  { name: 0, label: "基本信息" },
  { name: 1, label: "税地信息" },
  { name: 2, label: "渠道信息" },
  { name: 3, label: "代理企业信息" },
  { name: 4, label: "历史点位记录" },
];
const activeName = ref(0);
</script>
