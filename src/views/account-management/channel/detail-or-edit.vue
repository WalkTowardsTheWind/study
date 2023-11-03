<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName">
      <template #0>
        <BasicView :isEdit="isEdit" v-model:childData="formItem" />
      </template>
      <template #1>
        <TaxlandView :isEdit="isEdit" />
      </template>
      <template #2>
        <ChannelView :channel_id="idv" :isEdit="isEdit" />
      </template>
      <template #3>
        <ProxyView :channel_id="idv" :isEdit="isEdit" />
      </template>
      <!-- <template #4>
        <HistoryView :isEdit="isEdit" />
      </template> -->
      <template #5>
        <ContractView :channel_id="idv" :isEdit="isEdit" />
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
import { getChannelAccountInfo } from "@/api/account/channel";
import ContractView from "./components/6contract.vue";

const route = useRoute();

const isEdit = ref(false);
const idv = ref("");

const formItem = ref();

if (route.query.type === "edit") {
  isEdit.value = true;
}
if (route.query.id) {
  idv.value = route.query.id.toString();
}

const tabsList = [
  { name: 0, label: "基本信息" },
  { name: 1, label: "税地信息" },
  { name: 2, label: "渠道信息" },
  { name: 3, label: "渠道企业信息" },
  // { name: 4, label: "历史点位记录" },
  { name: 5, label: "合同信息" },
];
const activeName = ref(0);

const getDetail = () => {
  getChannelAccountInfo(idv.value).then((res) => {
    formItem.value = res.data;
  });
};
onMounted(() => {
  getDetail();
});
</script>
