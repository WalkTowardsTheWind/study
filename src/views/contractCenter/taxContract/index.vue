<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search :formItem="formItem">
      <el-row>
        <el-col :span="8">
          <el-input v-model="formItem.search" placeholder="请输入关键字">
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同状态">
            <el-select v-model="formItem.state" placeholder="Select">
              <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="税源地">
            <el-select v-model="formItem.manufacturer" placeholder="Select">
              <el-option
                v-for="item in manufacturerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="date" label="创建日期">
            <el-date-picker
              v-model="formItem.date"
              type="daterange"
              unlink-panels
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </zxn-search>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      hasSelect
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <el-dropdown trigger="click" @command="handleNewBuilt">
          <el-button type="primary">+ 新建</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">线上合同</el-dropdown-item>
              <el-dropdown-item command="2">线下合同</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button class="ml-4" color="#366FF4" plain @click="handleExport"
          >导出</el-button
        >
        <el-button class="ml-4" color="#366FF4" plain @click="handleImport"
          >导入</el-button
        >
      </template>
      <template #operation="scope">
        <el-button link type="primary" @click="handleEdit(scope)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="handleDelete(scope)"
          >删除</el-button
        >
        <el-button link type="primary" @click="handleDownload(scope)"
          >下载</el-button
        >
        <el-button link type="primary" @click="handleDetails(scope)"
          >详情</el-button
        >
      </template>
    </zxn-table>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

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

const formItem = reactive({
  search: "",
  state: "",
  manufacturer: "",
  Invoice: "",
  tax: "",
  date: "",
});
const tableData = reactive([
  { value: "税源地合同", name: "shshhud", status: 0 },
  { value: "税源地合同", name: "shshhud", status: 1 },
  { value: "税源地合同", name: "shshhud", status: 2 },
  { value: "税源地合同", name: "shshhud", status: 0 },
  { value: "税源地合同", name: "shshhud", status: 1 },
]);
const columnList = [
  { label: "合同编号", prop: "value" },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.contractType",
    prop: "status",
    color: { 0: "blue", 1: "gray", 2: "black" },
  },
  { label: "签署形式" },
  { label: "甲方" },
  { label: "乙方" },
  { label: "合同点位", prop: "value" },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 250,
    align: "right",
    headerAlign: "left",
  },
];
// 操作
const handleDetails = (scope: any) => {
  router.push({
    name: "taxContractDetails",
    query: { activeName: "1", id: "1" },
  });
  console.log("详情");
  console.log(scope.row.value.$index);
};
const handleEdit = (scope: any) => {
  router.push({ name: "taxContractEdit", query: { activeName: "1", id: "1" } });
  console.log("编辑");
  console.log(scope.row.value);
};
const handleDelete = (scope: any) => {
  console.log("删除");
  console.log(scope.row.value.$index);
  tableData.splice(scope.$index, 1);
};
const handleDownload = (scope: any) => {
  console.log("下载");
  console.log(scope.row.value.$index);
};
/**
 * 批量选择
 */
//选中的数据
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data;
  console.log(selectionData.value);
};
/**
 * 新建
 */
const router = useRouter();
const handleNewBuilt = (command: string | number | object) => {
  if (command == 1) {
    router.push({ name: "taxContractAdd", query: { activeName: "1" } });
    console.log("线下合同");
  } else if (command == 2) {
    console.log("新建2");
    router.push({ name: "taxContractAdd", query: { activeName: "2" } });
  }
};
/**
 * 导出、导入
 */
const handleExport = () => {};
const handleImport = () => {};
/**
 * 下拉选择外部导入
 */
const getData = () => {
  let a = 8;
  stateOptions.value = [
    { label: `全部 (${a})`, value: 1 },
    { label: `启用中 (${a})`, value: 2 },
    { label: `待启用 (${a})`, value: 3 },
    { label: `预警 (${a})`, value: 4 },
    { label: `下架 (${a})`, value: 5 },
  ];
};
getData();
//路由跳转
//
// const rou=()=>{
//   const uid = router.currentRoute.value.meta.title;
//   if(uid=="税地合同"){
//     activeName.value="3"
//    console.log(uid)
//   }
// }
onMounted(() => {
  //   rou()
});
</script>
