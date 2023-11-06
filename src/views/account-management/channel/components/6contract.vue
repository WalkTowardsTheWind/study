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
        <el-button type="primary">合同归档</el-button>
        <el-button type="primary" plain>在线签署</el-button>
      </template>
      <template #operation>
        <el-button link type="primary">详情</el-button>
        <el-button link type="primary">发起签署</el-button>
        <el-button link type="primary">合同解除</el-button>
        <el-button link type="primary">撤回</el-button>
        <el-button link type="primary">下载</el-button>
        <el-button link type="primary">删除</el-button>
      </template>
    </zxn-table>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getBusinessAccountContractList } from "@/api/account/business";

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
const tableData = ref([] as any);

const columnList = [
  { label: "合同编号", prop: "contract_no", width: 80 },
  {
    label: "合同类型",
    prop: "contract_kind",
    slot: "contract_kind",
    width: 200,
  },
  {
    label: "状态",
    prop: "status",
    slot: "status",
  },
  { label: "签署形式", prop: "online_type", slot: "online_type" },
  { label: "甲方", prop: "party_a" },
  { label: "乙方", prop: "party_b" },
  { label: "签约点位", prop: "tax_location" },
  { label: "签约时间", prop: "sign_time" },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];

const handleSelect = (val) => {
  console.log(val);
};

/**
 * 获取列表
 */
async function getList() {}

getList();
</script>
