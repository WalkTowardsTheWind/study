<template>
  <zxn-plan>
    <zxn-tabs
      v-model:activeName="activeName"
      :tabsList="tabsList"
      @tabChange="handleTabChange"
    >
      <template #message>
        <message-tem
          ref="messageRef"
          @send="handleSend"
          @notice="handleNotice"
        ></message-tem>
      </template>
      <template #messageSend>
        <message-send-tem
          ref="messageSendRef"
          @send="handleSend"
          @notice="handleNotice"
        ></message-send-tem>
      </template>
    </zxn-tabs>
    <view-dialog ref="viewDialogRef" />
    <notice-dialog ref="noticeDialogRef" />
    <send-dialog ref="sendDialogRef" />
  </zxn-plan>
</template>
<script lang="ts">
export default {
  name: "messageManager",
};
</script>
<script setup lang="ts">
import messageTem from "./components/message.vue";
import messageSendTem from "./components/messageSend.vue";
import noticeDialog from "./components/noticeDialog.vue";
import sendDialog from "./components/sendDialog.vue";
import viewDialog from "./components/viewDialog.vue";
const activeName = ref("message");
const tabsList = reactive([
  { label: "消息接受", name: "message" },
  { label: "消息发送", name: "messageSend" },
]);
const messageRef = ref();
const messageSendRef = ref();
const handleTabChange = (name?: any) => {
  if (name) {
    sessionStorage.setItem("messageActiveName", name);
  }
  activeName.value = sessionStorage.getItem("messageActiveName") ?? "message";
  if (sessionStorage.getItem("messageActiveName") === "message") {
    messageRef.value.getList();
  } else if (sessionStorage.getItem("messageActiveName") === "messageSend") {
    messageSendRef.value.getList();
  } else if (activeName.value === "message") {
    messageRef.value.getList();
  }
};
// // 查看
// const viewDialogRef = ref();
// const handleView = (cur:any) => {
//   viewDialogRef.value.init(cur);
// };
// 公告通知
const noticeDialogRef = ref();
const handleNotice = () => {
  noticeDialogRef.value.init();
};
// 消息通知
const sendDialogRef = ref();
const handleSend = () => {
  sendDialogRef.value.init();
};
onActivated(() => {
  handleTabChange();
});
</script>
