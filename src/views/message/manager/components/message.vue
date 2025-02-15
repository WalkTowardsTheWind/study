<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
    >
      <el-form-item prop="keyword">
        <el-input v-model="formItem.keyword" placeholder="请输入">
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="timeData" label="通知日期">
        <zxn-date-range v-model="formItem.timeData" valueFormat="" />
      </el-form-item>
    </zxn-search>
    <div class="operation">
      <div class="operation-left">
        <el-button type="primary" @click="handleNotice()">公告通知</el-button>
        <el-button type="primary" plain @click="handleSend()"
          >消息发送</el-button
        >
      </div>
      <el-button type="primary" plain @click="handleAllRead()"
        >全部已读</el-button
      >
    </div>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      :loading="loading"
      @page-change="handlePageChange"
    >
      <template #operation="{ row }">
        <el-button
          v-if="[1].includes(row.is_top)"
          link
          type="primary"
          @click="handleCancelTop(row)"
          >取消置顶</el-button
        >
        <el-button
          v-if="[0].includes(row.is_top)"
          link
          type="primary"
          @click="handleTop(row)"
          >&nbsp;&nbsp;&nbsp;&nbsp;置顶&nbsp;&nbsp;&nbsp;</el-button
        >
        <el-button link type="primary" @click="handleView(row)">查看</el-button>
        <el-button
          v-if="[0].includes(row.status)"
          link
          type="primary"
          @click="handleRead(row)"
          >已读</el-button
        >
      </template>
    </zxn-table>
  </div>
  <view-dialog ref="viewDialogRef" />
  <notice-dialog ref="noticeDialogRef" />
  <send-dialog ref="sendDialogRef" />
</template>
<script setup lang="ts">
import {
  notifyIndex,
  read,
  allRead,
  topPing,
  cancelTopPing,
} from "@/api/message";
import { transformTimeRange } from "@/utils";
import noticeDialog from "./noticeDialog.vue";
import sendDialog from "./sendDialog.vue";
import viewDialog from "./viewDialog.vue";

const { proxy } = getCurrentInstance() as any;
const formItem = reactive({
  keyword: "",
  admin_name: "",
  timeData: [],
});
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const tableData = reactive([]) as any;
const columnList = [
  { label: "发布账户", prop: "account", minWidth: 180 },
  {
    label: "消息状态",
    type: "enum",
    path: "messageEnum.messageStatus",
    prop: "status",
    width: 100,
    // fixed: "left",
    color: {
      0: { color: "#36C5F4", backgroundColor: "#DFF6FD" },
      1: { color: "#366FF4", backgroundColor: "#DFE8FD" },
    },
  },
  { label: "信息类型", prop: "type", minWidth: 120 },
  { label: "信息标题", prop: "title", minWidth: 120 },
  { label: "信息内容", prop: "content", minWidth: 300 },
  { label: "发送对象", prop: "from", minWidth: 180 },
  { label: "通知时间", prop: "add_time", minWidth: 180 },
  { label: "操作", slot: "operation", fixed: "right", width: 180 },
];

const handleReset = () => {
  handleSearch();
};
const handleSearch = () => {
  pageInfo.page = 1;
  getList();
};
const handlePageChange = (cur: any) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  getList();
};
const loading = ref(false);
const getList = async () => {
  const params = transformTimeRange({ ...formItem }, "timeData", true);
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  loading.value = true;
  try {
    const { data } = await notifyIndex(params);
    loading.value = false;
    tableData.length = 0;
    pageInfo.page = data.current_page;
    pageInfo.total = data.total;
    var newData = data.data.map((item: any) => {
      return {
        ...item,
        type: proxy.$enumSet["messageEnum.messageType"][item.type],
      };
    });
    tableData.push(...newData);
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};
// 已读
const handleRead = async (row: any) => {
  try {
    await read(row.id);
    ElMessage({
      type: "success",
      message: "已读成功",
    });
    getList();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "已读失败",
    });
  }
};
const emit = defineEmits(["send", "notice", "view"]);
const handleCancelTop = async (row: any) => {
  try {
    await cancelTopPing(row.id);
    ElMessage({
      type: "success",
      message: "取消置顶成功",
    });
    getList();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "取消置顶失败",
    });
  }
};
const handleTop = async (row: any) => {
  try {
    await topPing(row.id);
    ElMessage({
      type: "success",
      message: "置顶成功",
    });
    getList();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "置顶失败",
    });
  }
};
// 查看
const viewDialogRef = ref();
const handleView = (row: any) => {
  viewDialogRef.value.init(row.id);
};
const handleAllRead = async () => {
  try {
    await allRead();
    ElMessage({
      type: "success",
      message: "全部已读成功",
    });
    getList();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "全部已读失败",
    });
  }
};
// 公告通知
const noticeDialogRef = ref();
const handleNotice = () => {
  emit("notice");
};
// 消息通知
const sendDialogRef = ref();
const handleSend = () => {
  emit("send");
};
//   onMounted(() => {
//     getList();
//   });
defineExpose({
  getList,
});
</script>
<style lang="scss" scoped>
.operation {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 10px 10px 0;
  &-left {
    display: flex;
    align-items: center;
  }
}
</style>
