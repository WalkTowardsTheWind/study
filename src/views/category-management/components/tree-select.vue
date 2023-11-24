<template>
  <el-tree-select
    class="w-full"
    v-model="selectVal"
    placeholder="请选择"
    :data="options"
    :props="treeProps"
    check-strictly
    :render-after-expand="false"
    filterable
  />
</template>

<script lang="ts" setup>
defineProps({
  options: {
    type: Array,
    default: () => [],
    required: true,
  },
});
const treeProps = {
  label: "name",
  value: "id",
};
const selectVal = ref("");
</script>

<style scoped></style>
