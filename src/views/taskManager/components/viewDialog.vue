<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? '合同详情' : '合同编辑'"
    width="50%"
    :before-close="handleClose"
    class="my-dialog"
  >
    <div>
      <div>任务内容</div>
      <el-form :model="formItem" inline label-width="90px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务名称">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务编号">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行业">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="关联企业">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公示时间">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公示金额">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="任务要求">
              <zxnTagSelect v-model="formItem.tags" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="需求人数">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务工期">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作时间">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务地点">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="税源地">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务状态">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <div>关联企业</div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="申请企业"> </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="申请账户"> </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="申请时间"> </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
import zxnTagSelect from "@/privateComponents/zxnTagSelect/index.vue";
let isEdit = ref(false);
let dialogVisible = ref(false);
const handleClose = () => {};
const formItem: object = reactive({
  name: "",
  tags: [{ id: 2, label: "不限学历" }],
});
</script>
<style lang="scss" scoped>
:deep(.my-dialog) {
  color: red;
}
</style>
