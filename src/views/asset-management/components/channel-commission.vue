<template>
  <div class="p-x-[36px]">
    <div class="line-chart">
      <LineChart2 />
    </div>
    <div>
      <div class="title">
        <zxn-title>渠道数据合计</zxn-title>
      </div>
      <zxn-search @on-search="handleSearch" @on-reset="handleReset">
        <el-form-item label="渠道名称">
          <el-input placeholder="请输入渠道名称" v-model="formItem.name">
            <template #prefix>
              <i-ep-Search />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="渠道管理员">
          <el-input placeholder="请输入渠道管理员" v-model="formItem.admin">
            <template #prefix>
              <i-ep-Search />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="统计日期">
          <zxn-date-range v-model="date" />
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
                @click="chooseDate(item.val)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </template>
      </zxn-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import LineChart2 from "./line-chart2.vue";
import { getChannelCommissionList } from "@/api/money";

const dateList = [
  { name: "今年", val: "5" },
  { name: "去年", val: "6" },
  { name: "上周", val: "2" },
  { name: "本周", val: "1" },
  { name: "上月", val: "4" },
  { name: "本月", val: "3" },
];
const currentDate = ref("3");
const date = ref([]);

const formItem = reactive({
  name: "",
  admin: "",
});

const pageInfo1 = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const tableData1 = reactive([] as any);

const columnList1 = [
  { label: "渠道", prop: "channel_name" },
  { label: "渠道管理员", prop: "channel_admin" },
  {
    label: "渠道累计结算税前",
    prop: "commission",
    type: "money",
  },
  {
    label: "渠道累计结算税后",
    prop: "after_commission",
    type: "money",
  },
  {
    label: "最后结算时间",
    prop: "time",
  },
];

const handleReset = () => {
  formItem.name = "";
  formItem.admin = "";
  date.value = [];
  handleSearch();
};
const chooseDate = (date_val: string) => {
  currentDate.value = date_val;
  handleSearch();
};

const handleSearch = () => {
  let params = {
    time_type: currentDate.value,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
    channel_name: formItem.name,
    channel_admin: formItem.admin,
  };
  getChannelCommissionList(params).then((res) => {
    tableData1.length = 0;
    tableData1.push(...res.data.data);
    pageInfo1.total = res.data.total;
  });
};
handleSearch();
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
