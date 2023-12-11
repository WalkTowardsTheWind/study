<template>
  <div class="money-text" :class="{ slipLine, ellipsis }">
    <span
      v-if="showMark"
      :style="{ fontSize: `${markSize}px`, color: markColor }"
      >{{ mark }}</span
    >
    <span
      :style="{
        fontSize: `${moneySize}px`,
        color: moneyColor,
        fontWeight: bold,
      }"
    >
      {{ proxy.$moneyFormat(modelValue, precision) }}
    </span>
  </div>
</template>
<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  mark: {
    type: String,
    default: "¥",
  },
  showMark: {
    type: Boolean,
    default: true,
  },
  markSize: {
    type: [String, Number],
    default: 12,
  },
  markColor: {
    type: String,
    default: "#333",
  },
  moneySize: {
    type: [String, Number],
    default: 14,
  },
  moneyColor: {
    type: String,
    default: "#333",
  },
  bold: {
    type: [String, Number],
    default: "400",
  },
  precision: {
    type: Number,
    default: 2,
  },
  ellipsis: Boolean,
  slipLine: Boolean,
});
const { proxy } = getCurrentInstance() as any;
</script>
<style lang="scss" scoped>
.ellipsis {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.money-text {
  display: inline-block;
  font-family: DINAlternate-Bold, DINAlternate, sans-serif;
}
.slipLine {
  text-decoration: line-through;
  color: #d0d0d0;
}
</style>
