<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabs-list="tabsList" hasBack>
      <template #1>
        <BasicInfo :isEdit="isEdit" :id="id" />
      </template>
      <template #2>
        <PaperInfo :isEdit="isEdit" :id="id" />
      </template>
      <template #3>
        <ContractInfo :isEdit="isEdit" :id="id" />
      </template>
      <template #4>
        <TaskInfo :isEdit="isEdit" :id="id" />
      </template>
      <template #5>
        <RechargeInfo :isEdit="isEdit" :id="id" />
      </template>
      <template #6>
        <SettlementInfo :isEdit="isEdit" :id="id" />
      </template>
      <template #7>
        <ChannelInfo :isEdit="isEdit" :id="id" />
      </template>
    </zxn-tabs>
    <zxn-bottom-btn v-if="isCheck">
      <el-button type="info" @click="reject">驳回</el-button>
      <el-button type="primary" @click="pass">通过</el-button>
    </zxn-bottom-btn>
  </zxn-plan>
  <!-- 驳回 -->
  <el-dialog v-model="dialogVisible" top="30vh" title="驳回原因" width="20%">
    <el-form-item>
      <el-input v-model="reject_reason" placeholder="请输入" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="checkReject">确认</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </el-form-item>
  </el-dialog>
</template>

<script lang="ts" setup>
import BasicInfo from "./components/basic-info.vue";
import PaperInfo from "./components/paper-info.vue";
import ContractInfo from "./components/contract-info.vue";
import TaskInfo from "./components/task-info.vue";
import RechargeInfo from "./components/recharge-info.vue";
import SettlementInfo from "./components/settlement-info.vue";
import ChannelInfo from "./components/channel-info.vue";

import { useRoute } from "vue-router";

import { checkBusinessAccount } from "@/api/account/business";
import router from "@/router";

const tabsList = [
  { name: "1", label: "基本信息" },
  { name: "2", label: "证件信息" },
  { name: "3", label: "合同信息" },
  { name: "4", label: "任务记录" },
  { name: "5", label: "充值记录" },
  { name: "6", label: "结算记录" },
  { name: "7", label: "渠道信息" },
];

const activeName = ref("1");

const reject_reason = ref("");

const route = useRoute();

const isEdit = ref(false);
const isCheck = ref(false);
const id = ref();
const dialogVisible = ref(false);

if (route.query.status === "edit") {
  isEdit.value = true;
}
if (route.query.status === "check") {
  isCheck.value = true;
}
if (route.query.id) {
  id.value = route.query.id;
}

/**
 * 通过
 */
function pass() {
  ElMessageBox.confirm("是否激活该企业?", {
    confirmButtonText: "是",
    cancelButtonText: "否",
    center: true,
  })
    .then(() => {
      checkBusinessAccount({ id: id.value, audit_status: 1 }).then(() => {
        ElMessage({
          type: "success",
          message: "激活成功",
        });
        setTimeout(() => {
          router.go(-1);
        }, 200);
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消激活",
      });
    });
}

function reject() {
  dialogVisible.value = true;
}
/**
 * 驳回
 */
function checkReject() {
  checkBusinessAccount({
    id: id.value,
    audit_status: 2,
    reason: reject_reason.value,
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "驳回成功",
      });
    })
    .catch((err) => {
      return new Error("err", err);
    });
}
</script>
