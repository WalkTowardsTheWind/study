<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList" hasUpdate />
    <div class="p-[24px] p-b-[0]">
      <zxn-table
        ref="taskTable"
        :table-data="tableData"
        :column-list="columnList"
        :hasPagination="false"
      >
        <template #tableTop>
          <div class="menu-search">
            <el-button type="primary" @click="handleAdd">+ 新建</el-button>
            <div class="menu-search-input">
              <el-input
                v-model="formItem.keyword"
                class="w-344px mr-16px"
                placeholder="请输入关键字"
              >
                <template #prefix>
                  <el-icon><i-ep-Search /></el-icon>
                </template>
              </el-input>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </div>
          </div>
        </template>
        <template #operation>
          <el-button link type="primary">详情</el-button>
          <el-button link type="primary">删除</el-button>
        </template>
      </zxn-table>
    </div>
    <operation-dialog ref="operationDialogRef" />
  </zxn-plan>
</template>
<script lang="ts" setup>
import operationDialog from "./components/operationDialog.vue";
import { menusIndex } from "@/api/system";
const activeName = "menu";
const tabsList = [
  {
    name: "menu",
    label: "菜单管理",
  },
];
const columnList = [
  { label: "菜单名称", prop: "menu_name", minWidth: 140 },
  { label: "类型", prop: "auth_type", minWidth: 120 },
  { label: "节点路由", prop: "menu_path", minWidth: 140 },
  { label: "文件路径", prop: "path" },
  { label: "更新时间", prop: "category_name", minWidth: 80 },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 190,
    align: "right",
  },
];
const handleSearch = () => {
  getList();
};
const formItem = reactive({
  keyword: "",
});
const tableData = reactive([]);
const getList = async () => {
  const params = { ...formItem };
  try {
    const { data } = await menusIndex(params);
    console.log(data, "==========");
    tableData.push(...data);
    console.log(tableData);
  } catch (e) {
    console.log(e);
  }
};
const operationDialogRef = ref();
const handleAdd = () => {
  operationDialogRef.value.init();
};
onMounted(() => {
  getList();
});
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
