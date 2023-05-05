<template>
  <el-cascader v-model="value" :options="options" class="w-[272px]" />
</template>
<script setup lang="ts">
import { useUserStoreHook } from "@/store/modules/user";
const value = computed({
  get: () => useUserStoreHook().taxSource as [],
  set: useUserStoreHook().taxSourceChange,
});
const options = [
  {
    value: "全国",
    label: "全国",
  },
  {
    value: "华中区",
    label: "华中区",
    children: [
      {
        value: "湖北省",
        label: "湖北省",
      },
      {
        value: "湖南省",
        label: "湖南省",
      },
    ],
  },
  {
    value: "华南区",
    label: "华南区",
    children: [
      {
        value: "广东",
        label: "广东",
      },
      {
        value: "广西",
        label: "广西",
      },
    ],
  },
];
</script>
