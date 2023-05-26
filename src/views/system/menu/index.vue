<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList" />
    <div class="p-[24px] p-b-[0]">
      <zxn-table
        ref="taskTable"
        :table-data="tableData"
        :column-list="columnList"
        hasSelect
        :page-info="pageInfo"
        @page-change="handlePageChange"
      >
        <template #tableTop>
          <div class="menu-search">
            <el-button type="primary">+ 新建</el-button>
            <div class="menu-search-input">
              <el-input
                v-model="formItem.task_name"
                class="w-344px mr-16px"
                placeholder="请输入关键字"
              >
                <template #prefix>
                  <el-icon><i-ep-Search /></el-icon>
                </template>
              </el-input>
              <el-button type="primary">查询</el-button>
            </div>
          </div>
        </template>
        <template #operation>
          <el-button link type="primary">详情</el-button>
          <el-button link type="primary">删除</el-button>
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
</template>
<script lang="ts" setup>
const activeName = "menu";
const tabsList = [
  {
    name: "menu",
    label: "菜单管理",
  },
];
const columnList = [
  { label: "菜单名称", prop: "task_no", minWidth: 140 },
  { label: "类型", prop: "task_name", minWidth: 120 },
  { label: "节点路由", prop: "company_name", minWidth: 140 },
  { label: "文件路径", prop: "task_attribute.person_count", type: "deep" },
  { label: "更新时间", prop: "category_name", minWidth: 80 },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 190,
    align: "right",
  },
];
const formItem = reactive({});
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const tableData = reactive([]);
const handlePageChange = (cur) => {
  const { page } = cur;
  pageInfo.page = page;
};
</script>
<style lang="scss" scoped>
.menu-search {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-input {
    display: flex;
  }
}
</style>
