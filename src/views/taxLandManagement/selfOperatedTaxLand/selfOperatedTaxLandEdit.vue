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
          <el-form class="zxn-box" :model="formItem" label-width="120px">
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item label="税地负责人">
                  <el-input v-model="formItem.tax_land_head" />
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="formItem.head_mobile" />
                </el-form-item>
                <el-form-item class="mt-25px" label="税地来源">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.tax_land_source"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in tax_land_sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="厂商">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.tax_manufacturer"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in tax_manufacturerOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
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
                      v-for="item in calculation_typeOptions"
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
                  <!-- <multi-upload v-model="formItem.tax_land_license"></multi-upload> -->
                </el-form-item>
                <el-form-item class="mt-13px" label="公司资质">
                  <!-- <multi-upload v-model="formItem.company_qualifications"></multi-upload> -->
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <zxn-bottom-btn
          ><div class="but">
            <el-button type="primary" @click="handleSubmit">保存</el-button>
            <el-button @click="handleClose">取消</el-button>
          </div></zxn-bottom-btn
        >
      </template>
      <template #2>
        <div class="p-[24px] p-b-[0]">
          <el-form class="zxn-box" :model="formItem" label-width="120px">
            <div class="flex">
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
                <el-form-item class="mt-25px" label="发票面额">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.invoice_denomination"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in invoice_denominationOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="发票金额上限">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.max_money"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in max_moneyOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="税点">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.tax_point"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in tax_pointOptions"
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
                      v-for="item in is_payment_apiOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="支付供应商">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.payment_supplier"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in payment_supplierOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="发票票样">
                  <!-- <multi-upload v-model="formItem.invoice_sample"></multi-upload> -->
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <zxn-bottom-btn
          ><div class="but">
            <el-button type="primary" @click="handleSubmit">保存</el-button>
            <el-button @click="handleClose">取消</el-button>
          </div></zxn-bottom-btn
        >
      </template>
      <template #3>
        <div class="p-[24px] p-b-[0]">
          <el-form class="zxn-box" :model="formItem" label-width="120px">
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item class="mt-25px" label="认证形态">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.certification_form"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in certification_formOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="签约形态">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.sign_form"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in sign_formOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="行业限制">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.industry_limit"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in industry_limitOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="合同年限">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.tax_contract_term"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in tax_contract_termOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="进件资料">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.incoming_materials"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in incoming_materialsOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="协议">
                  <!-- <multi-upload v-model="formItem.agreement_url"></multi-upload> -->
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <zxn-bottom-btn
          ><div class="but">
            <el-button type="primary" @click="handleSubmit">保存</el-button>
            <el-button @click="handleClose">取消</el-button>
          </div></zxn-bottom-btn
        >
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import {
  selfOperatedTaxLandEdit,
  selfOperatedTaxLandDetails,
} from "@/api/taxLandManagement/selfOperatedTaxLand";
import { selfOperatedTaxLandEditType } from "@/api/taxLandManagement/selfOperatedTaxLand/types";
import { useRoute } from "vue-router";
const route = useRoute();
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

//

const tax_land_sourceOptions = ref([] as any);
const tax_manufacturerOptions = ref([] as any);
const calculation_typeOptions = ref([] as any);
const tax_land_city_idOptions = ref([] as any);
const industry_category_idOptions = ref([] as any);
const invoice_denominationOptions = ref([] as any);
const max_moneyOptions = ref([] as any);
const tax_pointOptions = ref([] as any);
const is_payment_apiOptions = ref([] as any);
const payment_supplierOptions = ref([] as any);
const certification_formOptions = ref([] as any);
const sign_formOptions = ref([] as any);
const industry_limitOptions = ref([] as any);
const tax_contract_termOptions = ref([] as any);
const incoming_materialsOptions = ref([] as any);

//表单信息
const formItem = ref({
  tax_land_head: "",
  head_mobile: "",
  tax_land_source: "",
  tax_manufacturer: "",
  tax_cost_point: "",
  calculation_type: "",
  min_employment_year: "",
  max_employment_year: "",
  tax_land_city_id: "",
  web_url: "",
  tax_land_license: "",
  company_qualifications: "",
  audit_web_url: "",
  audit_account: "",
  audit_password: "",
  industry_category_id: "",
  invoice_denomination: "",
  max_money: "",
  tax_point: "",
  is_payment_api: "",
  payment_supplier: "",
  invoice_sample: "",
  certification_form: "",
  sign_form: "",
  industry_limit: "",
  tax_contract_term: "",
  incoming_materials: "",
  agreement_url: [],
});
const handleSubmit = () => {
  const ID = Number(route.query.id);
  console.log(ID, "======ID");
  selfOperatedTaxLandEdit(2, formItem.value as selfOperatedTaxLandEditType)
    .then((response: any) => {
      console.log(response.data);
      var {
        tax_land_head,
        head_mobile,
        tax_land_source,
        tax_manufacturer,
        tax_cost_point,
        calculation_type,
        min_employment_year,
        max_employment_year,
        tax_land_city_id,
        web_url,
        tax_land_license,
        company_qualifications,
        audit_web_url,
        audit_account,
        audit_password,
        industry_category_id,
        invoice_denomination,
        max_money,
        tax_point,
        is_payment_api,
        payment_supplier,
        invoice_sample,
        certification_form,
        sign_form,
        industry_limit,
        tax_contract_term,
        incoming_materials,
        agreement_url,
      } = response.data.info;
      formItem.value = {
        tax_land_head,
        head_mobile,
        tax_land_source,
        tax_manufacturer,
        tax_cost_point,
        calculation_type,
        min_employment_year,
        max_employment_year,
        tax_land_city_id,
        web_url,
        tax_land_license,
        company_qualifications,
        audit_web_url,
        audit_account,
        audit_password,
        industry_category_id,
        invoice_denomination,
        max_money,
        tax_point,
        is_payment_api,
        payment_supplier,
        invoice_sample,
        certification_form,
        sign_form,
        industry_limit,
        tax_contract_term,
        incoming_materials,
        agreement_url,
      };
    })
    .catch();
};
const handleClose = () => {};
const getData = () => {
  const ID = Number(route.query.id);
  console.log(ID);
  selfOperatedTaxLandDetails(ID)
    .then((response: any) => {
      var {
        tax_land_head,
        head_mobile,
        tax_land_source,
        tax_manufacturer,
        tax_cost_point,
        calculation_type,
        min_employment_year,
        max_employment_year,
        tax_land_city_id,
        web_url,
        tax_land_license,
        company_qualifications,
        audit_web_url,
        audit_account,
        audit_password,
        industry_category_id,
        invoice_denomination,
        max_money,
        tax_point,
        is_payment_api,
        payment_supplier,
        invoice_sample,
        certification_form,
        sign_form,
        industry_limit,
        tax_contract_term,
        incoming_materials,
        agreement_url,
      } = response.data.info;
      formItem.value = {
        tax_land_head,
        head_mobile,
        tax_land_source,
        tax_manufacturer,
        tax_cost_point,
        calculation_type,
        min_employment_year,
        max_employment_year,
        tax_land_city_id,
        web_url,
        tax_land_license,
        company_qualifications,
        audit_web_url,
        audit_account,
        audit_password,
        industry_category_id,
        invoice_denomination,
        max_money,
        tax_point,
        is_payment_api,
        payment_supplier,
        invoice_sample,
        certification_form,
        sign_form,
        industry_limit,
        tax_contract_term,
        incoming_materials,
        agreement_url,
      };
    })
    .catch();
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
