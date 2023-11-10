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
        <el-form-item label="合同">
          <zxn-image
            v-if="imageList.length && imageList[0]"
            :imgList="imageList"
            :width="88"
            :height="88"
            targetClick
          ></zxn-image>
          <span v-else>--</span>
        </el-form-item>
        <el-form-item label="">
          <div>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang="ts">
export default {
  name: "imgDialog",
};
</script>
<script setup lang="ts">
// const emits = defineEmits(["on-success"]);
let visible = ref(false);
let imageList = ref();
const init = (data: any): void => {
  imageList.value = [data.contract_path];
  visible.value = true;
};
const handleSubmit = () => {
  // emits("on-success");
  visible.value = false;
};
const handleCancel = () => {
  // emits("on-success");
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
