<template>
  <el-dialog v-model="visible" custom-class="zxn-dialog" title="关联任务">
    <el-form :model="formItem" label-width="110">
      <el-form-item label="选择物流">
        <el-select v-model="formItem.status" placeholder="请选择">
          <el-option
            v-for="item in []"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="输入物流单号">
        <el-select v-model="formItem.status" placeholder="请选择">
          <el-option
            v-for="item in []"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="上传票样">
        <multi-upload />
      </el-form-item>
      <el-form-item label="上传物流面单">
        <multi-upload />
      </el-form-item>
      <template #footer>
        <div>
          <el-button type="primary">确定</el-button>
          <el-button>取消</el-button>
        </div>
      </template>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
export default {
  name: "addInvoice",
};
</script>
<script setup lang="ts">
import MultiUpload from "@/components/Upload/MultiUpload.vue";

let visible = ref(false);
const formItem: object = reactive({});
const init = (data: any[]): void => {
  visible.value = true;
};
defineExpose({
  init,
});
</script>
