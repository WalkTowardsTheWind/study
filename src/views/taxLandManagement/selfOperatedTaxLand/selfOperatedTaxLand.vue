<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
    >
      <el-form-item>
        <el-input v-model="formItem.keywords" placeholder="请输入关键字">
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="税地状态">
        <el-select v-model="formItem.status" placeholder="Select">
          <el-option
            v-for="item in proxy.$const['taxLandManagementEnum.TaxLandStatus']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="发票类型">
        <el-select v-model="formItem.invoice_type" placeholder="Select">
          <el-option
            v-for="item in proxy.$const['taxLandManagementEnum.InvoiceType']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="发票面额">
        <el-select v-model="formItem.invoice_denomination" placeholder="Select">
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

      <el-form-item label="计算方式">
        <el-select v-model="formItem.calculation_type" placeholder="Select">
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
      <el-form-item prop="date" label="申请日期">
        <zxn-date-range v-model="formItem.timeData" />
      </el-form-item>
    </zxn-search>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="handlePageChange"
      hasSelect
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <el-button type="primary" @click="handleAdd">+ 新建</el-button>
        <el-dropdown class="ml-4" trigger="click" @command="handleD">
          <el-button type="primary">批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">上架</el-dropdown-item>
              <el-dropdown-item command="2">删除</el-dropdown-item>
              <el-dropdown-item command="3">导出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template #operation="scope">
        <el-button link type="primary" @click="handleA(scope)">{{
          scope.row.state == 1 ? "下架" : "上架"
        }}</el-button>
        <el-button link type="primary" @click="handleB(scope)">编辑</el-button>
        <el-button link type="primary" @click="handleE(scope)">删除</el-button>
        <el-button link type="primary" @click="handleF(scope)">导出</el-button>
        <el-button link type="primary" @click="handleG(scope)">详情</el-button>
      </template>
    </zxn-table>
  </div>
</template>
<script setup lang="ts">
import { transformTimeRange } from "@/utils";
import { useRouter } from "vue-router";
import { getSelfOperatedTaxLandList } from "@/api/taxLandManagement/selfOperatedTaxLand";
const router = useRouter();
const { proxy } = getCurrentInstance() as any;

// 查询重置
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const handleReset = () => {
  formItem.value = {
    keywords: "",
    status: "",
    tax_land_type: "0",
    timeData: [],
    invoice_type: "",
    invoice_denomination: "",
    calculation_type: "",
    page: "",
    limit: "",
  };
  handleSearch();
};
const handleSearch = () => {
  console.log("查询");
  pageInfo.page = 1;
  getTableData();
};
const handlePageChange = (cur) => {
  const { page } = cur;
  pageInfo.page = page;
  getTableData();
};

const formItem = reactive({
  keywords: "",
  status: "",
  tax_land_type: "0",
  timeData: [],
  invoice_type: "",
  invoice_denomination: "",
  calculation_type: "",
  page: "",
  limit: "",
});

// 计算属性

const tableData = reactive([] as any);
const columnList = [
  { label: "税地编号", prop: "tax_land_no" },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.taxLandType",
    prop: "status",
    width: 100,
    color: { 0: "blue", 1: "gray", 2: "black" },
  },
  { label: "税地名称", prop: "tax_land_name" },
  { label: "成本", prop: "tax_cost_point" },
  { label: "签约数量", prop: "sign_count" },
  { label: "税率形式", prop: "calculation_type" },
  { label: "对接人", prop: "tax_land_head" },
  {
    label: "税地发票类型",
    type: "enum",
    path: "statusEnum.applyInvoiceType",
    prop: "invoice_type",
    width: 120,
    color: { 0: "blue", 1: "gray", 2: "black" },
  },
  { label: "上架时间", prop: "ground_time", sortable: "custom", width: 120 },
  { label: "税地类型", prop: "tax_land_type" },
  { label: "支付方式", prop: "payment_type" },

  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];
/**
 * 上下架
 */
const handleA = (scope: any) => {
  console.log(scope, "下架");
};
/**
 * 编辑
 */
const handleB = (scope: any) => {
  router.push({
    name: "selfOperatedTaxLandEdit",
    query: { activeName: "1", id: scope.row.id },
  });
  console.log(scope.row.value, "编辑");
};
/**
 * 删除
 */
const handleE = (scope: any) => {
  console.log(scope.row.value, "删除");
};
/**
 * 导出
 */
const handleF = (scope: any) => {
  console.log(scope.row.value, "导出");
};
/**
 * 详情
 */
const handleG = (scope: any) => {
  router.push({
    name: "selfOperatedTaxLandDetails",
    query: { activeName: "1", id: scope.row.id },
  });
  console.log(scope.row.value, "详情");
};
/**
 * 批量选择
 */
// const selectionData = ref([]);
const handleSelect = () => {};
/**
 * 新建
 */
const handleAdd = () => {
  router.push({ name: "selfOperatedTaxLandAdd", query: { activeName: "1" } });
};
/**
 * 批量操作
 */
const handleD = (command: string | number | object) => {
  if (command == 1) {
    console.log("上架");
  } else if (command == 2) {
    console.log("删除");
  } else if (command == 3) {
    console.log("导出");
  }
};

const getTableData = async () => {
  const params = transformTimeRange({ ...formItem });
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  console.log(params);

  try {
    const { data } = await getSelfOperatedTaxLandList(params);
    tableData.length = 0;
    pageInfo.page = data.current_page;
    pageInfo.total = data.count;
    var newData = data.data.map((item: any) => {
      return {
        id: item.id,
        tax_land_no: item.tax_land_no,
        status: item.status,
        tax_land_name: item.tax_land_name,
        tax_cost_point: item.tax_cost_point,
        sign_count: item.sign_count,
        calculation_type: item.calculation_type,
        tax_land_head: item.tax_land_head,
        invoice_type: item.invoice_type,
        ground_time: item.ground_time,
        tax_land_type: item.tax_land_type,
        payment_type: item.payment_type,
      };
    });
    tableData.push(...newData);
  } catch (error) {
    console.log(error);
  }
};
getTableData();
onMounted(() => {});
defineExpose({
  getTableData,
});
</script>
