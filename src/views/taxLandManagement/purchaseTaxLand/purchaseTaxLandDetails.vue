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
            disabled
            class="zxn-box"
            :model="formItem"
            label-width="120px"
          >
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item label="税地负责人">
                  <span>{{ formItem.tax_land_head }}</span>
                </el-form-item>
                <el-form-item label="联系方式">
                  <span>{{ formItem.head_mobile }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="税地名称">
                  <span>{{ formItem.tax_land_name }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="厂商">
                  <span>{{ formItem.tax_manufacturer }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="银行账户">
                  <span>{{ formItem.bank_account }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="成本点位">
                  <span>{{ formItem.tax_cost_point }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="计算方式">
                  <span>{{
                    proxy.$enumSet["taxLandManagementEnum.calculationType"][
                      formItem.calculation_type
                    ]
                  }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="用工年限">
                  <span>{{ formItem.min_employment_year }}</span>
                  <div class="w-[10%] text-center">-</div>
                  <span>{{ formItem.max_employment_year }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="税地地区">
                  <span>{{ formItem.tax_land_city_id }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="网址">
                  <span>{{ formItem.web_url }}</span>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="营业执照">
                  <picture-preview
                    :imageList="formItem.tax_land_license"
                  ></picture-preview>
                </el-form-item>
                <el-form-item class="mt-13px" label="公司资质">
                  <picture-preview
                    :imageList="formItem.company_qualifications"
                  ></picture-preview>
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
                  <span>{{ formItem.audit_web_url }}</span>
                </el-form-item>
                <el-form-item label="核账网址账号">
                  <span>{{ formItem.audit_account }}</span>
                </el-form-item>
                <el-form-item label="核账网址密码">
                  <span>{{ formItem.audit_password }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="行业类型">
                  <span>{{ formItem.industry_category_id }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="发票面额">
                  <span>{{
                    proxy.$enumSet[
                      "taxLandManagementEnum.invoice_denomination"
                    ][formItem.invoice_denomination]
                  }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="发票金额上限">
                  <span>{{ formItem.max_money }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="税点">
                  <span>{{ formItem.tax_point }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="是否有支付接口">
                  <span>{{
                    proxy.$enumSet["taxLandManagementEnum.is_payment_api"][
                      formItem.is_payment_api
                    ]
                  }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="支付供应商">
                  <span>{{ formItem.payment_supplier }}</span>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="发票票样">
                  <picture-preview
                    :imageList="formItem.invoice_sample"
                  ></picture-preview>
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
                  <span>{{ formItem.certification_form }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="签约形态">
                  <span>{{
                    proxy.$enumSet["taxLandManagementEnum.sign_form"][
                      formItem.sign_form
                    ]
                  }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="行业限制">
                  <span>{{ formItem.industry_limit }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="合同年限">
                  <span>{{
                    proxy.$enumSet["contractCenterEnum.contractTerm"][
                      formItem.tax_contract_term
                    ]
                  }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="进件资料">
                  <span>{{ formItem.incoming_materials }}</span>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="协议">
                  <picture-preview
                    :imageList="formItem.agreement_url"
                  ></picture-preview>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { selfOperatedTaxLandDetails } from "@/api/taxLandManagement/selfOperatedTaxLand";
import { getAreaList } from "@/api/taxLandManagement";
import { getCategoryTreeList } from "@/api/category";
const { proxy } = getCurrentInstance() as any;
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

const getData = async () => {
  const ID = Number(route.query.id);
  try {
    const { data } = await selfOperatedTaxLandDetails(ID);
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
    } = data.info;
    //获取税地地区
    const AreaData = await getAreaList(0);
    const newAreaData = JSON.parse(
      JSON.stringify(AreaData.data)
        .replace(/"id"/g, '"value"')
        .replace(/"name"/g, '"label"')
        .replace(/"cityList"/g, '"children"')
        .replace(/"taxLandList"/g, '"children"')
        .replace(/"child"/g, '"children"')
    );
    //获取行业
    const TradeData = await getCategoryTreeList({ type: "0" });

    const newTradeData = JSON.parse(
      JSON.stringify(TradeData.data)
        .replace(/"id"/g, '"value"')
        .replace(/"name"/g, '"label"')
        .replace(/"children"/g, '"children"')
    );

    const func = (data: any, name: any, s: any) => {
      const newData = data.map((item: any) => {
        if (item.value == s) {
          return name + item.label;
        } else {
          var names = name + item.label;
          if (item.children) {
            return func(item.children, names, s);
          }
        }
      });
      return [...new Set(newData.flat(Infinity))].filter(Boolean);
    };
    const newtax_land_city_id = func(newAreaData, "", tax_land_city_id) as any;
    const newindustry_category_id = func(
      newTradeData,
      "",
      industry_category_id
    ) as any;
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
      tax_land_city_id: newtax_land_city_id[0],
      web_url,
      tax_land_license,
      company_qualifications,
      audit_web_url,
      audit_account,
      audit_password,
      industry_category_id: newindustry_category_id[0],
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
