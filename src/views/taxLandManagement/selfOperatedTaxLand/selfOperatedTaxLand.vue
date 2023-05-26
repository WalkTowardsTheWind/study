<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search :formItem="formItem">
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
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="厂商">
        <el-select v-model="formItem.tax_manufacturer" placeholder="Select">
          <el-option
            v-for="item in manufacturerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="发票类型">
        <el-select v-model="formItem.invoice_type" placeholder="Select">
          <el-option
            v-for="item in InvoiceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="税率形式">
        <el-select v-model="formItem.calculation_type" placeholder="Select">
          <el-option
            v-for="item in taxOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="date" label="申请日期">
        <el-date-picker
          v-model="Time"
          type="daterange"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
    </zxn-search>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
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
import { useRouter } from "vue-router";
import { getSelfOperatedTaxLandList } from "@/api/taxLandManagement/selfOperatedTaxLand";
const router = useRouter();
// const statusOption = [
//   { label: "申请中", value: 1 },
//   { label: "报名中", value: 2 },
//   { label: "进行中", value: 3 },
//   { label: "已验收", value: 4 },
//   { label: "异常", value: 5 },
// ];
// 状态
const stateOptions = ref([] as any);
// 厂商
const manufacturerOptions = [
  { label: "薪龙网", value: 1 },
  { label: "某某网", value: 2 },
  { label: "某某网", value: 3 },
  { label: "某某网", value: 4 },
] as any;
// 发票类型
const InvoiceOptions = [
  { label: "全部", value: 1 },
  { label: "6%增值税发票(万元版)", value: 2 },
  { label: "普通发票(万元版)", value: 3 },
  { label: "6%增值税发票/普通发票(十万元版)", value: 4 },
] as any;
// 税率形式
const taxOptions = [
  { label: "全部", value: 1 },
  { label: "内扣", value: 2 },
  { label: "外扣", value: 3 },
] as any;

const formItem = reactive({
  keywords: "",
  status: "",
  tax_land_type: "",
  start_time: "",
  end_time: "",
  invoice_type: "",
  calculation_type: "",
  tax_manufacturer: "",
  page: "",
  limit: "",
});
// 计算属性
var Time = computed(() => {
  return [formItem.start_time, formItem.end_time];
}) as any;
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
  // if (tableData[scope.$index].state == 1) {
  //   tableData[scope.$index].state = 2;
  // } else if (tableData[scope.$index].state == 2) {
  //   tableData[scope.$index].state = 1;
  // }
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
/**
 *
 */
const handleS = () => {
  let a = 8;
  stateOptions.value = [
    { label: `全部 (${a})`, value: 1 },
    { label: `启用中 (${a})`, value: 2 },
    { label: `待启用 (${a})`, value: 3 },
    { label: `预警 (${a})`, value: 4 },
    { label: `下架 (${a})`, value: 5 },
  ];
};
handleS();
const getTableData = () => {
  getSelfOperatedTaxLandList(formItem)
    .then((response) => {
      var data = response.data.list.map((item: any) => {
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
      tableData.push(...data);
    })
    .catch();
};
getTableData();
onMounted(() => {});
defineExpose({
  getTableData,
});
</script>
