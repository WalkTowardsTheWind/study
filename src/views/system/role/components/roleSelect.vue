<template>
  <div class="role-select">
    <roleTypeTable :list="roleList" />
    <roleTypeTable />
    <roleTypeTable />
  </div>
</template>
<script lang="ts" setup>
import roleTypeTable from "./roleTypeTable.vue";
defineProps({
  modelValue: { type: Array<number>, default: () => [] },
  roleList: { type: Array, default: () => [] },
  labelField: { type: String, default: "label" },
  valueField: { type: String, default: "code" },
});
</script>
<style lang="scss" scoped>
.role-select {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  width: 100%;
  padding: 24px 24px 0 0;
}
</style>
