<template>
  <el-dialog
    custom-class="my-dialog"
    v-model="dialogVisibleA"
    width="70%"
    append-to-body
    :before-close="handleClose"
  >
    <template #header>
      <div class="my-header">
        <h4>任务详情</h4>
      </div>
    </template>
    <div>
      <!--  -->
      <el-form :model="formItem" inline label-width="90px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务名称">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行业">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求人数">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公示周期">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务日期">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务时间">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="薪资待遇">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务地点">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务描述">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="其他要求">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="人员要求">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="人员要求">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <zxn-table
            :table-data="tableData"
            :column-list="columnList"
          >
            <template #operation="scope">
              <el-button link type="primary" @click="handleA(scope)"
                >查看</el-button>
            </template>
          </zxn-table>
        </el-row> -->
      </el-form>
      <el-row>
        <zxnTabs v-model:activeName="activeName" :tabsList="tabsList"></zxnTabs>
      </el-row>
      <el-form
        v-if="activeName == '1'"
        :model="formItem"
        inline
        label-width="90px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务人数">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算总额">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算确认时间" label-width="100px">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="结算人数">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际打款">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="打款时间" label-width="100px">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="结算公司">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8"> </el-col>
          <el-col :span="8">
            <el-form-item label="结算状态" label-width="100px">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="打款账户">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8"> </el-col>
          <el-col :span="8">
            <el-form-item label="发票状态" label-width="100px">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row v-if="activeName == '2'">
        <zxn-table :table-data="tableData" :column-list="columnList">
          <template #operation="scope">
            <el-button link type="primary" @click="handleA(scope)"
              >查看</el-button
            >
          </template>
        </zxn-table>
      </el-row>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import zxnTabs from "./zxnTabs.vue";
import zxnTable from "./zxnTable.vue";
const emit = defineEmits(["update:dialogVisibleA"]);
const props = defineProps({
  dialogVisibleA: { type: Boolean, default: false },
  titleA: { type: String, equired: true },
});
let dialogVisibleA = computed(() => props.dialogVisibleA);
// tabs
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "结算信息",
  },
  {
    name: "2",
    label: "任务成员",
  },
];
//
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("你确认关闭弹窗？")
    .then(() => {
      done();
      emit("update:dialogVisibleA", false);
    })
    .catch(() => {
      // catch error
    })
    .then(() => {
      console.log(dialogVisibleA.value);
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
  // titleA.value="详情"
  // dialogVisibleA.value=true
  console.log("详情");
  console.log(scope.row.value.$index);
};
</script>
