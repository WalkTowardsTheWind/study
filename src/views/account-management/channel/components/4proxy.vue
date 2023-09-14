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
            <el-form-item label="税地名称" prop="channel_point">
              <el-select
                class="w-full"
                placeholder="请选择"
                @change="handleSelect"
                v-model="newForm.tax_land_id"
              >
                <el-option
                  v-for="i of taxlandList"
                  :key="i.id"
                  :value="i.id"
                  :label="i.tax_land_name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业名称" prop="tax_land_name">
              <el-select
                class="w-full"
                placeholder="请选择"
                v-model="newForm.company"
              >
                <el-option
                  v-for="i of companyList"
                  :key="i.id"
                  :value="i.id"
                  :label="i.company_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zxn-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  getChannelProxyCompanyInfo,
  getCompanyByTaxland,
} from "@/api/account/channel";
import useTaxlandList from "@/hooks/useTaxlandList";

const props = defineProps({
  channel_id: {
    type: String || Number,
  },
});

const taxlandList = ref([] as any);
const companyList = ref([] as any);

const formItem = reactive({
  keyword: "",
});

const pageInfo = reactive({
  limit: 20,
  page: 1,
  total: 0,
});

const pageChange = (cur: any) => {
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

const newForm = reactive({
  tax_land_id: "",
  company: "",
});
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

const add = async () => {
  visible.value = true;
  const arr = await useTaxlandList();
  taxlandList.value.length = 0;
  taxlandList.value = arr;
};

const handleClose = () => {
  visible.value = false;
};
const handleConfirm = () => {};

const handleSelect = (tax_land_id: string) => {
  console.log(tax_land_id);
  getCompanyByTaxland(tax_land_id).then((res) => {
    console.log(res);
    companyList.value.length = 0;
    companyList.value = res.data;
  });
};

handleSearch();
</script>

<style scoped></style>
