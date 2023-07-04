<template>
  <div class="p-x-[48px]">
    <div class="line-chart">
      <LineChart1 />
    </div>
  </div>
  <!-- <div>
      <div class="title">
        <div class="line"></div>
        <div>企业列表</div>
      </div>
      <zxn-table
        :table-data="tableData1"
        :column-list="columnList1"
        :page-info="pageInfo"
      >
        <template #operation="scope">
          <el-button link @click="toDetail(scope.row)">详情</el-button>
        </template>
      </zxn-table>
    </div>
    <div>
      <div class="title">
        <div class="line"></div>
        <div>产品数据合计</div>
      </div>
      <zxn-table
        :table-data="tableData2"
        :column-list="columnList2"
      ></zxn-table>
    </div>
  </div> -->

  <!-- 详情 -->
  <!-- <el-dialog v-model="visible" title="企业明细">
    <div class="title">
      <span>企业名称：1000000000</span>
      <span class="ml-10">企业账户ID：1000001</span>
    </div>
    <h4>充值明细</h4>
    <el-table></el-table>
    <h4>企业结算明细</h4>
    <el-table> </el-table>
  </el-dialog> -->
</template>

<script lang="ts" setup>
import router from "@/router";
import LineChart1 from "./line-chart1.vue";
import { getBusinessList } from "@/api/money";

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const visible = ref(false);

const tableData1 = reactive([] as any);
const tableData2 = reactive([]);

const columnList1 = [
  { label: "企业ID", prop: "id", width: 100 },
  {
    label: "状态",
    type: "enum",
    path: "accountEnum.businessType",
    prop: "status",
    color: {
      0: { color: "#1DE585", background: "#dbfbeb" },
      1: { color: "#35C5F3", background: "#dff6fd" },
      2: { color: "#356FF3", background: "#dfe8fd" },
      3: { color: "#F35036", background: "#fde3df" },
      4: { color: "#333333", background: "#dedede" },
      width: 80,
    },
  },
  { label: "企业名称", prop: "company_name" },
  { label: "累计充值", prop: "total_recharge" },
  { label: "累计结算", prop: "total_settlement" },
  { label: "企业余额", prop: "balance" },
  { label: "操作", slot: "operation", fixed: "right", width: 280 },
];
const columnList2 = [
  { label: "产品类型", prop: "company_id", width: 100 },
  { label: "打款金额", prop: "company_name" },
  { label: "结算金额", prop: "contacts" },
  { label: "利润", prop: "mobile" },
];

function getList() {
  let params = {
    ...pageInfo,
  };
  getBusinessList(params).then((res) => {
    tableData1.push(...res.data.list.data);
    pageInfo.total = res.data.list.total;
  });
}

function toDetail(item: any) {
  router.push({
    name: "recharge-detail",
    query: { id: item.id, name: item.company_name },
  });
}

getList();
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: sans-serif;
  font-size: 14px;
  color: #356ff3;
}

.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
}

.line {
  display: flex;
  width: 4px;
  height: 14px;
  margin-right: 10px;
  background: #356ff3;
  border-radius: 4px;
}
</style>
