<template>
  <el-dialog
    custom-class="my-dialog"
    v-model="dialogVisible"
    width="70%"
    :before-close="handleClose"
  >
    <template #header>
      <div class="my-header">
        <h4>企业基础信息</h4>
      </div>
    </template>
    <div>
      <!--  -->
      <el-form
        :model="formItem"
        inline
        label-width="90px"
        label-position="left"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="企业名称">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业账户ID">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业账户ID">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="统一社会信用代码" label-width="140px">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="法定代表人">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业地址" label-width="140px">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <ly-tabs
            v-model:activeName="activeName"
            :tabsList="tabsList"
          ></ly-tabs>
        </el-row>
        <el-row>
          <ly-table :table-data="tableData" :column-list="columnList">
            <template #operation="scope">
              <el-button link type="primary" @click="handleA(scope)"
                >查看</el-button
              >
            </template>
          </ly-table>
        </el-row>
      </el-form>

      <viewDialogA v-model:dialogVisibleA="dialogVisibleA" :titleA="titleA" />
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import viewDialogA from "../components/viewDialogA.vue";

import lyTabs from "./lyTabs.vue";
import lyTable from "./lyTable.vue";
const emit = defineEmits(["update:dialogVisible"]);
const props = defineProps({
  dialogVisible: { type: Boolean, default: false },
  title: { type: String, equired: true },
});
const dialogVisibleA = ref(false);
const titleA = ref("");
let dialogVisible = computed(() => props.dialogVisible);
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "结算任务列表",
  },
];
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("你确认关闭弹窗？")
    .then(() => {
      done();
      emit("update:dialogVisible", false);
    })
    .catch(() => {
      // catch error
    })
    .then(() => {
      console.log(dialogVisible.value);
    });
};
// 上传

const formItem = reactive({
  name: "",
  tags: [{ id: 2, label: "不限学历" }],
  multiPicUrls: [
    "https://oss.youlai.tech/default/2022/11/20/8af5567816094545b53e76b38ae9c974.webp",
    "https://oss.youlai.tech/default/2022/11/20/13dbfd7feaf848c2acec2b21675eb9d3.webp",
  ],
});
// table
const tableData = reactive([
  { value: "1", name: "shshhud", state: 1 },
  { value: "2", name: "shshhud", state: 1 },
  { value: "3", name: "shshhud", state: 1 },
  { value: "4", name: "shshhud", state: 1 },
  { value: "5", name: "shshhud", state: 1 },
]);
const columnList = [
  { label: "任务编号", prop: "value" },
  { label: "任务名称", prop: "name" },
  { label: "需求人数" },
  { label: "预算" },
  { label: "申请时间", sortable: "custom", width: 120 },
  { label: "任务详情", slot: "operation", fixed: "right", width: 250 },
];

// 操作
const handleA = (scope: any) => {
  titleA.value = "详情";
  dialogVisibleA.value = true;
  console.log("详情");
  console.log(scope.row.value.$index);
};
</script>
