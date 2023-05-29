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
          <div class="steps">
            <viewSteps
              :step-list="stepList"
              v-model:active-step="active"
            ></viewSteps>
          </div>
          <el-form class="zxn-box" :model="formItem" label-width="120px">
            <div class="flex" v-show="active == 0">
              <div class="w-[33%]">
                <el-form-item label="税地负责人">
                  <el-input v-model="formItem.tax_land_head" />
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="formItem.head_mobile" />
                </el-form-item>
                <el-form-item class="mt-25px" label="税地来源">
                  <el-input
                    class="w-[100%]"
                    v-model="formItem.tax_land_name"
                    placeholder="Select"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-25px" label="厂商">
                  <el-input
                    v-model="formItem.tax_manufacturer"
                    placeholder="Select"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-25px" label="银行账户">
                  <el-input v-model="formItem.bank_account" />
                </el-form-item>
                <el-form-item class="mt-25px" label="成本点位">
                  <el-input v-model="formItem.tax_cost_point" />
                </el-form-item>
                <el-form-item class="mt-25px" label="计算方式">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.calculation_type"
                    placeholder="Select"
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
                <el-form-item class="mt-25px" label="用工年限">
                  <el-input
                    style="width: 45%"
                    v-model="formItem.min_employment_year"
                    placeholder="起始年龄"
                  />
                  <div class="w-[10%] text-center">-</div>
                  <el-input
                    style="width: 45%"
                    v-model="formItem.max_employment_year"
                    placeholder="截至年龄"
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="税地地区">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.tax_land_city_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in tax_land_city_idOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="网址">
                  <el-input v-model="formItem.web_url" />
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="营业执照">
                  <multi-upload
                    v-model="formItem.tax_land_license"
                  ></multi-upload>
                </el-form-item>
                <el-form-item class="mt-13px" label="公司资质">
                  <multi-upload
                    v-model="formItem.company_qualifications"
                  ></multi-upload>
                </el-form-item>
              </div>
            </div>

            <div class="flex" v-show="active == 1">
              <div class="w-[33%]">
                <el-form-item label="核账网址">
                  <el-input v-model="formItem.audit_web_url" />
                </el-form-item>
                <el-form-item label="核账网址账号">
                  <el-input v-model="formItem.audit_account" />
                </el-form-item>
                <el-form-item label="核账网址密码">
                  <el-input v-model="formItem.audit_password" />
                </el-form-item>
                <el-form-item class="mt-25px" label="行业类型">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.industry_category_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in industry_category_idOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="发票类型">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.invoice_type"
                    placeholder="Select"
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
                <el-form-item class="mt-25px" label="发票面额">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.invoice_denomination"
                    placeholder="Select"
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
                <el-form-item class="mt-25px" label="发票金额上限">
                  <el-input v-model="formItem.max_money" placeholder="Select">
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-25px" label="税点">
                  <el-input v-model="formItem.tax_point" placeholder="Select">
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-25px" label="支付方式">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.payment_type"
                    placeholder="Select"
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
                <el-form-item class="mt-25px" label="是否有支付接口">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.is_payment_api"
                    placeholder="Select"
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
                <el-form-item class="mt-25px" label="支付供应商">
                  <el-input
                    v-model="formItem.payment_supplier"
                    placeholder="Select"
                  >
                  </el-input>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="发票票样">
                  <multi-upload
                    v-model="formItem.invoice_sample"
                  ></multi-upload>
                </el-form-item>
              </div>
            </div>
            <div class="flex" v-show="active == 2">
              <div class="w-[33%]">
                <el-form-item class="mt-25px" label="认证形态">
                  <el-input
                    v-model="formItem.certification_form"
                    placeholder="Select"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-25px" label="签约形态">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.sign_form"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.sign_form'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="行业限制">
                  <el-input
                    v-model="formItem.industry_limit"
                    placeholder="Select"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-25px" label="合同年限">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.tax_contract_term"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'contractCenterEnum.contractTerm'
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
                    placeholder="Select"
                  >
                  </el-input>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="协议">
                  <multi-upload v-model="formItem.agreement_url"></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <zxn-bottom-btn>
          <div class="but">
            <el-button type="primary" @click="handleSubmit">{{
              active == stepList.length - 1 ? "完  成" : "下一步"
            }}</el-button>
            <el-button @click="handleClose">{{
              active == 0 ? "取  消" : "上一步"
            }}</el-button>
          </div>
        </zxn-bottom-btn>
      </template>
      <template #2> </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import viewSteps from "../components/viewSteps.vue";
import { selfOperatedTaxLandAdd } from "@/api/taxLandManagement/selfOperatedTaxLand";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "新建税地",
  },
  // {
  //   name: "2",
  //   label: "新建采购税地",
  // },
];
// 步骤条
const active = ref<number>(0);
const stepList = [
  { desc: "基本信息" },
  { desc: "发票厂家信息" },
  { desc: "行业与合同信息" },
];
//

const tax_land_city_idOptions = ref([
  { label: "薪龙网", value: 1 },
  { label: "某某网", value: 2 },
  { label: "某某网", value: 3 },
  { label: "某某网", value: 4 },
] as any);
const industry_category_idOptions = ref([
  { label: "薪龙网", value: 1 },
  { label: "某某网", value: 2 },
  { label: "某某网", value: 3 },
  { label: "某某网", value: 4 },
] as any);

//表单信息
const formItem = reactive({
  tax_land_head: "",
  head_mobile: "",
  tax_land_name: "",
  tax_land_type: 0,
  tax_manufacturer: "",
  bank_account: "",
  tax_cost_point: "",
  calculation_type: "",
  min_employment_year: "",
  max_employment_year: "",
  tax_land_city_id: "",
  web_url: "",
  tax_land_license: [],
  company_qualifications: [],
  audit_web_url: "",
  audit_account: "",
  audit_password: "",
  industry_category_id: "",
  invoice_type: "",
  invoice_denomination: "",
  max_money: "",
  tax_point: "",
  payment_type: "",
  is_payment_api: "",
  payment_supplier: "",
  invoice_sample: [],
  certification_form: "",
  sign_form: "",
  industry_limit: "",
  tax_contract_term: "",
  incoming_materials: "",
  agreement_url: [],
});
const handleSubmit = () => {
  active.value++;
  if (active.value == 3) {
    const params = { ...formItem } as any;
    params.tax_land_license = JSON.stringify(params.tax_land_license);
    params.company_qualifications = JSON.stringify(
      params.company_qualifications
    );
    params.invoice_sample = JSON.stringify(params.invoice_sample);
    params.agreement_url = JSON.stringify(params.agreement_url);
    selfOperatedTaxLandAdd(params)
      .then(() => {
        ElMessage({
          type: "success",
          message: `新建税地成功`,
        });
        router.push({
          name: "taxLandManagementIndex",
          query: { activeName: "selfOperated" },
        });
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(active.value, "完成");
  }
};
const handleClose = () => {
  active.value--;
  if (active.value == -1) {
    router.push({
      name: "taxLandManagementIndex",
      query: { activeName: "selfOperated" },
    });
    console.log(active.value, "取消");
  }
};

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
