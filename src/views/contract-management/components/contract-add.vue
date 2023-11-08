<template>
  <zxn-dialog
    title="合同归档"
    :visible="visible"
    @close-dialog="addDialogClose"
    @confirm-dialog="addDialogConfirm"
  >
    <el-form ref="addFormRef" label-width="auto">
      <el-row>
        <el-col>
          <el-form-item label="合同类型">
            <el-select class="w-full"></el-select>
          </el-form-item>
          <el-form-item label="合同期限">
            <div class="el-date">
              <el-date-picker
                v-model="value1"
                style="width: 100%"
                type="date"
                placeholder="请选择日期"
              />
            </div>
          </el-form-item>
          <el-form-item label="甲方">
            <el-input placeholder="请输入" />
          </el-form-item>
          <el-form-item label="乙方">
            <el-input placeholder="请输入" />
          </el-form-item>
          <el-form-item label="备注要求">
            <el-input placeholder="请输入" />
          </el-form-item>
          <el-form-item label="合同文件">
            <MultiUpload :limit="1" v-model="addForm.contract" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </zxn-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
});
const value1 = ref("");

const addForm = reactive({
  contract: [],
});

const emit = defineEmits(["add-close", "add-confirm"]);

const addDialogClose = () => {
  emit("add-close", false);
};
const addDialogConfirm = () => {
  emit("add-confirm");
};
</script>
