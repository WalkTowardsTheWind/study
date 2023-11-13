<template>
  <zxn-plan>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="pageChange"
      hasSelect
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <!-- <el-button type="primary">合同归档</el-button>
        <el-button type="primary" plain>在线签署</el-button> -->
      </template>
      <template #operation="{ row }">
        <!-- <el-button link type="primary">详情</el-button> -->
        <!-- <el-button link type="primary">发起签署</el-button> -->
        <!-- <el-button link type="primary">合同解除</el-button> -->
        <!-- <el-button link type="primary">撤回</el-button> -->
        <el-button
          :disabled="!row.contract_url"
          link
          type="primary"
          @click="checkUrl(row.contract_url)"
          >下载</el-button
        >
        <!-- <el-button link type="primary">删除</el-button> -->
      </template>
    </zxn-table>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getBusinessAccountContractList } from "@/api/account/business";
import { getContractList } from "@/api/contract-m";

const props = defineProps({
  channel_id: {
    type: String || Number,
  },
  isEdit: {
    type: Boolean,
  },
});

function pageChange(current: any) {
  const { page, limit } = current;
  pageInfo.limit = limit;
  pageInfo.page = page;
  getList();
}

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});
const tableData = reactive([] as any);
const columnList = [
  { label: "合同编号", prop: "contract_no" },
  { label: "合同名称", prop: "contract_name" },
  { label: "合同类型", slot: "type" },
  {
    label: "状态",
    prop: "status",
    type: "enum",
    path: "contractListEnum.contractStatus",
    color: {
      0: {
        color: "#35C5F3",
        background: "#DFF6FD",
      },
      1: {
        color: "#1EE585",
        background: "#DBFBEB",
      },
      2: {
        color: "#356FF3",
        background: "#DFE8FD",
      },
      3: {
        color: "#333333",
        background: "#DEDEDE",
      },
    },
  },
  { label: "签署形式", slot: "is_online" },
  { label: "甲方", prop: "part_a_name" },
  { label: "乙方", prop: "part_b_name" },
  { label: "签约时间", prop: "sign_time", minWidth: 150 },
  { label: "到期时间", prop: "effective_end_time", minWidth: 150 },
  {
    label: "操作",
    slot: "caozuo",
    minWidth: 250,
    align: "right",
    fixed: "right",
  },
];
const handleSelect = (val) => {
  console.log(val);
};

/**
 * 获取列表
 */
async function getList() {
  let params = {
    limit: pageInfo.limit,
    page: pageInfo.page,
    channel_id: props.channel_id,
  };
  tableData.length = 0;
  getContractList(params).then((res) => {
    // console.log(res);
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  });
}
const checkUrl = (url) => {
  window.open(url, "_blank");
};
getList();
</script>
