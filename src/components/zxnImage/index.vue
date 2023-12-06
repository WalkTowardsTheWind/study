<template>
  <div class="zxn-image">
    <div
      class="zxn-image-item"
      :class="{ 'has-click': targetClick, 'mr-[16px]': currentImg.length > 1 }"
      :style="{ width: `${width}px`, height: `${height}px` }"
      v-for="(item, index) in currentImg"
      :key="index"
      @click="handleTarget(index)"
    >
      <el-image
        v-if="isPdf(item)"
        :style="{ width: `${width}px`, height: `${height}px` }"
        :src="pdfImg"
        :fit="fit as 'fill'"
      />
      <el-image
        v-else
        :style="{ width: `${width}px`, height: `${height}px` }"
        :src="item"
        :fit="fit as 'fill'"
      />
      <div class="zxn-image-item-bottom">
        <span @click="handlePreview(index)">预览</span>
        <span v-if="hasDelete" @click.stop="handleDelete(index)">删除</span>
      </div>
      <div
        class="zxn-image-item-ellipsis"
        v-if="
          ellipsis &&
          index > 1 &&
          index === currentImg.length - 1 &&
          currentImg.length !== filterImg.length
        "
      >
        + {{ filterImg.length - 3 }}
      </div>
    </div>
    <el-image-viewer
      v-if="showViewer"
      :url-list="preViewImg"
      :initial-index="previewIndex"
      z-index="999"
      @close="closeImgViewer"
      :teleported="true"
    />
  </div>
</template>
<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import { isArray, isImage, isPdf, isBase64 } from "@/utils/is";
import pdfImg from "@/assets/pdf.png";
const props = defineProps({
  imgList: { type: [Array, String], default: () => [] },
  width: { type: Number, default: 80 },
  height: { type: Number, default: 80 },
  fit: { type: String, default: "fill" },
  hasDelete: { type: Boolean, default: false },
  targetClick: { type: Boolean, default: false },
  ellipsis: { type: Boolean, default: false },
});
const emits = defineEmits(["on-delete"]);
const filterImg = computed(() => {
  let _imgList = isArray(props.imgList) ? props.imgList : [props.imgList];
  return _imgList.filter(Boolean);
});
const currentImg = computed(() => {
  let _imgList = isArray(props.imgList) ? props.imgList : [props.imgList];
  _imgList = _imgList.filter(Boolean);
  return props.ellipsis ? _imgList.filter((i, r) => r <= 2) : _imgList;
});
const preViewImg = computed(() => {
  return currentImg.value.filter((it) => {
    return isImage(it) || isBase64(it);
  });
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
  if (isImage(currentImg.value[index]) || isBase64(currentImg.value[index])) {
    const rank = preViewImg.value.findIndex(
      (it) => it === currentImg.value[index]
    );
    stopWheelListener = useEventListener("wheel", wheelHandler, {
      passive: false,
    });
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    previewIndex.value = rank;
    showViewer.value = true;
  } else {
    window.open(currentImg.value[index], "_blank");
  }
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
const handleDelete = (index: number) => {
  emits("on-delete", index);
};
</script>
<style lang="scss" scoped>
.zxn-image {
  display: flex;
  flex-wrap: wrap;

  &-item {
    position: relative;
    overflow: hidden;
    font-size: 0;
    border-radius: 8px;
    &-ellipsis {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      font-size: 12px;
      color: #ffffff;
      background: rgba(51, 51, 51, 0.6);
    }

    &-bottom {
      position: absolute;
      right: 0;
      bottom: -27%;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 25%;
      font-size: 14px;
      font-weight: 600;
      color: #eeeeee;
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
        bottom: -27% !important;
      }
    }
  }
}
</style>
