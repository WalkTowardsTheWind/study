<template>
  <div class="zxn-image">
    <div
      class="zxn-image-item"
      :class="{ 'has-click': targetClick }"
      :style="{ width: `${width}px`, height: `${height}px` }"
      v-for="(item, index) in imgList"
      :key="item"
      @click="handleTarget(index)"
    >
      <el-image
        :style="{ width: `${width}px`, height: `${height}px` }"
        :src="item"
        :fit="fit as 'fill'"
      />
      <div class="zxn-image-item-bottom">
        <span @click="handlePreview(index)">预览</span>
        <span v-if="hasDelete">删除</span>
      </div>
    </div>
    <el-image-viewer
      v-if="showViewer"
      :url-list="imgList"
      :initial-index="previewIndex"
      z-index="999"
      @close="closeImgViewer"
      :teleported="true"
    />
  </div>
</template>
<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
const props = defineProps({
  imgList: { type: Array, default: () => [] },
  width: { type: Number, default: 80 },
  height: { type: Number, default: 80 },
  fit: { type: String, default: "fill" },
  hasDelete: { type: Boolean, default: false },
  targetClick: { type: Boolean, default: false },
});
let stopWheelListener: (() => void) | undefined;
let prevOverflow = "";
const showViewer = ref(false);
const previewIndex = ref(0);

function wheelHandler(e: WheelEvent) {
  if (!e.ctrlKey) return;

  if (e.deltaY < 0) {
    e.preventDefault();
    return false;
  } else if (e.deltaY > 0) {
    e.preventDefault();
    return false;
  }
}
const handlePreview = (index: number) => {
  stopWheelListener = useEventListener("wheel", wheelHandler, {
    passive: false,
  });
  prevOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  previewIndex.value = index;
  showViewer.value = true;
};
const closeImgViewer = () => {
  stopWheelListener?.();
  document.body.style.overflow = prevOverflow;
  showViewer.value = false;
};
const handleTarget = (index: number) => {
  if (props.targetClick) {
    handlePreview(index);
  }
};
</script>
<style lang="scss" scoped>
.zxn-image {
  display: flex;
  flex-wrap: wrap;

  &-item {
    position: relative;
    margin-right: 16px;
    overflow: hidden;
    font-size: 0;
    border-radius: 8px;

    &-bottom {
      position: absolute;
      right: 0;
      bottom: -25%;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 25%;
      font-size: 14px;
      font-weight: 600;
      color: #333;
      background-color: rgb(0 0 0 / 30%);
      transition: bottom 0.2s;

      > span {
        cursor: pointer;

        &:hover {
          color: #356ff3;
        }
      }
    }

    &:hover {
      .zxn-image-item-bottom {
        bottom: 0;
      }
    }
  }

  .has-click {
    cursor: pointer;

    &:hover {
      .zxn-image-item-bottom {
        bottom: -25%;
      }
    }
  }
}
</style>
