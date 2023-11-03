<template>
  <zxn-plan>
    <zxn-tabs
      v-model:activeName="activeName"
      :tabsList="tabsList"
      @tabChange="handleTabChange"
      hasUpdate
    >
      <template #enterprise>
        <invoiceTable
          ref="enterprise"
          type="enterprise"
          @on-upload="handleUpload"
          @on-logistics="handleLogistics"
        />
      </template>
      <template #channel>
        <invoiceTable
          ref="channel"
          type="channel"
          @on-upload="handleUpload"
          @on-logistics="handleLogistics"
        />
      </template>
      <template #taxPayment>
        <taxPaymentReceipt
          ref="taxPayment"
          type="taxPayment"
          @on-upload="handleUploadCredentials"
          @on-view="handleView"
        />
      </template>
    </zxn-tabs>
    <task-dialog ref="taskDialogRef" />
    <add-invoice ref="addInvoiceRef" @on-success="handleTabChange" />
    <logistics-dialog ref="logisticsDialogRef" />
    <upload-credentials
      ref="uploadCredentialsRef"
      @on-success="handleTabChange"
    />
    <img-dialog ref="imgDialogRef" @on-success="handleTabChange" />
  </zxn-plan>
</template>
<script lang="ts">
export default {
  name: "invoiceManager",
};
</script>
<script setup lang="ts">
import taskDialog from "./components/taskDialog.vue";
import addInvoice from "./components/addinvoice.vue";
import invoiceTable from "./components/invoiceTable.vue";
import logisticsDialog from "./components/logisticsDialog.vue";
import taxPaymentReceipt from "./components/taxPaymentReceipt.vue";
import uploadCredentials from "./components/uploadCredentials.vue";
import imgDialog from "./components/imgDialog.vue";
const activeName = ref("enterprise");
const tabsList = [
  {
    name: "enterprise",
    label: "企业发票",
  },
  // {
  //   name: "channel",
  //   label: "渠道发票",
  // },
  {
    name: "taxPayment",
    label: "完税凭证",
  },
];
const enterprise = ref();
const channel = ref();
const taxPayment = ref();
const handleTabChange = (name?: any) => {
  if (name) {
    sessionStorage.setItem("invoiceManagerActiveName", name);
  }
  activeName.value =
    sessionStorage.getItem("invoiceManagerActiveName") ?? "enterprise";
  if (sessionStorage.getItem("invoiceManagerActiveName") === "enterprise") {
    enterprise.value.getList();
  } else if (sessionStorage.getItem("invoiceManagerActiveName") === "channel") {
    channel.value.getList();
  } else if (
    sessionStorage.getItem("invoiceManagerActiveName") === "taxPayment"
  ) {
    taxPayment.value.getList();
  } else if (activeName.value === "enterprise") {
    enterprise.value.getList();
  }
};
const addInvoiceRef = ref();
const handleUpload = (cur: any) => {
  addInvoiceRef.value.init(cur.id);
};
const uploadCredentialsRef = ref();
const handleUploadCredentials = (cur: any) => {
  uploadCredentialsRef.value.init(cur.id);
};
const logisticsDialogRef = ref();
const handleLogistics = (cur: any) => {
  logisticsDialogRef.value.init(cur.id);
};
const imgDialogRef = ref();
const handleView = (cur: any) => {
  imgDialogRef.value.init(cur);
};
onActivated(() => {
  handleTabChange();
});
</script>
