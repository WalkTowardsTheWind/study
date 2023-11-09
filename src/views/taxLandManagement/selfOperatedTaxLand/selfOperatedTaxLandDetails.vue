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
          <div class="title">
            <div class="line"></div>
            <div>税地基本信息</div>
          </div>
          <el-form class="zxn-box" :model="formItem" label-width="130px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="税地类型" prop="tax_land_type">
                  <el-select
                    class="w-[100%]"
                    disabled
                    placeholder=" "
                    v-model="formItem.tax_land_type"
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
                <el-form-item class="mt-25px" label="税地负责人">
                  <el-input
                    readonly
                    v-model="formItem.tax_land_head"
                    placeholder=" "
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="联系方式">
                  <el-input
                    readonly
                    v-model="formItem.head_mobile"
                    placeholder=" "
                  />
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="税地来源"
                  prop="tax_land_name"
                >
                  <el-input
                    class="w-[100%]"
                    readonly
                    v-model="formItem.tax_land_name"
                    placeholder=" "
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="社会信用代码" prop="tax_organ_code">
                  <el-input
                    readonly
                    v-model="formItem.tax_organ_code"
                    placeholder=" "
                  >
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-25px" label="成本点位">
                  <el-input
                    readonly
                    v-model="formItem.tax_cost_point"
                    placeholder=" "
                  />
                </el-form-item>

                <el-form-item class="mt-25px" label="税地用工年限">
                  <el-col :span="11">
                    <el-form-item>
                      <el-input
                        readonly
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
                    <el-form-item>
                      <el-input
                        type="number"
                        readonly
                        v-model="formItem.max_employment_year"
                        placeholder="截至年龄"
                      />
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item class="mt-25px" label="税地地区">
                  <el-cascader
                    class="w-[100%]"
                    disabled
                    placeholder=" "
                    v-model="formItem.tax_land_city_id"
                    :options="optionsTaxLang"
                    :props="propsTaxLang"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  class="mb-[0]"
                  label="税地营业执照"
                  prop="tax_land_license"
                >
                  <zxn-image
                    v-if="formItem.tax_land_license.length"
                    :imgList="formItem.tax_land_license"
                    :width="88"
                    :height="88"
                    targetClick
                    ellipsis
                  />
                  <span v-else>--</span>
                </el-form-item>
                <el-form-item class="mt-13px" label="公司资质">
                  <zxn-image
                    v-if="formItem.company_qualifications.length"
                    :imgList="formItem.company_qualifications"
                    :width="88"
                    :height="88"
                    targetClick
                    ellipsis
                  />
                  <span v-else>--</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="title">
              <div class="line"></div>
              <div>发票厂家信息</div>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="税地发票类型">
                  <el-select
                    class="w-[100%]"
                    disabled
                    v-model="formItem.invoice_type"
                    placeholder=" "
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
                <el-form-item class="mt-25px" label="开票类目">
                  <el-cascader
                    popper-class="last-cascader"
                    class="w-[100%] h-[32px]"
                    disabled
                    placeholder=" "
                    v-model="formItem.category_id"
                    :options="optionsInvoicingCategory"
                    :props="propsInvoicingCategory"
                    collapse-tags
                    collapse-tags-tooltip
                    clearable
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="发票面额">
                  <el-select
                    class="w-[100%]"
                    disabled
                    placeholder=" "
                    v-model="formItem.invoice_denomination"
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
                  <zxn-money-input
                    readonly
                    v-model="formItem.max_money"
                    placeholder=" "
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支付方式" prop="payment_type">
                  <el-select
                    class="w-[100%]"
                    disabled
                    placeholder=" "
                    v-model="formItem.payment_type"
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
                <el-form-item class="mt-25px" label="开户行" prop="bank">
                  <el-input readonly v-model="formItem.bank" placeholder=" ">
                  </el-input>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="开户行账户"
                  prop="bank_account"
                >
                  <el-input
                    readonly
                    v-model="formItem.bank_account"
                    placeholder=" "
                  />
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="开票方式"
                  prop="invoice_form"
                >
                  <el-select
                    class="w-[100%]"
                    disabled
                    placeholder=" "
                    v-model="formItem.invoice_form"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.invoiceForm'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="mb-[0]" label="发票票样">
                  <zxn-image
                    v-if="formItem.invoice_sample.length"
                    :imgList="formItem.invoice_sample"
                    :width="88"
                    :height="88"
                    targetClick
                    ellipsis
                  />
                  <span v-else>--</span>
                </el-form-item>
                <el-form-item class="mb-[0]" label="行业限制">
                  <zxn-image
                    v-if="formItem.industry_limit.length"
                    :imgList="formItem.industry_limit"
                    :width="88"
                    :height="88"
                    targetClick
                    ellipsis
                  />
                  <span v-else>--</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="title">
              <div class="line"></div>
              <div>行业与合同信息</div>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="认证规则" prop="certification_rules">
                  <el-select
                    class="w-[100%]"
                    disabled
                    placeholder=" "
                    v-model="formItem.certification_rules"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                  >
                    <el-option
                      v-for="item in optionsCertificationRules"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="签约规则"
                  prop="signing_rules"
                >
                  <el-select
                    class="w-[100%]"
                    disabled
                    placeholder=" "
                    v-model="formItem.signing_rules"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                  >
                    <el-option
                      v-for="item in optionsSigningRules"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="单人每月限额"
                  prop="individual_monthly_limit"
                >
                  <zxn-money-input
                    readonly
                    v-model="formItem.individual_monthly_limit"
                    placeholder=" "
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="委托代征年限" prop="tax_contract_term">
                  <el-select
                    class="w-[100%]"
                    disabled
                    placeholder=" "
                    v-model="formItem.tax_contract_term"
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
                    readonly
                    v-model="formItem.incoming_materials"
                    placeholder=" "
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="mb-[0]" label="结算确认函">
                  <zxn-image
                    v-if="formItem.settlement_confirmation_letter.length"
                    :imgList="formItem.settlement_confirmation_letter"
                    :width="88"
                    :height="88"
                    targetClick
                    ellipsis
                  />
                  <span v-else>--</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="advert">
            <span class="fc">注意</span
            >：账户新建后，请在账户合同信息或合同管理进行相关合同的上传或在线签署。
          </div>
        </div>

        <!-- <zxn-bottom-btn>
          <div class="but">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
          </div>
        </zxn-bottom-btn> -->
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import {
  StringTransformNumber,
  categoryTransformNumber,
  categoryTransformArray,
} from "@/utils";
import { useRouter, useRoute } from "vue-router";
import { selfOperatedTaxLandDetails } from "@/api/taxLandManagement/selfOperatedTaxLand";
import { getAreaList } from "@/api/taxLandManagement";
import { getTreeList } from "@/api/common";
const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const router = useRouter();
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "自营税地详情",
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
  multiple: true,
  expandTrigger: "hover" as const,
};
// 认证规则选择框
var optionsCertificationRules = ref([
  {
    value: 1,
    label: "个税申报二要素（人名，身份证）",
  },
  {
    value: 2,
    label: "运营商三要素（姓名，手机号，身份证号）",
  },
  {
    value: 3,
    label: "银行卡三要素（姓名，身份证，银行卡）",
  },
  {
    value: 4,
    label: "四要素",
  },
]);

