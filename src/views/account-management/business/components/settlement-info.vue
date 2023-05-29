<template>
  <zxn-plan>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
    >
      <template #status="scope" v-if="isEdit">
        <span>{{ status[scope.row.status] }}</span>
      </template>
      <template #operation="scope">
        <el-button v-if="scope" link type="primary">解冻</el-button>
        <el-button v-if="scope" link type="primary">编辑</el-button>
        <el-button v-if="scope" link type="primary">删除</el-button>
        <el-button link type="primary">详情</el-button>
      </template>
    </zxn-table>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getBusinessAccountSettlementList } from "@/api/account/business";

enum status {
  "待结算",
  "已结算",
  "冻结",
  "异常",
}

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => 0,
  },
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const tableData = reactive([] as any);

const columnList = [
  { label: "结算单号", prop: "settlement_order_no" },
  { label: "任务数量", prop: "task_count" },
  { label: "结算企业", prop: "company_name", width: 200 },
  { label: "税源名称", prop: "tax_land_name" },
  { label: "结算人数", prop: "person_count" },
  { label: "实际人数", prop: "total_people" },
  { label: "点位", prop: "tax_point" },
  { label: "打款金额", prop: "total_money" },
  { label: "实际下发", prop: "real_money" },
  { label: "个人回单", prop: "transfer_certificate" },
  { label: "结算时间", prop: "settlement_time", width: 200 },
  { label: "状态", prop: "status", slot: "status" },
  // { label: "操作", slot: "operation", fixed: "right", width: 250 },
];

async function getList() {
  if (props.id) {
    let params = {
      company_id: props.id,
      keywords: "",
      ...pageInfo,
    };
    const res = await getBusinessAccountSettlementList(params);
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  }
}

getList();
</script>
