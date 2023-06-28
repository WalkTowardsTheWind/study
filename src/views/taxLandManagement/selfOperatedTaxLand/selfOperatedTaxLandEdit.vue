<template>
  <zxn-plan>
    <zxn-tabs
      :activeName="activeName"
      :tabsList="tabsList"
      :hasBack="true"
      :hasUpdate="false"
    >
      <template #1>
        <div class="p-[24px] p-b-[0]">
          <el-form
            class="zxn-box"
            :model="formItem"
            label-width="130px"
            ref="FormRef"
            :rules="Rules"
          >
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item
                  class="mt-25px"
                  label="税地类型"
                  prop="tax_land_type"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.tax_land_type"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.tax_land_type'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="税地负责人" prop="tax_land_head">
                  <el-input
                    v-model="formItem.tax_land_head"
                    placeholder="请输入"
                  />
                </el-form-item>
                <el-form-item label="联系方式" prop="head_mobile">
                  <el-input
                    v-model="formItem.head_mobile"
                    placeholder="请输入"
                  />
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="税地来源"
                  prop="tax_land_name"
                >
                  <el-input
                    class="w-[100%]"
                    v-model="formItem.tax_land_name"
                    placeholder="请输入"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="成本点位"
                  prop="tax_cost_point"
                >
                  <el-input
                    v-model="formItem.tax_cost_point"
                    placeholder="请输入"
                  />
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="计算方式"
                  prop="calculation_type"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.calculation_type"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.calculationType'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="用工年限" required>
                  <el-col :span="11">
                    <el-form-item prop="min_employment_year">
                      <el-input
                        type="number"
                        v-model="formItem.min_employment_year"
                        placeholder="起始年龄"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col class="text-center" :span="2">
                    <span class="text-gray-500">-</span>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item prop="max_employment_year">
                      <el-input
                        type="number"
                        v-model="formItem.max_employment_year"
                        placeholder="截至年龄"
                      />
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item
                  class="mt-25px"
                  label="税地地区"
                  prop="tax_land_city_id"
                >
                  <el-cascader
                    class="w-[100%]"
                    v-model="formItem.tax_land_city_id"
                    :options="optionsTaxLang"
                    :props="propsTaxLang"
                    clearable
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="网址" prop="web_url">
                  <el-input v-model="formItem.web_url" placeholder="请输入" />
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item
                  class="mb-[0]"
                  label="营业执照"
                  prop="tax_land_license"
                >
                  <multi-upload
                    v-model="formItem.tax_land_license"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
                <el-form-item
                  class="mt-13px"
                  label="公司资质"
                  prop="company_qualifications"
                >
                  <multi-upload
                    v-model="formItem.company_qualifications"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </template>
      <template #2>
        <div class="p-[24px] p-b-[0]">
          <el-form
            class="zxn-box"
            :model="formItem"
            label-width="130px"
            ref="FormRef2"
            :rules="Rules2"
          >
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item
                  class="mt-25px"
                  label="税地发票类型"
                  prop="invoice_type"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.invoice_type"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.InvoiceType'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="开票类目"
                  prop="category_id"
                >
                  <el-cascader
                    class="w-[100%]"
                    v-model="formItem.category_id"
                    :options="optionsInvoicingCategory"
                    :props="propsInvoicingCategory"
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="发票面额"
                  prop="invoice_denomination"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.invoice_denomination"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.invoice_denomination'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="发票金额上限"
                  prop="max_money"
                >
                  <el-input v-model="formItem.max_money" placeholder="请输入">
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-25px" label="税点" prop="tax_point">
                  <el-input v-model="formItem.tax_point" placeholder="请输入">
                  </el-input>
                </el-form-item>

                <el-form-item
                  class="mt-25px"
                  label="是否有支付接口"
                  prop="is_payment_api"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.is_payment_api"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.is_payment_api'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="支付方式"
                  prop="payment_type"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.payment_type"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.paymentType'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="开户行" prop="depositBank">
                  <el-input v-model="formItem.depositBank" placeholder="请输入">
                  </el-input>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="银行账户"
                  prop="bank_account"
                >
                  <el-input
                    v-model="formItem.bank_account"
                    placeholder="请输入"
                  />
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item
                  class="mb-[0]"
                  label="发票票样"
                  prop="invoice_sample"
                >
                  <multi-upload
                    v-model="formItem.invoice_sample"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
                <el-form-item
                  class="mb-[0]"
                  label="行业限制"
                  prop="industryRestrictions"
                >
                  <multi-upload
                    v-model="formItem.industryRestrictions"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </template>
      <template #3>
        <div class="p-[24px] p-b-[0]">
          <el-form
            class="zxn-box"
            :model="formItem"
            label-width="130px"
            ref="FormRef3"
            :rules="Rules3"
          >
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item
                  class="mt-25px"
                  label="认证规则"
                  prop="certificationRules"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.certificationRules"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.CertificationRules'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="签约规则"
                  prop="signingRules"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.signingRules"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.SigningRules'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="单人每月限额"
                  prop="individualMonthlyLimit"
                >
                  <el-input v-model="formItem.individualMonthlyLimit">
                    <template #append>万</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="委托代征年限"
                  prop="entrustedCollectionPeriod"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.entrustedCollectionPeriod"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.EntrustedCollectionPeriod'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="进件资料">
                  <el-input
                    v-model="formItem.incoming_materials"
                    placeholder="请输入"
                  >
                  </el-input>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="合同" prop="agreement_url">
                  <multi-upload
                    v-model="formItem.agreement_url"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
                <el-form-item
                  class="mb-[0]"
                  label="结算确认单"
                  prop="settlement_confirmation_letter"
                >
                  <multi-upload
                    v-model="formItem.settlement_confirmation_letter"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </template>
    </zxn-tabs>
    <zxn-bottom-btn
      ><div class="but">
        <el-button type="primary" @click="handleSelfOperatedTaxLandEdit"
          >保存</el-button
        >
        <el-button @click="handleClose">取消</el-button>
      </div></zxn-bottom-btn
    >
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import {
  selfOperatedTaxLandEdit,
  selfOperatedTaxLandDetails,
} from "@/api/taxLandManagement/selfOperatedTaxLand";
import { getAreaList } from "@/api/taxLandManagement";
// import { getCategoryTreeList } from "@/api/category";
import { getTreeList } from "@/api/common";
import { isArray } from "../../../utils/is";
const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const router = useRouter();
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "基本信息",
  },
  {
    name: "2",
    label: "发票厂家信息",
  },
  {
    name: "3",
    label: "行业与合同信息",
  },
];

