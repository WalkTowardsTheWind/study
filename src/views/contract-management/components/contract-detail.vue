<template>
  <zxn-dialog
    title="合同详情"
    :visible="visible"
    :hasBottomBtn="false"
    @close-dialog="closeDetail"
  >
    <el-form label-width="auto">
      <el-form-item label="合同类型">
        <!-- <el-input v-model="formItem"/> -->
      </el-form-item>
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
import { contractDetail } from "@/api/contract-m";
const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
  detailId: {
    type: Number,
    default: () => 0,
  },
});
const emit = defineEmits(["detail-close"]);

watch(
  () => props.detailId,
  (newVal, oldVal) => {
    getDetailById(newVal);
  }
);
const closeDetail = () => {
  emit("detail-close", false);
};

let formItem = reactive({} as any);

const getDetailById = (id) => {
  contractDetail(id).then((res) => {
    formItem = res.data;
  });
};
</script>

<style scoped></style>
