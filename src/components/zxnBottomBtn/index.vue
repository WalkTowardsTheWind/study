<template>
  <div class="zxn-bottom-btn">
    <el-affix
      position="bottom"
      :offset="offset"
      :style="{ right: `${right}px` }"
    >
      <slot />
    </el-affix>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  offset: { type: Number, default: 63 },
  right: { type: Number, default: 36 },
});
const styleBottom = props.offset + "px";
const styleRight = props.right + "px";
</script>
<style lang="scss" scoped>
.zxn-bottom-btn {
  position: fixed;
  right: v-bind(styleright);
  bottom: v-bind(stylebottom);
  display: flex;
  justify-content: flex-end;

  :deep(.el-affix) {
    .el-affix--fixed {
      right: v-bind(styleright);
    }
  }
}
</style>
