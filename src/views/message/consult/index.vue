<template>
  <zxn-plan>
    <zxn-tabs
      activeName="consult"
      :tabsList="[{ label: '在线咨询', name: 'consult' }]"
      hasUpdate
    />
    <div class="p-[24px] p-b-[0]">
      <zxn-search
        :formItem="formItem"
        @on-search="handleSearch"
        @on-reset="handleReset"
      >
        <el-form-item prop="keyword">
          <el-input v-model="formItem.keyword" placeholder="请输入关键字">
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="timeData" label="通知日期">
          <zxn-date-range v-model="formItem.timeData" valueFormat="" />
        </el-form-item>
      </zxn-search>
      <zxn-table
        :table-data="tableData"
        :column-list="columnList"
        :page-info="pageInfo"
        :loading="loading"
        @page-change="handlePageChange"
      >
        <template #operation="{ row }">
          <el-button link type="primary" @click="handleView(row)"
            >查看</el-button
          >
        </template>
      </zxn-table>
    </div>
    <el-dialog
      v-model="visible"
      class="zxn-dialog"
      title="需求描述"
      width="452"
    >
      <div class="consult-need">{{ curNeed }}</div>
    </el-dialog>
  </zxn-plan>
</template>
<script lang="ts">
export default {
  name: "consult",
};
</script>
<script setup lang="ts">
import { officialMsg } from "@/api/message";
import { transformTimeRange } from "@/utils";
const formItem = reactive({
  keyword: "",
  timeData: [],
});
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const tableData = reactive([]);
const columnList = [
  { label: "姓名", prop: "name", minWidth: 120 },
  { label: "联系方式", prop: "mobile", minWidth: 120 },
  { label: "企业名称", prop: "company_name", minWidth: 120 },
  { label: "信息内容", prop: "needs", minWidth: 240 },
  { label: "通知时间", prop: "add_time", width: 180 },
  { label: "操作", slot: "operation", fixed: "right", width: 90 },
];

const handleReset = () => {
  handleSearch();
};
const handleSearch = () => {
  pageInfo.page = 1;
  getList();
};
const handlePageChange = (cur) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  getList();
};
const loading = ref(false);
const getList = async () => {
  const params = transformTimeRange({ ...formItem }, "timeData", true);
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  loading.value = true;
  try {
    const { data } = await officialMsg(params);
    loading.value = false;
    tableData.length = 0;
    pageInfo.page = data.current_page;
    pageInfo.total = data.total;
    tableData.push(...data.data);
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};
const visible = ref(false);
const curNeed = ref("");
const handleView = (row) => {
  curNeed.value = row.needs;
  visible.value = true;
};
onActivated(() => {
  getList();
});
</script>
<style lang="scss" scoped>
.consult-need {
  min-height: 240px;
  font-size: 14px;
  font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
  font-weight: 500;
  color: #333333;
}
</style>