// 签约规则选择框
var optionsSigningRules = ref([
  {
    value: 1,
    label: "静默签（下发后默认签约）",
  },
  {
    value: 2,
    label: "有感签刷脸意愿校验签约",
  },
  {
    value: 3,
    label: "有感短信校验签约",
  },
]);

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
    getData();
  } catch (error) {
    console.log(error);
  }
};
getTaxLangList();
const propsTaxLang = {
  // multiple: true,
  expandTrigger: "hover" as const,
};
const formItem = ref({
  tax_land_type: "0",
  tax_land_head: "",
  head_mobile: "",
  tax_land_name: "",
  tax_organ_code: "",
  tax_cost_point: "",
  min_employment_year: "18",
  max_employment_year: "60",
  tax_land_city_id: "",
  tax_land_license: [],
  company_qualifications: [],
  invoice_type: "",
  category_id: [],
  invoice_denomination: "",
  max_money: "",
  payment_type: "",
  bank: "",
  bank_account: "",
  invoice_form: "",
  invoice_sample: [],
  industry_limit: [],
  certification_rules: [],
  signing_rules: [],
  individual_monthly_limit: "98000",
  tax_contract_term: "",
  incoming_materials: "",
  // agreement_url: [],
  // contract_img: [],
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
      tax_organ_code,
      tax_cost_point,
      min_employment_year,
      max_employment_year,
      tax_land_city_id,
      tax_land_license,
      company_qualifications,
      invoice_type,
      category_id,
      invoice_denomination,
      max_money,
      payment_type,
      bank,
      bank_account,
      invoice_form,
      invoice_sample,
      industry_limit,
      certification_rules,
      signing_rules,
      individual_monthly_limit,
      tax_contract_term,
      incoming_materials,
      agreement_url,
      contract_img,
      settlement_confirmation_letter,
    } = data.info;
    formItem.value = {
      tax_land_type: tax_land_type + "",
      tax_land_head,
      head_mobile,
      tax_land_name,
      tax_organ_code,
      tax_cost_point,
      min_employment_year,
      max_employment_year,
      tax_land_city_id: categoryTransformNumber(
        optionsTaxLang.value,
        tax_land_city_id
      ),
      tax_land_license,
      company_qualifications,
      invoice_type: invoice_type + "",
      category_id: categoryTransformArray(
        optionsInvoicingCategory.value,
        category_id
      ),
      invoice_denomination: invoice_denomination + "",
      max_money,
      payment_type: payment_type + "",
      bank,
      bank_account,
      invoice_form: invoice_form + "",
      invoice_sample,
      industry_limit,
      certification_rules: StringTransformNumber(certification_rules),
      signing_rules: StringTransformNumber(signing_rules),
      individual_monthly_limit,
      tax_contract_term: tax_contract_term + "",
      incoming_materials,
      settlement_confirmation_letter,
    };
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  getTaxLangList();
});
</script>
<style lang="scss" scoped>
.zxn-box {
  :deep(.el-input) {
    width: 100%;

    .el-input__wrapper {
      width: 100%;
    }
  }

  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
  }

  :deep(.el-input.is-disabled .el-input__inner) {
    color: #333;
    // cursor: pointer;
    -webkit-text-fill-color: #333;
  }
}

.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}

// 蓝色标题样式
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  margin-left: 29px;
  font-family: sans-serif;
  font-size: 14px;
  color: #356ff3;
}

.line {
  display: flex;
  width: 4px;
  height: 14px;
  margin-right: 10px;
  background: #356ff3;
  border-radius: 4px;
}

.advert {
  margin-top: 40px;
  margin-bottom: 60px;
  height: 14px;
  font-size: 14px;
  font-family: SourceHanSansSC-Medium, SourceHanSansSC;
  font-weight: 500;
  color: #333333;
  line-height: 14px;
  .fc {
    color: #f35135;
  }
}
</style>
