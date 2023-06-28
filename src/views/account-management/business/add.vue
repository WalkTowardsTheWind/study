<template>
  <zxn-plan>
    <zxn-tabs
      :tabs-list="tabsList"
      v-model:activeName="activeName"
      hasBack
    ></zxn-tabs>
    <zxn-step :step-list="stepList" :active-step="activeStep" />
    <el-form
      ref="addFormRef"
      :model="addForm"
      :rules="rules"
      class="mt-[52px] ml-[50px]"
      label-width="125px"
    >
      <el-row :gutter="30" v-show="activeStep === 0">
        <el-col :span="7">
          <el-form-item label="企业账户" prop="account" required>
            <el-input placeholder="请输入" v-model="addForm.account" />
          </el-form-item>
          <el-form-item label="密码" prop="pwd" required>
            <el-input placeholder="请输入" v-model="addForm.pwd" />
          </el-form-item>
          <el-form-item label="确认密码" prop="conf_pwd" required>
            <el-input placeholder="请输入" v-model="addForm.conf_pwd" />
          </el-form-item>
          <el-form-item label="企业联系人" prop="contacts" required>
            <el-input placeholder="请输入" v-model="addForm.contacts" />
          </el-form-item>
          <el-form-item label="联系方式" prop="mobile" required>
            <el-input
              maxlength="11"
              placeholder="请输入"
              v-model="addForm.mobile"
            />
          </el-form-item>
          <el-form-item label="企业名称" prop="company_name" required>
            <el-input placeholder="请输入" v-model="addForm.company_name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30" v-show="activeStep === 1">
        <el-col :span="7">
          <el-form-item label="统一社会信用代码">
            <el-input placeholder="请输入" v-model="addForm.credit_code" />
          </el-form-item>
          <el-form-item label="营业执照到期时间">
            <el-date-picker
              v-model="addForm.license_end_date"
              unlink-panels
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="法人姓名">
            <el-input placeholder="请输入" v-model="addForm.legal_person" />
          </el-form-item>
          <el-form-item label="法人身份证号">
            <el-input
              placeholder="请输入"
              v-model="addForm.legal_person_idcard"
            />
          </el-form-item>
          <el-form-item label="法人联系方式">
            <el-input
              placeholder="请输入"
              v-model="addForm.legal_person_mobile"
            />
          </el-form-item>
          <el-form-item label="选择行业">
            <el-select
              class="w-full"
              placeholder="请输入"
              v-model="addForm.category_id"
            >
              <el-option
                v-for="item in cateGoryOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="营业地址">
            <el-input placeholder="请输入" v-model="addForm.company_address" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="营业执照">
            <MultiUpload v-model="addForm.license">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
          <el-form-item label="法人身份证">
            <MultiUpload v-model="addForm.idcard_img">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
          <el-form-item label="企业印章">
            <MultiUpload v-model="addForm.yinzhang">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30" v-show="activeStep === 2">
        <el-col :span="7">
          <el-form-item label="开户行">
            <el-input placeholder="请输入" v-model="addForm.bank" />
          </el-form-item>
          <el-form-item label="银行账号">
            <el-input placeholder="请输入" v-model="addForm.bank_account" />
          </el-form-item>
          <el-form-item label="纳税人识别号">
            <el-input placeholder="请输入" v-model="addForm.taxpayer_number" />
          </el-form-item>
          <el-form-item label="纳税人类型">
            <el-select
              class="w-full"
              placeholder="请输入"
              v-model="addForm.taxpayer_type"
            >
              <el-option
                v-for="item in taxpayerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="17">
          <el-form-item label="开户许可证">
            <MultiUpload v-model="addForm.permit_img">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
          <el-form-item label="纳税人类型证明">
            <MultiUpload v-model="addForm.taxpayer_type_img">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
          <el-form-item label="公司门头照片">
            <MultiUpload v-model="addForm.header_img">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
          <el-form-item label="办公地点照片">
            <MultiUpload v-model="addForm.office_img">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30" v-show="activeStep === 3">
        <el-col :span="8">
          <el-form-item label="企业模式">
            <el-radio-group v-model="addForm.company_source">
              <template #default>
                <el-button
                  class="radioBtn"
                  :class="addForm.company_source == '0' ? 'is-active' : ''"
                  @click="addForm.company_source = '0'"
                  >自营</el-button
                >
                <el-button
                  class="radioBtn"
                  :class="addForm.company_source == '1' ? 'is-active' : ''"
                  @click="addForm.company_source = '1'"
                  >渠道推广</el-button
                >
              </template>
            </el-radio-group>
          </el-form-item>
          <template v-if="addForm.company_source == '1'">
            <el-form-item label="上级ID绑定" class="w-full">
              <div style="display: flex; gap: 0 10px">
                <el-select placeholder="请选择" v-model="addForm.channel_type">
                  <el-option label="个人" :value="1"></el-option>
                  <el-option label="企业" :value="2"></el-option>
                </el-select>
                <el-input
                  placeholder="请输入"
                  v-model="addForm.parent_channel_id"
                />
              </div>
            </el-form-item>
            <el-form-item label="客户点位">
              <el-input placeholder="请输入" v-model="addForm.tax_point" />
            </el-form-item>
            <el-form-item label="认证规则">
              <el-select class="w-full" placeholder="请选择（单选）">
              </el-select>
            </el-form-item>
            <el-form-item label="签约规则">
              <el-select class="w-full" placeholder="请选择（单选）">
              </el-select>
            </el-form-item>
          </template>
          <el-form-item label="企业邮箱">
            <el-input placeholder="请输入" v-model="addForm.company_email" />
          </el-form-item>
          <el-form-item label="联系人">
            <el-input placeholder="请输入" v-model="addForm.consignee" />
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input placeholder="请输入" v-model="addForm.consignee_mobile" />
          </el-form-item>
          <el-form-item label="邮寄地址">
            <el-input placeholder="请输入" v-model="addForm.address" />
          </el-form-item>
          <el-form-item label="选择税地">
            <el-select
              class="w-full"
              placeholder="请选择"
              v-model="addForm.tax_land_id"
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
        <el-col :span="8">
          <el-form-item label="上传合同">
            <MultiUpload v-model="addForm.contract_img">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <zxn-bottom-btn>
        <el-button
          link
          :disabled="isDisabled"
          v-if="activeStep === 0"
          @click="activeStep = 3"
          >跳过此步骤</el-button
        >
        <el-button type="info" v-if="activeStep === 0" @click="$router.go(-1)"
          >取消</el-button
        >
        <el-button type="info" v-if="activeStep !== 0" @click="activeStep--"
          >上一步</el-button
        >
        <el-button
          type="primary"
          v-if="activeStep !== 3"
          :disabled="isDisabled"
          @click="activeStep++"
          >下一步</el-button
        >
        <el-button
          type="primary"
          v-if="activeStep === 3"
          @click="submit(addFormRef)"
          >完成</el-button
        >
      </zxn-bottom-btn>
    </el-form>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { createBusinessAccount, getCategoryList } from "@/api/account/business";
