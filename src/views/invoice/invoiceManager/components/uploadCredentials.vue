<template>
  <el-dialog
    v-model="visible"
    class="zxn-dialog"
    :title="formItem.id ? '编辑' : '上传凭证'"
    width="452"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form ref="form" :model="formItem" label-width="110" :rules="rules">
      <el-form-item label="税地名称" prop="tax_land_id">
        <el-select
          v-model="formItem.tax_land_id"
          filterable
          clearable
          placeholder="请选择税地"
          @change="handleUpdata"
        >
          <el-option
            v-for="item in taxLandOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称" prop="company_id">
        <el-select
          ref="companySelect"
          v-model="formItem.company_id"
          filterable
          clearable
          placeholder="请选择企业"
          @focus="handleIsSelect"
        >
          <el-option
            v-for="item in optionsCompany"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="完税月份" prop="month">
        <el-date-picker
          v-model="formItem.month"
          type="month"
          placeholder="请选择月份"
          format="YYYY-MM"
          value-format="YYYY-MM"
        />
      </el-form-item>
      <el-form-item label="完税凭证" prop="tax_payment_receipt">
        <multi-upload v-model="formItem.tax_payment_receipt" :limit="10" />
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
import {
  uploadCredentials,
  editCredentials,
  getCompanyList,
  getCredentialsDetails,
} from "@/api/invoice";
import type { FormRules } from "element-plus";
import { ElMessage } from "element-plus";
//税地
interface ListItem {
  value: string;
  label: string;
}
const taxLandOption = ref<ListItem[]>([]);
const getTaxLandOption = async () => {
  const { data } = await getLandList();
  console.log(data);
  const newData = data.tax_land_list.map((item: any) => {
    return {
      label: item.tax_land_name,
      value: item.id,
    };
  });
  taxLandOption.value = [];
  taxLandOption.value.push(...newData);
};
getTaxLandOption();
//获取企业列表

const companySelect = ref();
const optionsCompany = ref<ListItem[]>([]);
const getCompany = async () => {
  if (!formItem.tax_land_id) {
    ElMessage({
      type: "warning",
      message: `请先选择税地名称`,
    });
    return;
  }

  let params = {
    tax_land_id: formItem.tax_land_id,
  };
  const { data } = await getCompanyList(params);
  const newData = data.map((item: any) => {
    return {
      label: item.company_name,
      value: item.id,
    };
  });
  optionsCompany.value = [];
  optionsCompany.value.push(...newData);
};
//
const handleUpdata = () => {
  formItem.company_id = "";
  getCompany();
};
const handleIsSelect = () => {
  if (!formItem.tax_land_id) {
    companySelect.value.blur();
    ElMessage({
      type: "warning",
      message: `请先选择税地名称`,
    });
  }
  return;
};

//
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
  company_id: [{ required: true, message: "企业名称", trigger: "change" }],
  month: [{ required: true, message: "完税月份", trigger: "change" }],
  tax_payment_receipt: [
    {
      required: true,
      validator: imgValidate.bind(null, "请上传完税凭证"),
      trigger: "change",
    },
  ],
});
const formItem = reactive({
  id: 0,
  tax_land_id: "",
  company_id: "",
  month: "",
  tax_payment_receipt: [],
});
const init = async (id: number): Promise<void> => {
  formItem.id = id;
  if (id) {
    const { data } = await getCredentialsDetails(id);
    formItem.tax_land_id = data.tax_land_id;
    if (formItem.tax_land_id) {
      getCompany();
    }
    formItem.company_id = data.company_id;
    formItem.month = data.month;
    formItem.tax_payment_receipt = data.tax_payment_receipt;
  }
  visible.value = true;
};

const form = ref(ElForm);
const loading = ref(false);
const handleSubmit = () => {
  form.value.validate(async (valid: boolean): Promise<void> => {
    if (valid) {
      const params: any = {};
      params.tax_land_id = formItem.tax_land_id;
      params.company_id = formItem.company_id;
      params.month = formItem.month;
      params.tax_payment_receipt = formItem.tax_payment_receipt;
      if (formItem.id) {
        params.id = formItem.id;
      }
      try {
        formItem.id
          ? await editCredentials(params)
          : await uploadCredentials(params);

        loading.value = false;
        ElMessage({
          type: "success",
          message: `${formItem.id ? "修改成功" : "上传成功"}`,
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
