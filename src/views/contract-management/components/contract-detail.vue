<template>
  <zxn-dialog
    title="合同详情"
    :visible="visible"
    top="15"
    :hasBottomBtn="false"
    @close-dialog="closeDetail"
  >
    <el-form label-width="auto">
      <el-form-item label="合同类型">
        <el-input :value="formItem.type_name" />
      </el-form-item>
      <el-form-item label="合同名称">
        <el-input :value="formItem.contract_name" />
      </el-form-item>
      <el-form-item label="合同编号">
        <el-input :value="formItem.contract_no" />
      </el-form-item>
      <el-form-item label="合同期限">
        <el-input
          :value="
            formItem.effective_start_time + ' - ' + formItem.effective_end_time
          "
        />
      </el-form-item>
      <el-form-item label="甲方">
        <el-input :value="formItem.part_a_name" />
      </el-form-item>
      <el-form-item label="乙方">
        <el-input :value="formItem.part_b_name" />
      </el-form-item>
      <el-form-item label="备注要求">
        <el-input :value="formItem.remark" type="textarea" />
      </el-form-item>
      <el-form-item label="合同文件">
        <el-button
          :disabled="!formItem.contract_url"
          type="primary"
          link
          @click="checkUrl(formItem.contract_url)"
          >查看</el-button
        >
      </el-form-item>
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

let formItem = reactive({
  type_name: "",
  contract_name: "",
  contract_no: "",
  effective_start_time: "",
  effective_end_time: "",
  part_a_name: "",
  part_b_name: "",
  remark: "",
  contract_url: "",
} as any);

const getDetailById = (id) => {
  contractDetail(id).then((res) => {
    formItem.type_name = res.data.type;
    formItem.contract_name = res.data.contract_name;
    formItem.contract_no = res.data.contract_no;
    formItem.effective_start_time = res.data.effective_start_time;
    formItem.effective_end_time = res.data.effective_end_time;
    formItem.part_a_name = res.data.part_a_name;
    formItem.part_b_name = res.data.part_b_name;
    formItem.remark = res.data.remark;
    formItem.contract_url = res.data.contract_url;
  });
};

const checkUrl = (url) => {
  window.open(url, "_blank");
};
</script>

<style scoped></style>
