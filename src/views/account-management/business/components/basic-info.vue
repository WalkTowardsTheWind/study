<template>
  <div class="content">
    <div class="head">
      <div class="line"></div>
      <div class="head-title">企业基本信息</div>
      <div class="tag">{{ businessType[formItem.status] }}</div>
    </div>
    <el-form :form="formItem" label-width="130">
      <div class="main">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="企业名称">
              <el-input
                v-if="isEdit"
                v-model="formItem.company_name"
                disabled
              />
              <span v-else>{{ formItem.company_name }}</span>
            </el-form-item>
            <el-form-item label="统一社会信用代码">
              <el-input v-if="isEdit" v-model.trim="formItem.credit_code" />
              <span v-else>{{ formItem.credit_code }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <el-input
                v-if="isEdit"
                v-model.trim="formItem.contacts_mobile"
                placeholder="请输入手机号或座机号"
              />
              <span v-else>{{ formItem.contacts_mobile }}</span>
            </el-form-item>
            <el-form-item label="法人身份证号">
              <el-input
                v-if="isEdit"
                v-model.trim="formItem.legal_person_idcard"
              />
              <span v-else>{{ formItem.legal_person_idcard }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业登录名称">
              <el-input v-if="isEdit" v-model="formItem.account" disabled />
              <span v-else>{{ formItem.account }}</span>
            </el-form-item>
            <el-form-item label="法定代表人">
              <el-input v-if="isEdit" v-model.trim="formItem.legal_person" />
              <span v-else>{{ formItem.legal_person }}</span>
            </el-form-item>
            <el-form-item label="行业">
              <el-select
                class="w-full"
                placeholder="请选择"
                v-model="formItem.category_id"
                filterable
                clearable
                v-if="isEdit"
              >
                <el-option
                  v-for="item in cateGoryOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <span v-else> {{ formItem.category }}</span>
            </el-form-item>
            <el-form-item label="营业执照有效期">
              <div style="width: 100%">
                <el-date-picker
                  v-if="isEdit"
                  style="width: 100%"
                  :readonly="!isEdit"
                  v-model="formItem.license_end_date"
                  unlink-panels
                  value-format="YYYY-MM-DD"
                />
                <span v-else>{{ formItem.license_end_date }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <div v-if="isEdit" class="w-full">
                <el-input class="w-[100%]" value="********" />
                <span class="resetPWD" @click="resetPWD">重置密码</span>
              </div>
              <span v-else>********</span>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-if="isEdit" v-model.trim="formItem.contacts" />
              <span v-else>{{ formItem.contacts }}</span>
            </el-form-item>
            <el-form-item label="法人电话">
              <el-input
                v-if="isEdit"
                v-model.trim="formItem.legal_person_mobile"
                placeholder="请输入手机号或座机号"
              />
              <span v-else>{{ formItem.legal_person_mobile }}</span>
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
            <el-form-item label="开户行">
              <el-input v-if="isEdit" v-model.trim="formItem.bank" />
              <span v-else>{{ formItem.bank }}</span>
            </el-form-item>
            <el-form-item label="纳税人类型">
              <el-select
                v-if="isEdit"
                class="w-full"
                v-model="formItem.taxpayer_type"
                :disabled="!isEdit"
                filterable
                clearable
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <span v-else>{{
                options.find((i) => i.value === formItem.taxpayer_type)?.label
              }}</span>
            </el-form-item>
            <el-form-item label="渠道点位">
              <el-input v-if="isEdit" v-model="formItem.channel_point">
                <template #append>%</template>
              </el-input>
              <span v-else>{{ formItem.channel_point }}%</span>
            </el-form-item>
            <el-form-item label="计费方式">
              <el-select
                v-if="isEdit"
                class="w-full"
                v-model="formItem.calculation_type"
                filterable
                clearable
              >
                <el-option :value="0" label="内扣"></el-option>
                <el-option :value="1" label="外扣"></el-option>
              </el-select>
              <span v-else>{{
                ["内扣", "外扣"][formItem.calculation_type]
              }}</span>
            </el-form-item>
            <el-form-item label="快递地址">
              <el-input v-if="isEdit" v-model="formItem.address" />
              <span v-else>{{ formItem.address }}</span>
            </el-form-item>
            <el-form-item label="开票地址">
              <el-input v-if="isEdit" v-model="formItem.invoice_address" />
              <span v-else>{{ formItem.invoice_address }}</span>
            </el-form-item>
            <el-form-item label="开票电话">
              <el-input v-if="isEdit" v-model="formItem.invoice_phone" />
              <span v-else>{{ formItem.invoice_phone }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账户">
              <el-input v-if="isEdit" v-model.trim="formItem.bank_account" />
              <span v-else>{{ formItem.bank_account }}</span>
            </el-form-item>
            <el-form-item label="企业邮箱">
              <el-input v-if="isEdit" v-model.trim="formItem.company_email" />
              <span v-else>{{ formItem.company_email }}</span>
            </el-form-item>
            <el-form-item label="企业地址">
              <el-input v-if="isEdit" v-model.trim="formItem.company_address" />
              <span v-else>{{ formItem.company_address }}</span>
            </el-form-item>
            <el-form-item label="发票接收人">
              <el-input v-if="isEdit" v-model.trim="formItem.consignee" />
              <span v-else>{{ formItem.consignee }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业来源">
              <el-select
                v-if="isEdit"
                class="w-full"
                v-model="formItem.company_source"
                filterable
                clearable
              >
                <el-option :value="0" label="销售"></el-option>
                <el-option :value="1" label="渠道推广"></el-option>
              </el-select>
              <span v-else>{{
                ["销售", "渠道推广"][formItem.company_source]
              }}</span>
            </el-form-item>
            <el-form-item label="接收人号码">
              <el-input
                v-if="isEdit"
                v-model.trim="formItem.consignee_mobile"
                placeholder="请输入手机号或座机号"
              />
              <span v-else>{{ formItem.consignee_mobile }}</span>
            </el-form-item>
            <el-form-item label="企业来源备注">
              <el-input
                v-if="isEdit"
                v-model="formItem.company_source_remark"
                placeholder="请输入"
              />
              <span v-else>{{ formItem.company_source_remark }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { getCategoryList, resetAccountPwd } from "@/api/account/business";

import { businessType, taxpayerType } from "@/enums/accountEnum";

const cateGoryOptions = ref([] as any);

const options = Object.entries(taxpayerType)
  .map(([label, value]) => ({ label, value }))
  .filter((i) => typeof i.value !== "string");
console.log(options);
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => 0,
  },
  childData: {
    type: Object,
  },
});
const emit = defineEmits(["update:modelValue"]);

const formItem = ref(props.childData as any);

watch(
  () => props.childData,
  (newValue) => {
    formItem.value = props.childData;
  }
);

watch(
  () => formItem.value,
  (newValue) => {
    emit("update:modelValue", formItem.value);
  }
);

const taxLandOption = ref([] as any);

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
