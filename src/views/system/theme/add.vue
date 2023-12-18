<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" :activeName="activeName">
      <template #1>
        <div class="pt-36px pl-52px">
          <zxn-title>基本信息</zxn-title>
          <el-form
            class="mt-27px"
            ref="form"
            :model="formItem"
            label-width="130"
            :rules="rules"
            label-position="left"
          >
            <el-row :gutter="80">
              <el-col :span="8">
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
                <el-form-item label="负责人" prop="head_name">
                  <el-input v-model="formItem.head_name" />
                </el-form-item>
                <el-form-item label="负责人电话" prop="head_phone">
                  <el-input v-model="formItem.head_phone" />
                </el-form-item>
                <el-form-item label="是否显示客服" prop="is_show">
                  <el-switch
                    v-model="formItem.is_show"
                    :active-value="1"
                    :inactive-value="0"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="登录页图标" prop="login_icon">
                  <zxn-cropper-upload
                    v-model="formItem.login_icon"
                    :width="204"
                    :height="86"
                  />
                </el-form-item>
                <el-form-item label="网页图标" prop="web_icon">
                  <zxn-cropper-upload v-model="formItem.web_icon" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="左上角大图标" prop="left_big_icon">
                  <zxn-cropper-upload
                    :width="204"
                    :height="86"
                    v-model="formItem.left_big_icon"
                  />
                </el-form-item>
                <el-form-item label="左上角小图标" prop="left_small_icon">
                  <zxn-cropper-upload v-model="formItem.left_small_icon" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <zxn-bottom-btn>
            <el-button type="info" class="is-cancel" @click="handlCancel"
              >取消</el-button
            >
            <el-button type="primary" @click="handleSubmit">保存</el-button>
          </zxn-bottom-btn>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { settingCreate } from "@/api/system";
import router from "@/router";
import { FormRules } from "element-plus";
import { useRoute } from "vue-router";
const route = useRoute();

const tabsList = [{ name: "1", label: "新建OEM" }];
const activeName = ref("1");

const form = ref();
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
  head_name: [{ required: true, message: "请输入负责人", trigger: "change" }],
  head_phone: [
    { required: true, message: "请输入负责人电话", trigger: "change" },
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
  head_name: "",
  head_phone: "",
});

const handleSubmit = () => {
  form.value.validate(async (valid) => {
    if (valid) {
      const params = {
        ...formItem,
        type: 0,
      };
      try {
        await settingCreate(params);
        ElMessage({
          type: "success",
          message: "保存成功",
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
};

const handlCancel = () => {
  router.go(-1);
  form.value.resetFields();
};

const init = (editForm) => {
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
      formItem.head_name = editForm.head_name;
      formItem.head_phone = editForm.head_phone;
    }
  });
};
if (route.query.item) {
  tabsList[0].label = "编辑OEM";
  init(JSON.parse(route.query.item as string));
}
</script>

<style scoped></style>
