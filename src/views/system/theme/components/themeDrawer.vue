<template>
  <el-drawer
    v-model="visible"
    :title="formItem.id ? '添加配置' : '编辑配置'"
    :size="500"
    class="zxn-drawer"
    :close-on-click-modal="false"
    :append-to-body="true"
    @close="handleClose"
  >
    <el-form ref="form" :model="formItem" label-width="130" :rules="rules">
      <el-form-item label="企业名称" prop="web_compamy_name">
        <el-input v-model="formItem.web_compamy_name" />
      </el-form-item>
      <el-form-item label="登录页企业名称" prop="login_company_name">
        <el-input v-model="formItem.login_company_name" />
      </el-form-item>
      <el-form-item label="域名" prop="web_url">
        <el-input v-model="formItem.web_url" />
      </el-form-item>
      <el-form-item label="授权标识" prop="web_mark">
        <el-input v-model="formItem.web_mark" />
      </el-form-item>
      <el-form-item label="是否显示客服" prop="is_show">
        <el-switch
          v-model="formItem.is_show"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="登录页图标" prop="login_icon">
        <zxn-cropper-upload
          v-model="formItem.login_icon"
          :width="204"
          :height="56"
        />
      </el-form-item>
      <el-form-item label="左上角大图标" prop="left_big_icon">
        <zxn-cropper-upload
          :width="204"
          :height="56"
          v-model="formItem.left_big_icon"
        />
      </el-form-item>
      <el-form-item label="左上角小图标" prop="left_small_icon">
        <zxn-cropper-upload v-model="formItem.left_small_icon" />
      </el-form-item>
      <el-form-item label="网页图标" prop="web_icon">
        <zxn-cropper-upload v-model="formItem.web_icon" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex justify-start">
        <el-button type="primary" :loading="loading" @click="handleSubmit"
          >确定</el-button
        >
        <el-button type="info" class="is-cancel" @click="visible = false"
          >取消</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { FormRules } from "element-plus";
import { settingCreate } from "@/api/system";
const emits = defineEmits(["update"]);
const rules = reactive<FormRules>({
  web_compamy_name: [
    { required: true, message: "请输入企业名称", trigger: "change" },
  ],
  login_company_name: [
    { required: true, message: "请输入登录页企业名称", trigger: "change" },
  ],
  web_url: [{ required: true, message: "请输入域名", trigger: "change" }],
  web_mark: [{ required: true, message: "请输入授权标识", trigger: "change" }],
  login_icon: [
    { required: true, message: "请上传登录页图标", trigger: "change" },
  ],
  web_icon: [{ required: true, message: "请上传网页图标", trigger: "change" }],
  left_big_icon: [
    { required: true, message: "请上传左上角大图标", trigger: "change" },
  ],
  left_small_icon: [
    { required: true, message: "请上传左上角小图标", trigger: "change" },
  ],
});
const formItem = reactive({
  id: "",
  web_compamy_name: "",
  login_company_name: "",
  web_url: "",
  web_mark: "",
  is_show: 1,
  login_icon: "",
  web_icon: "",
  left_big_icon: "",
  left_small_icon: "",
});
const visible = ref(false);
const init = (editForm) => {
  visible.value = true;
  nextTick(() => {
    if (editForm) {
      formItem.id = editForm.id;
      formItem.web_compamy_name = editForm.web_compamy_name;
      formItem.login_company_name = editForm.login_company_name;
      formItem.web_url = editForm.web_url;
      formItem.web_mark = editForm.web_mark;
      formItem.is_show = editForm.is_show;
      formItem.login_icon = editForm.login_icon;
      formItem.web_icon = editForm.web_icon;
      formItem.left_big_icon = editForm.left_big_icon;
      formItem.left_small_icon = editForm.left_small_icon;
    }
  });
};
const form = ref();
const handleClose = () => {
  form.value.resetFields();
};
const loading = ref(false);
const handleSubmit = () => {
  form.value.validate(async (valid) => {
    if (valid) {
      const params = {
        ...formItem,
        type: 0,
      };
      loading.value = true;
      try {
        await settingCreate(params);
        loading.value = false;
        ElMessage({
          type: "success",
          message: "保存成功",
        });
        emits("update");
        visible.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    }
  });
};
defineExpose({
  init,
});
</script>
