<template>
  <div class="p-x-[48px]">
    <div class="line-chart">
      <LineChart2 />
    </div>
    <div>
      <div class="title">
        <div class="line"></div>
        <div>渠道数据合计</div>
      </div>
      <zxn-table
        :table-data="tableData1"
        :column-list="columnList1"
        :page-info="pageInfo1"
      >
        <template #operation="scope">
          <el-button link @click="toDetail(scope.row)">详情</el-button>
        </template>
      </zxn-table>
    </div>
    <div>
      <div class="title">
        <div class="line"></div>
        <div>渠道对账单</div>
      </div>
      <zxn-table
        :table-data="tableData2"
        :column-list="columnList2"
        :page-info="pageInfo2"
      ></zxn-table>
    </div>
    <div>
      <div class="title">
        <div class="line"></div>
        <div>渠道管理员数据合计</div>
      </div>
      <zxn-table
        :table-data="tableData3"
        :column-list="columnList3"
        :page-info="pageInfo3"
      ></zxn-table>
    </div>
  </div>

  <!-- 详情 -->
  <el-dialog v-model="visible" title="企业明细">
    <div class="title">
      <span>企业名称：1000000000</span>
      <span class="ml-10">企业账户ID：1000001</span>
    </div>
    <h4>充值明细</h4>
    <el-table></el-table>
    <h4>企业结算明细</h4>
    <el-table> </el-table>
  </el-dialog>
</template>

<script lang="ts" setup>
import router from "@/router";
import LineChart2 from "./line-chart2.vue";
import { getChannelTotalList } from "@/api/money";

const pageInfo1 = reactive({
  page: 1,
  limit: 20,
  total: 0,
});
const pageInfo2 = reactive({
  page: 1,
  limit: 20,
  total: 0,
});
const pageInfo3 = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const visible = ref(false);

const tableData1 = reactive([] as any);
const tableData2 = reactive([] as any);
const tableData3 = reactive([] as any);

const columnList1 = [
  { label: "企业ID", prop: "channel_id" },
  { label: "渠道", prop: "channel_name" },
  { label: "渠道结算税前", prop: "amount_before_tax" },
  {
    label: "渠道结算税后",
    prop: "amount_after_tax",
  },
  {
    label: "销售部业绩",
  },
  {
    label: "渠道结算合计",
  },
];

const columnList2 = [
  { label: "客户名称", prop: "company_id" },
  { label: "产品类型", prop: "company_name" },
  { label: "客户点位", prop: "contacts" },
  { label: "渠道点位", prop: "contacts" },
  { label: "成本点位", prop: "contacts" },
  { label: "渠道", prop: "contacts" },
  { label: "渠道管理员", prop: "contacts" },
  { label: "所属供应商", prop: "contacts" },
];

const columnList3 = [
  { label: "产品类型", prop: "company_id", width: 100 },
  { label: "打款金额", prop: "company_name" },
  { label: "结算金额", prop: "contacts" },
  { label: "利润", prop: "mobile" },
];

function getList1() {
  let params = {
    ...pageInfo1,
  };
  getChannelTotalList(params).then((res) => {
    console.log(res);
    tableData1.push(...res.data.data);
    pageInfo1.total = res.data.total;
  });
}

function toDetail(item: any) {
  router.push({
    name: "recharge-detail",
    query: { id: item.id, name: item.company_name },
  });
}

getList1();
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  gap: 0 16px;
  margin: 20px 0 30px;

  &-item {
    width: 272px;
    height: 160px;
    background: #f5f5f5;
    border: none;
    border-radius: 4px;

    &-title {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }

    &-money {
      margin: 10px 0 20px;
      font-size: 32px;
      font-weight: bold;
      color: #356ff3;
    }

    &-bi {
      display: flex;
      gap: 0 10px;
      align-items: center;
      font-size: 13px;
    }
  }
}

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
