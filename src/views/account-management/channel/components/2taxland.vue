<template>
  <div class="p-[37px]">
    <el-button type="primary" plain class="mb-[20px]" @click="add"
      >+新增</el-button
    >
    <zxn-table :table-data="tableData" :column-list="columnList"></zxn-table>

    <!-- 新增 -->
    <zxn-dialog
      title="新增税地"
      v-model:visible="visible"
      @close-dialog="closeDialog"
      @confirm-dialog="confirmClick"
    >
      <el-form :model="newForm" :rules="rules">
        <el-row>
          <el-col :span="22">
            <el-form-item label="税地名称" prop="tax_land_name">
              <el-select class="w-full" placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="渠道点位" prop="channel_point">
              <el-input placeholder="请输入">
                <template #append>%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="扣税点位" prop="point">
              <el-input placeholder="请输入">
                <template #append>%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zxn-dialog>
  </div>
</template>

<script lang="ts" setup>
const tableData = reactive([]);
const columnList = [
  { label: "税地名称" },
  { label: "状态" },
  { label: "成本点位" },
  { label: "渠道点位" },
  { label: "扣税点位" },
  { label: "渠道佣金累计" },
  { label: "绑定时间" },
  { label: "操作" },
];

const visible = ref(false);

const add = () => {
  visible.value = true;
};

const newForm = reactive({
  tax_land_name: "",
  channel_point: "",
  point: "",
});

const rules = {
  tax_land_name: [{ required: true, message: "必填" }],
  channel_point: [{ required: true, message: "必填" }],
  point: [{ required: true, message: "必填" }],
};

const closeDialog = () => {
  visible.value = false;
};

const confirmClick = () => {};
</script>

<style scoped></style>
