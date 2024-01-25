<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
    >
      <el-form-item>
        <el-input
          v-model="formItem.name"
          placeholder="请输入姓名、联系号码、身份证号"
          clearable
        >
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="账户状态">
        <el-select
          v-model="formItem.status"
          placeholder="请选择"
          @change="handleSearch"
          filterable
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!--			<el-form-item prop="tax_land_id" label="税地名称">-->
      <!--				<tax-source-select v-model:taxId="formItem.tax_land_id" />-->
      <!--			</el-form-item>-->
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
      <!-- <template #tableTop>
        <el-dropdown trigger="click">
          <el-button type="primary">批量操作 </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">下载</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template> -->
      <template #caozuo="{ row }">
        <el-button
          v-if="row.user_status == 1"
          link
          type="primary"
          @click="setStatus(row.user_id, 2)"
          >封停</el-button
        >
        <el-button
          v-if="row.user_status == 2"
          link
          type="primary"
          @click="setStatus(row.user_id, 1)"
          >解封</el-button
        >
        <el-button
          link
          type="primary"
          @click="toDetail(row.idcard, row.real_name)"
          >详情</el-button
        >
      </template>
    </zxn-table>
  </div>
</template>

<script lang="ts" setup>
import {
  setPersonalStatus,
  getPersonalAccountList,
} from "@/api/account/personal";
import router from "@/router";

const statusOptions = ref([
  { label: "全部", value: "" },
  { label: "未认证", value: 0 },
  { label: "未注册", value: 5 },
  { label: "已认证", value: 1 },
  { label: "封停", value: 2 },
]);

const formItem = reactive({
  name: "",
  status: "",
  date: [],
  tax_land_id: "",
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const tableData = reactive([] as any);
const columnList = [
  { label: "姓名", prop: "real_name", minWidth: 120 },
  // { label: "税地名称", prop: "tax_land_name", width: 150 },
  {
    label: "状态",
    prop: "user_status",
    type: "enum",
    path: "accountEnum.personalType",
    color: {
      0: { color: "#333333", background: "#dedede" },
      1: { color: "#356FF3", background: "#dfe8fd" },
      2: { color: "#F35036", background: "#fde3df" },
      5: { color: "#1DE585", background: "#dbfbeb" },
    },
    minWidth: 120,
  },
  { label: "手机号", prop: "phone", type: "phone", minWidth: 150 },
  { label: "身份证号", prop: "idcard", type: "card", minWidth: 200 },
  { label: "累计任务", prop: "task_num", minWidth: 100 },
  { label: "累计结算", prop: "amount", type: "money", minWidth: 100 },
  // { label: "是否注册", prop: "type", slot: "type", minWidth: 100 },
  { label: "认证时间", prop: "update_time", minWidth: 200 },
  {
    label: "操作",
    slot: "caozuo",
    fixed: "right",
    minWidth: 120,
    align: "right",
  },
];

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
    start_time: formItem.date[0],
    end_time: formItem.date[1],
    page: pageInfo.page,
    limit: pageInfo.limit,
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
  formItem.date = [];
  handleSearch();
}

const toDetail = (idcard, name) => {
  router.push({
    name: "personal-account-detail",
    query: { ic: btoa(idcard), name },
  });
};

const setStatus = (user_id: number, status: number) => {
  ElMessageBox.confirm(`是否${status == 2 ? "封停" : "解封"}当前账户?`, "", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  }).then(() => {
    setPersonalStatus({ id: user_id, status }).then(() => {
      ElMessage({
        type: "success",
        message: "操作成功",
      });
      handleSearch();
    });
  });
};

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
