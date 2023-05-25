<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      :on-search="handleSearch"
      :on-reset="handleReset"
    >
      <el-form-item>
        <el-input v-model="formItem.keywords" placeholder="请输入关键字">
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="合同状态">
        <el-select v-model="formItem.keywords" placeholder="Select">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="税源地">
        <el-select v-model="formItem.keywords" placeholder="Select">
          <el-option
            v-for="item in manufacturerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="date" label="创建日期">
        <el-date-picker
          v-model="formItem.keywords"
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
      :page-info="pageInfo"
      hasSelect
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <el-dropdown trigger="click" @command="handleAdd">
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
        <el-button
          v-if="scope.row.status != 1"
          link
          type="primary"
          @click="handleUpdateStatus(scope)"
          >{{ scope.row.status == 0 ? "停用" : "启用" }}</el-button
        >
        <el-button link type="primary" @click="handleEdit(scope)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="handleDownload(scope)"
          >下载</el-button
        >
        <el-button link @click="handleDetails(scope)">详情</el-button>
      </template>
    </zxn-table>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { getChannelContractList } from "@/api/contractCenter/channelContract";
import { updateStatus } from "@/api/contractCenter";
import type { ComponentInternalInstance } from "vue";
import { reactive } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

// 状态
const stateOptions = ref([] as any);
// 厂商
const manufacturerOptions = [
  { label: "薪龙网", value: 1 },
  { label: "某某网", value: 2 },
  { label: "某某网", value: 3 },
  { label: "某某网", value: 4 },
] as any;
// 查询重置
const handleSearch = () => {};
const handleReset = () => {};
const formItem = reactive({
  keywords: "",
  start_time: "",
  end_time: "",
  contract_kind: "",
  page: "",
  limit: "",
  status: "",
});
var pageInfo = ref({
  total: 1, //总数
  page: 1, //页数
} as any);
var tableData = reactive([] as any);
const columnList = [
  { label: "合同编号", prop: "contract_no" },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.contractType",
    prop: "status",
    color: { 0: "blue", 1: "gray", 2: "black" },
  },
  { label: "合同类型", prop: "contract_kind" },
  { label: "签署形式", prop: "online_type" },
  { label: "甲方", prop: "party_a" },
  { label: "乙方", prop: "party_b" },
  { label: "合同点位", prop: "tax_location" },
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
    name: "channelContractDetails",
    query: { activeName: "1", id: scope.row.id },
  });
};
const handleEdit = (scope: any) => {
  router.push({
    name: "channelContractEdit",
    query: { activeName: "1", id: scope.row.id },
  });
};
const handleUpdateStatus = async (scope: any) => {
  console.log(scope);
  var data = { id: scope.row.id, status: scope.row.status == 0 ? "2" : "0" };
  try {
    updateStatus(data);
    getTableData();
  } catch (error) {
    console.log(error);
  }
};
const handleDownload = (scope: any) => {
  console.log("下载", scope);
};
/**
 * 批量选择
 */
//选中的数据
//返回id数组
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};
/**
 * 新建
 */
const router = useRouter();
const handleAdd = (command: string | number | object) => {
  if (command == 1) {
    router.push({ name: "channelContractAdd", query: { activeName: "1" } });
  } else if (command == 2) {
    router.push({ name: "channelContractAdd", query: { activeName: "2" } });
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
  stateOptions.value = (proxy as any).$const["statusEnum.IndustryType"];
};
getData();

/**
 * 获取数据
 */
const getTableData = () => {
  const data = { ...formItem };
  getChannelContractList(data)
    .then((response: any) => {
      tableData.length = 0;
      tableData.push(...response.data.list);
    })
    .catch(() => {});
};

onMounted(() => {
  getTableData();
});
</script>
