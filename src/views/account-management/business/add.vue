<template>
  <zxn-plan>
    <zxn-tabs
      :tabs-list="tabsList"
      v-model:activeName="activeName"
      hasBack
    ></zxn-tabs>
    <!-- <zxn-step
      :step-list="stepList"
      :active-step="activeStep"
      @activeClick="handleActiveClick"
    /> -->
    <el-form
      ref="addFormRef"
      :model="addForm"
      :rules="rules"
      class="ml-[50px]"
      label-width="auto"
    >
      <!-- 基本信息 -->
      <zxn-title class="m-35px" ref="activeRef0">基本信息</zxn-title>
      <el-row :gutter="50">
        <el-col :span="7">
          <el-form-item label="企业登录名称" prop="account" required>
            <el-input
              placeholder="请输入6位以上英文字母和数字组合"
              v-model.trim="addForm.account"
            />
          </el-form-item>
          <el-form-item label="密码" prop="pwd" required>
            <el-input placeholder="请输入" v-model="addForm.pwd" />
          </el-form-item>
          <el-form-item label="确认密码" prop="conf_pwd" required>
            <el-input placeholder="请输入" v-model="addForm.conf_pwd" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="企业联系人" prop="contacts" required>
            <el-input placeholder="请输入" v-model.trim="addForm.contacts" />
          </el-form-item>
          <el-form-item label="联系方式" prop="mobile" required>
            <el-input
              maxlength="11"
              placeholder="请输入手机号或座机号"
              v-model.trim="addForm.mobile"
            />
          </el-form-item>
          <el-form-item label="企业名称" prop="company_name" required>
            <el-input
              placeholder="请输入"
              v-model.trim="addForm.company_name"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 公司信息 -->
      <zxn-title class="m-35px" ref="activeRef1">公司信息</zxn-title>
      <el-row :gutter="50">
        <el-col :span="7">
          <el-form-item label="选择行业">
            <el-select
              class="w-full"
              placeholder="请选择"
              v-model="addForm.category_id"
							filterable
							clearable
            >
              <el-option
                v-for="item in cateGoryOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法人姓名">
            <el-input
              placeholder="请输入"
              v-model.trim="addForm.legal_person"
            />
          </el-form-item>
          <el-form-item label="法人身份证号">
            <el-input
              placeholder="请输入"
              v-model.trim="addForm.legal_person_idcard"
            />
          </el-form-item>
          <el-form-item label="法人电话">
            <el-input
              placeholder="请输入手机号或座机号"
              v-model.trim="addForm.legal_person_mobile"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <!-- <el-form-item label="营业地址">
            <el-input placeholder="请输入" v-model="addForm.company_address" />
          </el-form-item> -->
          <el-form-item label="营业执照到期时间">
            <div class="w-full">
              <el-date-picker
                style="width: 100%"
                v-model="addForm.license_end_date"
                unlink-panels
                value-format="YYYY-MM-DD"
              />
            </div>
          </el-form-item>

          <el-form-item label="法人身份证">
            <MultiUpload v-model.trim="addForm.idcard_img">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="营业执照" prop="license" required>
            <MultiUpload v-model="addForm.license">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
          <el-form-item label="企业印章">
            <MultiUpload v-model="addForm.seal">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 纳税信息 -->
      <zxn-title class="m-35px" ref="activeRef2">纳税信息</zxn-title>
      <el-row :gutter="50">
        <el-col :span="7">
          <el-form-item label="统一社会信用代码" prop="credit_code" required>
            <el-input
              placeholder="请输入纳税人识别号"
              v-model.trim="addForm.credit_code"
            />
          </el-form-item>
          <el-form-item label="开户行">
            <el-input placeholder="请输入" v-model.trim="addForm.bank" />
          </el-form-item>
          <el-form-item label="银行账号">
            <el-input
              placeholder="请输入"
              v-model.trim="addForm.bank_account"
            />
          </el-form-item>
          <el-form-item label="纳税人类型">
            <el-select
							filterable
							clearable
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
          <el-form-item label="开票地址">
            <el-input placeholder="请输入" v-model="addForm.invoice_address" />
          </el-form-item>
          <el-form-item label="开票电话">
            <el-input placeholder="请输入" v-model="addForm.invoice_phone" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
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
        </el-col>
        <el-col :span="7">
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
      <!-- 合同渠道 -->
      <zxn-title class="m-35px" ref="activeRef3">合同渠道</zxn-title>
      <el-row :gutter="50">
        <el-col :span="7">
          <el-form-item label="企业模式">
            <template #default>
              <div class="busType">
                <div
                  class="radioBtn"
                  :class="addForm.company_source == '0' ? 'is-active' : ''"
                  @click="addForm.company_source = '0'"
                >
                  销售
                </div>
                <div
                  class="radioBtn"
                  :class="addForm.company_source == '1' ? 'is-active' : ''"
                  @click="addForm.company_source = '1'"
                >
                  渠道推广
                </div>
              </div>
            </template>
          </el-form-item>
          <template v-if="addForm.company_source == '0'">
            <el-form-item label="销售负责人">
              <el-input placeholder="请输入" v-model="addForm.sale_head" />
            </el-form-item>
            <el-form-item label="销售所属公司">
              <el-input placeholder="请输入" v-model="addForm.sale_company" />
            </el-form-item>
          </template>
          <template v-if="addForm.company_source == '1'">
            <el-form-item label="上级ID绑定" class="w-full">
              <div style="display: flex; gap: 0 10px">
                <el-select placeholder="请选择" filterable clearable v-model="addForm.channel_type">
                  <el-option label="个人" :value="1"></el-option>
                  <el-option label="企业" :value="2"></el-option>
                </el-select>
                <el-input
                  placeholder="请输入"
                  v-model="addForm.parent_channel_id"
                />
              </div>
            </el-form-item>
            <el-form-item label="渠道点位">
              <el-input placeholder="请输入" v-model="addForm.channel_point" />
            </el-form-item>
          </template>
          <el-form-item label="企业来源备注">
            <el-input
              placeholder="请输入"
              v-model="addForm.company_source_remark"
            />
          </el-form-item>
          <el-form-item label="点位计费方式" prop="calculation_type">
            <el-select
              class="w-full"
              v-model="addForm.calculation_type"
              placeholder="请选择"
							filterable
							clearable
            >
              <el-option label="内扣" value="0" />
              <el-option label="外扣" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="企业邮箱">
            <el-input placeholder="请输入" v-model="addForm.company_email" />
          </el-form-item>
          <el-form-item label="发票收件人">
            <el-input placeholder="请输入" v-model="addForm.consignee" />
          </el-form-item>
          <el-form-item label="联系号码">
            <el-input
              placeholder="请输入手机号或座机号"
              v-model="addForm.consignee_mobile"
            />
          </el-form-item>
          <el-form-item label="邮寄地址">
            <el-input placeholder="请输入" v-model="addForm.address" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <!-- 新建税地 -->
          <el-form-item
            label="选择税地"
            prop="tax_land_id"
            :rules="{
              required: true,
              message: '必填',
              trigger: 'change',
            }"
          >
            <el-select
              class="w-full"
              placeholder="请选择"
              v-model="addForm.tax_land_id"
              @change="addSelecTaxland"
              value-key="id"
							filterable
							clearable
            >
              <el-option
                v-for="(item, index) in taxLandOption"
                :key="index"
                :label="item.tax_land_name"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <template v-if="addForm.tax_land_type == 1">
            <el-form-item label="第三方账户">
              <el-input
                placeholder="请输入"
                v-model="addForm.third_user_name"
                clearable
              />
            </el-form-item>
            <el-form-item label="第三方密码">
              <el-input
                placeholder="请输入"
                v-model="addForm.third_password"
                clearable
              />
            </el-form-item>
          </template>
          <el-form-item
            label="客户点位"
            prop="tax_point"
            :rules="{
              trigger: 'change',
              required: true,
              validator: taxPointValidator,
            }"
          >
            <el-input placeholder="请输入" v-model="addForm.tax_point">
              <template #append>%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="认证规则">
            <el-select
              class="w-full"
              placeholder="请选择（单选）"
              v-model="addForm.auth_type"
							filterable
							clearable
            >
              <el-option
                v-for="(item, index) in auth_type"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="签约规则">
            <el-select
              class="w-full"
              placeholder="请选择（单选）"
              v-model="addForm.sign_type"
							filterable
							clearable
            >
              <el-option
                v-for="(item, index) in sign_type"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <zxn-bottom-btn>
        <el-button type="info" v-if="activeStep === 0" @click="$router.go(-1)"
          >取消</el-button
        >
        <el-button type="primary" @click="submit(addFormRef)">完成</el-button>
      </zxn-bottom-btn>
    </el-form>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { createBusinessAccount, getCategoryList } from "@/api/account/business";
