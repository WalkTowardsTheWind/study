<template>
  <el-dialog
    v-model="visible"
    :before-close="HandleClose"
    class="zxn-dialog"
    title="绑定渠道"
    width="900px"
  >
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="pageChange"
    >
    </zxn-table>
    <div class="btn">
      <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
      <el-button @click="HandleClose">取消</el-button>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { getBindList, bind } from "@/api/account/business";
const emit = defineEmits(["up"]);
const visible = ref(false);
const ids = ref([]);
const tableData = reactive([] as any);
const columnList = [
  { label: "渠道名称", prop: "channel_name", minWidth: 120 },
  { label: "所属税地", prop: "tax_land_name", minWidth: 120 },
  { label: "企业点位", prop: "tax_point", minWidth: 120 },
  { label: "渠道点位", prop: "channel_point", minWidth: 120 },
  { label: "渠道类型", prop: "channel_type", minWidth: 120 },
  { label: "渠道等级", prop: "channel_level", minWidth: 120 },
  { label: "联系人", prop: "contact", minWidth: 120 },
  { label: "联系方式", prop: "contact_phone", minWidth: 120 },
];
const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});
function pageChange(current: any) {
  const { page, limit } = current;
  pageInfo.limit = limit;
  pageInfo.page = page;
  getList();
}
const getList = async () => {
  const { data } = await getBindList({ ids: ids.value });
  tableData.length = 0;
  tableData.push(...data.data);
  pageInfo.total = data.total;
  console.log(tableData, 2222);
};
const loading = ref(false);
const handleConfirm = async () => {
  try {
    await bind({ ids: ids.value });
    ElMessage({
      type: "success",
      message: `绑定成功`,
    });
    emit("up");
  } catch (error) {
    ElMessage({
      type: "error",
      message: `绑定失败`,
    });
  }
  visible.value = false;
};
const HandleClose = () => {
  visible.value = false;
};
const init = async (i: any) => {
  ids.value = [];
  ids.value = i;
  visible.value = true;
  getList();
};
defineExpose({
  init,
});
</script>

<style lang="scss" scoped>
.btn {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