import { ICreateBusinessAccount } from "@/api/account/business/types";
import { getLandList } from "@/api/common";
import router from "@/router";
import type { FormInstance, FormRules } from "element-plus";

const taxpayerOptions = [
  {
    label: "自然人",
    value: "1",
  },
  {
    label: "个体工商户",
    value: "2",
  },
  {
    label: "法人",
    value: "3",
  },
];

const activeName = ref("0");
const activeStep = ref(0);
const taxLandOption = ref([] as any);

const tabsList = [{ name: "0", label: "新建企业" }];
const stepList = [
  { desc: "基本信息" },
  { desc: "公司信息" },
  { desc: "纳税信息" },
  { desc: "合同渠道" },
];

const cateGoryOptions = ref([] as any);

const addFormRef = ref<FormInstance>();

const addForm = reactive({
  account: "",
  pwd: "",
  conf_pwd: "",
  contacts: "",
  mobile: "",
  company_name: "",
  credit_code: "",
  license_start_date: "",
  license_end_date: "",
  legal_person: "",
  legal_person_idcard: "",
  legal_person_mobile: "",
  category_id: "",
  company_address: "",
  license: [],
  idcard_img: [],
  bank: "",
  bank_account: "",
  taxpayer_number: "",
  taxpayer_type: "",
  permit_img: [],
  taxpayer_type_img: [],
  header_img: [],
  office_img: [],
  channel_type: "",
  company_email: "",
  consignee: "",
  consignee_mobile: "",
  address: "",
  tax_land_id: "",
  company_source: "",
  parent_channel_id: "",
  tax_point: "",
  contract_img: [],
  yinzhang: [], // 企业印章
} as any);

