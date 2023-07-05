<template>
  <div class="content">
    <div class="head">
      <div class="line"></div>
      <div class="head-title">企业基本信息</div>
      <div class="tag">{{ businessType[formData.status] }}</div>
    </div>
    <el-form :form="formData" label-width="150px">
      <div class="main">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="企业名称" align="right" label-width="130px">
              <el-input v-model="formData.company_name" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="统一社会信用代码" label-width="130px">
              <el-input v-model="formData.credit_code" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="电话" label-width="130px">
              <el-input
                v-model="formData.contacts_mobile"
                :readonly="!isEdit"
              />
            </el-form-item>
            <el-form-item label="法人身份证号" label-width="130px">
              <el-input
                v-model="formData.legal_person_idcard"
                :readonly="!isEdit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业登录名称">
              <el-input v-model="formData.account" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="法定代表人">
              <el-input v-model="formData.legal_person" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="行业">
              <el-select
                class="w-full"
                placeholder="请选择"
                v-model="formData.category_id"
                :readonly="!isEdit"
              >
                <el-option
                  v-for="item in cateGoryOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营业执照有效期">
              <div style="width: 100%">
                <el-date-picker
                  style="width: 100%"
                  :readonly="!isEdit"
                  v-model="formData.license_end_date"
                  unlink-panels
                  value-format="YYYY-MM-DD"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input class="w-[100%]" value="********" :readonly="!isEdit" />
              <span v-if="isEdit" class="resetPWD" @click="resetPWD"
                >重置密码</span
              >
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="formData.contacts" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="法人电话">
              <el-input
                v-model="formData.legal_person_mobile"
                :readonly="!isEdit"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="head">
        <div class="line"></div>
        <div class="head-title">纳税&开票信息</div>
      </div>
      <div class="main">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="开户行" label-width="130px">
              <el-input v-model="formData.bank" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="纳税人类型" label-width="130px">
              <el-select
                class="w-full"
                v-model="formData.taxpayer_type"
                :readonly="!isEdit"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="渠道点位" label-width="130px">
              <el-input :readonly="!isEdit" v-model="formData.channel_point">
                <template #append>%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="计费方式" label-width="130px">
              <el-select
                class="w-full"
                v-model="formData.calculation_type"
                :readonly="!isEdit"
              >
                <el-option :value="1" label="外扣"></el-option>
                <el-option :value="2" label="内扣"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="快递地址" label-width="130px">
              <el-input :readonly="!isEdit" v-model="formData.address" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账号">
              <el-input v-model="formData.bank_account" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="企业邮箱">
              <el-input v-model="formData.company_email" :readonly="!isEdit" />
            </el-form-item>
            <el-form-item label="企业地址">
              <el-input
                v-model="formData.company_address"
                :readonly="!isEdit"
              />
            </el-form-item>
            <el-form-item label="发票接收人">
              <el-input v-model="formData.consignee" :readonly="!isEdit" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识别号">
              <el-input
                v-model="formData.taxpayer_number"
                :readonly="!isEdit"
              />
            </el-form-item>
            <el-form-item label="企业来源">
              <el-select
                class="w-full"
                v-model="formData.company_source"
                :readonly="!isEdit"
              >
                <el-option :value="0" label="销售"></el-option>
                <el-option :value="1" label="渠道推广"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接收人号码">
              <el-input
                v-model="formData.consignee_mobile"
                :readonly="!isEdit"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
  <zxn-bottom-btn v-if="isEdit">
    <el-button @click="$router.go(-1)">取消</el-button>
    <el-button type="primary" @click="updateBusinessAccount">保存</el-button>
  </zxn-bottom-btn>
</template>

<script lang="ts" setup>
import {
  getBusinessAccountDetail,
  editBusinessAccount,
  getCategoryList,
  resetAccountPwd,
} from "@/api/account/business";
import { getLandList } from "@/api/common";

import { businessType, taxpayerType } from "@/enums/accountEnum";
import router from "@/router";

const cateGoryOptions = ref([] as any);

const options = Object.entries(taxpayerType)
  .map(([label, value]) => ({ label, value }))
  .filter((i) => typeof i.value !== "string");

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => 0,
  },
});

const formData = ref({} as any);
const taxLandOption = ref([] as any);

const taxlandList = ref([] as any);

async function updateBusinessAccount() {
  // 后台返回的 contacts_mobile 更新修改为 mobile
  let params = {
    ...formData.value,
    mobile: formData.value.contacts_mobile,
    contacts_mobile: undefined,
  };
  // console.log(params);
  try {
    await editBusinessAccount(params);
    ElMessage({
      message: "编辑成功",
      type: "success",
    });
    router.go(-1);
  } catch (error: any) {
    return new Error(error);
  }
}

async function getAccountDetail() {
  if (props.id) {
    const res = await getBusinessAccountDetail(props.id);
    console.log(res);

    try {
      formData.value = res.data;
    } catch (error: any) {
      return new Error("error", error);
    }
  }
}
function resetPWD() {
  ElMessageBox.confirm("是否重置密码?", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    center: true,
  })
    .then(() => {
      resetAccountPwd(props.id).then((res) => {
        ElMessage.success({
          message: "重置密码成功",
        });
      });
    })
    .catch((err) => {
      ElMessage({
        type: "info",
        message: "取消重置密码",
      });
      console.log(err);
    });
}

function getCategoryOptions() {
  getCategoryList().then((res) => {
    cateGoryOptions.value = res.data;
  });
}
function getTaxLandOption() {
  taxLandOption.value.length = 0;
  getLandList().then((res) => {
    taxLandOption.value.push(...res.data);
  });
}

function del(index) {
  taxlandList.value.splice(index, 1);
}

getAccountDetail();
getTaxLandOption();
getCategoryOptions();
</script>

<style scoped lang="scss">
.content {
  padding: 30px;

  .head {
    display: flex;
    align-items: center;
    font-size: 14px;

    .line {
      width: 4px;
      height: 16px;
      background: #366ff3;
      border-radius: 2px;
    }

    &-title {
      margin: 0 16px 0 8px;
      font-weight: 500;
      color: #356ff3;
    }

    .tag {
      width: 56px;
      height: 24px;
      font-weight: 500;
      line-height: 25px;
      color: #356ff3;
      text-align: center;
      background: #dfe8fd;
      border-radius: 12px;
    }
  }

  .main {
    margin-top: 20px;
    font-weight: 500;
    color: #333;
  }
}

.del {
  color: #356ff3;
  cursor: pointer;
}

.resetPWD {
  position: absolute;
  right: 10px;
  color: #356ff3;
  cursor: pointer;
}

:deep(.el-input__wrapper) {
  width: 100% !important;
}
</style>
