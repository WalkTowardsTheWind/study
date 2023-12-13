<template>
  <zxn-plan>
    <zxn-tabs
      :tabs-list="state.tabslist"
      v-model:activeName="state.activeName"
    ></zxn-tabs>
    <div class="p-[24px]">
      <zxn-search
        :formItem="state.formItem"
        @on-reset="handleReset"
        @on-search="handleSearch"
      >
        <el-form-item label="">
          <el-input
            v-model="state.formItem.name"
            placeholder="请输入任务标题、文件名"
            clearable
          >
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="模块选择">
          <el-select
            placeholder="请选择"
            v-model="state.formItem.module"
            @change="handleChange"
            clearable
          >
            <el-option label="全部" value=""></el-option>
            <el-option label="账户管理" value="1"></el-option>
            <el-option label="合同管理" value="2"></el-option>
            <el-option label="任务管理" value="3"></el-option>
            <el-option label="财务管理" value="4"></el-option>
            <el-option label="发票管理" value="5"></el-option>
            <el-option label="税地管理" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最后下载日期" class="" label-width="120px">
          <zxn-date-range v-model="timeData" />
        </el-form-item>
      </zxn-search>
      <zxn-table
        :table-data="state.tableData"
        :column-list="columnList"
        :page-info="state.pageInfo"
        @selection-change="handleSelectChange"
        @page-change="pageChange"
      >
        <!-- <template #tableTop>
					<el-button type="primary" plain>批量下载</el-button>
				</template> -->
        <template #operation="scope">
          <el-button type="primary" link @click="handleDownload(scope.row)"
            >下载</el-button
          >
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { getDownloadList } from "../../api/download";
import { downloadByOnlineUrl } from "@/utils/download";

const state = reactive({
  tabslist: [{ name: "1", label: "下载中心" }],
  activeName: "1",
  formItem: {
    name: "",
    module: "",
  },
  date: "",
  pageInfo: {
    page: 1,
    limit: 20,
    total: 0,
  },
  tableData: [],
});
const timeData = ref([]);

const columnList = [
  {
    label: "任务标题",
    prop: "title",
  },
  {
    label: "文件名",
    prop: "file_name",
  },
  {
    label: "文件类型",
    prop: "file_type",
  },
  {
    label: "模块类型",
    prop: "module_type",
  },
  {
    label: "下载账户",
    prop: "real_name",
  },
  {
    label: "创建时间",
    prop: "add_time",
  },
  {
    label: "最后下载时间",
    prop: "update_time",
  },
  {
    label: "操作",
    slot: "operation",
  },
];

const handleSearch = () => {
  let params = {
    keyword: state.formItem.name,
    start_time: timeData.value[0] || "",
    end_time: timeData.value[1] || "",
    module_type: state.formItem.module,
    limit: state.pageInfo.limit,
    page: state.pageInfo.page,
  };
  getDownloadList(params).then((res) => {
    // console.log(res);
    state.tableData = res.data.data;
    state.pageInfo.total = res.data.total;
  });
};
const handleDownload = (item) => {
  downloadByOnlineUrl(`/adminapi/file/download/${item.id}`);
};
const handleChange = (val) => {
  state.formItem.module = val;
  handleSearch();
};
const handleReset = () => {
  state.formItem.name = "";
  state.formItem.module = "";
  timeData.value = [];
  handleSearch();
};
const handleSelectChange = () => {};
const pageChange = (cur: any) => {
  const { page, limit } = cur;
  state.pageInfo.page = page;
  state.pageInfo.limit = limit;
  handleSearch();
};
handleSearch();
</script>

<style scoped lang="scss"></style>
