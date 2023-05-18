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
          <el-form-item label="任务状态">
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
        <el-dropdown
          class="ml-4"
          trigger="click"
          @command="handleBatchOperation"
        >
          <el-button type="primary">批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">解冻</el-dropdown-item>
              <el-dropdown-item command="2">删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template #operation="scope">
        <el-button
          link
          type="primary"
          v-show="scope.row.status != 0"
          @click="handleThaw(scope)"
          >{{ scope.row.status == 1 ? "解冻" : "冻结" }}</el-button
        >
        <el-button link type="primary" @click="handleEdit(scope)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="handleDelete(scope)"
          >删除</el-button
        >
        <el-button link @click="handleDetails(scope)">详情</el-button>
      </template>
    </zxn-table>
  </div>
</template>
<script setup lang="ts">
const dialogVisible = ref(false);
const title = ref("");

// 状态
const stateOptions = ref([] as any);

const formItem = reactive({
  search: "",
  state: "",
  manufacturer: "",
  Invoice: "",
  tax: "",
  date: "",
});
const tableData = reactive([
  { value: "企业结算", name: "shshhud", status: 0 },
  { value: "企业结算", name: "shshhud", status: 1 },
  { value: "企业结算", name: "shshhud", status: 2 },
  { value: "企业结算", name: "shshhud", status: 1 },
  { value: "企业结算", name: "shshhud", status: 2 },
]);
const columnList = [
  { label: "结算单号", prop: "value" },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.settlementType",
    prop: "status",
    color: { 0: "blue", 1: "gray", 2: "red" },
  },
  { label: "任务数量", prop: "name" },
  { label: "结算企业" },
  { label: "税源地" },
  { label: "结算人数" },
  { label: "实际人数" },
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
const handleThaw = (scope: any) => {
  title.value = "合同详情";
  dialogVisible.value = true;

  console.log("详情");
  console.log(scope.row.value.$index);
};
const handleDetails = (scope: any) => {
  title.value = "合同编辑";
  dialogVisible.value = true;

  console.log("编辑", dialogVisible.value);
  console.log(scope.row.value);
};
const handleEdit = (scope: any) => {
  console.log("删除");
  console.log(scope.row.value.$index);
  tableData.splice(scope.$index, 1);
};
const handleDelete = (scope: any) => {
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
 * 批量操作
 */
const handleBatchOperation = (command: string | number | object) => {
  var data = selectionData.value.map((item, index) => {
    return index;
  });
  if (command == 1) {
    console.log("删除", data);
  } else if (command == 2) {
    console.log("下载");
  }
};
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

onMounted(() => {
  // rou()
});
</script>
