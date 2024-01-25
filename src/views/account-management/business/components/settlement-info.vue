<template>
  <zxn-plan>
    <div class="but">
      <el-button type="primary" @click="handleBinding">绑定渠道</el-button>
    </div>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="pageChange"
      hasSelect
      @selection-change="handleSelect"
      :selectable="selectable"
    >
      <template #operation="scope" v-if="isEdit">
        <el-button v-if="scope" link type="primary">解冻</el-button>
        <el-button v-if="scope" link type="primary">编辑</el-button>
        <el-button v-if="scope" link type="primary">删除</el-button>
        <el-button link type="primary">详情</el-button>
      </template>
    </zxn-table>
    <bind-dialog ref="BindDialogRef" />
  </zxn-plan>
</template>

<script lang="ts" setup>
import BindDialog from "./bindDialog.vue";
import { getBusinessAccountSettlementList } from "@/api/account/business";

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
  { label: "任务编号", prop: "settlement_order_no", minWidth: 250 },
  {
    label: "状态",
    prop: "status",
    type: "enum",
    path: "accountEnum.settleStatus",
    minWidth: 150,
    color: {
      0: {
        color: "#1ee685",
        background: "#dbfbeb",
      },
      1: {
        color: "#356FF3",
        background: "#DFE8FD",
      },
      2: {
        color: "#5EE9F9",
        background: "#E5FBFE",
      },
      3: {
        color: "#F35135",
        background: "#FDE3DF",
      },

      4: {
        color: "#333333",
        background: "#DEDEDE",
      },
    },
  },
  { label: "任务名称", prop: "task_name", minWidth: 200 },

  // { label: "任务数量", prop: "task_count" },
  // { label: "结算企业", prop: "company_name", width: 200 },
  { label: "税地", prop: "tax_land_name", minWidth: 250 },
  { label: "结算人数", prop: "person_count" },
  // { label: "实际人数", prop: "total_people" },
  // { label: "点位", prop: "tax_point" },
  { label: "打款金额", prop: "total_money", type: "money" },
  // { label: "实际下发", prop: "real_money" },
  // { label: "个人回单", prop: "transfer_certificate" },
  { label: "结算时间", prop: "settlement_time", width: 200 },

  // { label: "操作", slot: "operation", fixed: "right", width: 250 },
];
// 是否勾选
const selectable = (row: any) => {
  return row.company_id !== 0;
};
//选中的数据
//返回id数组
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};
const BindDialogRef = ref();
const handleBinding = async () => {
  if (!selectionData.value.length) {
    ElMessage({
      type: "error",
      message: `请选择数据`,
    });
    return;
  }
  BindDialogRef.value.init(selectionData.value);
};

async function getList() {
  if (props.id) {
    let params = {
      company_id: props.id,
      keywords: "",
      ...pageInfo,
    };
    tableData.length = 0;
    const res = await getBusinessAccountSettlementList(params);
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  }
}
function pageChange(current: any) {
  const { page, limit } = current;
  pageInfo.limit = limit;
  pageInfo.page = page;
  getList();
}

getList();
</script>
<style lang="scss" scoped>
.but {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>
