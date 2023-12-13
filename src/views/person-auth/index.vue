<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabslist" v-model:activeName="activeName"></zxn-tabs>
    <div class="p-[24px]">
      <zxn-search
        :formItem="formItem"
        @on-reset="handleReset"
        @on-search="handleSearch"
      >
        <el-form-item label="">
          <el-input
            v-model="formItem.name"
            placeholder="请输入姓名、身份证、手机号、银行卡号、认证企业"
          >
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="认证状态">
          <el-select
            v-model="formItem.status"
            placeholder="请选择"
            @change="handleChange"
          >
            <el-option value="" label="全部" />
            <el-option value="0" label="认证中" />
            <el-option value="1" label="成功" />
            <el-option value="2" label="失败" />
          </el-select>
        </el-form-item>
        <el-form-item label="认证日期">
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
        ref="table"
        :loading="loading"
        :column-list="columnList"
        hasSelect
        @selection-change="handleSelect"
        :page-info="pageInfo"
        @page-change="pageChange"
      >
        <template #tableTop>
          <el-dropdown class="" trigger="click" @command="handleExport">
            <el-button type="primary">导出</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="1">基本信息</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- <el-button class="m-l-[10px]" type="primary" @click="handleExportDoc" plain>基本信息导出</el-button> -->
        </template>
        <template #operation="scope">
          <el-button type="primary" link @click="toDetail(scope.row)"
            >详情</el-button
          >
          <!-- <el-button type="primary" link>下载</el-button> -->
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
  <!-- 详情 -->
  <zxn-dialog
    :hasBottomBtn="false"
    top="20"
    width="20vw"
    title="人员详情"
    :visible="visible"
    @close-dialog="closeDialog"
  >
    <el-form label-position="right" label-width="auto" class="pr-20px">
      <el-form-item readonly label="姓名">
        <el-input :value="dialogForm.real_name" />
      </el-form-item>
      <el-form-item readonly label="联系方式">
        <el-input :value="dialogForm.phone" />
      </el-form-item>
      <el-form-item readonly label="证件类型">
        <el-input value="身份证" />
      </el-form-item>
      <el-form-item readonly label="证件号">
        <el-input :value="dialogForm.idcard" />
      </el-form-item>
      <el-form-item readonly label="银行账号">
        <el-input :value="dialogForm.bank_account" />
      </el-form-item>
      <el-form-item readonly label="认证企业">
        <el-input :value="dialogForm.company_name" />
      </el-form-item>
    </el-form>
  </zxn-dialog>
</template>

<script lang="ts" setup>
import { getAuthList } from "@/api/person";
import { downloadByOnlineUrl } from "@/utils/download";
import router from "@/router";

const loading = ref(false);
const tabslist = [
  {
    name: "1",
    label: "人员认证",
  },
];
const auth_type = ref(1);

const authTypeOption = [
  { name: "二要素（姓名、身份证）", val: 1 },
  { name: "三要素（姓名、手机号、身份证）", val: 2 },
  { name: "三要素（姓名、身份证、银行卡）", val: 3 },
  { name: "四要素（姓名、手机号、身份证、银行卡）", val: 4 },
];

const authType = ref([] as any);

const action = ref("");
const token = localStorage.getItem("accessToken") || "";

const headers = {
  Authorization: `Bearer ${token}`,
};

const activeName = ref("1");

const formItem = reactive({
  name: "",
  status: "",
});

const date = ref([] as any);

const tableData = reactive([] as any);

const columnList = [
  {
    label: "姓名",
    prop: "real_name",
    fixed: "left",
  },
  {
    label: "认证状态",
    prop: "status",
    type: "enum",
    path: "personManagementEnum.personCheckStatus",
    width: 80,
    color: {
      0: {
        color: "#36C5F3",
        background: "#DFF6FD",
      },
      1: {
        color: "#366FF3",
        background: "#DFE8FD",
      },
      2: {
        color: "#F35135",
        background: "#FDE3DF",
      },
    },
    fixed: "left",
  },
  {
    label: "手机号码",
    prop: "phone",
    type: "phone",
    minWidth: 110,
  },
  {
    label: "身份证号",
    prop: "idcard",
    type: "card",
    minWidth: 160,
  },
  {
    label: "银行卡号",
    prop: "bank_account",
    type: "card",
    minWidth: 160,
  },
  {
    label: "认证时间",
    prop: "update_time",
    minWidth: 200,
  },
  {
    label: "认证企业",
    prop: "company_name",
    minWidth: 200,
  },
  {
    label: "认证规则",
    prop: "auth_type",
    type: "enum",
    path: "personManagementEnum.auth_type",
    minWidth: 330,
  },
  {
    label: "备注",
    prop: "reason",
    minWidth: 300,
  },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 75,
  },
];

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

function pageChange(current: any) {
  const { page, limit } = current;
  pageInfo.page = page;
  pageInfo.limit = limit;
  handleSearch();
}

function handleReset() {
  formItem.name = "";
  formItem.status = "";
  date.value = [];
  handleSearch();
}

function handleChange() {
  handleSearch();
}

function handleSelect(arr) {
  console.log(arr);
}

function handleSearch() {
  loading.value = true;
  let params = {
    name: formItem.name,
    status: formItem.status,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
    limit: pageInfo.limit,
    page: pageInfo.page,
  };
  tableData.length = 0;
  getAuthList(params).then((res) => {
    loading.value = false;
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  });
}

const visible = ref(false);
const dialogForm = reactive({} as any);
function toDetail(item: string) {
  visible.value = true;
  dialogForm.real_name = item.real_name;
  dialogForm.phone = item.phone;
  dialogForm.idcard = item.idcard;
  dialogForm.bank_account = item.bank_account;
  dialogForm.company_name = item.company_name;
}

const closeDialog = () => {
  visible.value = false;
};

const table = ref();
const handleExportDoc = async () => {
  const selected = table.value.getSelectionRows();
  const ids = selected.map((it) => it.id);
  if (!ids.length) {
    return ElMessage({
      type: "error",
      message: `请选择数据`,
    });
  }
  await downloadByOnlineUrl("/adminapi/member/get_user_excel", { ids });
  const tableEle = table.value.getTable();
  tableEle.clearSelection();
};
/**
 * 导出批量操作
 */
const handleExport = (command: string | number | object) => {
  if (command == 1) {
    handleExportDoc();
  }
};
handleSearch();
</script>

<style scoped lang="scss">
:deep(.el-upload) {
  .el-upload-dragger {
    width: 360px;
    height: 240px;
  }
}

.blue {
  color: #366ff4;
  cursor: pointer;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #366ff4;
  justify-content: space-between;

  .left,
  .right {
    display: flex;
    align-items: center;
  }

  .right {
    color: #333;
  }

  .line {
    display: inline-block;
    width: 4px;
    height: 14px;
    border-radius: 4px;
    background: #366ff4;
    margin-right: 10px;
  }
}

.result {
  display: flex;
  align-items: center;
  color: #333;

  .btn {
    margin-left: 20px;
    border: 1px solid #366ff4;
    border-radius: 20px;
    padding: 4px 8px;
    color: #366ff4;
    user-select: none;
  }

  .btn:hover {
    color: #fff;
    background: #366ff4;
    cursor: pointer;
  }
}
</style>
