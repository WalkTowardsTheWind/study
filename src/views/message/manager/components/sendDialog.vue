<template>
  <el-dialog
    v-model="visible"
    @close="handleClose"
    class="zxn-dialog"
    :title="title"
    width="452"
  >
    <el-form
      ref="form"
      :model="formItem"
      label-width="80"
      label-position="left"
      class="pr-40px"
    >
      <el-form-item label="发送对象">
        <el-select
          class="w-[100%]"
          ref="companySelect"
          v-model="formItem.company_id"
          filterable
          clearable
          placeholder="请选择企业"
        >
          <el-option
            v-for="item in optionsCompany"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="信息标题">
        <el-input v-model="formItem.title" placeholder="请输入信息标题" />
      </el-form-item>
      <el-form-item label="信息内容"
        ><el-input
          v-model="formItem.content"
          :rows="5"
          type="textarea"
          placeholder="Please input"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex justify-center">
        <el-button type="primary" @click="send"> 发送 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { transformTimeRange } from "@/utils";
import { getCompanyList, sendMsg } from "@/api/message";
let visible = ref(false);
const title = ref("");
const formItem = reactive({
  company_id: "",
  title: "",
  content: "",
});
//获取企业列表
interface ListItem {
  value: string;
  label: string;
}
const companySelect = ref();
const optionsCompany = ref<ListItem[]>([]);
const getCompany = async () => {
  const { data } = await getCompanyList();
  const newData = data.data.map((item: any) => {
    return {
      label: item.company_name,
      value: item.company_id,
    };
  });
  optionsCompany.value = [];
  optionsCompany.value.push(...newData);
  console.log(data);
};
getCompany();
//
const send = async () => {
  let params = transformTimeRange({ ...formItem }, "add_time", true) as any;
  try {
    await sendMsg(params);
    visible.value = false;
    ElMessage({
      type: "success",
      message: "发送成功",
    });
  } catch (error) {
    ElMessage({
      type: "error",
      message: "发送失败",
    });
    visible.value = false;
  }
};
const init = async () => {
  (formItem.company_id = ""),
    (formItem.title = ""),
    (formItem.content = ""),
    (visible.value = true);
};
const handleClose = () => {};
onMounted(() => {});
defineExpose({
  init,
});
</script>
