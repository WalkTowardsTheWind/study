import { number } from 'echarts';
<template>
  <el-dialog
    v-model="visible"
    class="zxn-dialog"
    title="请选择开票方式"
    width="452"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form ref="form" label-width="110">
      <el-form-item label="请选择" prop="express_no">
        <div class="mb-2 flex items-center text-sm">
          <el-radio-group v-model="type" class="ml-4">
            <el-radio label="1" size="large">纸质发票</el-radio>
            <el-radio label="2" size="large">电子发票</el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="">
        <div>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
export default {
  name: "IMSelection",
};
</script>
<script setup lang="ts">
const emits = defineEmits(["on-success"]);
let visible = ref(false);
const type = ref("1");
let ID = ref() as any;
const init = (id: number): void => {
  ID.value = id;
  visible.value = true;
};
const handleSubmit = () => {
  emits("on-success", ID.value, Number(type.value));
  handleCancel();
};
const handleCancel = () => {
  visible.value = false;
};
const handleClose = () => {};
onMounted(() => {});
defineExpose({
  init,
});
</script>
