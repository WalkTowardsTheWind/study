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
                  <span>{{
                    proxy.$enumSet["taxLandManagementEnum.tax_land_type"][
                      formItem.tax_land_type
                    ]
                  }}</span>
                </el-form-item>
                <el-form-item label="税地负责人">
                  <span>{{ formItem.tax_land_head }}</span>
                </el-form-item>
                <el-form-item label="联系方式">
                  <span>{{ formItem.head_mobile }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="税地来源">
                  <span>{{ formItem.tax_land_name }}</span>
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
                <el-form-item class="mt-25px" label="税地发票类型">
                  <span>{{
                    proxy.$enumSet["taxLandManagementEnum.InvoiceType"][
                      formItem.invoice_type
                    ]
                  }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="开票类目">
                  <span>{{ formItem.category_id }}</span>
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
                <el-form-item class="mt-25px" label="支付方式">
                  <span>{{
                    proxy.$enumSet["taxLandManagementEnum.paymentType"][
                      formItem.payment_type
                    ]
                  }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="开户行">
                  <span>{{ formItem.depositBank }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="银行账户">
                  <span>{{ formItem.bank_account }}</span>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="发票票样">
                  <picture-preview
                    :imageList="formItem.invoice_sample"
                  ></picture-preview>
                </el-form-item>
                <el-form-item class="mb-[0]" label="行业限制">
                  <picture-preview
                    :imageList="formItem.industryRestrictions"
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
                <el-form-item class="mt-25px" label="认证规则">
                  <span>{{
                    proxy.$enumSet["taxLandManagementEnum.CertificationRules"][
                      formItem.certificationRules
                    ]
                  }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="签约规则">
                  <span>{{
                    proxy.$enumSet["taxLandManagementEnum.SigningRules"][
                      formItem.signingRules
                    ]
                  }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="单人每月限额">
                  <span>{{ formItem.individualMonthlyLimit }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="委托代征年限">
                  <span>{{
                    proxy.$enumSet[
                      "taxLandManagementEnum.EntrustedCollectionPeriod"
                    ][formItem.entrustedCollectionPeriod]
                  }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="进件资料">
                  <span>{{ formItem.incoming_materials }}</span>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="合同">
                  <picture-preview
                    :imageList="formItem.agreement_url"
                  ></picture-preview>
                </el-form-item>
                <el-form-item class="mb-[0]" label="结算确认单">
                  <picture-preview
                    :imageList="formItem.settlement_confirmation_letter"
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
// import { getCategoryTreeList } from "@/api/category";
import { getTreeList } from "@/api/common";
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
    console.log(newAreaData);

    //获取类目
    const CategoryData = await getTreeList({ type: 2 });
    const newCategoryData = JSON.parse(
      JSON.stringify(CategoryData.data)
        .replace(/"id"/g, '"value"')
        .replace(/"name"/g, '"label"')
        .replace(/"children"/g, '"children"')
    );
    console.log(newCategoryData, "sdsddsdasrffghqugfyugfgvyqgtfuqwfg");

    // //获取行业
    // const TradeData = await getCategoryTreeList({ type: "0" });

    // const newTradeData = JSON.parse(
    //   JSON.stringify(TradeData.data)
    //     .replace(/"id"/g, '"value"')
    //     .replace(/"name"/g, '"label"')
    //     .replace(/"children"/g, '"children"')
    // );

    const func = (data: any, name: any, s: any) => {
      const newData = data.map((item: any) => {
        if (item.value == s) {
          return name + "/" + item.label;
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

    const newcategory_id = func(newCategoryData, "", category_id) as any;
    console.log(newcategory_id, "qweqweqwe");

    formItem.value = {
      tax_land_type: tax_land_type + "",
      tax_land_head,
      head_mobile,
      tax_land_name,
      tax_cost_point,
      calculation_type: calculation_type + "",
      min_employment_year,
      max_employment_year,
      tax_land_city_id: newtax_land_city_id[0],
      web_url,
      tax_land_license,
      company_qualifications,
      invoice_type: invoice_type + "",
      category_id: newcategory_id[0],
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
