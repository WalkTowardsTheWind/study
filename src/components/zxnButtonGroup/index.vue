<template>
  <div class="zxn-button-group">
    <el-button
      v-if="hasAll"
      :type="!modelValue ? 'primary' : '' as 'primary'"
      @click="handleClick('')"
      >全部</el-button
    >
    <el-button
      v-for="item in options"
      :key="item.label"
      :type="item.value === modelValue ? 'primary' : '' as 'primary'"
      @click="handleClick(item.value)"
    >
      {{ item.label }}{{ isNullOrUnDef(item.number) ? "" : `(${item.number})` }}
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { isNullOrUnDef } from "@/utils/is";
defineProps({
  options: { type: Array, default: () => [] },
  modelValue: { type: [String, Number], default: "" },
  hasAll: { type: Boolean, default: true },
});
const emit = defineEmits(["update:modelValue", "on-change"]);
const handleClick = (value: string | number): void => {
  emit("update:modelValue", value);
  emit("on-change", value);
};
</script>
