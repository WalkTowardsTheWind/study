import { LoginData } from '../../../api/auth/types';
<template>
  <el-dialog
    custom-class="my-dialog"
    v-model="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <template #header>
      <div class="my-header">
        <h4>发佣确认</h4>
      </div>
    </template>
    <div>
      <el-form
        :model="formItem"
        inline
        label-width="90px"
        label-position="left"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="结算单号">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算单状态">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务企业">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务时间">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="结算金额">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渠道点位">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收佣渠道">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税前佣金">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="税后佣金">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款银行">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收款账号">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="凭证">
              <multi-upload v-model="formItem.annex_url"></multi-upload>
            </el-form-item>
          </el-col>
        </el-row>
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
const emit = defineEmits(["update:dialogVisible"]);
const props = defineProps({
  dialogVisible: { type: Boolean, default: false },
  formItem: { type: Array, equired: true, default: () => {} },
});

let dialogVisible = computed(() => props.dialogVisible);
let formItem = computed(() => {
  console.log(props.formItem);

  return props.formItem;
}) as any;
const handleConfirm = () => {
  emit("update:dialogVisible", false);
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
