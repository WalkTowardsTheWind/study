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
      <template #type="{ row }">
        {{ row.type == 2 ? "渠道合同" : "" }}
      </template>
      <template #is_online="{ row }">
        {{ row.is_online == 1 ? "线上签署" : "线下签署" }}
      </template>
      <template #caozuo="{ row }">
        <el-button link type="primary" @click="toDetail(row.id)"
          >详情</el-button
        >
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
    <!-- 合同详情 -->
    <ContractDetail
      :visible="detailShow"
      @detail-close="detailClose"
      :detailId="detailId"
    />
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getContractList } from "@/api/contract-m";
import { color } from "@/views/contract-management/components/options";
import ContractDetail from "@/views/contract-management/components/contract-detail.vue";

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
    color: color,
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
const detailShow = ref(false);

const detailClose = (visible: boolean) => {
  detailShow.value = visible;
};

const detailId = ref(0);

const toDetail = (id) => {
  detailId.value = Number(id);
  detailShow.value = true;
};

const checkUrl = (url) => {
  window.open(url, "_blank");
};
getList();
</script>
