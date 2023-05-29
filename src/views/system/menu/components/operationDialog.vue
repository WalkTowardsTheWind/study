<template>
  <el-dialog v-model="visible" class="zxn-dialog" title="新增菜单" width="452">
    <el-form
      ref="form"
      :model="formItem"
      label-width="90"
      class="pr-40px"
      :rules="rules"
    >
      <el-form-item label="菜单名称" prop="menu_name">
        <el-input v-model="formItem.menu_name" />
      </el-form-item>
      <el-form-item label="上级分类" prop="pid">
        <el-input v-model="formItem.pid" />
      </el-form-item>
      <el-form-item label="类型" prop="auth_type">
        <el-select v-model="formItem.auth_type" class="w-100%">
          <el-option
            v-for="item in proxy.$const['system.authType']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="节点路由" prop="menu_path">
        <el-input v-model="formItem.menu_path" />
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model="formItem.path" />
      </el-form-item>
      <el-form-item label="是否菜单" prop="is_show_path">
        <zxn-button-group
          v-model="formItem.is_show_path"
          :options="proxy.$const['system.yesOrNo']"
        />
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="handleSubmit" :loading="loading">
          确定
        </el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
import type { FormRules } from "element-plus";
import { setMenus } from "@/api/system";
const { proxy } = getCurrentInstance() as any;

let visible = ref(false);
const rules = reactive<FormRules>({
  express_id: [
    { required: true, message: "请选择物流公司", trigger: "change" },
  ],
  express_no: [
    { required: true, message: "请输入物流单号", trigger: "change" },
  ],
});
const formItem = reactive({
  menu_name: "",
  pid: "",
  auth_type: "",
  menu_path: "",
  path: "",
  is_show_path: "",
});
const init = (): void => {
  visible.value = true;
};
const loading = ref(false);
const handleSubmit = async () => {
  const params = { ...formItem };
  loading.value = true;
  try {
    await setMenus(params);
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};
const handleCancel = () => {
  visible.value = false;
};
onMounted(() => {});
defineExpose({
  init,
});
</script>
