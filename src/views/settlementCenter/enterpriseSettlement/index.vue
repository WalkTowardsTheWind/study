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
      <el-form-item label="任务状态">
        <el-select v-model="formItem.status" placeholder="Select">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="date" label="申请日期">
        <el-date-picker
          v-model="formItem.start_time"
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
import { useRouter } from "vue-router";
import { getEnterpriseSettlementList } from "@/api/settlementCenter/enterpriseSettlement";
const router = useRouter();
// 状态
const stateOptions = ref([] as any);

const formItem = reactive({
  keywords: "",
  start_time: "",
  end_time: "",
  status: "",
  page: "",
  limit: "",
});
const tableData = reactive([] as any);
const columnList = [
  { label: "结算单号", prop: "settlement_order_no" },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.settlementType",
    prop: "status",
    color: { 0: "blue", 1: "gray", 2: "red" },
  },
  { label: "任务数量", prop: "task_count" },
  { label: "结算企业", prop: "company_name" },
  { label: "税源地", prop: "tax_land_name" },
  { label: "结算人数", prop: "total_people" },
  { label: "实际人数", prop: "total_people" },
  { label: "点位", prop: "total_people" },
  { label: "打款金额", prop: "total_money" },
  { label: "实际下发", prop: "real_money" },
  { label: "个人回单", prop: "total_people" },
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
  console.log(scope);
};
const handleDetails = (scope: any) => {
  router.push({
    name: "enterpriseSettlementDetails",
    query: { activeName: "1", id: scope.row.id },
  });
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
const getTableData = () => {
  getEnterpriseSettlementList(formItem)
    .then((response) => {
      tableData.length = 0;
      tableData.push(...response.data.list);
    })
    .catch();
};
getTableData();
onMounted(() => {
  // rou()
});
</script>
