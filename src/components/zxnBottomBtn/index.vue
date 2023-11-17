<template>
  <div class="zxn-bottom-btn">
    <div
      ref="affixBox"
      class="zxn-bottom-btn-affix"
      :style="{
        width: `calc(100vw - ${appStore.sidebar.opened ? '158px' : '0'})`,
        left: appStore.sidebar.opened ? '158px' : '0',
      }"
    >
      <div class="zxn-bottom-btn-affix-gap"></div>
      <el-affix position="bottom">
        <slot />
      </el-affix>
    </div>
    <div
      ref="affixFill"
      class="zxn-bottom-btn-fill"
      :style="{ height: `${fillHeight}px` }"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
const props = defineProps({
  offset: { type: [Number, String], default: 0 },
  right: { type: Number, default: 36 },
});
const style_bottom = props.offset + "px";
let fillHeight = ref(0);
const affixBox = ref();
const affixFill = ref<HTMLDivElement>();
onMounted(() => {
  fillHeight.value = affixBox.value.clientHeight
    ? affixBox.value.clientHeight
    : 0;
});
</script>
<style lang="scss" scoped>
.zxn-bottom-btn {
  &-affix {
    position: fixed;
    bottom: v-bind(style_bottom);
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding-bottom: 10px;
    text-align: center;
    background-color: #fff;

    &-gap {
      width: 100%;
      height: 26px;
      margin-bottom: 10px;
      background-color: #f6f6f6;
    }
  }

  :deep(.el-affix) {
  }
}
</style>