// 类目下拉选择框
var optionsInvoicingCategory = ref([]);
const getInvoicingCategoryTradeList = async () => {
  try {
    const { data } = await getTreeList({ type: 2 });
    const newData = JSON.parse(
      JSON.stringify(data)
        .replace(/"id"/g, '"value"')
        .replace(/"name"/g, '"label"')
        .replace(/"children"/g, '"children"')
    );
    optionsInvoicingCategory.value = newData;
  } catch (error) {
    console.log(error);
  }
};
getInvoicingCategoryTradeList();
const propsInvoicingCategory = {
  // multiple: true,
  expandTrigger: "hover" as const,
};

//行业
// var optionsTrade = ref([]);
// const getTradeList = async () => {
//   try {
//     const { data } = await getCategoryTreeList({ type: "0" });
//     const newData = JSON.parse(
//       JSON.stringify(data)
//         .replace(/"id"/g, '"value"')
//         .replace(/"name"/g, '"label"')
//         .replace(/"children"/g, '"children"')
//     );
//     optionsTrade.value = newData;
//   } catch (error) {
//     console.log(error);
//   }
// };
// getTradeList();
// const propsTrade = {
//   // multiple: true,
//   expandTrigger: "hover" as const,
// };
//税地
var optionsTaxLang = ref([]);
const getTaxLangList = async () => {
  try {
    const { data } = await getAreaList(0);
    const newData = JSON.parse(
      JSON.stringify(data)
        .replace(/"id"/g, '"value"')
        .replace(/"name"/g, '"label"')
        .replace(/"cityList"/g, '"children"')
        .replace(/"taxLandList"/g, '"children"')
        .replace(/"child"/g, '"children"')
    );
    optionsTaxLang.value = newData;
  } catch (error) {
    console.log(error);
  }
};
getTaxLangList();
const propsTaxLang = {
  // multiple: true,
  expandTrigger: "hover" as const,
};

