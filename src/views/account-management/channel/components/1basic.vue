<template>
  <div class="p-[37px]">
    <!-- 企业 -->
    <template v-if="channel_type == '1'">
      <el-form
        :model="formItem"
        label-width="auto"
        ref="formRef1"
        :rules="rules1"
      >
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="渠道类型">
              <el-select
                v-model="formItem.channel_type"
                disabled
                class="w-full"
              >
                <el-option label="企业" :value="1"></el-option>
                <el-option label="个人" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="管理员联系号码">
              <el-input v-model="formItem.admin_phone" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="账号名称" prop="username">
              <el-input v-model="formItem.username" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="统一社会信用代码">
              <el-input v-model="formItem.credit_code" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="联系号码">
              <el-input v-model="formItem.contact_phone" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="银行账号" prop="bank_account">
              <el-input v-model="formItem.bank_account" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="渠道佣金结算时间" prop="settlement_type">
              <el-select
                v-model="formItem.settlement_type"
                class="w-full"
                :disabled="!isEdit"
              >
                <el-option
                  v-for="i in settlement_type"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="渠道管理员" prop="channel_admin">
              <el-input v-model="formItem.channel_admin" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="企业名称" prop="company_name">
              <el-input v-model="formItem.company_name" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input value="********" readonly />
              <span v-if="isEdit" class="resetPWD" @click="resetPWD"
                >重置密码</span
              >
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="formItem.contact" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="开户行" prop="bank">
              <el-input v-model="formItem.bank" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="收款方式" prop="collection_type">
              <el-select
                v-model="formItem.collection_type"
                class="w-full"
                :disabled="!isEdit"
              >
                <el-option
                  v-for="i in collection_type"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="合伙人协议" prop="agreement_img">
              <MultiUpload v-if="isEdit" v-model="formItem.agreement_img" />
              <PicturePreview v-else :image-list="formItem.agreement_img" />
            </el-form-item>
            <el-form-item label="营业执照">
              <MultiUpload v-if="isEdit" v-model="formItem.license_img" />
              <PicturePreview v-else :image-list="formItem.license_img" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <zxn-bottom-btn v-if="isEdit">
        <el-button type="info" plain @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" @click="debouncedF(formRef1, 1)"
          >保存</el-button
        >
      </zxn-bottom-btn>
    </template>
    <!-- 个人 -->
    <template v-if="channel_type == '2'">
      <el-form
        label-width="auto"
        :model="formItem"
        ref="formRef2"
        :rules="rules2"
      >
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="渠道类型">
              <el-select
                v-model="formItem.channel_type"
                disabled
                class="w-full"
              >
                <el-option label="企业" :value="1"></el-option>
                <el-option label="个人" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="管理员联系号码">
              <el-input v-model="formItem.admin_phone" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="账号名称" prop="username">
              <el-input v-model="formItem.username" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="formItem.contact" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="开户行" prop="bank">
              <el-input v-model="formItem.bank" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="收款方式" prop="collection_type">
              <el-select
                v-model="formItem.collection_type"
                class="w-full"
                :disabled="!isEdit"
              >
                <el-option
                  v-for="i in collection_type"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="渠道管理员" prop="channel_admin">
              <el-input v-model="formItem.channel_admin" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="真实姓名" prop="realname">
              <el-input v-model="formItem.realname" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input value="********" readonly />
              <span v-if="isEdit" class="resetPWD" @click="resetPWD"
                >重置密码</span
              >
            </el-form-item>
            <el-form-item label="联系号码">
              <el-input v-model="formItem.contact_phone" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="银行账号" prop="bank_account">
              <el-input v-model="formItem.bank_account" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="渠道佣金结算时间" prop="settlement_type">
              <el-select
                v-model="formItem.settlement_type"
                class="w-full"
                :disabled="!isEdit"
              >
                <el-option
                  v-for="i in settlement_type"
                  :label="i.label"
                  :key="i.value"
                  :value="i.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="合伙人协议" prop="agreement_img">
              <MultiUpload v-if="isEdit" v-model="formItem.agreement_img" />
              <PicturePreview v-else :image-list="formItem.agreement_img" />
            </el-form-item>

            <el-form-item label="身份证">
              <MultiUpload v-if="isEdit" v-model="formItem.idcard_img" />
              <PicturePreview v-else :image-list="formItem.idcard_img" />
            </el-form-item>
            <el-form-item label="银行卡">
              <MultiUpload v-if="isEdit" v-model="formItem.bank_img" />
              <PicturePreview v-else :image-list="formItem.bank_img" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <zxn-bottom-btn v-if="isEdit">
        <el-button type="info" plain @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" @click="debouncedF(formRef2, 2)"
          >保存</el-button
        >
      </zxn-bottom-btn>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  resetChannelPWD,
  updateCompanyChannelAccount,
  updatePersonChannelAccount,
} from "@/api/account/channel";
import { settlement_type, collection_type } from "./options";
import { useDebounceFn } from "@vueuse/core";
import router from "@/router";
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  childData: {
    type: Object,
  },
});
const formItem = ref({} as any);
const formRef1 = ref();
const formRef2 = ref();

const commonRules = {
  channel_admin: [{ required: true, message: "必填", trigger: "blur" }],
  collection_type: [{ required: true, message: "必填", trigger: "change" }],
  settlement_type: [{ required: true, message: "必填", trigger: "change" }],
  agreement_img: [{ required: true, message: "必填", trigger: "change" }],
  bank: [{ required: true, message: "必填", trigger: "blur" }],
  bank_account: [{ required: true, message: "必填", trigger: "blur" }],
};
const rules1 = {
  username: [{ required: true, message: "必填", trigger: "blur" }],
  company_name: [{ required: true, message: "必填", trigger: "blur" }],
  ...commonRules,
};

const rules2 = {
  username: [{ required: true, message: "必填", trigger: "blur" }],
  realname: [{ required: true, message: "必填", trigger: "blur" }],
  ...commonRules,
};
const channel_type = ref("1");
watch(
  () => props.childData,
  () => {
    formItem.value = props.childData;
    channel_type.value = formItem.value.channel_type;
  }
);

const debouncedF = useDebounceFn((formInstance, type: number) => {
  // do something
  updateAccount(formInstance, type);
}, 1000);

const updateAccount = async (formInstance, type) => {
  if (!formInstance) return;
  await formInstance.validate((valid, fields) => {
    if (valid) {
      switch (type) {
        case 1:
          updateCompanyChannelAccount(formItem.value).then(() => {
            ElMessage.success({
              message: "保存成功",
            });
          });
          router.back();
          break;
        case 2:
          updatePersonChannelAccount(formItem.value).then(() => {
            ElMessage.success({
              message: "保存成功",
            });
          });
          router.back();
          break;
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetPWD = () => {
  ElMessageBox.confirm("是否重置密码", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    center: true,
  })
    .then(() => {
      resetChannelPWD(formItem.value.id).then(() => {
        ElMessage.success({
          message: "操作成功",
        });
      });
    })
    .catch(() => {
      ElMessage.info({
        message: "取消操作",
      });
    });
};
</script>

<style scoped>
.resetPWD {
  position: absolute;
  right: 10px;
  color: #356ff3;
  cursor: pointer;
}
</style>
