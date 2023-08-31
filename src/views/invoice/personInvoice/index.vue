<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName"></zxn-tabs>
    <div class="p-[36px]">
      <zxn-search @on-search="handleSearch" @on-reset="handleReset">
        <el-form-item>
          <el-input
            placeholder="请输入任务人名称"
            v-model="formItem.name"
            clearable
          >
            <template #prefix>
              <i-ep-Search />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select placeholder="请选择" v-model="formItem.status">
            <el-option value="" label="全部"></el-option>
            <el-option value="1" label="已开票"></el-option>
            <el-option value="0" label="未开票"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开票时间">
          <zxn-date-range v-model="date" />
        </el-form-item>
      </zxn-search>
      <zxn-table
        ref="table"
        :table-data="tableData"
        :column-list="columnList"
        hasSelect
        @selection-change="handleSelection"
        :page-info="pageInfo"
        @page-change="handlePageChange"
      >
        <template #tableTop>
          <el-button type="primary" plain @click="uploadImg"
            >下载发票</el-button
          >
        </template>
        <template #img="{ row }">
          <el-button type="primary" link>查看发票</el-button>
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { getPersonInvoiceList } from "@/api/invoice/index";

const tabsList = [{ name: "1", label: "个人发票" }];
const activeName = ref("1");
const table = ref();

const formItem = reactive({
  name: "",
  status: "",
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const date = ref([]);

const tableData = reactive([]);

const columnList = [
  { label: "任务人名称" },
  { label: "开票状态" },
  { label: "开票金额", type: "money" },
  { label: "关联任务" },
  { label: "开票时间" },
  { label: "操作", slot: "img" },
];

const handleSearch = () => {
  let params = {
    name: formItem.name,
    apply_status: formItem.status,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
  };
  getPersonInvoiceList(params).then((res) => {
    console.log(res);
  });
};
const handleReset = () => {
  formItem.name = "";
  formItem.status = "";
  date.value = [];
  handleSearch();
};

const handleSelection = (val: []) => {};

const handlePageChange = (cur) => {
  const { limit, page } = cur;
  pageInfo.limit = limit;
  pageInfo.page = page;
  handleSearch();
};

const uploadImg = () => {};
</script>

<style scoped></style>
