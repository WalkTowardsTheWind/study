<template>
  <zxn-plan>
    <zxn-tabs
      activeName="theme"
      :tabsList="[{ label: 'OEM管理', name: 'theme' }]"
      hasUpdate
    />
    <div class="p-[24px] p-b-[0]">
      <zxn-search
        :formItem="formItem"
        @on-search="handleSearch"
        @on-reset="handleReset"
      >
        <el-form-item prop="key_word">
          <el-input v-model="formItem.key_word" placeholder="请输入企业名称">
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </zxn-search>
      <div class="mb-[16px]">
        <el-button type="primary" @click="handleAdd">+ 新建</el-button>
      </div>
      <zxn-table
        :table-data="tableData"
        :column-list="columnList"
        :page-info="pageInfo"
        :loading="loading"
        @page-change="handlePageChange"
      >
        <template #copy="{ row }">
          <div v-html="row.web_mark" />
        </template>
        <template #operation="{ row }">
          <el-button link type="primary" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button link type="primary" @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </zxn-table>
    </div>
    <theme-drawer ref="themeDrawerRef" @update="handlePageChange" />
  </zxn-plan>
</template>
<script setup lang="ts">
import { settingIndex, settingDelete } from "@/api/system";
import themeDrawer from "./components/themeDrawer.vue";
const formItem = reactive({
  key_word: "",
});
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const tableData = reactive([]);
const columnList = [
  {
    label: "登录页图标",
    prop: "login_icon",
    type: "image",
    imgWidth: 120,
    minWidth: 150,
  },
  { label: "登录页企业名称", prop: "web_compamy_name", minWidth: 140 },
  { label: "网页图标", prop: "web_icon", type: "image", minWidth: 100 },
  { label: "网页企业名称", prop: "login_company_name", minWidth: 180 },
  {
    label: "左上角大图标",
    prop: "left_big_icon",
    type: "image",
    imgWidth: 120,
    minWidth: 150,
  },
  {
    label: "左上角小图标",
    prop: "left_small_icon",
    type: "image",
    minWidth: 120,
  },
  { label: "网页配置域名", prop: "web_url", minWidth: 220 },
  { label: "网页授权标识", prop: "web_mark", slot: "copy", minWidth: 400 },
  {
    label: "贴牌类型",
    prop: "type",
    type: "enum",
    path: "system.oemType",
    minWidth: 120,
  },
  { label: "负责人", prop: "head_name", width: 120 },
  { label: "负责人电话", prop: "head_phone", width: 160 },
  { label: "新增时间", prop: "add_time", width: 180 },
  { label: "操作", slot: "operation", fixed: "right", width: 120 },
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
  const params = { ...formItem };
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  loading.value = true;
  try {
    const { data } = await settingIndex(params);
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
const themeDrawerRef = ref();
const handleAdd = () => {
  themeDrawerRef.value.init();
};
const handleEdit = (row) => {
  themeDrawerRef.value.init(row);
};
const handleDelete = (row) => {
  const { id } = row;
  if (!id) return;
  ElMessageBox.confirm("确定删除该记录吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "暂不",
    center: true,
  }).then(async () => {
    try {
      await settingDelete(id);
      await getList();
      ElMessage.success("删除成功");
    } catch (e) {
      console.log(e);
    }
  });
};
onMounted(() => {
  getList();
});
</script>
