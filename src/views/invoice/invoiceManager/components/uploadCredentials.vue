<template>
  <el-dialog
    v-model="visible"
    class="zxn-dialog"
    title="上传凭证"
    width="452"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form ref="form" :model="formItem" label-width="110" :rules="rules">
      <el-form-item label="税地名称" prop="tax_land_id">
        <el-select
          class="w-100%"
          placeholder="请选择"
          v-model="formItem.tax_land_id"
        >
          <el-option
            v-for="(item, index) in taxLandOption"
            :key="index"
            :value="item.id"
            :label="item.tax_land_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称" prop="company_name">
        <el-input v-model="formItem.company_name" />
      </el-form-item>
      <el-form-item label="完税月份" prop="time">
        <el-date-picker
          v-model="formItem.time"
          type="month"
          placeholder="请选择月份"
        />
      </el-form-item>
      <el-form-item label="完税凭证" prop="invoice_sample_url">
        <multi-upload v-model="formItem.invoice_sample_url" :limit="10" />
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
  </el-dialog>
</template>
<script lang="ts">
export default {
  name: "uploadCredentials",
};
</script>
<script setup lang="ts">
import { getLandList } from "@/api/common";
import MultiUpload from "@/components/Upload/MultiUpload.vue";
import { getLogisticsCompany, uploadInvoice } from "@/api/invoice";
import type { FormRules } from "element-plus";
import { ElMessage } from "element-plus";
//税地
const taxLandOption = ref([] as any);
function getTaxLandOption() {
  taxLandOption.value.length = 0;
  getLandList().then((res) => {
    taxLandOption.value.push(...res.data.tax_land_list);
  });
}
getTaxLandOption();

const emits = defineEmits(["on-success"]);
let visible = ref(false);
const imgValidate = (message: any, rule: any, value: any, callback: any) => {
  if (value && value.length) {
    callback();
  } else {
    callback(message);
  }
};
const rules = reactive<FormRules>({
  tax_land_id: [{ required: true, message: "税地名称", trigger: "change" }],
  company_name: [{ required: true, message: "企业名称", trigger: "change" }],
  time: [{ required: true, message: "完税月份", trigger: "change" }],
  invoice_sample_url: [
    { validator: imgValidate.bind(null, "请上传完税凭证"), trigger: "change" },
  ],
});
const formItem = reactive({
  id: 0,
  tax_land_id: "",
  company_name: "",
  time: "",
  invoice_sample_url: [],
});
const init = (id: number): void => {
  formItem.id = id;
  visible.value = true;
};

const form = ref(ElForm);
const loading = ref(false);
const handleSubmit = () => {
  form.value.validate(async (valid: boolean): Promise<void> => {
    if (valid) {
      const params: any = {};
      params.tax_land_id = formItem.tax_land_id;
      params.company_name = formItem.company_name;
      params.time = formItem.time;
      params.time = formItem.invoice_sample_url.join(",");
      params.invoice_sample_url = formItem.invoice_sample_url.join(",");
      try {
        await uploadInvoice(formItem.id, params);
        loading.value = false;
        ElMessage({
          type: "success",
          message: `上传成功`,
        });
        emits("on-success");
        handleCancel();
      } catch (e) {
        loading.value = false;
      }
    }
  });
};
const handleCancel = () => {
  visible.value = false;
};
const handleClose = () => {
  form.value.resetFields();
};
onMounted(() => {});
defineExpose({
  init,
});
</script>
