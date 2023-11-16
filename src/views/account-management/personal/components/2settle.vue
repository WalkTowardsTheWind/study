<template>
  <div class="m-24px">
    <zxn-search @on-search="search" @on-reset="reset">
      <el-form-item label="结算日期">
        <zxn-date-range v-model="date" />
      </el-form-item>
    </zxn-search>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="pageChange"
      hasSelect
      @selection-change="select"
    >
      <template #tableTop>
        <el-button type="primary" plain @click="piliangdaochu"
          >结算信息导出</el-button
        >
      </template>
      <template #caozuo="{ row }">
        <el-button type="primary" link @click="daochu(row.id)">导出</el-button>
      </template>
    </zxn-table>
  </div>
</template>

<script lang="ts" setup>
import { getSettle, perDaoChu } from "@/api/account/personal";
import { downloadByData } from "@/utils/download";

const props = defineProps({
  idcard: {
    default: () => "",
  },
});

const ids = ref([] as any);
const date = ref([] as any);
const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});
const pageChange = (cur) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  search();
};
const tableData = ref([] as any);
const columnList = [
  { label: "任务编号", prop: "task_no" },
  { label: "任务名称", prop: "task_name" },
  { label: "关联企业", prop: "company_name" },
  { label: "税地名称", prop: "tax_land_name" },
  { label: "行业", prop: "name" },
  { label: "结算金额", prop: "settlement_amount", type: "money" },
  { label: "申请时间", prop: "add_time" },
  { label: "操作", slot: "caozuo" },
];

const search = () => {
  let params = {
    id: props.idcard,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
    page: pageInfo.page,
    limit: pageInfo.limit,
  };

  getSettle(params).then((res) => {
    tableData.value = res.data.data;
    pageInfo.total = res.data.total;
  });
};
const reset = () => {
  date.value = [];
  search();
};

const daochu = (id) => {
  console.log(id);
  perDaoChu({ ids: [id] }).then((res) => {
    // console.log(res);
    downloadByData(res.data, "人员结算列表.xlsx");
  });
};

const select = (val) => {
  ids.value = val.map((i) => i.id);
};

const piliangdaochu = () => {
  if (ids.value.length) {
    perDaoChu({ ids: ids.value }).then((res) => {
      downloadByData(res.data, "人员结算列表.xlsx");
    });
  }
};

search();
</script>

<style scoped></style>
