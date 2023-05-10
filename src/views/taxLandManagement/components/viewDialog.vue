<template>
  <el-dialog
    v-model="dialogVisible"
    title="新增税地"
    width="50%"
    :before-close="handleClose"
  >
    <div>
      <viewSteps v-model:active="active" />
      {{ active }}
      <el-button @click="active--">active++</el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">保存</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          关闭
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import viewSteps from "./viewSteps.vue";
const emit = defineEmits(["update:dialogVisible"]);
const props = defineProps({
  dialogVisible: { type: Boolean, default: false },
  title: { type: String, equired: true },
});
let dialogVisible = computed(() => props.dialogVisible);
const active = ref<number>(1);
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