import { getLandList } from "@/api/common";
import router from "@/router";
import type { FormInstance, FormRules } from "element-plus";
import { useStore } from "@/store/modules/taxLand";

const taxPointValidator = (rule, value, callback) => {
  const decimalRegex = /^\d{1,3}(\.\d{1,2})?$/;
  if (value === "") {
    callback(new Error("必填"));
  } else if (!decimalRegex.test(value)) {
    callback(new Error("请输入最多三位整数和两位小数的数字"));
  } else if (value > 100) {
    callback(new Error("请输入正确的数字"));
  } else {
    callback(); // 校验通过时调用，没有传入参数即表示校验成功
  }
};
const taxLandStore = useStore();

const taxpayerOptions = [
  {
    label: "小规模",
    value: "1",
  },
  {
    label: "一般人",
    value: "2",
  },
];

const activeName = ref("0");
const activeStep = ref(0);
const taxLandOption = ref([] as any);

const tabsList = [{ name: "0", label: "新建企业" }];

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
  license_end_date: "",
  legal_person: "",
  legal_person_idcard: "",
  legal_person_mobile: "",
  category_id: "",
  // company_address: "",
  license: [],
  idcard_img: [],
  seal: [], // 企业印章
  bank: "",
  bank_account: "",
  taxpayer_type: "",
  permit_img: [],
  taxpayer_type_img: [],
  header_img: [],
  office_img: [],
  company_source: "0",
  sale_head: "",
  sale_company: "",
  channel_type: "",
  parent_channel_id: "",
  company_email: "",
  consignee: "",
  consignee_mobile: "",
  address: "",
  channel_point: "",
  company_source_remark: "",
  calculation_type: "",
  // 税地
  tax_land_id: "",
  third_user_name: "",
  third_password: "",
  tax_point: "",
  sign_type: "",
  auth_type: "",
  tax_land_type: "",
  invoice_address: "",
  invoice_phone: "",
} as any);

