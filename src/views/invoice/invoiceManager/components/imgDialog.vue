<template>
  <div class="dialog">
    <el-dialog
      v-model="visible"
      class="zxn-dialog"
      title="查看"
      width="452"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <el-form ref="form" label-width="70">
        <el-form-item label="完税凭证">
          <zxn-image
            v-if="imageList.length"
            :imgList="imageList"
            :width="40"
            :height="40"
            targetClick
          ></zxn-image>
          <span v-else>--</span>
        </el-form-item>
        <el-form-item label="">
          <div>
            <el-button type="primary" @click="handleSubmit" :loading="loading"
              >确定</el-button
            >
            <el-button @click="handleCancel">取消</el-button>
          </div>
        </el-form-item>
      </el-form>

      <!-- <template #footer>
          <span class="dialog-footer">
            <el-button @click="HandleClose">取消</el-button>
            <el-button type="primary" @click="handleConfirm" :loading="loading"> 确认 </el-button>
          </span>
        </template> -->
    </el-dialog>
  </div>
</template>
<script lang="ts">
export default {
  name: "imgDialog",
};
</script>
<script setup lang="ts">
const emits = defineEmits(["on-success"]);
let visible = ref(false);
let imageList = ref();
const init = (data: any): void => {
  imageList.value = data.tax_payment_receipt;
  visible.value = true;
};
const loading = ref(false);
const handleSubmit = () => {
  loading.value = false;
  emits("on-success");
  visible.value = false;
};
const handleCancel = () => {
  emits("on-success");
  visible.value = false;
};

const handleClose = () => {
  imageList.value = [];
};
onMounted(() => {});
defineExpose({
  init,
});
</script>
