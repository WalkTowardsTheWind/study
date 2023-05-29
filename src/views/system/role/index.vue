<template>
  <zxn-plan>
    <zxn-tabs
      activeName="role"
      :tabsList="[{ label: '角色管理', name: 'role' }]"
      hasUpdate
    />
    <div class="p-[24px] p-b-[0]">
      <zxn-search>
        <el-form-item>
          <el-input v-model="formItem.user" placeholder="请输入关键字">
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </zxn-search>
      <zxn-table :table-data="tableData" :column-list="columnList" hasSelect>
        <template #tableTop>
          <el-button type="primary" class="mr-[8px]">+ 新建</el-button>
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
        <template #operation>
          <el-button link type="primary">编辑</el-button>
          <el-button link type="primary">删除</el-button>
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
</template>
<script setup lang="ts">
const formItem = reactive({
  user: "",
});
const tableData = reactive([]);
const columnList = [
  { label: "标签编号", prop: "value" },
  { label: "角色名称", prop: "name" },
  { label: "功能权限" },
  { label: "地区权限" },
  { label: "账号数量" },
  { label: "创建时间", sortable: "custom", width: 120 },
  { label: "操作", slot: "operation", fixed: "right", width: 90 },
];
</script>