const isTaxLandListValid = computed(() => {
  if (addForm.tax_land_list.length > 0) {
    const allElementsValid = addForm.tax_land_list.every((item) => {
      const { tax_land_id, tax_point, auth_type, sign_type } = item;
      return tax_land_id && tax_point && auth_type && sign_type;
    });
    if (allElementsValid) {
      // 数组中所有元素的参数都有值时返回 true
      return true;
    } else {
      // 数组中存在元素的参数缺失值时返回 false
      return false;
    }
  } else {
    return true;
  }
});

const auth_type = ref([] as any);
const sign_type = ref([] as any);

// 相同参数
const requiredComputed = computed(() => {
  return (
    !!addForm.account &&
    !!addForm.pwd &&
    !!addForm.conf_pwd &&
    !!addForm.contacts &&
    !!addForm.mobile &&
    !!addForm.company_name &&
    !!addForm.credit_code &&
    !!addForm.license_end_date &&
    !!addForm.legal_person &&
    !!addForm.legal_person_idcard &&
    !!addForm.legal_person_mobile &&
    !!addForm.category_id &&
    // !!addForm.company_address &&
    !!addForm.license.length &&
    !!addForm.idcard_img.length &&
    !!addForm.seal.length &&
    !!addForm.bank &&
    !!addForm.bank_account &&
    !!addForm.taxpayer_type &&
    !!addForm.permit_img.length &&
    !!addForm.taxpayer_type_img.length &&
    !!addForm.header_img.length &&
    !!addForm.office_img.length &&
    !!addForm.company_source &&
    !!addForm.company_source_remark &&
    !!addForm.calculation_type &&
    !!addForm.company_email &&
    !!addForm.consignee &&
    !!addForm.consignee_mobile &&
    !!addForm.address &&
    !!addForm.invoice_address &&
    !!addForm.invoice_phone &&
    isTaxLandListValid.value
  );
});

