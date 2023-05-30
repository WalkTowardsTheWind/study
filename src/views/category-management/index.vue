<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName">
      <template #1>
        <IndustryView />
      </template>
      <template #2>
        <PostView />
      </template>
      <template #3>
        <InvoiceView />
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import IndustryView from "./components/industry.vue";
import PostView from "./components/post.vue";
import InvoiceView from "./components/invoice.vue";

const activeName = ref("1");
const tabsList = ref([
  {
    name: "1",
    label: "行业分类",
  },
  {
    name: "2",
    label: "岗位分类",
  },
  {
    name: "3",
    label: "发票分类",
  },
]);
</script>
