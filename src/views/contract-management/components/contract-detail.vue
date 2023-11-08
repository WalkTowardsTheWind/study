<template>
  <zxn-dialog
    title="合同详情"
    :visible="visible"
    :hasBottomBtn="false"
    @close-dialog="closeDetail"
  >
    <el-form label-width="auto">
      <el-form-item label="合同类型"></el-form-item>
      <el-form-item label="合同编号"></el-form-item>
      <el-form-item label="合同期限"></el-form-item>
      <el-form-item label="甲方"></el-form-item>
      <el-form-item label="乙方"></el-form-item>
      <el-form-item label="备注要求"></el-form-item>
      <el-form-item label="合同文件"> </el-form-item>
    </el-form>
  </zxn-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
});
const emit = defineEmits(["detail-close"]);

const closeDetail = () => {
  emit("detail-close", false);
};
</script>

<style scoped></style>
