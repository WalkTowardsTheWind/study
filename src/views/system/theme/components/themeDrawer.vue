<template>
  <el-drawer
    v-bind="$attrs"
    :title="id ? '添加配置' : '编辑配置'"
    :size="500"
    custom-class="zxn-drawer"
  >
    <el-form ref="form" :model="formItem" label-width="80" :rules="rules">
      <el-form-item label="域名" prop="express_id">
        <el-input v-model="formItem.express_no" />
      </el-form-item>
      <el-form-item label="版权备案" prop="express_no">
        <el-input v-model="formItem.express_no" />
      </el-form-item>
      <el-form-item label="票样" prop="invoice_sample_url">
        <multi-upload v-model="formItem.invoice_sample_url" :limit="1" />
      </el-form-item>
      <el-form-item label="物流面单" prop="express_url">
        <multi-upload v-model="formItem.express_url" :limit="1" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex justify-start">
        <el-button type="primary" @click="handleSubmit" :loading="loading"
          >确定</el-button
        >
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import MultiUpload from "@/components/Upload/MultiUpload.vue";
import { FormRules } from "element-plus";
const props = defineProps({
  id: {
    type: Number,
  },
});

const rules = reactive<FormRules>({
  express_id: [
    { required: true, message: "请选择物流公司", trigger: "change" },
  ],
  express_no: [
    { required: true, message: "请输入物流单号", trigger: "change" },
  ],
  invoice_sample_url: [],
  express_url: [],
});
const formItem = reactive({});
</script>
