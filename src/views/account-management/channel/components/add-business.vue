<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList" />
    <div class="p-[52px]">
      <div class="m-b-[20px]">
        <zxn-title>基本信息</zxn-title>
      </div>
      <el-form :model="form" label-width="auto" ref="formRef" :rules="rules">
        <!-- 基本信息 -->
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="账号名称" prop="username">
              <el-input placeholder="请输入" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input placeholder="请输入" v-model="form.contact"></el-input>
            </el-form-item>

            <el-form-item label="联系号码">
              <el-input
                placeholder="请输入"
                v-model="form.contact_phone"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="密码" prop="password">
              <el-input placeholder="请输入" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="conf_password">
              <el-input
                placeholder="请输入"
                v-model="form.conf_password"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="m-b-[20px] m-t-[50px]">
          <zxn-title>企业信息</zxn-title>
        </div>
        <!-- 企业信息 -->
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="企业名称" prop="company_name">
              <el-input
                placeholder="请输入"
                v-model="form.company_name"
              ></el-input>
            </el-form-item>
            <el-form-item label="开户行" prop="bank">
              <el-input placeholder="请输入" v-model="form.bank"></el-input>
            </el-form-item>
            <el-form-item label="渠道管理员" prop="channel_admin">
              <el-input
                placeholder="请输入"
                class="w-full"
                v-model="form.channel_admin"
              ></el-input>
            </el-form-item>
            <el-form-item label="收款方式" prop="collection_type">
              <el-select
                placeholder="请选择"
                class="w-full"
                v-model="form.collection_type"
              >
                <el-option
                  v-for="i in collection_type"
                  :key="i.value"
                  :value="i.value"
                  :label="i.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="统一社会信用代码">
              <el-input
                placeholder="请输入"
                v-model="form.credit_code"
              ></el-input>
            </el-form-item>
            <el-form-item label="银行账号" prop="bank_account">
              <el-input
                placeholder="请输入"
                v-model="form.bank_account"
              ></el-input>
            </el-form-item>
            <el-form-item label="管理员联系号码">
              <el-input
                placeholder="请输入"
                v-model="form.admin_phone"
              ></el-input>
            </el-form-item>
            <el-form-item label="渠道佣金结算时间" prop="settlement_type">
              <el-select
                placeholder="请选择"
                class="w-full"
                v-model="form.settlement_type"
              >
                <el-option
                  v-for="i in settlement_type"
                  :value="i.value"
                  :key="i.value"
                  :label="i.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="合伙人协议" prop="agreement_img">
              <MultiUpload v-model="form.agreement_img" />
            </el-form-item>
            <el-form-item label="营业执照">
              <MultiUpload v-model="form.license_img" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <zxn-bottom-btn>
      <el-button type="info" plain @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="debouncedFn(formRef)">保存</el-button>
    </zxn-bottom-btn>
  </zxn-plan>
</template>

<script lang="ts" setup>
import router from "@/router";
import { settlement_type, collection_type } from "./options";
import { createCompanyChannelAccount } from "@/api/account/channel";
import { useDebounceFn } from "@vueuse/core";
const activeName = ref("1");

const tabsList = [{ label: "新建企业渠道", name: "1" }];
const formRef = ref();
const form = reactive({
  username: "", // 用户名
  contact: "", // 联系人
  contact_phone: "", // 联系人电话
  password: "", // 密码
  conf_password: "", // 确认密码

  company_name: "", // 企业名称
  bank: "", // 开户行
  channel_admin: "", // 渠道管理员
  collection_type: "", // 收款方式
  credit_code: "", // 统一社会信用代码
  bank_account: "", // 银行账号
  admin_phone: "", // 管理员联系号码
  settlement_type: "", // 渠道佣金结算时间
  agreement_img: [], // 合伙人协议
  license_img: [], // 营业执照
});

const validatePassword = (rule, value, callback) => {
  if (value == "") {
    callback(new Error("请输入密码"));
  } else if (value !== form.password) {
    callback(new Error("两次输入的密码不一致！"));
  } else {
    callback();
  }
};

const rules = {
  username: [{ required: true, message: "必填", trigger: "blur" }],
  password: [{ required: true, message: "必填", trigger: "blur" }],
  bank: [{ required: true, message: "必填", trigger: "blur" }],
  bank_account: [{ required: true, message: "必填", trigger: "blur" }],
  conf_password: [
    { required: true, message: "必填", trigger: "blur" },
    {
      validator: validatePassword,
      trigger: "blur",
    },
  ],
  company_name: [{ required: true, message: "必填", trigger: "blur" }],
  channel_admin: [{ required: true, message: "必填", trigger: "blur" }],
  settlement_type: [{ required: true, message: "必填", trigger: "blur" }],
  collection_type: [{ required: true, message: "必填", trigger: "blur" }],
  agreement_img: [{ required: true, message: "必填", trigger: "blur" }],
};

const debouncedFn = useDebounceFn((formInstance) => {
  // do something
  submit(formInstance);
}, 1000);

const submit = async (formInstance) => {
  if (!formInstance) return;
  await formInstance.validate((valid, fields) => {
    if (valid) {
      createCompanyChannelAccount(form).then(() => {
        ElMessage.success({
          message: "新建企业渠道成功",
        });
        setTimeout(() => {
          router.back();
        }, 500);
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped lang="scss">
.addTax {
  position: absolute;
  top: 5px;
  right: 0;
  height: 33px;
  line-height: 32px;
  padding: 0 5px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #366ff3;
  color: #366ff3;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: #366ff3;
  }
}

:deep(.el-input__wrapper) {
  width: 100% !important;
}
</style>
