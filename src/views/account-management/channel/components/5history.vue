<template>
  <div class="p-[37px]">
    <zxn-search
      :formItem="formItem"
      @on-reset="handleReset"
      @on-search="handleSearch"
    >
      <el-form-item>
        <el-input placeholder="请输入">
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="绑定日期">
        <zxn-date-range v-model="date" />
      </el-form-item>
    </zxn-search>
    <!-- <el-button type="primary" plain class="mb-[20px]" @click="add"
      >+新增</el-button
    > -->
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :hasPagination="false"
    ></zxn-table>
    <zxn-dialog
      v-model:visible="visible"
      title="新增企业"
      @close-dialog="handleClose"
      @confirm-dialog="handleConfirm"
    >
      <el-form :model="newForm" :rules="rules">
        <el-row>
          <el-col :span="22">
            <el-form-item label="企业名称" prop="tax_land_name">
              <el-select class="w-full" placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="税地名称" prop="channel_point">
              <el-select class="w-full" placeholder="请选择"></el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zxn-dialog>
  </div>
</template>

<script lang="ts" setup>
const formItem = reactive({});
const date = ref([]);
const visible = ref(false);

const tableData = reactive([]);
const columnList = [
  { label: "企业名称" },
  { label: "绑定税地名称" },
  { label: "修改类型" },
  { label: "修改描述" },
  { label: "历史点位" },
  { label: "修改点位" },
  { label: "修改时间" },
  { label: "修改账户" },
];

const newForm = reactive({});
const rules = {};

const handleSearch = () => {};
const handleReset = () => {};

const handleClose = () => {
  visible.value = false;
};
const handleConfirm = () => {};
</script>

<style scoped></style>
