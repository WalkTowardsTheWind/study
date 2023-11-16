<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabs-list="tabsList" hasBack>
      <template #1>
        <Basic :idcard="idcard" />
      </template>
      <template #2>
        <Settle :idcard="idcard" />
      </template>
      <template #3>
        <Contract :idcard="idcard" />
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import Basic from "./components/1basic.vue";
import Settle from "./components/2settle.vue";
import Contract from "./components/3contract.vue";

import { useRoute } from "vue-router";

const idcard = ref("");

const tabsList = [
  { name: "1", label: "基本信息" },
  { name: "2", label: "结算记录" },
  { name: "3", label: "合同信息" },
];

const route = useRoute();

if (route.query.ic) {
  idcard.value = atob(route.query.ic as string);
}

const activeName = ref("1");
</script>
