<template>
  <div class="zxn-bottom-btn">
    <div ref="affixBox" class="zxn-bottom-btn-affix">
      <el-affix
        position="bottom"
        :offset="offset"
        :style="{ right: `${right}px` }"
      >
        <slot />
      </el-affix>
    </div>
    <div
      class="zxn-bottom-btn-fill"
      :style="{ height: `${fillHeight}px` }"
    ></div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  offset: { type: Number, default: 63 },
  right: { type: Number, default: 36 },
});
const style_bottom = props.offset + "px";
const style_right = props.right + "px";
let fillHeight = ref(0);
const affixBox = ref();
onMounted(() => {
  fillHeight.value = affixBox.value.clientHeight
    ? affixBox.value.clientHeight + 16
    : 0;
});
</script>
<style lang="scss" scoped>
.zxn-bottom-btn {
  &-affix {
    position: fixed;
    right: v-bind(style_right);
    bottom: v-bind(style_bottom);
    display: flex;
    justify-content: flex-end;
  }

  :deep(.el-affix) {
    .el-affix--fixed {
      right: v-bind(styleright);
    }
  }
}
</style>
