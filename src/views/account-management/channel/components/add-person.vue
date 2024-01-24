<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList" />
    <div class="p-[52px]">
      <div class="m-b-[20px]">
        <zxn-title>基本信息</zxn-title>
      </div>
      <el-form :model="form" ref="formRef" label-width="auto" :rules="rules">
        <!-- 基本信息 -->
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="账号名称" prop="username">
              <el-input
                placeholder="请输入"
                v-model.trim="form.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input
                placeholder="请输入"
                v-model.trim="form.contact"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系号码">
              <el-input
                placeholder="请输入"
                v-model.trim="form.contact_phone"
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
          <zxn-title>个人信息</zxn-title>
        </div>
        <!-- 个人信息 -->
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="真实姓名" prop="realname">
              <el-input
                placeholder="请输入"
                v-model.trim="form.realname"
              ></el-input>
            </el-form-item>
            <el-form-item label="开户行" prop="bank">
              <el-input
                placeholder="请输入"
                v-model.trim="form.bank"
              ></el-input>
            </el-form-item>
            <el-form-item label="渠道管理员" prop="channel_admin">
              <el-input
                placeholder="请输入"
                class="w-full"
                v-model.trim="form.channel_admin"
              ></el-input>
            </el-form-item>
            <el-form-item label="收款方式" prop="collection_type">
              <el-select
								filterable
                placeholder="请选择"
                class="w-full"
                v-model="form.collection_type"
              >
                <el-option
                  v-for="i in collection_type"
                  :value="i.value"
                  :key="i.value"
                  :label="i.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="身份证号">
              <el-input
                placeholder="请输入"
                v-model.trim="form.idcard"
                maxlength="18"
              ></el-input>
            </el-form-item>
            <el-form-item label="银行账号" prop="bank_account">
              <el-input
                placeholder="请输入"
                v-model.trim="form.bank_account"
              ></el-input>
            </el-form-item>
            <el-form-item label="管理员联系号码">
              <el-input
                placeholder="请输入"
                v-model.trim="form.admin_phone"
              ></el-input>
            </el-form-item>
            <el-form-item label="渠道佣金结算时间" prop="settlement_type">
              <el-select
								filterable
                placeholder="请选择"
                class="w-full"
                v-model="form.settlement_type"
              >
                <el-option
                  v-for="i in settlement_type"
                  :key="i.value"
                  :value="i.value"
                  :label="i.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <!-- <el-form-item label="上传合伙人业务拓展协议" prop="agreement_img">
              <MultiUpload v-model="form.agreement_img" />
            </el-form-item> -->
            <el-form-item label="身份证">
              <MultiUpload v-model="form.idcard_img" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="m-b-[20px] m-t-[50px]">
          <zxn-title>绑定税地</zxn-title>
        </div>
        <!-- 绑定税地 -->
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="税地名称" prop="tax_land_id">
              <el-select
                class="w-full"
                placeholder="请选择"
                v-model="form.tax_land_id"
								filterable
								clearable
              >
                <el-option
                  v-for="(item, index) in taxLandOption"
                  :key="index"
                  :value="item.id"
                  :label="item.tax_land_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="渠道点位" prop="channel_point">
              <el-input
                placeholder="请输入渠道点位"
                v-inputFloat="{ max: 3 }"
                v-model="form.channel_point"
              >
                <template #append>%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="扣税点位" prop="tax_point">
              <el-input
                placeholder="请输入扣税点位"
                v-inputFloat="{ max: 3 }"
                v-model="form.tax_point"
              >
                <template #append>%</template>
              </el-input>
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
import { createPersonChannelAccount } from "@/api/account/channel";
import { settlement_type, collection_type } from "./options";
import router from "@/router";
import { useThrottleFn } from "@vueuse/core";
import { getSelectLandList } from "@/api/common";

const activeName = ref("1");
const tabsList = [{ label: "新建个人渠道", name: "1" }];
const formRef = ref();
const form = reactive({
  username: "", // 账号名称
  contact: "", // 联系人
  contact_phone: "", // 联系号码
  password: "", // 密码
  conf_password: "", // 确认密码

  realname: "", // 真实姓名
  bank: "", // 开户行
  channel_admin: "", // 渠道管理员
  collection_type: "", // 收款方式
  idcard: "", // 身份证号
  bank_account: "", // 银行账号
  admin_phone: "", // 管理员联系号码
  settlement_type: "", // 渠道佣金结算时间
  // agreement_img: [], // 上传合伙人业务拓展协议
  idcard_img: [], // 身份证

  tax_land_id: "", // 税地id
  channel_point: "", //渠道点位
  tax_point: "", // 扣税点位
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

const validateRate = (rule, value, callback) => {
  const reg = /^([0-9]\d{0,1}|100$)(\.\d{1,2})?$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback("点位范围为[0-100]");
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
  realname: [{ required: true, message: "必填", trigger: "blur" }],
  channel_admin: [{ required: true, message: "必填", trigger: "blur" }],
  settlement_type: [{ required: true, message: "必填", trigger: "blur" }],
  collection_type: [{ required: true, message: "必填", trigger: "blur" }],
  agreement_img: [{ required: true, message: "必填", trigger: "blur" }],

  tax_land_id: [{ required: true, message: "请选择税地", trigger: "change" }],
  channel_point: [
    { required: true, message: "请输入渠道点位", trigger: "change" },
    { validator: validateRate, trigger: "change" },
  ],
  tax_point: [
    { required: true, message: "请输入扣税点位", trigger: "change" },
    { validator: validateRate, trigger: "change" },
  ],
};
const taxLandOption = reactive([]);

const selectLandList = async () => {
  const { data } = await getSelectLandList();
  taxLandOption.push(...data.tax_land_list);
};

const debouncedFn = useThrottleFn((formInstance) => {
  // do something
  submit(formInstance);
}, 1000);

const submit = async (formInstance) => {
  if (!formInstance) return;
  await formInstance.validate((valid, fields) => {
    if (valid) {
      createPersonChannelAccount(form).then(() => {
        ElMessage.success({
          message: "新建个人渠道成功",
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
onMounted(() => {
  selectLandList();
});
</script>

<style scoped lang="scss">
.addTax {
  position: absolute;
  top: 5px;
  right: 0px;
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
