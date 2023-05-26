<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList" has-back>
      <template #info>
        <div class="pl-36px pr-36px">
          <el-form
            class="zxn-view-form"
            label-position="right"
            label-width="110"
          >
            <el-row class="mt-47px">
              <el-col :span="24">
                <el-form-item label="发票类型">
                  {{
                    proxy.$enumSet["statusEnum.invoiceType"][
                      formItem.invoice_type
                    ]
                  }}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="申请类型">
                  {{
                    proxy.$enumSet["statusEnum.invoiceRequire"][
                      formItem.invoice_require
                    ]
                  }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="票面种类">
                  {{
                    proxy.$enumSet["statusEnum.applyInvoiceType"][
                      formItem.apply_invoice_type
                    ]
                  }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="纳税人识别号">{{
                  formItem.taxpayer_number
                }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="发票抬头">{{
                  formItem.company_name
                }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="开户行">{{ formItem.bank }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="银行卡号">{{
                  formItem.bank_account
                }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="税地">{{
                  formItem.tax_land_name
                }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <template #list>
        <div class="p-24px pb-0">
          <zxn-table
            :column-list="columnList"
            :table-data="tableData"
            :hasPagination="false"
          >
          </zxn-table>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import type { Ref } from "vue";
import { getInvoiceCompanyView, getInvoiceChannelView } from "@/api/invoice";
import { ElLoading } from "element-plus";
import type { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
import { useRoute } from "vue-router";
const route = useRoute();
const activeName: Ref<string> = ref("info");
type TabsType = {
  name: string;
  label: string;
};
const tabsList: TabsType[] = reactive([
  {
    name: "info",
    label: "开票信息",
  },
  {
    name: "list",
    label: "任务列表",
  },
]);
const columnList = [
  { label: "任务编号", prop: "task_no" },
  { label: "任务名称", prop: "task_name" },
  { label: "行业", prop: "category_id" },
  { label: "结算金额", prop: "payment_amount" },
];
const formItem = reactive({
  invoice_type: "",
  invoice_require: "",
  apply_invoice_type: "",
  taxpayer_number: "",
  company_name: "",
  bank: "",
  bank_account: "",
  tax_land_name: "",
});
const tableData = reactive([]);
const getView = async () => {
  const { id, type } = route.query;
  const loading = ElLoading.service({
    text: "加载中...",
  });
  try {
    const { data } =
      type === "enterprise"
        ? await getInvoiceCompanyView(id * 1)
        : await getInvoiceChannelView(id * 1);
    loading.close();
    formItem.invoice_type = data.invoice_type;
    formItem.invoice_require = data.invoice_require;
    formItem.apply_invoice_type = data.apply_invoice_type;
    formItem.taxpayer_number = data.taxpayer_number;
    formItem.company_name = data.company_name;
    formItem.bank = data.bank;
    formItem.bank_account = data.bank_account;
    formItem.tax_land_name = data.tax_land_name;
    tableData.length = 0;
    tableData.push(...(Object.values(data.task_list) as []));
  } catch (err) {
    loading.close();
  }
};
onMounted(() => {
  getView();
});
</script>
