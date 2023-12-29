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
      <el-form-item label="发送税地">
        <el-select
          class="w-[100%]"
          v-model="formItem.tax_land_id"
          filterable
          clearable
          placeholder="请选择税地"
        >
          <el-option
            v-for="item in taxLandOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          /> </el-select
      ></el-form-item>
      <el-form-item label="通知时间">
        <el-date-picker
          v-model="formItem.add_time"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item label="信息标题">
        <el-input v-model="formItem.title" placeholder="请输入信息标题" />
      </el-form-item>
      <el-form-item label="信息内容"
        ><el-input
          v-model="formItem.content"
          :rows="5"
          type="textarea"
          placeholder="请输入信息内容"
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
import { getLandList } from "@/api/common";
import { sendNotice } from "@/api/message";
let visible = ref(false);
const title = ref("");
const formItem = reactive({
  tax_land_id: "",
  add_time: [],
  title: "",
  content: "",
}) as any;
//税地
interface ListItem {
  value: string;
  label: string;
}
const taxLandOption = ref<ListItem[]>([]);
const getTaxLandOption = async () => {
  const { data } = await getLandList();
  console.log(data);
  const newData = data.tax_land_list.map((item: any) => {
    return {
      label: item.tax_land_name,
      value: item.id,
    };
  });
  taxLandOption.value = [];
  taxLandOption.value.push(...newData);
};
getTaxLandOption();
//
const send = async () => {
  let params = {
    tax_land_id: formItem.tax_land_id,
    start_time: formItem.add_time[0],
    end_time: formItem.add_time[1],
    title: formItem.title,
    content: formItem.content,
  };

  try {
    await sendNotice(params);
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
  (formItem.tax_land_id = ""),
    (formItem.add_time = []),
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
