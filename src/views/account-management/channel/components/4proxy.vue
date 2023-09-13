<template>
  <div class="p-[37px]">
    <zxn-search
      :formItem="formItem"
      @on-reset="handleReset"
      @on-search="handleSearch"
    >
      <el-form-item>
        <el-input placeholder="请输入" v-model="formItem.keyword">
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="绑定日期">
        <zxn-date-range v-model="date" />
      </el-form-item>
    </zxn-search>
    <el-button type="primary" plain class="mb-[20px]" @click="add"
      >+新增</el-button
    >
    <zxn-table
      :table-data="tableData1"
      :column-list="columnList1"
      :page-info="pageInfo"
      @page-change="pageChange"
    ></zxn-table>
    <zxn-dialog
      v-model:visible="visible"
      title="新增企业"
      @close-dialog="handleClose"
      @confirm-dialog="handleConfirm"
    >
      <el-form :model="newForm" :rules="rules">
        <el-row>
          <el-col :span="22">
            <el-form-item label="企业名称" prop="tax_land_name">
              <el-select class="w-full" placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="税地名称" prop="channel_point">
              <el-select class="w-full" placeholder="请选择"></el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zxn-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getChannelProxyCompanyInfo } from "@/api/account/channel";

const props = defineProps({
  channel_id: {
    type: String || Number,
  },
});

const formItem = reactive({
  keyword: "",
});

const pageInfo = reactive({
  limit: 20,
  page: 1,
  total: 0,
});

const pageChange = (cur) => {
  const { limit, page } = cur;
  pageInfo.limit = limit;
  pageInfo.page = page;
  handleSearch();
};
const date = ref([]);
const visible = ref(false);

const tableData1 = reactive([]);
const columnList1 = [
  { label: "企业名称" },
  { label: "绑定税地名称" },
  { label: "企业点位" },
  { label: "渠道点位" },
  { label: "企业累计下发金额" },
  { label: "渠道佣金收益（税后）" },
  { label: "扣税点位" },
  { label: "绑定时间" },
  { label: "操作" },
];
const tableData2 = reactive([]);
const columnList2 = [
  { label: "企业名称" },
  { label: "绑定税地名称" },
  { label: "企业点位" },
  { label: "渠道点位" },
  { label: "企业累计结算金额" },
  { label: "渠道佣金收益" },
  { label: "绑定时间" },
  { label: "操作" },
];

const newForm = reactive({});
const rules = {};

const handleSearch = () => {
  let params = {
    channel_id: props.channel_id,
    keyword: formItem.keyword,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
    page: pageInfo.page,
    limit: pageInfo.limit,
  };
  getChannelProxyCompanyInfo(params).then((res) => {
    console.log(res);
  });
};
const handleReset = () => {};

const add = () => {
  visible.value = true;
};

const handleClose = () => {
  visible.value = false;
};
const handleConfirm = () => {};

handleSearch();
</script>

<style scoped></style>
