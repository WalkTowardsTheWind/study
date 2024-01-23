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
          placeholder="请输入账号名称"
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
          @change="handleSelect"
					filterable
					clearable
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.val"
            :label="item.label"
            :value="item.val"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="渠道类型">
        <el-select
          v-model="formItem.channel_type"
          placeholder="请选择"
					filterable
					clearable
          @change="handleSelectChannel"
        >
          <el-option
            v-for="item in channelOptions"
            :key="item.val"
            :label="item.label"
            :value="item.val"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="渠道管理员">
        <el-input
          v-model="formItem.channel_admin_name"
          placeholder="请输入渠道管理员姓名"
          clearable
        >
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="渠道等级">
        <el-select v-model="formItem.level" placeholder="请选择">
          <el-option
            v-for="item in levelOptions"
            :key="item.val"
            :label="item.label"
            :value="item.val"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item prop="tax_land_id" label="税地名称">
        <tax-source-select
          v-model:taxId="formItem.tax_land_id"
          @change-tax="handleSearch"
        />
      </el-form-item>
      <el-form-item prop="date" label="创建日期" label-width="">
        <zxn-date-range v-model="date" />
      </el-form-item>
    </zxn-search>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :loading="isLoading"
      hasSelect
      :page-info="pageInfo"
      @page-change="pageChange"
    >
      <template #tableTop>
        <el-dropdown trigger="click">
          <el-button type="primary">+ 新建</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="add('person')"
                >个人渠道</el-dropdown-item
              >
              <el-dropdown-item @click="add('business')"
                >企业渠道</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- <el-button type="primary" plain class="m-l-[15px]">导出EXCEL</el-button> -->
      </template>
      <template #channel_type="{ row }">
        {{ row.channel_type == 1 ? "企业" : "个人" }}
      </template>
      <template #level="{ row }">
        {{ row.level == 1 ? "一级" : "二级" }}
      </template>
      <template #operation="scope">
        <el-button
          v-if="scope.row.status == 1"
          link
          type="primary"
          @click="stop(scope.row.id, 0)"
          >封停</el-button
        >
        <el-button
          v-if="scope.row.status == 0"
          link
          type="primary"
          @click="stop(scope.row.id, 1)"
        >
          解封
        </el-button>
        <el-button link type="primary" @click="toDetail('edit', scope.row.id)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="toDetail('detail', scope.row.id)"
          >详情</el-button
        >
      </template>
    </zxn-table>
  </div>
</template>

<script lang="ts" setup>
import {
  getChannelAccountList,
  setChannelAccountStatus,
} from "@/api/account/channel";
import router from "@/router";

const statusOptions = [
  { label: "全部", val: "" },
  { label: "正常", val: "1" },
  { label: "封停", val: "0" },
];

const channelOptions = [
  { label: "全部", val: "" },
  { label: "个人", val: "2" },
  { label: "企业", val: "1" },
];

// const levelOptions = [
//   { label: "全部", val: "" },
//   { label: "一级", val: "1" },
//   { label: "二级", val: "2" },
// ];

const date = ref("");

const formItem = reactive({
  name: "",
  channel_type: "", // 默认空  后面在改
  // level: "",
  status: "",
  channel_admin_name: "",
  tax_land_id: "",
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const isLoading = ref(false);
const tableData = reactive([] as any);
const columnList = [
  { label: "账号名称", prop: "username", minWidth: 120, fixed: "left" },
  {
    label: "状态",
    type: "enum",
    path: "accountEnum.channelType",
    prop: "status",
    color: {
      0: { color: "#333333", background: "#dedede" },
      1: { color: "#356FF3", background: "#dfe8fd" },
    },
    minWidth: 100,
    fixed: "left",
  },
  {
    label: "渠道类型",
    prop: "channel_type",
    minWidth: 120,
    slot: "channel_type",
    fixed: "left",
  },
  { label: "渠道名称", prop: "channel_name", minWidth: 120, fixed: "left" },
  { label: "税地名称", prop: "tax_land_name", width: 150 },
  { label: "联系人", prop: "contact", minWidth: 200 },
  { label: "联系号码", prop: "contact_phone", minWidth: 150 },
  { label: "渠道等级", prop: "level", minWidth: 120, slot: "level" },
  { label: "渠道管理员", prop: "channel_admin", minWidth: 200 },
  { label: "创建时间", prop: "add_time", minWidth: 220 },
  {
    label: "操作",
    slot: "operation",
    align: "right",
    fixed: "right",
    minWidth: 150,
  },
];

const add = (type: any) => {
  router.push({ name: `channel-account-add-${type}` });
};

const toDetail = (type: string, id: string) => {
  const query = type == "edit" ? { type: "edit", id } : { type: "detail", id };
  router.push({
    name: "channel-account-detail",
    query,
  });
};

/**
 * 页面
 */
function pageChange(current: any) {
  const { page, limit } = current;
  pageInfo.limit = limit;
  pageInfo.page = page;
  handleSearch();
}

function handleSearch() {
  isLoading.value = true;
  let params = {
    keyword: formItem.name,
    channel_type: formItem.channel_type,
    channel_admin_name: formItem.channel_admin_name,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
    tax_land_id: formItem.tax_land_id,
    // level: formItem.level,
    status: formItem.status,
    limit: pageInfo.limit,
    page: pageInfo.page,
  };

  getChannelAccountList(params).then((res) => {
    tableData.length = 0;
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
    isLoading.value = false;
  });
}

function stop(id: number, status: number) {
  if (status === 1) {
    // 解封
    ElMessageBox.confirm("是否解封账号?", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      center: true,
    }).then(() => {
      setChannelAccountStatus({ id, status }).then(() => {
        ElMessage({
          type: "success",
          message: "操作成功",
        });
        handleSearch();
      });
    });
  }
  if (status === 0) {
    // 封停
    ElMessageBox.confirm("是否封停账号?", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      center: true,
    }).then(() => {
      setChannelAccountStatus({ id, status }).then(() => {
        ElMessage({
          type: "success",
          message: "操作成功",
        });
        handleSearch();
      });
    });
  }
}

function handleReset() {
  formItem.name = "";
  formItem.status = "";
  formItem.channel_type = "";
  formItem.channel_admin_name = "";
  // formItem.level = "";
  date.value = "";
  handleSearch();
}

const handleSelect = (val) => {
  formItem.status = val;
  handleSearch();
};
const handleSelectChannel = (val) => {
  formItem.channel_type = val;
  handleSearch();
};
handleSearch();
</script>