//表单信息

const FormRef = ref(ElForm);
const FormRef2 = ref(ElForm);
const FormRef3 = ref(ElForm);
const validateMin_employment_year = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入"));
  } else if (!/^[0-9]+$/.test(value)) {
    callback(new Error("请输入正整数"));
  } else if (value > formItem.value.max_employment_year) {
    if (!formItem.value.max_employment_year) return;
    callback(new Error("起始年龄应该小于截至年龄"));
  } else {
    callback();
  }
};
const validateMax_employment_year = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入"));
  } else if (!/^[0-9]+$/.test(value)) {
    callback(new Error("请输入正整数"));
  } else if (value < formItem.value.min_employment_year) {
    if (!formItem.value.min_employment_year) return;
    callback(new Error("起始年龄应该大于截至年龄"));
  } else {
    callback();
  }
};
const validateIndividualMonthlyLimit = (
  rule: any,
  value: any,
  callback: any
) => {
  if (value === "") {
    callback(new Error("请输入"));
  } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    callback(new Error("请输入正确格式，（例如：2，2.2，2.22）"));
  } else {
    callback();
  }
};
const Rules = {
  tax_land_type: [{ required: true, message: "请输入", trigger: "blur" }],
  tax_land_head: [{ required: true, message: "请输入", trigger: "blur" }],
  head_mobile: [{ required: true, message: "请输入", trigger: "blur" }],
  tax_land_name: [{ required: true, message: "请输入", trigger: "blur" }],
  tax_cost_point: [{ required: true, message: "请输入", trigger: "blur" }],
  calculation_type: [{ required: true, message: "请输入", trigger: "blur" }],
  min_employment_year: [
    { required: true, validator: validateMin_employment_year, trigger: "blur" },
  ],
  max_employment_year: [
    { required: true, validator: validateMax_employment_year, trigger: "blur" },
  ],
  tax_land_city_id: [{ required: true, message: "请输入", trigger: "blur" }],
  web_url: [{ required: true, message: "请输入", trigger: "blur" }],

  tax_land_license: [
    { required: true, message: "请上传图片", trigger: "blur" },
  ],
  company_qualifications: [
    { required: true, message: "请上传图片", trigger: "blur" },
  ],
};
const Rules2 = {
  invoice_type: [{ required: true, message: "请输入", trigger: "blur" }],
  category_id: [{ required: true, message: "请输入", trigger: "blur" }],
  invoice_denomination: [
    { required: true, message: "请输入", trigger: "blur" },
  ],
  max_money: [{ required: true, message: "请输入", trigger: "blur" }],
  tax_point: [{ required: true, message: "请输入", trigger: "blur" }],
  is_payment_api: [{ required: true, message: "请输入", trigger: "blur" }],
  payment_type: [{ required: true, message: "请输入", trigger: "blur" }],
  depositBank: [{ required: true, message: "请输入", trigger: "blur" }],
  bank_account: [{ required: true, message: "请输入", trigger: "blur" }],
  invoice_sample: [{ required: true, message: "请上传图片", trigger: "blur" }],
  industryRestrictions: [
    { required: true, message: "请上传图片", trigger: "blur" },
  ],
};
const Rules3 = {
  certificationRules: [{ required: true, message: "请输入", trigger: "blur" }],
  signingRules: [{ required: true, message: "请输入", trigger: "blur" }],
  individualMonthlyLimit: [
    {
      required: true,
      validator: validateIndividualMonthlyLimit,
      trigger: "blur",
    },
  ],
  entrustedCollectionPeriod: [
    { required: true, message: "请输入", trigger: "blur" },
  ],
  agreement_url: [{ required: true, message: "请上传图片", trigger: "blur" }],
  settlement_confirmation_letter: [
    { required: true, message: "请上传图片", trigger: "blur" },
  ],
};
const formItem = ref({
  tax_land_type: "",
  tax_land_head: "",
  head_mobile: "",
  tax_land_name: "",
  tax_cost_point: "",
  calculation_type: "",
  min_employment_year: "",
  max_employment_year: "",
  tax_land_city_id: "",
  web_url: "",
  tax_land_license: [],
  company_qualifications: [],
  invoice_type: "",
  category_id: "",
  invoice_denomination: "",
  max_money: "",
  tax_point: "",
  is_payment_api: "",
  payment_type: "",
  depositBank: "",
  bank_account: "",
  invoice_sample: [],
  industryRestrictions: [],
  certificationRules: "",
  signingRules: "",
  individualMonthlyLimit: "",
  entrustedCollectionPeriod: "",
  incoming_materials: "",
  agreement_url: [],
  settlement_confirmation_letter: [],
});
const handleSelfOperatedTaxLandEdit = () => {
  FormRef.value.validate((valid: boolean) => {
    if (valid) {
      FormRef2.value.validate((valid: boolean) => {
        if (valid) {
          FormRef3.value.validate((valid: boolean) => {
            if (valid) {
              const ID = Number(route.query.id);
              const params = { ...formItem.value } as any;
              params.tax_land_license = JSON.stringify(params.tax_land_license);
              params.company_qualifications = JSON.stringify(
                params.company_qualifications
              );
              params.invoice_sample = JSON.stringify(params.invoice_sample);
              params.industryRestrictions = JSON.stringify(
                params.industryRestrictions
              );
              params.agreement_url = JSON.stringify(params.agreement_url);
              params.settlement_confirmation_letter = JSON.stringify(
                params.settlement_confirmation_letter
              );
              if (isArray(params.tax_land_city_id)) {
                params.tax_land_city_id = params.tax_land_city_id.slice(-1)[0];
              }
              if (isArray(params.category_id)) {
                params.category_id = params.category_id.slice(-1)[0];
              }

              selfOperatedTaxLandEdit(ID, params)
                .then(() => {
                  ElMessage({
                    type: "success",
                    message: `编辑税地成功`,
                  });
                  router.push({
                    name: "taxLandManagementIndex",
                    query: { activeName: "selfOperated" },
                  });
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          });
        }
      });
    }
  });
};
const handleClose = () => {
  router.push({
    name: "taxLandManagementIndex",
    query: { activeName: "selfOperated" },
  });
};
const getData = async () => {
  const ID = Number(route.query.id);
  try {
    const { data } = await selfOperatedTaxLandDetails(ID);
    var {
      tax_land_type,
      tax_land_head,
      head_mobile,
      tax_land_name,
      tax_cost_point,
      calculation_type,
      min_employment_year,
      max_employment_year,
      tax_land_city_id,
      web_url,
      tax_land_license,
      company_qualifications,
      invoice_type,
      category_id,
      invoice_denomination,
      max_money,
      tax_point,
      is_payment_api,
      payment_type,
      depositBank,
      bank_account,
      invoice_sample,
      industryRestrictions,
      certificationRules,
      signingRules,
      individualMonthlyLimit,
      entrustedCollectionPeriod,
      incoming_materials,
      agreement_url,
      settlement_confirmation_letter,
    } = data.info;

    formItem.value = {
      tax_land_type: tax_land_type + "",
      tax_land_head,
      head_mobile,
      tax_land_name,
      tax_cost_point,
      calculation_type: calculation_type + "",
      min_employment_year,
      max_employment_year,
      tax_land_city_id,
      web_url,
      tax_land_license,
      company_qualifications,
      invoice_type: invoice_type + "",
      category_id,
      invoice_denomination: invoice_denomination + "",
      max_money,
      tax_point,
      is_payment_api: is_payment_api + "",
      payment_type: payment_type + "",
      depositBank,
      bank_account,
      invoice_sample,
      industryRestrictions,
      certificationRules,
      signingRules,
      individualMonthlyLimit,
      entrustedCollectionPeriod,
      incoming_materials,
      agreement_url,
      settlement_confirmation_letter,
    };
  } catch (error) {
    console.log(error);
  }
};
getData();
onMounted(() => {});
</script>
<style lang="scss" scoped>
.steps {
  margin-top: 25px;
  margin-bottom: 50px;
  margin-left: 43px;
}

.zxn-box {
  :deep(.el-input) {
    width: 100%;

    .el-input__wrapper {
      width: 100%;
    }
  }
}

.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}
</style>
