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
        <el-form-item prop="tax_land_id" label="税地名称">
          <tax-source-select
            v-model:taxId="formItem.tax_land_id"
            @change-tax="handleSearch"
          />
        </el-form-item>
        <el-form-item label="统计日期">
          <el-date-picker
            v-model="date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            range-separator="-"
            :shortcuts="shortcuts"
            value-format="YYYY-MM-DD"
            @change="handleSearch"
          />
        </el-form-item>
      </zxn-search>
      <zxn-table
        :table-data="tableData1"
        :column-list="columnList1"
        :page-info="pageInfo1"
        @page-change="pageChange"
      >
      </zxn-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LineChart2 from "./line-chart2.vue";
import { getChannelCommissionList } from "@/api/money";
import { shortcuts } from "@/utils/dateUtil";
import dayjs from "dayjs";
const date = ref([
  dayjs().startOf("year").format("YYYY-MM-DD"),
  dayjs().endOf("year").format("YYYY-MM-DD"),
]);

const formItem = reactive({
  name: "",
  admin: "",
  tax_land_id: "",
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
  formItem.tax_land_id = "";
  date.value = [
    dayjs().startOf("year").format("YYYY-MM-DD"),
    dayjs().endOf("year").format("YYYY-MM-DD"),
  ];
  handleSearch();
};

function pageChange(current: any) {
  const { page, limit } = current;
  pageInfo1.limit = limit;
  pageInfo1.page = page;
  handleSearch();
}
const handleSearch = () => {
  let params = {
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
    channel_name: formItem.name,
    channel_admin: formItem.admin,
    tax_land_id: formItem.tax_land_id,
  };
  params.page = pageInfo1.page;
  params.limit = pageInfo1.limit;
  getChannelCommissionList(params).then((res) => {
    tableData1.length = 0;
    tableData1.push(...res.data.data);
    pageInfo1.total = res.data.total;
  });
};
onMounted(() => {
  handleSearch();
});
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
