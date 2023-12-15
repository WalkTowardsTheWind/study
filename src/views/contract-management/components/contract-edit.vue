<template>
  <zxn-dialog
    title="合同编辑"
    :visible="visible"
    top="5"
    width="90vw"
    :loading="btnLoading"
    @close-dialog="closeEdit(formItemRef)"
    @confirm-dialog="submit(formItemRef)"
  >
    <div class="box">
      <div class="left">
        <el-form
          ref="formItemRef"
          :model="formItem"
          :rules="rules"
          label-width="auto"
        >
          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="合同类型">
                <el-input disabled :value="formItem.type_name" />
              </el-form-item>
              <el-form-item label="合同名称" prop="contract_name">
                <el-input v-model="formItem.contract_name" />
              </el-form-item>
              <el-form-item label="合同模板">
                <el-input disabled :value="formItem.template_name" />
              </el-form-item>
              <el-form-item label="合同编号">
                <el-input disabled :value="formItem.contract_no" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同期限" prop="date">
                <zxn-date-range class="w-full" v-model="formItem.date" />
              </el-form-item>
              <el-form-item label="甲方">
                <el-input disabled :value="formItem.part_a_name" />
              </el-form-item>
              <el-form-item label="乙方">
                <el-input disabled :value="formItem.part_b_name" />
              </el-form-item>
              <el-form-item label="备注要求">
                <el-input disabled v-model="formItem.remark" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="fields">
            <div
              class="w-49%"
              v-for="(item, index) of formItem.fields"
              :key="index"
            >
              <el-form-item
                :label="item.label"
                :prop="'fields.' + index + '.field_value'"
                :rules="{
                  required: true,
                  message: '必填',
                  trigger: 'blur',
                }"
              >
                <el-input clearable v-model="item.field_value" />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="right">
        <iframe :src="formItem.contract_url"></iframe>
      </div>
    </div>
  </zxn-dialog>
</template>

<script lang="ts" setup>
import { contractDetail, updateContract } from "@/api/contract-m";
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
const emit = defineEmits(["edit-close"]);

const closeEdit = (formI) => {
  formI.resetFields();
  console.log(formItem);

  emit("edit-close", false);
};

const formItemRef = ref();

const rules = {
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
      message: "必选",
      trigger: "blur",
    },
  ],
};

let formItem = reactive({
  type_name: "",
  contract_name: "",
  template_name: "",
  contract_no: "",
  effective_start_time: "",
  effective_end_time: "",
  part_a_name: "",
  part_b_name: "",
  remark: "",
  contract_url: "",
  fields: [],
  date: [],
} as any);

const getDetailById = (id) => {
  contractDetail(id).then((res) => {
    formItem.type_name = res.data.type;
    formItem.contract_name = res.data.contract_name;
    formItem.template_name = res.data.template_name;
    formItem.contract_no = res.data.contract_no;
    formItem.part_a_name = res.data.part_a_name;
    formItem.part_b_name = res.data.part_b_name;
    formItem.contract_url = res.data.contract_url;
    formItem.remark = res.data.remark;
    formItem.fields = res.data.fields;
    formItem.date = [
      res.data.effective_start_time,
      res.data.effective_end_time,
    ];
  });
};
const btnLoading = ref(false);
const submit = async (formI) => {
  btnLoading.value = true;
  if (!formI) return;
  await formI.validate((valid, fields) => {
    if (valid) {
      let params = {
        contract_name: formItem.contract_name,
        id: props.detailId,
        effective_start_time: formItem.date[0] ?? "",
        effective_end_time: formItem.date[1] ?? "",
        fields: formItem.fields,
      };
      formItem.contract_url = "";
      updateContract(params).then((res) => {
        setTimeout(() => {
          btnLoading.value = false;
          formItem.contract_url = res.data.url;
          ElMessage.success("更新成功");
          emit("edit-close", true, true);
        }, 2000);
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

defineExpose({
  getDetailById,
});
</script>

<style scoped lang="scss">
.box {
  display: flex;
  height: 73vh;
  overflow-y: scroll;
  gap: 0 20px;
  .left {
    width: 50%;
  }
  .right {
    flex: 1;
    width: 100%;
    iframe {
      width: inherit;
      height: -webkit-fill-available;
    }
  }
}
.fields {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  gap: 0 15px;
  width: 100%;
}
</style>
