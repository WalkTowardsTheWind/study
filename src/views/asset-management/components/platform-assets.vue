<template>
  <div class="p-x-[36px]">
    <div class="line-chart">
      <LineChart1 />
    </div>
    <div>
      <div class="title">
        <zxn-title>企业列表</zxn-title>
      </div>
      <zxn-search @on-search="handleSearch" @on-reset="handleReset">
        <el-form-item label="企业名称">
          <el-input
            placeholder="请输入企业名称"
            v-model="formItem.company_name"
          >
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
            <!-- <el-button type="primary" plain>导出EXCEL</el-button> -->
            <div></div>
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
import LineChart1 from "./line-chart1.vue";
import { getCompanyCommissionList } from "@/api/money";

const dateList = [
  { name: "今年", val: "5" },
  { name: "去年", val: "6" },
  { name: "上周", val: "2" },
  { name: "本周", val: "1" },
  { name: "上月", val: "4" },
  { name: "本月", val: "3" },
];
const currentDate = ref("5");
const date = ref([]);
const formItem = reactive({
  company_name: "",
  tax_land_id: "",
});

const pageInfo1 = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const tableData1 = reactive([] as any);

const columnList1 = [
  { label: "企业名称", prop: "company_name" },
  { label: "税地名称", prop: "tax_land_name" },
  {
    label: "累计充值",
    prop: "recharge_amount",
    type: "money",
  },
  {
    label: "累计结算",
    prop: "settlement_amount",
    type: "money",
  },
  {
    label: "企业余额",
    prop: "balance_amount",
    type: "money",
  },
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
    },
    width: 100,
  },
];

const handleReset = () => {
  formItem.company_name = "";
  formItem.tax_land_id = "";
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
    company_name: formItem.company_name,
    tax_land_id: formItem.tax_land_id,
  };
  getCompanyCommissionList(params).then((res) => {
    tableData1.length = 0;
    tableData1.push(...res.data.data);
    pageInfo1.total = res.data.total;
  });
};
handleSearch();
</script>

<style lang="scss" scoped>
.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
}

.title {
  margin: 50px 0 20px;
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