const isAllComplete = computed(() => {
  if (addForm.company_source == "0") {
    return (
      requiredComputed.value &&
      !!addForm.company_source &&
      !!addForm.sale_head &&
      !!addForm.sale_company
    );
  }
  if (addForm.company_source == "1") {
    return (
      requiredComputed.value &&
      !!addForm.company_source &&
      !!addForm.channel_type &&
      !!addForm.channel_point
    );
  }
});

const rules = reactive<FormRules>({
  account: [{ required: true, message: "必填", trigger: "blur" }],
  pwd: [{ required: true, message: "必填", trigger: "blur" }],
  conf_pwd: [{ required: true, message: "必填", trigger: "blur" }],
  contacts: [{ required: true, message: "必填", trigger: "blur" }],
  mobile: [{ required: true, message: "必填", trigger: "blur" }],
  company_name: [{ required: true, message: "必填", trigger: "blur" }],
  tax_point: [{ required: true, message: "必填", trigger: "blur" }],
  tax_land_id: [{ required: true, message: "必填", trigger: "change" }],
  credit_code: [{ required: true, message: "必填", trigger: "blur" }],
  license: [{ required: true, message: "必填", trigger: "change" }],
  calculation_type: [{ required: true, message: "必填", trigger: "change" }],
});

/**
 * 提交
 */
async function submit(formEl: FormInstance | undefined) {
  if (!formEl) return;

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let params = {
        ...addForm,
        tax_land_list: [
          {
            tax_land_id: addForm.tax_land_id.id,
            third_user_name: addForm.third_user_name,
            third_password: addForm.third_password,
            tax_point: addForm.tax_point,
            sign_type: addForm.sign_type,
            auth_type: addForm.auth_type,
          },
        ],
      };
      // 全部填写完成
      if (isAllComplete.value) {
        const res = await createBusinessAccount(params);
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
        ElMessageBox.confirm(
          "该企业信息暂不完善，是否立即激活企业状态？",
          "警告",
          {
            confirmButtonText: "确定",
            cancelButtonText: "暂不",
            distinguishCancelAndClose: true,
            center: true,
          }
        )
          .then(async () => {
            addForm.is_active = 1;
            const res = await createBusinessAccount(params);
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
          .catch(async (action) => {
            if (action == "close") {
              ElMessage({
                type: "info",
                message: "取消新建",
              });
            } else {
              addForm.is_active = 0;
              const res = await createBusinessAccount(params);
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
            }
          });
      }
    } else {
      document.querySelectorAll(".is-error")[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
      ElMessage.error({
        message: "当前表单必填项还未填写！",
      });
      // console.log("error submit!", fields);
    }
  });
}

// 行业选择
function getCategoryOptions() {
  getCategoryList().then((res) => {
    cateGoryOptions.value = res.data;
  });
}

// 获取税地列表
function getTaxLandOption() {
  taxLandOption.value.length = 0;
  getLandList().then((res) => {
    taxLandOption.value.push(...res.data.tax_land_list);
  });
}

// 选择税地后才有对应规则
function addSelecTaxland(tax: any) {
  addForm.auth_type = "";
  addForm.sign_type = "";
  addForm.tax_land_type = tax.tax_land_type;
  taxLandStore.updateTaxLandList(tax.id);
  auth_type.value = taxLandStore.auth_type;
  sign_type.value = taxLandStore.sign_type;
}

getCategoryOptions();
getTaxLandOption();
</script>

<style scoped lang="scss">
.busType {
  display: flex;
  gap: 0 20px;
  width: 100%;
  font-size: 14px;
}

.radioBtn {
  flex: 1;
  padding: 2px 0;
  color: #333;
  text-align: center;
  cursor: pointer;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}

.is-active {
  color: #366ff3;
  border-color: #366ff3;
}

:deep(.el-input__wrapper) {
  width: 100% !important;
}
</style>
