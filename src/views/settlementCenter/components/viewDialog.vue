<template>
  <el-dialog
    custom-class="my-dialog"
    v-model="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <template #header>
      <div class="my-header">
        <h4>发佣确认</h4>
      </div>
    </template>
    <div>
      <el-form :model="formItem" label-width="90px">
        <el-form-item label="渠道状态">
          <el-input v-model="formItem.id" />
        </el-form-item>
        <el-form-item label="结算时间">
          <el-input v-model="formItem.id" />
        </el-form-item>
        <el-form-item label="收佣渠道">
          <el-input v-model="formItem.id" />
        </el-form-item>
        <el-form-item label="结算金额">
          <el-input v-model="formItem.id" />
        </el-form-item>
        <el-form-item label="渠道佣金税前">
          <el-input v-model="formItem.id" />
        </el-form-item>
        <el-form-item label="渠道佣金税后">
          <el-input v-model="formItem.id" />
        </el-form-item>
        <el-form-item label="收款银行">
          <el-input v-model="formItem.id" />
        </el-form-item>
        <el-form-item label="收款账户">
          <el-input v-model="formItem.id" />
        </el-form-item>
        <el-form-item label="甲方">
          <el-input v-model="formItem.id" />
        </el-form-item>
        <el-form-item label="乙方">
          <el-input v-model="formItem.id" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="HandleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { updateChannelSettlementStatus } from "@/api/settlementCenter/channelSettlement";
const emit = defineEmits(["update:dialogVisible", "up-Table"]);
const props = defineProps({
  dialogVisible: { type: Boolean, default: false },
  formItem: { type: Array, equired: true, default: () => {} },
});

let dialogVisible = computed(() => props.dialogVisible);
let formItem = computed(() => {
  console.log(props.formItem);

  return props.formItem;
}) as any;
const handleConfirm = async () => {
  try {
    var data = {
      id: formItem.value.id,
      status: "1",
    };
    await updateChannelSettlementStatus(data);
    emit("update:dialogVisible", false);
    ElMessage({
      type: "success",
      message: "成功下发该任务",
    });
    emit("up-Table");
  } catch (error) {
    console.log(error);
  }
};
const HandleClose = () => {
  emit("update:dialogVisible", false);
};

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
</script>
