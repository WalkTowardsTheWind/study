<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName">
      <template #1>
        <div class="recharge">
          累计充值<span class="money">{{ total_amount }}</span>
        </div>
        <div class="p-[24px]">
          <zxn-search
            :formItem="formItem"
            @on-search="handleSearch"
            @on-reset="handleReset"
          >
            <el-form-item label="">
              <el-input v-model="formItem.name" placeholder="请输入">
                <template #prefix>
                  <i-ep-Search />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="税源地">
              <el-select v-model="formItem.tax_land_id" placeholder="请选择">
                <el-option
                  v-for="item in taxLand"
                  :key="item.id"
                  :label="item.tax_land_name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="充值状态">
              <el-select v-model="formItem.status" placeholder="请选择">
                <el-option
                  v-for="item in taskStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="date" label="创建日期">
              <el-date-picker
                v-model="date"
                type="daterange"
                value-format="YYYY-MM-DD"
                unlink-panels
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item label="行业">
              <el-select v-model="formItem.category_id" placeholder="请选择">
                <el-option
                  v-for="(item, index) in categoryList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </zxn-search>
          <zxn-table
            :table-data="tableData"
            :column-list="columnList"
            hasSelect
            :page-info="pageInfo"
          >
            <template #tableTop>
              <el-dropdown class="" trigger="click">
                <el-button type="primary" plain>批量操作</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="1">删除</el-dropdown-item>
                    <el-dropdown-item command="2">下载</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <template #certificate="scope">
              <el-image
                style="width: 30px; height: 30px"
                :src="scope.row.certificate"
                :zoom-rate="1.2"
                :preview-src-list="[scope.row.certificate]"
                fit="contain"
                :z-index="999"
                :preview-teleported="true"
              />
            </template>
            <template #operation="scope">
              <el-button
                link
                type="primary"
                @click="toUpload(scope.row.recharge_id)"
                >下载</el-button
              >
              <el-button
                disabled
                link
                type="primary"
                @click="toDetail(scope.row.recharge_id)"
                >详情</el-button
              >
            </template>
          </zxn-table>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getCategoryList } from "@/api/category";
import { getLandList } from "@/api/common";
import { getRechargeTaskList } from "@/api/recharge";
import router from "@/router";

const tabsList = [
  {
    name: "1",
    label: "任务充值",
  },
];

const taskStatus = [
  {
    label: "全部",
    value: "",
  },
  {
    label: "未到账 ",
    value: "0",
  },
  {
    label: "已到账 ",
    value: "1",
  },
];
const total_amount = ref();

const taxLand = ref([
  {
    id: "",
    tax_land_name: "全部",
  },
] as any);

const categoryList = ref([
  {
    id: "",
    name: "全部",
  },
] as any);

const activeName = ref("1");

const date = ref([] as any);

const formItem = reactive({
  name: "",
  status: "",
  category_id: "",
  tax_land_id: "",
  start_time: date[0] || "",
  end_time: date[1] || "",
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const tableData = reactive([] as any);
const columnList = [
  { label: "充值单号", prop: "recharge_order_no", width: 200 },
  {
    label: "状态",
    prop: "status",
    type: "enum",
    path: "accountEnum.taskType",
    color: {
      0: {
        color: "#36C5F3",
        background: "#dff6fd",
      },
      1: {
        color: "#366FF3",
        background: "#dfe8fd",
      },
    },
  },
  { label: "企业名称", prop: "company_name" },
  // { label: "关联任务", prop: "certificate", slot: "certificate" },
  { label: "行业", prop: "category" },
  { label: "税源地", prop: "tax_land_name" },
  { label: "税地账户", prop: "bank_account", width: 200 },
  { label: "充值额度", prop: "amount" },
  { label: "充值时间", prop: "add_time", width: 200 },
  { label: "充值凭证", slot: "certificate" },
  { label: "操作", slot: "operation", fixed: "right", width: 200 },
];

const toDetail = (id: string) => {
  router.push({ name: "recharge-center-detail", query: { id } });
};
const toUpload = (id: string) => {
  console.log(id);
  // router.push({ name: "recharge-center-detail", query: { id } });
};

const toSee = (url: string) => {
  console.log(url);
};

function handleSearch() {
  let params = {
    ...pageInfo,
    ...formItem,
  };
  getRechargeTaskList(params).then((res) => {
    tableData.length = 0;
    total_amount.value = res.data.total_amount;
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  });
}

function getCategory() {
  getCategoryList({ type: "0" }).then((res) => {
    categoryList.value.push(...res.data);
  });
}

function getTaxLand() {
  getLandList().then((res) => {
    taxLand.value.push(...res.data);
  });
}

function handleReset() {
  formItem.name = "";
  formItem.tax_land_id = "";
  formItem.status = "";
  date.value = [];
  formItem.category_id = "";
  handleSearch();
}
handleSearch();
getTaxLand();
getCategory();
</script>

<style lang="scss">
.line {
  margin: 0 2px;
  font-size: 1px;
  color: #ccc;
  border: none !important;
}

.recharge {
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 25px;
  margin-top: 25px;
  margin-right: 28px;
  margin-left: 25px;
  font-size: 14px;
  background: #fef1ef;
  border-radius: 2px;
}

.money {
  margin-left: 19px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
</style>