const isDisabled = computed(() => {
  return (
    !addForm.account ||
    !addForm.pwd ||
    !addForm.conf_pwd ||
    !addForm.contacts ||
    !addForm.mobile ||
    !addForm.company_name
  );
});

const isAllComplete = computed(() => {
  for (let key in addForm) {
    if (!addForm[key] || addForm[key] === "") {
      return false;
    }
  }
  return true;
});

const rules = reactive<FormRules>({
  account: [{ required: true, message: "必填", trigger: "blur" }],
  pwd: [{ required: true, message: "必填", trigger: "blur" }],
  conf_pwd: [{ required: true, message: "必填", trigger: "blur" }],
  contacts: [{ required: true, message: "必填", trigger: "blur" }],
  mobile: [{ required: true, message: "必填", trigger: "blur" }],
  company_name: [{ required: true, message: "必填", trigger: "blur" }],
});

/**
 * 提交
 */
async function submit(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log(isAllComplete.value);
      // 全部填写完成
      if (isAllComplete.value) {
        const res = await createBusinessAccount(addForm);
        try {
          if (res.status === 200) {
            ElMessage({
              message: "新建企业账号成功",
              type: "success",
            });
            setTimeout(() => {
              router.go(-1);
            }, 200);
          }
        } catch (error: any) {
          return new Error("error", error);
        }
      } else {
        // 弹框激活
        ElMessageBox.confirm("该企业信息暂不完善，是否立即激活企业状态？", {
          confirmButtonText: "确定",
          cancelButtonText: "暂不",
          center: true,
        })
          .then(async () => {
            addForm.is_active = 1;
            const res = await createBusinessAccount(addForm);
            try {
              if (res.status === 200) {
                ElMessage({
                  message: "新建企业账号成功",
                  type: "success",
                });
                setTimeout(() => {
                  router.go(-1);
                }, 200);
              }
            } catch (error: any) {
              return new Error("error", error);
            }
          })
          .catch(async () => {
            addForm.is_active = 0;
            const res = await createBusinessAccount(addForm);
            try {
              if (res.status === 200) {
                ElMessage({
                  message: "新建企业账号成功",
                  type: "success",
                });
                setTimeout(() => {
                  router.go(-1);
                }, 200);
              }
            } catch (error: any) {
              return new Error("error", error);
            }
            ElMessage({
              type: "success",
              message: "新建企业账号成功",
            });
          });
      }
      // if (isAllComplete) {
      //   params.is_active = 1
      // } else {
      //   params.is_active = 0
      // }
      // console.log(params);

      // const res = await createBusinessAccount(addForm);
      // try {
      // 	if (res.status === 200) {
      // 		ElMessage({
      // 			message: "新建企业账号成功",
      // 			type: "success",
      // 		});
      // 		setTimeout(() => {
      // 			router.back();
      // 		}, 200);
      // 	}
      // } catch (error: any) {
      // 	return new Error("error", error);
      // }
    } else {
      console.log("error submit!", fields);
    }
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
    console.log(res);
    taxLandOption.value.push(...res.data);
  });
}
getCategoryOptions();
getTaxLandOption();
</script>

<style scoped lang="scss">
:deep(.el-radio-group) {
  display: flex;
  width: 100%;
  white-space: nowrap;

  .radioBtn {
    flex: 1;
    color: #333;
    background: #fff;
    border-radius: 4px;
  }

  .is-active {
    color: #366ff3;
    border-color: #366ff3;
  }
}
</style>
