<template>
  <zxn-plan>
    <div class="p-[24px] p-b-[0]">
      <zxn-search
        :formItem="formItem"
        @on-search="handleSearch"
        @on-reset="handleReset"
      >
        <el-form-item>
          <el-input v-model="formItem.value" placeholder="请输入关键字">
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="date" label="操作账户">
          <el-input v-model="formItem.value" />
        </el-form-item>
        <el-form-item prop="date" label="联系人">
          <el-input v-model="formItem.value" />
        </el-form-item>
        <el-form-item prop="date" label="申请日期">
          <zxn-date-range v-model="formItem.date" />
        </el-form-item>
        <template #rightBtn>
          <el-button type="primary" plain>导出</el-button>
        </template>
      </zxn-search>
      <zxn-table
        :table-data="tableData"
        :column-list="columnList"
        :page-info="pageInfo"
        @page-change="handlePageChange"
      >
        <template #operation>
          <el-button link type="primary">查看</el-button>
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
</template>
<script setup lang="ts">
import { systemLog } from "@/api/system";
import { transformTimeRange } from "@/utils";
const formItem = reactive({
  value: "",
});
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const tableData = reactive([]);
const columnList = [
  { label: "账户id", prop: "admin_id" },
  { label: "联系人", prop: "admin_name" },
  { label: "操作模块", prop: "path" },
  { label: "操作内容", prop: "method" },
  { label: "操作时间", prop: "add_time" },
  // { label: "操作", slot: "operation", fixed: "right", width: 90 },
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
const getList = async () => {
  const params = transformTimeRange({ ...formItem });
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  try {
    const { data } = await systemLog(params);
    console.log(data, "222");
    tableData.length = 0;
    pageInfo.page = data.current_page;
    pageInfo.total = data.total;
    tableData.push(...data.data);
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => {
  getList();
});
</script>
