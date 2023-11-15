<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
    >
      <el-form-item>
        <el-input v-model="formItem.name" placeholder="请输入姓名或联系号码">
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="账户状态">
        <el-select v-model="formItem.status" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="date" label="认证时间">
        <zxn-date-range v-model="formItem.date" />
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
        <el-dropdown trigger="click">
          <el-button type="primary">批量操作 </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">下载</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template #caozuo>
        <el-button link type="primary">封停</el-button>
        <el-button link type="primary">详情</el-button>
      </template>
    </zxn-table>
  </div>
</template>

<script lang="ts" setup>
import {
  delPersonalAccount,
  getPersonalAccountList,
  setPersonalStatus,
} from "@/api/account/personal";
import router from "@/router";

// import router from "@/router";

const statusOptions = ref([
  { label: "全部", value: "" },
  { label: "正常", value: 2 },
  { label: "封停", value: 3 },
]);

const formItem = reactive({
  name: "",
  status: "",
  date: [],
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const date = ref("");

const tableData = reactive([] as any);
const columnList = [
  { label: "姓名", prop: "" },
  {
    label: "状态",
    prop: "status",
  },
  { label: "手机号", prop: "real_name" },
  { label: "身份证号", prop: "is_channel", slot: "is_channel" },
  { label: "累计任务", prop: "phone" },
  { label: "累计结算", prop: "add_time" },
  { label: "是否认证", prop: "add_time" },
  { label: "认证时间", prop: "add_time" },
  { label: "操作", slot: "caozuo", fixed: "right", width: 250, align: "right" },
];

// const toDetail = (status: string, id: number) => {
//   router.push({ name: "personal-account-detail", query: { status, id } });
// };

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
 * 查询
 */
async function handleSearch() {
  tableData.length = 0;
  let params = {
    ...formItem,
    ...pageInfo,
    start_time: date.value[0],
    end_time: date.value[1],
  };
  const { data } = await getPersonalAccountList(params);
  pageInfo.total = data.total;
  tableData.push(...data.data);
}
/**
 * 重置
 */
function handleReset() {
  formItem.name = "";
  formItem.status = "";
  date.value = "";
  handleSearch();
}

function stop(id: number, status: number) {
  if (status === 1) {
    ElMessageBox.confirm("是否解封账号?", "Warning", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      center: true,
    })
      .then(() => {
        setPersonalStatus({ id, status }).then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "解封成功",
          });
          handleSearch();
        });
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消删除",
        });
      });
  }
  if (status === 2) {
    ElMessageBox.confirm("是否封停账号?", "Warning", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      center: true,
    })
      .then(() => {
        setPersonalStatus({ id, status }).then((res) => {
          console.log(res);
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
          message: "取消删除",
        });
      });
  }
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
