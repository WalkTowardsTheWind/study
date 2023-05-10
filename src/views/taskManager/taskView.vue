<template>
  <zxn-plan has-bottom>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList" has-back />
    <div class="pl-36px pr-36px pt-45px" v-show="activeName === 'info'">
      <zxn-title>
        任务信息
        <template #right>
          <span class="zxn-table-label green ml-14px">申请中</span>
        </template>
      </zxn-title>
      <el-form
        class="mt-34px zxn-view-form"
        label-position="right"
        label-width="80"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务名称">ssss</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行业">ssss</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求人数">ssss</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公示周期">ssss</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人">ssss</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式">ssss</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务日期">ssss</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务时间">ssss</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="薪资待遇">ssss</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人员要求">ssss</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务地点">ssss</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="其他要求">ssss</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="任务描述">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
                readonly
                resize="none"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="mt-47px">
          <el-col :span="24">
            <el-form-item label="申请时间"> </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="通过时间"> </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="验收时间"> </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="p-24px" v-show="activeName === 'member'">
      <zxn-table :column-list="columnList" :hasPagination="false">
        <template #operation>
          <el-button link type="primary">操作</el-button>
        </template>
      </zxn-table>
    </div>
    <div v-show="activeName === 'certificate'" class="pl-36px pr-36px pt-45px">
      <zxn-title>验收凭证</zxn-title>
      <div class="flex flex-items-center mt-30px">
        <!--        <el-image-->
        <!--          v-for="item in 3"-->
        <!--          style="width: 88px; height: 88px"-->
        <!--          :src="logo"-->
        <!--          :zoom-rate="1.2"-->
        <!--          :preview-src-list="[logo , logo, logo]"-->
        <!--          :initial-index="item"-->
        <!--          fit="cover"-->
        <!--					class="mr-25px"-->
        <!--        />-->
      </div>
    </div>
  </zxn-plan>
</template>
<script setup lang="ts">
import type { Ref } from "vue";
const activeName: Ref<string> = ref("info");
// const logo = ref(
//   new URL(`../../assets/20230506141258.jpg`, import.meta.url).href
// );
type TabsType = {
  name: string;
  label: string;
};
const tabsList: TabsType[] = reactive([
  {
    name: "info",
    label: "任务信息",
  },
  {
    name: "member",
    label: "任务成员",
  },
  {
    name: "certificate",
    label: "验收凭证",
  },
]);
const columnList = [
  { label: "账户ID", prop: "value" },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.IndustryType",
    prop: "status",
    color: { 0: "blue", 1: "red" },
  },
  { label: "姓名", prop: "value" },
  { label: "联系方式", prop: "value" },
  { label: "申请时间", prop: "value" },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];
</script>
