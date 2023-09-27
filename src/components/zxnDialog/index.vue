<template>
  <div class="zxn-dialog">
    <el-dialog
      :model-value="visible"
      :title="title"
      :width="`${width}`"
      :close-on-click-modal="false"
      :top="`${top}vh`"
      @close="handleClose"
    >
      <slot />
      <slot name="bottom-btn" v-if="hasBottomBtn">
        <div class="flex align-center justify-center m-y-[10px]">
          <el-button type="primary" @click="handleConfirm">确认</el-button>
          <el-button @click="handleClose">取消</el-button>
        </div>
      </slot>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  visible: {
    type: Boolean,
    required: true,
    default: () => false,
  },
  title: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: () => 452 + "px",
  },
  top: {
    type: Number,
    default: () => 25,
  },
  hasBottomBtn: {
    type: Boolean,
    default: () => true,
  },
});

const emits = defineEmits(["close-dialog", "confirm-dialog"]);

const handleClose = () => {
  emits("close-dialog");
};
const handleConfirm = () => {
  emits("confirm-dialog");
};
</script>

<style scoped lang="scss">
.zxn-dialog {
  position: absolute;
}
</style>
