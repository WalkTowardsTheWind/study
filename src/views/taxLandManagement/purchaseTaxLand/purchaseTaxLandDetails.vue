<template>
  <zxn-plan>
    <zxn-tabs
      :activeName="activeName"
      :tabsList="tabsList"
      :hasBack="true"
      :hasUpdate="false"
    >
      <template #1>
        <div class="p-[36px] p-b-[0] p-t-[6px]">
          <div class="title">
            <div class="line"></div>
            <div>税地基本信息</div>
          </div>
          <el-form
            class="zxn-view-form is-view"
            :model="formItem"
            label-width="120px"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="税地类型" prop="tax_land_type">
                  <el-select
                    class="w-[100%] bg"
                    filterable
                    clearable
                    disabled
                    v-model="formItem.tax_land_type"
                    placeholder=" "
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
                <el-form-item label="税地负责人">
                  <el-input
                    readonly
                    v-model="formItem.tax_land_head"
                    placeholder=" "
                  />
                </el-form-item>
                <el-form-item label="联系方式">
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
                    readonly
                    class="w-[100%]"
                    v-model="formItem.tax_land_name"
                    placeholder=" "
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="社会信用代码"
                  prop="tax_organ_code"
                >
                  <el-input
                    v-model="formItem.tax_organ_code"
                    placeholder="请输入"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="厂商" prop="tax_manufacturer">
                  <el-input
                    class="w-[100%]"
                    readonly
                    v-model="formItem.tax_manufacturer"
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
                        placeholder=" "
                      />
                    </el-form-item>
                  </el-col>
                  <el-col class="text-center" :span="2">
                    <span class="text-gray-500">-</span>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item>
                      <el-input
                        readonly
                        type="number"
                        v-model="formItem.max_employment_year"
                        placeholder=" "
                      />
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item class="mt-25px" label="税地地区">
                  <el-cascader
                    class="w-[100%]"
                    disabled
                    v-model="formItem.tax_land_city_id"
                    :options="optionsTaxLang"
                    :props="propsTaxLang"
                    clearable
                    filterable
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
                    filterable
                    clearable
                    disabled
                    v-model="formItem.invoice_type"
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
                    class="w-[100%]"
                    disabled
                    v-model="formItem.category_id"
                    :options="optionsInvoicingCategory"
                    :props="propsInvoicingCategory"
                    collapse-tags
                    collapse-tags-tooltip
                    clearable
                    filterable
                  />
                </el-form-item>
                <!--                <el-form-item class="mt-25px" label="发票面额">-->
                <!--                  <el-select-->
                <!--                    class="w-[100%]"-->
                <!--                    filterable-->
                <!--                    clearable-->
                <!--                    disabled-->
                <!--                    v-model="formItem.invoice_denomination"-->
                <!--                    placeholder=" "-->
                <!--                  >-->
                <!--                    <el-option-->
                <!--                      v-for="item in proxy.$const[-->
                <!--                        'taxLandManagementEnum.invoice_denomination'-->
                <!--                      ]"-->
                <!--                      :key="item.value"-->
                <!--                      :label="item.label"-->
                <!--                      :value="item.value"-->
                <!--                    />-->
                <!--                  </el-select>-->
                <!--                </el-form-item>-->
                <el-form-item class="mt-25px" label="发票金额上限">
                  <zxn-money-input
                    v-model="formItem.max_money"
                    placeholder=" "
                    readonly
                  />
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="支付方式"
                  prop="payment_type"
                >
                  <el-select
                    class="w-[100%]"
                    filterable
                    clearable
                    disabled
                    v-model="formItem.payment_type"
                    placeholder=" "
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
                <el-form-item class="mt-25px" label="开户行">
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
                <el-form-item class="mt-25px" label="开票方式">
                  <el-select
                    class="w-[100%]"
                    filterable
                    clearable
                    disabled
                    v-model="formItem.invoice_form"
                    placeholder=" "
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
                <el-form-item label="核账网址">
                  <el-input readonly v-model="formItem.audit_web_url" />
                </el-form-item>
                <el-form-item class="mt-25px" label="核账网址账号">
                  <el-input readonly v-model="formItem.audit_account" />
                </el-form-item>
                <el-form-item class="mt-25px" label="核账网址密码">
                  <el-input readonly v-model="formItem.audit_password" />
                </el-form-item>
                <el-form-item class="mt-25px" label="余额计算规则">
                  <el-select
                    class="w-[100%]"
                    filterable
                    clearable
                    disabled
                    placeholder=" "
                    v-model="formItem.balance_type"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.balanceType'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="服务费计算规则">
                  <el-select
                    class="w-[100%]"
                    filterable
                    clearable
                    disabled
                    placeholder=" "
                    v-model="formItem.commission_rule"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.commissionRule'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="支付供应商">
                  <el-input readonly v-model="formItem.payment_supplier">
                  </el-input>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="单人每月限额"
                  prop="individual_monthly_limit"
                >
                  <zxn-money-input
                    v-model="formItem.individual_monthly_limit"
                    readonly
                  />
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
                <el-form-item class="mt-13px" label="行业限制">
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
                    filterable
                    clearable
                    disabled
                    v-model="formItem.certification_rules"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder=" "
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
                    filterable
                    clearable
                    disabled
                    v-model="formItem.signing_rules"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder=" "
                  >
                    <el-option
                      v-for="item in optionsSigningRules"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="委托代征年限" prop="tax_contract_term">
                  <el-select
                    class="w-[100%]"
                    filterable
                    clearable
                    disabled
                    v-model="formItem.tax_contract_term"
                    placeholder=" "
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
                <el-form-item class="mt-13px" label="资料包">
                  <zxn-image
                    v-if="formItem.materials_zip_url"
                    :imgList="[zipImg]"
                    :width="88"
                    :height="88"
                    targetClick
                    ellipsis
                  />
                  <span v-else>未上传</span>
                </el-form-item>
              </el-col>
            </el-row>
            <zxn-table
              class="mt-[40px] mb-[40px]"
              :table-data="tableData"
              :column-list="columnList"
              :hasIndex="false"
              :hasPagination="false"
            >
              <template #operation="{ row }">
                <el-button link type="primary" @click="handleView(row)"
                  >查看</el-button
                >
                <el-button link type="primary" @click="handleDownload(row)"
                  >下载</el-button
                >
              </template>
            </zxn-table>
          </el-form>
        </div>
      </template>
    </zxn-tabs>
    <img-dialog ref="imgDialogRef" />
  </zxn-plan>
