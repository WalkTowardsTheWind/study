<template>
  <div class="zxn-dialog">
    <el-dialog
      :model-value="visible"
      :title="title"
      :width="`${width}`"
      :close-on-click-modal="false"
      :top="`${top}vh`"
      @close="handleClose"
      v-bind="$attrs"
    >
      <slot />
      <slot name="bottom-btn" v-if="hasBottomBtn">
        <div class="flex align-center justify-center m-y-[10px]">
          <el-button :loading="loading" type="primary" @click="handleConfirm"
            >确认</el-button
          >
          <el-button type="primary" plain @click="handleClose">取消</el-button>
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
    default: () => 452 + "px",
  },
  top: {
    default: () => 25,
  },
  hasBottomBtn: {
    type: Boolean,
    default: () => true,
  },
  loading: {
    type: Boolean,
    default: () => false,
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
  border-radius: 8px;
}
</style>
