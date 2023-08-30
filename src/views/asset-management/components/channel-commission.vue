<template>
  <div class="p-x-[48px]">
    <div class="line-chart">
      <LineChart2 />
    </div>
    <div>
      <div class="title">
        <zxn-title>渠道数据合计</zxn-title>
      </div>
      <zxn-search @on-search="handleSearch" @on-reset="handleReset">
        <el-form-item>
          <el-input placeholder="请输入渠道名称">
            <template #prefix>
              <i-ep-Search />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="渠道管理员">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="统计日期">
          <zxn-date-range />
        </el-form-item>
      </zxn-search>
      <zxn-table
        :table-data="tableData1"
        :column-list="columnList1"
        :page-info="pageInfo1"
      >
        <template #tableTop>
          <div class="flex justify-between">
            <el-button type="primary" plain>导出EXCEL</el-button>
            <div class="date">
              <div
                v-for="(item, index) in dateList"
                :key="index"
                :class="{ active: item.val == currentDate }"
                @click="chooseDate(item.val, index)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </template>
        <template #operation="scope">
          <el-button link @click="toDetail(scope.row)">详情</el-button>
        </template>
      </zxn-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import LineChart2 from "./line-chart2.vue";
import { getChannelTotalList } from "@/api/money";

const dateList = [
  { name: "今年", val: "2" },
  { name: "去年", val: "1" },
  { name: "上周", val: "4" },
  { name: "本周", val: "5" },
  { name: "上月", val: "6" },
  { name: "本月", val: "3" },
];
const currentDate = ref("3");

const pageInfo1 = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const tableData1 = reactive([] as any);

const columnList1 = [
  { label: "渠道", prop: "channel_name" },
  { label: "渠道管理员", prop: "amount_before_tax" },
  {
    label: "渠道累计结算税前",
    prop: "amount_after_tax",
  },
  {
    label: "渠道累计结算税后",
  },
  {
    label: "统计时间",
  },
];

function getList1() {
  let params = {
    ...pageInfo1,
  };
  getChannelTotalList(params).then((res) => {
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

const handleSearch = () => {};
const handleReset = () => {};
const chooseDate = (date_val) => {
  currentDate.value = date_val;
};

getList1();
</script>

<style lang="scss" scoped>
.title {
  margin: 50px 0 20px;
}

.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
}

.date {
  display: flex;
  font-size: 14px;

  div {
    width: 60px;
    height: 40px;
    margin: 0 8px;
    line-height: 40px;
    color: #333;
    text-align: center;
    cursor: pointer;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
  }

  div.active {
    color: #366ff4;
    border-color: #366ff4;
  }
}
</style>
