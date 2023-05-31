<template>
  <zxn-plan>
    <zxn-tabs
      activeName="role"
      :tabsList="[{ label: '角色管理', name: 'role' }]"
      hasUpdate
    />
    <div class="p-[24px] p-b-[0]">
      <zxn-search>
        <el-form-item prop="role_name">
          <el-input v-model="formItem.role_name" placeholder="请输入关键字">
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </zxn-search>
      <zxn-table
        :table-data="tableData"
        :column-list="columnList"
        hasSelect
        :hasPagination="false"
      >
        <template #tableTop>
          <el-button type="primary" class="mr-[8px]" @click="handleAdd"
            >+ 新建</el-button
          >
          <el-dropdown trigger="click">
            <el-button type="primary" plain>批量操作</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>停用</el-dropdown-item>
                <el-dropdown-item>启用</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template #operation="{ row }">
          <el-button link type="primary">{{
            row.status ? "停用" : "启用"
          }}</el-button>
          <el-button link type="primary">编辑</el-button>
          <el-button link type="primary">删除</el-button>
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
</template>
<script setup lang="ts">
import { getRolePage } from "@/api/system";
import { useRouter } from "vue-router";
const router = useRouter();
const formItem = reactive({
  role_name: "",
});
const tableData = reactive([]);
const columnList = [
  { label: "角色名称", prop: "role_name", minWidth: 120 },
  { label: "功能权限", prop: "rules", minWidth: 150 },
  { label: "地区权限", minWidth: 120 },
  { label: "账号数量", minWidth: 120 },
  { label: "创建时间", prop: "update_time", width: 180 },
  { label: "操作", slot: "operation", fixed: "right", width: 150 },
];
const getList = async () => {
  const params = { ...formItem };
  try {
    const { data } = await getRolePage(params);
    tableData.length = 0;
    tableData.push(...data.list);
    console.log(tableData);
  } catch (e) {
    console.log(e);
  }
};
const handleAdd = () => {
  router.push({ name: "addRole" });
};
onMounted(() => {
  getList();
});
</script>
