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
          <el-select
            placeholder="请选择"
            v-model="formItem.status"
            @change="handleSelectChange"
						filterable
						clearable
          >
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
        <template #apply_url="{ row }">
          <el-button
            type="primary"
            link
            :disabled="!(row.apply_url.length > 0)"
            @click="checkUrl(row.apply_url)"
            >查看发票</el-button
          >
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

const tableData = reactive([] as any);

const columnList = [
  { label: "任务人名称", prop: "real_name" },
  {
    label: "开票状态",
    prop: "apply_status",
    type: "enum",
    path: "invoiceEnum.personInvoice",
    color: {
      0: {
        color: "#333",
        background: "#dedede",
      },
      1: {
        color: "#356FF3",
        background: "#dfe8fd",
      },
    },
  },
  { label: "开票金额", type: "money", prop: "settlement_amount" },
  { label: "关联任务", prop: "task_name" },
  { label: "开票时间", prop: "apply_time" },
  { label: "操作", slot: "apply_url", prop: "apply_url" },
];

const handleSearch = () => {
  let params = {
    name: formItem.name,
    apply_status: formItem.status,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
  };
  getPersonInvoiceList(params).then((res) => {
    // console.log(res);
    tableData.length = 0;
    pageInfo.total = res.data.total;
    tableData.push(...res.data.data);
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

const handleSelectChange = (val) => {
  formItem.status = val;
  handleSearch();
};

const uploadImg = () => {};

const checkUrl = (url) => {
  window.open(url, "_blank");
};

handleSearch();
</script>

<style scoped></style>
