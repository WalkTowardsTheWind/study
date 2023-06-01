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
                <el-form-item class="mt-25px" label="税地名称">
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
                  <el-cascader
                    class="w-[100%]"
                    v-model="formItem.tax_land_city_id"
                    :options="optionsTaxLang"
                    :props="propsTaxLang"
                    clearable
                  />
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
          </el-form>
        </div>
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
                  <el-cascader
                    class="w-[100%]"
                    v-model="formItem.industry_category_id"
                    :options="optionsTrade"
                    :props="propsTrade"
                    clearable
                  />
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
          </el-form>
        </div>
      </template>
      <template #3>
        <div class="p-[24px] p-b-[0]">
          <el-form class="zxn-box" :model="formItem" label-width="120px">
            <div class="flex">
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
import { getCategoryTreeList } from "@/api/category";
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

//行业
var optionsTrade = ref([]);
const getTradeList = async () => {
  try {
    const { data } = await getCategoryTreeList({ type: "0" });
    const newData = JSON.parse(
      JSON.stringify(data)
        .replace(/"id"/g, '"value"')
        .replace(/"name"/g, '"label"')
        .replace(/"children"/g, '"children"')
    );
    optionsTrade.value = newData;
  } catch (error) {
    console.log(error);
  }
};
getTradeList();
const propsTrade = {
  // multiple: true,
  expandTrigger: "hover" as const,
};
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
const formItem = ref({
  tax_land_head: "",
  head_mobile: "",
  tax_land_name: "",
  tax_land_type: 1,
  tax_manufacturer: "",
  bank_account: "",
  tax_cost_point: "",
  calculation_type: "",
  min_employment_year: "",
  max_employment_year: "",
  //税地地区
  tax_land_city_id: [],
  web_url: "",
  tax_land_license: [],
  company_qualifications: [],
  audit_web_url: "",
  audit_account: "",
  audit_password: "",
  // 行业
  industry_category_id: [],
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
const handleSelfOperatedTaxLandEdit = () => {
  const ID = Number(route.query.id);
  const params = { ...formItem.value } as any;
  params.tax_land_license = JSON.stringify(params.tax_land_license);
  params.company_qualifications = JSON.stringify(params.company_qualifications);
  params.invoice_sample = JSON.stringify(params.invoice_sample);
  params.agreement_url = JSON.stringify(params.agreement_url);
  if (isArray(params.tax_land_city_id)) {
    params.tax_land_city_id = params.tax_land_city_id.slice(-1)[0];
  }
  if (isArray(params.industry_category_id)) {
    params.industry_category_id = params.industry_category_id.slice(-1)[0];
  }
  selfOperatedTaxLandEdit(ID, params)
    .then(() => {
      ElMessage({
        type: "success",
        message: `编辑税地成功`,
      });
      router.push({
        name: "taxLandManagementIndex",
        query: { activeName: "purchase" },
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
const handleClose = () => {
  router.push({
    name: "taxLandManagementIndex",
    query: { activeName: "purchase" },
  });
};
const getData = () => {
  const ID = Number(route.query.id);
  selfOperatedTaxLandDetails(ID)
    .then((response: any) => {
      var {
        tax_land_head,
        head_mobile,
        tax_land_name,
        tax_land_type,
        tax_manufacturer,
        bank_account,
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
        invoice_type,
        invoice_denomination,
        max_money,
        tax_point,
        payment_type,
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
        tax_land_name,
        tax_land_type,
        tax_manufacturer,
        bank_account,
        tax_cost_point,
        calculation_type: calculation_type + "",
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
        invoice_type: invoice_type + "",
        invoice_denomination: invoice_denomination + "",
        max_money,
        tax_point,
        payment_type: payment_type + "",
        is_payment_api: is_payment_api + "",
        payment_supplier,
        invoice_sample,
        certification_form,
        sign_form: sign_form + "",
        industry_limit,
        tax_contract_term: tax_contract_term + "",
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
