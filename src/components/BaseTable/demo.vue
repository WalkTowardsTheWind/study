<template>
  <div class="p-[24px] p-b-[0]">
    <base-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="handlePageChange"
    >
      <template #header-tax_land_head="scope">
        <BaseInput
          v-model:value="value"
          :title="scope.column.label"
          @dataChange="handleDataChange"
        ></BaseInput>
      </template>
      <template #IndustryRestrictions="scope">
        <el-button link type="primary">查看{{ scope.row.status }}</el-button>
      </template>
      <template #operation="scope">
        <el-button link type="primary">删除</el-button>
        <el-button v-if="scope.row.status == 0" link type="primary"
          >编辑</el-button
        >
        <el-button link type="primary">详情</el-button>
      </template>
    </base-table>
  </div>
</template>
<script setup lang="ts">
//
const value = ref("123");
const handleDataChange = (num: any) => {
  console.log("数据更新", num);
};

// 查询重置
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const handlePageChange = (cur: any) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
};

// const formItem = ref({
//   keywords: "",
//   status: "",
//   tax_land_type: "0",
//   timeData: [],
//   invoice_type: "",
//   invoice_denomination: "",
//   calculation_type: "",
//   page: "",
//   limit: "",
// });
const tableData = reactive([] as any);
const columnList = [
  { label: "税地编号", prop: "tax_land_no", width: 100, fixed: "left" },
  {
    label: "状态",
    type: "enum",
    path: "taxLandManagementEnum.taxLandStatus",
    prop: "status",
    width: 100,
    fixed: "left",
    color: {
      0: { color: "#36C5F4", backgroundColor: "#DFF6FD" },
      1: { color: "#366FF4", backgroundColor: "#DFE8FD" },
      2: { color: "#333333", backgroundColor: "#DEDEDE" },
      3: { color: "#F45136", backgroundColor: "#FDE3DF" },
    },
  },
  {
    label: "税地名称",
    prop: "tax_land_name",
    width: 100,
    fixed: "left",
    headerAlign: "right",
  },
  { label: "税地地区", prop: "merger_name", minWidth: 120 },
  { label: "税地成本", prop: "tax_cost_point", minWidth: 120 },
  { label: "签约数量", prop: "sign_count", minWidth: 120 },
  { label: "税地类型", prop: "tax_land_type", minWidth: 120 },

  // { label: "计算方式", prop: "calculation_type" },
  { label: "对接人", prop: "tax_land_head", minWidth: 120, align: "right" },
  { label: "税地发票类型", prop: "invoice_type", minWidth: 120 },
  // { label: "发票面额", prop: "invoice_denomination", minWidth: 120 },
  {
    label: "上架时间",
    prop: "ground_time",
    //  sortable: "custom",
    width: 180,
  },
  {
    label: "行业限制",
    slot: "IndustryRestrictions",
    minWidth: 80,
    // fixed: "right",
    // headerAlign: "center",
  },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 200,
    align: "left",
    headerAlign: "left",
  },
];
</script>
