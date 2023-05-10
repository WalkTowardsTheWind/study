<template>
  <zxn-plan>
    <zxn-tabs :activeName="activeName" :tabsList="tabsList"></zxn-tabs>
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
        @selection-change="handleC"
      >
        <template #tableTop>
          <el-dropdown trigger="click" @command="handleDD">
            <el-button type="primary">+ 新建</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="1">线下</el-dropdown-item>
                <el-dropdown-item command="2">新建2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button class="ml-4" color="#366FF4" plain>导出</el-button>
          <el-button class="ml-4" color="#366FF4" plain>导入</el-button>
        </template>
        <template #operation="scope">
          <el-button link type="primary" @click="handleA(scope)"
            >详情</el-button
          >
          <el-button link type="primary" @click="handleB(scope)"
            >编辑</el-button
          >
          <el-button link type="primary" @click="handleCC(scope)"
            >删除</el-button
          >
          <el-button link type="primary" @click="handleDDDD(scope)"
            >下载</el-button
          >
        </template>
      </zxn-table>
    </div>
    <viewDialog v-model:dialogVisible="dialogVisible" :title="title" />
  </zxn-plan>
</template>
<script setup lang="ts">
// import { useRouter } from "vue-router";
import viewDialog from "../components/viewDialog.vue";
const dialogVisible = ref(false);
const title = ref("");
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "企业合同",
  },
  {
    name: "2",
    label: "渠道合同",
  },
  {
    name: "3",
    label: "税源地合同",
  },
];
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

// 税率形式

const formItem = reactive({
  search: "",
  state: "",
  manufacturer: "",
  Invoice: "",
  tax: "",
  date: "",
});
const tableData = reactive([
  { value: "1", name: "shshhud", state: 1 },
  { value: "2", name: "shshhud", state: 1 },
  { value: "3", name: "shshhud", state: 1 },
  { value: "4", name: "shshhud", state: 1 },
  { value: "5", name: "shshhud", state: 1 },
]);
const columnList = [
  { label: "合同编号", prop: "value" },
  { label: "合同类型", prop: "name" },
  { label: "签署形式" },
  { label: "甲方" },
  { label: "乙方" },
  { label: "产品" },
  { label: "签约时间", sortable: "custom", width: 120 },
  { label: "到期时间", sortable: "custom", width: 120 },
  { label: "状态", prop: "state", type: "enum" },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];
// 操作
const handleA = (scope: any) => {
  title.value = "合同详情";
  dialogVisible.value = true;

  console.log("详情");
  console.log(scope.row.value.$index);
};
const handleB = (scope: any) => {
  title.value = "合同编辑";
  dialogVisible.value = true;

  console.log("编辑", dialogVisible.value);
  console.log(scope.row.value);
};
const handleCC = (scope: any) => {
  console.log("删除");
  console.log(scope.row.value.$index);
  tableData.splice(scope.$index, 1);
};
const handleDDDD = (scope: any) => {
  console.log("下载");
  console.log(scope.row.value.$index);
};
/**
 * 批量选择
 */
//选中的数据
const selectionData = ref([]);
const handleC = (data: any) => {
  selectionData.value = data;
  console.log(selectionData.value);
};
/**
 * 新建
 */
const handleDD = (command: string | number | object) => {
  if (command == 1) {
    title.value = "新建合同";
    dialogVisible.value = true;
    console.log("线下合同");
  } else if (command == 2) {
    console.log("新建2");
  }
};
/**
 * 批量操作
 */
// const handleD = (command: string | number | object) => {
//   var data = selectionData.value.map((item, index) => {
//     return index;
//   });
//   if (command == 1) {
//     console.log("删除", data);
//   } else if (command == 2) {
//     console.log("下载");
//   }
// };
/**
 * 下拉选择外部导入
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
//路由跳转
// const router = useRouter();
// const rou=()=>{
//   const uid = router.currentRoute.value.meta.title;
//   if(uid=="企业合同"){
//     activeName.value="1"
//    console.log(uid)
//   }
// }
onMounted(() => {
  // rou()
});
</script>
