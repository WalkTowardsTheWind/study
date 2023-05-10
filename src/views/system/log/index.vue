<template>
  <zxn-plan>
    <div class="p-[24px] p-b-[0]">
      <zxn-search>
        <el-form-item>
          <el-input v-model="formItem.value" placeholder="请输入关键字">
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="date" label="操作账户">
          <el-input v-model="formItem.value" />
        </el-form-item>
        <el-form-item prop="date" label="联系人">
          <el-input v-model="formItem.value" />
        </el-form-item>
        <el-form-item prop="date" label="申请日期">
          <zxn-date-range v-model="formItem.date" />
        </el-form-item>
        <template #rightBtn>
          <el-button type="primary">导出</el-button>
        </template>
      </zxn-search>
      <zxn-table :table-data="tableData" :column-list="columnList" hasSelect>
        <template #operation>
          <el-button link type="primary">查看</el-button>
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
</template>
<script setup lang="ts">
const formItem = reactive({
  value: "",
  date: [],
});
const tableData = reactive([]);
const columnList = [
  { label: "账户id", prop: "value" },
  { label: "联系人", prop: "name" },
  { label: "操作模块" },
  { label: "操作内容" },
  { label: "操作时间" },
  { label: "操作", slot: "operation", fixed: "right", width: 90 },
];
</script>
