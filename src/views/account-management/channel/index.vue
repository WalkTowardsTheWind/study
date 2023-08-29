<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
    >
      <el-form-item>
        <el-input v-model="formItem.name" placeholder="请输入关键字">
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="账户状态">
        <el-select v-model="formItem.status" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.val"
            :label="item.label"
            :value="item.val"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="渠道类型">
        <el-select v-model="formItem.channel_type" placeholder="请选择">
          <el-option
            v-for="item in channelOptions"
            :key="item.val"
            :label="item.label"
            :value="item.val"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="渠道管理员">
        <el-input v-model="formItem.channel_admin_name" placeholder="请输入">
        </el-input>
      </el-form-item>
      <el-form-item label="渠道等级">
        <el-select v-model="formItem.level" placeholder="请选择">
          <el-option
            v-for="item in levelOptions"
            :key="item.val"
            :label="item.label"
            :value="item.val"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="date" label="创建日期" label-width="">
        <el-date-picker
          v-model="date"
          type="daterange"
          value-format="YYYY-MM-DD"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
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
        <el-button type="primary" plain class="m-l-[15px]">导出EXCEL</el-button>
      </template>
      <template #operation="scope">
        <el-button
          link
          type="primary"
          @click="stop(scope.row.id, 2, scope.row.channel_type)"
          >封停</el-button
        >
        <el-button
          link
          type="primary"
          @click="stop(scope.row.id, 1, scope.row.channel_type)"
        >
          解封
        </el-button>
        <el-button link type="primary">认证</el-button>
        <el-button link type="primary" @click="toDetail('edit', scope.row)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="del(scope.row)">删除</el-button>
        <el-button link type="primary" @click="toDetail('detail', scope.row)"
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
} from "@/api/account/business";
import { getChannelAccountList } from "@/api/account/channel";
import { delPersonalAccount, setPersonalStatus } from "@/api/account/personal";
import router from "@/router";

const statusOptions = [
  { label: "全部", val: "" },
  { label: "申请中", val: "0" },
  { label: "未认证", val: "1" },
  { label: "正常", val: "2" },
  { label: "预警", val: "3" },
  { label: "封停", val: "4" },
];

const channelOptions = [
  { label: "全部", val: "" },
  { label: "个人", val: "1" },
  { label: "企业", val: "2" },
];

const levelOptions = [
  { label: "全部", val: "" },
  { label: "一级", val: "1" },
  { label: "二级", val: "2" },
];

const date = ref("");

const formItem = reactive({
  name: "",
  channel_type: "2", // 默认2  后面在改
  level: "",
  status: "",
  channel_admin_name: "",
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const tableData = reactive([] as any);
const columnList = [
  { label: "账号名称", prop: "id" },
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
    },
    minWidth: 80,
  },
  { label: "渠道类型", prop: "name", minWidth: 200 },
  { label: "渠道名称", prop: "name", minWidth: 200 },
  { label: "联系人", prop: "name", minWidth: 200 },
  { label: "联系号码", prop: "mobile", minWidth: 150 },
  { label: "渠道等级", prop: "level", minWidth: 100 },
  { label: "渠道管理员", prop: "channel_admin_name", minWidth: 150 },
  { label: "创建时间", prop: "add_time", minWidth: 220 },
  {
    label: "操作",
    slot: "operation",
    align: "right",
    fixed: "right",
    minWidth: 300,
  },
];

const add = (type: any) => {
  router.push({ name: `channel-account-add-${type}` });
};

const toDetail = () => {
  router.push({
    name: "channel-account-detail",
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
  let params = {
    limit: pageInfo.limit,
    page: pageInfo.page,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
    ...formItem,
  };

  getChannelAccountList(params).then((res) => {
    tableData.length = 0;
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  });
}

function stop(id: number, status: number, channelType: number) {
  // channelType 1 2  setPersonalStatus businessAccountSetStatus
  if (status === 1) {
    // 解封
    ElMessageBox.confirm("是否解封账号?", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      center: true,
    })
      .then(() => {
        if (channelType === 1) {
          // 个人
          setPersonalStatus({ id, status }).then(() => {
            ElMessage({
              type: "success",
              message: "操作成功",
            });
            handleSearch();
          });
        }
        if (channelType === 2) {
          businessAccountSetStatus({ id, status }).then(() => {
            ElMessage({
              type: "success",
              message: "操作成功",
            });
            handleSearch();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (status === 2) {
    // 封停
    ElMessageBox.confirm("是否封停账号?", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      center: true,
    })
      .then(() => {
        if (channelType === 1) {
          // 个人
          setPersonalStatus({ id, status }).then(() => {
            ElMessage({
              type: "success",
              message: "操作成功",
            });
            handleSearch();
          });
        }
        if (channelType === 2) {
          businessAccountSetStatus({ id, status }).then(() => {
            ElMessage({
              type: "success",
              message: "操作成功",
            });
            handleSearch();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function del(item: any) {
  console.log(item);

  // 1 个人
  if (item.channel_type == 1) {
    delPersonalAccount(item.id).then(() => {
      ElMessage({
        type: "success",
        message: "操作成功",
      });
      handleSearch();
    });
  }
  // 2 企业
  if (item.channel_type == 2) {
    deleteBusinessAccount(item.id).then(() => {
      ElMessage({
        type: "success",
        message: "操作成功",
      });
      handleSearch();
    });
  }
}

function handleReset() {
  formItem.name = "";
  formItem.status = "";
  formItem.channel_type = "";
  formItem.channel_admin_name = "";
  formItem.level = "";
  date.value = "";
  handleSearch();
}
handleSearch();
</script>
