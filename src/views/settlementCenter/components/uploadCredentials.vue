<template>
  <el-dialog
    custom-class="my-dialog"
    v-model="dialogVisible"
    width="35%"
    :before-close="handleClose"
  >
    <template #header>
      <div class="my-header">
        <h4>上传下发凭证</h4>
      </div>
    </template>
    <div>
      <el-form :model="image" label-width="100px">
        <el-form-item label="上传多张图片">
          <multi-upload v-model="image.imageList"></multi-upload>
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
import { updateChannelSettlementStatus } from "@/api/settlementCenter/channelCommissionSettlement";
const emit = defineEmits(["update:dialogVisible", "up-Table"]);
const props = defineProps({
  dialogVisible: { type: Boolean, default: false },
  id: { type: String, equired: true },
});

let dialogVisible = computed(() => props.dialogVisible);
let id = computed(() => props.id);
let image = ref({
  imageList: [],
});
const handleConfirm = async () => {
  try {
    var data = {
      id: id.value + "",
      status: "3",
      transfer_certificate: JSON.stringify(image.value.imageList),
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
