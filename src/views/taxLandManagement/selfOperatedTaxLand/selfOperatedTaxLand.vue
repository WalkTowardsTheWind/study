<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search :formItem="formItem">
      <el-form-item>
        <el-input v-model="formItem.search" placeholder="请输入关键字">
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="税地状态">
        <el-select v-model="formItem.state" placeholder="Select">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="厂商">
        <el-select v-model="formItem.manufacturer" placeholder="Select">
          <el-option
            v-for="item in manufacturerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="发票类型">
        <el-select v-model="formItem.Invoice" placeholder="Select">
          <el-option
            v-for="item in InvoiceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="税率形式">
        <el-select v-model="formItem.tax" placeholder="Select">
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
          v-model="formItem.date"
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
      @selection-change="handleC"
    >
      <template #tableTop>
        <el-dropdown trigger="click" @command="handleDD">
          <el-button type="primary">+ 新建</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">新建1</el-dropdown-item>
              <el-dropdown-item command="2">新建2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
  <!-- <viewDialog v-model:dialogVisible="dialogVisible" :title="title" /> -->
</template>
<script setup lang="ts">
// import viewDialog from "../components/viewDialog.vue";
const dialogVisible = ref(false);
const title = ref("");
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
  search: "",
  state: "",
  manufacturer: "",
  Invoice: "",
  tax: "",
  date: "",
});
const tableData = reactive([
  { value: "自营税地", name: "shshhud", state: 1 },
  { value: "自营税地", name: "shshhud", state: 1 },
  { value: "自营税地", name: "shshhud", state: 1 },
  { value: "自营税地", name: "shshhud", state: 1 },
  { value: "自营税地", name: "shshhud", state: 1 },
]);
const columnList = [
  { label: "税地编号", prop: "value" },
  { label: "税地名称", prop: "state" },
  { label: "税地成本", prop: "a" },
  { label: "签约数量", prop: "a" },
  { label: "计算形式", prop: "a" },
  { label: "对接人", prop: "a" },
  { label: "税地发票数量", prop: "b" },
  { label: "上架时间", sortable: "custom", width: 120 },
  { label: "税地类型" },
  { label: "支付方式" },
  { label: "状态" },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];
/**
 * 上下架
 */
const handleA = (scope: any) => {
  console.log(tableData[scope.$index].state, "下架");
  if (tableData[scope.$index].state == 1) {
    tableData[scope.$index].state = 2;
  } else if (tableData[scope.$index].state == 2) {
    tableData[scope.$index].state = 1;
  }
};
/**
 * 编辑
 */
const handleB = (scope: any) => {
  title.value = "税地编辑";
  dialogVisible.value = true;
  console.log(scope.row.value, "编辑");
};
/**
 * 删除
 */
const handleE = (scope: any) => {
  console.log(scope.row.value, "删除");
  tableData.splice(scope.$index, 1);
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
  title.value = "税地详情";
  dialogVisible.value = true;
  console.log(scope.row.value, "详情");
};
/**
 * 批量选择
 */
const selectionData = ref([]);
const handleC = (sss: any) => {
  selectionData.value = sss;
  console.log(selectionData.value);
};
/**
 * 新建
 */
const handleDD = (command: string | number | object) => {
  if (command == 1) {
    title.value = "新增税地";
    dialogVisible.value = true;
    console.log("新建1");
  } else if (command == 2) {
    console.log("新建2");
  }
};
/**
 * 批量操作
 */
const handleD = (command: string | number | object) => {
  var data = selectionData.value.map((item, index) => {
    return index;
  });
  if (command == 1) {
    data.forEach((item) => (tableData[item].state = 1));

    console.log("上架", selectionData.value, data);
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
onMounted(() => {
  // handleS()
});
</script>
