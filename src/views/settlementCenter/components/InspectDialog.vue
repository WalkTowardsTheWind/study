<template>
  <el-dialog
    custom-class="my-dialog"
    v-model="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <template #header>
      <div class="my-header">
        <h4>凭证查看</h4>
      </div>
    </template>
    <div>
      <zxn-image
        v-if="imageList.length"
        :imgList="imageList"
        :width="88"
        :height="88"
        targetClick
      ></zxn-image>
      <span v-else>--</span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="HandleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
const emit = defineEmits(["update:dialogVisible"]);
const props = defineProps({
  dialogVisible: { type: Boolean, default: false },
  imageList: { type: Array, equired: true, default: () => [] },
});

let dialogVisible = computed(() => props.dialogVisible);
let imageList = computed(() => props.imageList);
const handleConfirm = () => {
  emit("update:dialogVisible", false);
};
const HandleClose = () => {
  emit("update:dialogVisible", false);
};

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("你确认关闭弹窗？")
    .then(() => {
      done();
      emit("update:dialogVisible", false);
    })
    .catch(() => {
      // catch error
    })
    .then(() => {
      console.log(dialogVisible.value);
    });
};
</script>
