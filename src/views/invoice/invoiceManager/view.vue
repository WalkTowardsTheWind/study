<template>
  <zxn-plan has-bottom>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList" has-back>
      <template #info>
        <div class="pl-36px pr-36px">
          <el-form
            class="zxn-view-form"
            label-position="right"
            label-width="110"
          >
            <el-row class="mt-47px">
              <el-col :span="24">
                <el-form-item label="发票类型"> </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="申请类型"> </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="票面种类"> </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="纳税人识别号"> </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="发票抬头"> </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="开户行"> </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="银行卡号"> </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="税地"> </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <template #list>
        <div class="p-24px">
          <zxn-table :column-list="columnList" :hasPagination="false">
            <template #operation>
              <el-button link type="primary">操作</el-button>
            </template>
          </zxn-table>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import type { Ref } from "vue";
const activeName: Ref<string> = ref("info");
type TabsType = {
  name: string;
  label: string;
};
const tabsList: TabsType[] = reactive([
  {
    name: "info",
    label: "开票信息",
  },
  {
    name: "list",
    label: "任务列表",
  },
]);
const columnList = [
  { label: "发票任务编号", prop: "value" },
  { label: "任务名称", prop: "value" },
  { label: "行业", prop: "value" },
  { label: "结算金额", prop: "value" },
];
</script>