</template>
<script setup lang="ts">
import imgDialog from "../components/imgDialog.vue";
import { downloadByOnlineUrl } from "@/utils/download";
import {
  StringTransformNumber,
  categoryTransformNumber,
  categoryTransformArray,
} from "@/utils";
import { useRoute } from "vue-router";
import { selfOperatedTaxLandDetails } from "@/api/taxLandManagement/selfOperatedTaxLand";
import { getAreaList } from "@/api/taxLandManagement";
import { getTreeList } from "@/api/common";
import { getCategoryTreeList } from "@/api/category";
import zipImg from "@/assets/zip.png";
const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "税地详情",
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

//行业
var optionsTrade = ref([]);
const getTradeList = async () => {
  try {
    const { data } = await getCategoryTreeList({ type: "0" });
    console.log(data, "wwwwww");
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
//表格
const tableData = reactive([] as any);
const columnList = [
  { label: "合同编号", prop: "contract_no", width: 100 },
  { label: "合同类型", prop: "type", width: 120 },
  {
    label: "状态",
    type: "enum",
    path: "taxLandManagementEnum.contractStatus",
    prop: "status",
    // fixed: "left",
    color: {
      0: { color: "#35C5F3", backgroundColor: "#DFF6FD" },
      1: { color: "#1DE585", backgroundColor: "#DBFBEB" },
      2: { color: "#356FF3", backgroundColor: "#DFE8FD" },
      3: { color: "#333333", backgroundColor: "#DEDEDE" },
      4: { color: "#ffffff", backgroundColor: "#999999" },
    },
    width: 100,
  },
  { label: "签署形式", prop: "is_online", width: 100 },
  { label: "甲方", prop: "part_a_name" },
  { label: "乙方", prop: "part_b_name" },
  {
    label: "签约时间",
    prop: "b_sign_time",
    //  sortable: "custom",
    width: 150,
  },
  {
    label: "到期时间",
    prop: "effective_end_time",
    //  sortable: "custom",
    width: 150,
  },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 140,
    align: "right ",
    headerAlign: "right",
  },
];
const imgDialogRef = ref();
const handleView = (row: any) => {
  imgDialogRef.value.init(row);
};
const handleDownload = (row: any) => {
  downloadByOnlineUrl(`/adminapi/contract/download/${row.id}`);
};
//表单信息
const formItem = ref({
  tax_land_type: "1",
  tax_land_head: "",
  head_mobile: "",
  tax_land_name: "",
  tax_organ_code: "",
  tax_manufacturer: "",
  tax_cost_point: "",
  min_employment_year: "18",
  max_employment_year: "60",
  tax_land_city_id: "",
  tax_land_license: [],
  company_qualifications: [],
  // 2
  invoice_type: "",
  category_id: [],
  invoice_denomination: "",
  max_money: "",
  // is_payment_api: "",
  payment_type: "",
  bank: "",
  bank_account: "",
  invoice_form: "",
  audit_web_url: "",
  audit_account: "",
  audit_password: "",
  // 余额计算规则
  balance_type: "",
  commission_rule: "",
  payment_supplier: "",
  individual_monthly_limit: "98000",
  invoice_sample: [],
  // 行业限制
  industry_limit: [],
  // 3
  certification_rules: [],
  signing_rules: [],
  tax_contract_term: "",
  incoming_materials: "",
  settlement_confirmation_letter: [],
  materials_zip_url: "",
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
      tax_manufacturer,
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
      audit_web_url,
      audit_account,
      audit_password,
      balance_type,
      commission_rule,
      payment_supplier,
      individual_monthly_limit,
      invoice_sample,
      industry_limit,
      certification_rules,
      signing_rules,
      tax_contract_term,
      incoming_materials,
      settlement_confirmation_letter,
      materials_zip_url,
      contract_list,
    } = data.info;
    formItem.value = {
      tax_land_type: tax_land_type + "",
      tax_land_head,
      head_mobile,
      tax_land_name,
      tax_organ_code,
      tax_manufacturer,
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
      audit_web_url,
      audit_account,
      audit_password,
      // 余额计算规则
      balance_type: balance_type + "",
      commission_rule: commission_rule + "",
      payment_supplier,
      individual_monthly_limit,
      invoice_sample,
      industry_limit,
      certification_rules: StringTransformNumber(certification_rules),
      signing_rules: StringTransformNumber(signing_rules),
      tax_contract_term: tax_contract_term + "",
      incoming_materials,
      settlement_confirmation_letter,
      materials_zip_url,
    };
    tableData.length = 0;
    var newData = contract_list.map((item: any) => {
      return {
        id: item.id,
        contract_no: item.contract_no,
        type: proxy.$enumSet["taxLandManagementEnum.contractType"][item.type],
        status: item.status,
        is_online:
          proxy.$enumSet["taxLandManagementEnum.onlineType"][item.is_online],
        part_a_name: item.part_a_name,
        part_b_name: item.part_b_name,
        b_sign_time: item.b_sign_time,
        effective_end_time: item.effective_end_time,
        contract_url: item.contract_url,
        fileName: item.fileName,
      };
    });
    tableData.push(...newData);
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {});
</script>
<style lang="scss" scoped>
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
  margin: 30px 0;
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
</style>
