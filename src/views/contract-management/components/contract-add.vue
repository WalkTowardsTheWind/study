<template>
  <zxn-dialog
    title="合同归档"
    top="15"
    :visible="visible"
    @close-dialog="addDialogClose(addFormRef)"
    @confirm-dialog="addDialogConfirm(addFormRef)"
  >
    <el-form
      ref="addFormRef"
      :rules="rules"
      :model="addForm"
      label-width="auto"
    >
      <el-row>
        <el-col>
          <el-form-item label="合同类型" required prop="type">
            <el-select disabled class="w-full" v-model="addForm.type">
              <el-option
                v-for="item of contract_types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同名称" required prop="contract_name">
            <el-input placeholder="请输入" v-model="addForm.contract_name" />
          </el-form-item>
          <el-form-item label="合同期限" required prop="date">
            <zxn-date-range class="w-full" v-model="addForm.date" />
          </el-form-item>
          <el-form-item label="甲方" required prop="part_a_name">
            <el-input placeholder="请输入" v-model="addForm.part_a_name" />
          </el-form-item>
          <el-form-item label="乙方" required prop="part_b_name">
            <el-input placeholder="请输入" v-model="addForm.part_b_name" />
          </el-form-item>
          <el-form-item label="备注要求" prop="remark">
            <el-input
              placeholder="请输入"
              type="textarea"
              v-model="addForm.remark"
            />
          </el-form-item>
          <el-form-item label="合同文件" required prop="contract_url">
            <MultiUpload :limit="1" v-model="addForm.contract_url" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </zxn-dialog>
</template>

<script lang="ts" setup>
import { contract_types } from "./options";

import { archiveContract } from "@/api/contract-m";

const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
  contract_type: {
    default: () => "",
  },
});

const addFormRef = ref();
const addForm = reactive({
  type: "",
  contract_name: "",
  date: [],
  part_a_name: "",
  part_b_name: "",
  remark: "",
  contract_url: [],
});
if (props.contract_type) {
  addForm.type = props.contract_type;
}
const rules = {
  type: [
    {
      required: true,
      message: "必填",
      trigger: "change",
    },
  ],
  contract_name: [
    {
      required: true,
      message: "必填",
      trigger: "blur",
    },
  ],
  date: [
    {
      required: true,
      message: "必填",
      trigger: "blur",
    },
  ],
  part_a_name: [
    {
      required: true,
      message: "必填",
      trigger: "blur",
    },
  ],
  part_b_name: [
    {
      required: true,
      message: "必填",
      trigger: "blur",
    },
  ],
  contract_url: [
    {
      required: true,
      message: "必填",
      trigger: "change",
    },
  ],
};

const emit = defineEmits(["add-close", "add-confirm"]);

const addDialogClose = (formI) => {
  if (!formI) return;
  formI.resetFields();
  emit("add-close", false);
};
const addDialogConfirm = async (formI) => {
  let params = {
    type: addForm.type,
    contract_name: addForm.contract_name,
    effective_start_time: addForm.date[0],
    effective_end_time: addForm.date[1],
    part_a_name: addForm.part_a_name,
    part_b_name: addForm.part_b_name,
    remark: addForm.remark,
    contract_url: addForm.contract_url,
  };
  if (!formI) return;
  await formI.validate((valid, fields) => {
    if (valid) {
      archiveContract(params).then((res) => {
        // console.log(res);
        ElMessage.success("操作成功");
        emit("add-confirm", false);
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>
