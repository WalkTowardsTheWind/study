<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-reset="handleReset"
      @on-search="handleSearch"
    >
      <el-form-item>
        <el-input v-model="formItem.company_name" placeholder="请输入关键字">
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="账户状态">
        <el-select v-model="formItem.status" placeholder="请选择">
          <el-option
            v-for="item in options"
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
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          value-format="YYYY-MM-DD"
          end-placeholder="结束日期"
        />
      </el-form-item>
    </zxn-search>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      hasSelect
      :page-info="pageInfo"
      @page-change="pageChange"
    >
      <template #tableTop>
        <el-button
          type="primary"
          @click="$router.push({ name: 'business-account-add' })"
          >+ 新建</el-button
        >
        <el-dropdown class="ml-4" trigger="click">
          <el-button type="primary">批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">封停</el-dropdown-item>
              <el-dropdown-item command="2">解封</el-dropdown-item>
              <el-dropdown-item command="3">导出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template #operation="scope">
        <el-button
          v-if="
            scope.row.status !== 4 &&
            scope.row.status !== 0 &&
            scope.row.status !== 1
          "
          link
          type="primary"
          @click="stop(scope.row.company_id, '2')"
          >封停</el-button
        >
        <el-button
          v-if="scope.row.status === 0"
          link
          type="primary"
          @click="toDetail('check', scope.row.company_id)"
          >审核</el-button
        >
        <el-button
          v-if="scope.row.status === 4"
          link
          type="primary"
          @click="free(scope.row.company_id, '1')"
          >解封</el-button
        >
        <el-button
          v-if="scope.row.status === 1"
          link
          type="primary"
          @click="toDetail('upload', scope.row.company_id)"
          >上传</el-button
        >
        <el-button link type="primary" @click="toDetail('edit', scope.row.id)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="del(scope.row.id)"
          >删除</el-button
        >
        <el-button link type="primary">导出</el-button>
        <el-button link type="primary" @click="toDetail('detail', scope.row.id)"
          >详情</el-button
        >
      </template>
    </zxn-table>
  </div>
</template>

<script lang="ts" setup>
import {
  businessAccountSetStatus,
  deleteBusinessAccount,
  getBusinessAccountList,
} from "@/api/account/business";
import router from "@/router";

const options = ref([
  { label: "全部", value: "" },
  { label: "申请中", value: 0 },
  { label: "未认证 ", value: 1 },
  { label: "正常", value: 2 },
  { label: "预警", value: 3 },
  { label: "封停", value: 4 },
]);

const formItem = reactive({
  company_name: "",
  status: "",
  start_time: "",
  end_time: "",
});
const pageInfo = reactive({
  total: 0,
  page: 1,
  limit: 20,
});
const date = ref("");

const tableData = reactive([] as any);
const columnList = [
  { label: "账户ID", prop: "company_id", width: 100 },
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
      width: 80,
    },
  },
  { label: "企业", prop: "company_name" },
  { label: "联系人", prop: "contacts" },
  { label: "联系方式", prop: "mobile" },
  { label: "客户点位", prop: "tax_point" },
  { label: "创建时间", prop: "add_time" },
  { label: "操作", slot: "operation", fixed: "right", width: 280 },
];

const toDetail = (status: string, id: string) => {
  router.push({ name: "business-account-detail", query: { status, id } });
};

/**
 * 查询
 */
async function handleSearch() {
  tableData.length = 0;
  let params = {
    ...formItem,
    page: pageInfo.page,
    limit: pageInfo.limit,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
  };
  try {
    const { data } = await getBusinessAccountList(params);
    pageInfo.total = data.total;
    pageInfo.page = data.current_page;
    tableData.push(...data.data);
  } catch (error: any) {
    return new Error("error", error);
  }
}
/**
 * 重置
 */
function handleReset() {
  formItem.company_name = "";
  formItem.status = "";
  date.value = "";
}

/**
 * 页面
 */
function pageChange(current: any) {
  console.log(current);
  const { page, limit } = current;
  pageInfo.limit = limit;
  pageInfo.page = page;
  handleSearch();
}

/**
 * 删除企业账户
 */
function del(id: number) {
  ElMessageBox.confirm("是否删除企业账号?", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  })
    .then(() => {
      deleteBusinessAccount(id).then(() => {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        handleSearch();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消",
      });
    });
}

function stop(id: string, status: string) {
  ElMessageBox.confirm("是否封停企业账号?", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  })
    .then(() => {
      businessAccountSetStatus({ id, status }).then(() => {
        ElMessage({
          type: "success",
          message: "封停成功",
        });
        handleSearch();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消",
      });
    });
}

function free(id: string, status: string) {
  ElMessageBox.confirm("是否解封企业账号?", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  })
    .then(() => {
      businessAccountSetStatus({ id, status }).then(() => {
        ElMessage({
          type: "success",
          message: "封停成功",
        });
        handleSearch();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消",
      });
    });
}

handleSearch();
</script>

<style lang="scss">
.searchForm {
  margin-top: 10px;
}

.line {
  margin: 0 2px;
  font-size: 1px;
  color: #ccc;
  border: none !important;
}
</style>
