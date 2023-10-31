<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
      :label-width="100"
    >
      <el-form-item label="" prop="keywords">
        <el-input v-model="formItem.keywords" placeholder="请输入">
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="timeData" label="上传日期">
        <zxn-date-range v-model="formItem.timeData" />
      </el-form-item>
    </zxn-search>
    <zxn-table
      ref="table"
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      :loading="loading"
      hasSelect
      @page-change="handlePageChange"
    >
      <template #tableTop>
        <el-button type="primary" plain @click="handleUpload">上传</el-button>
        <!-- <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary" plain>批量操作</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="reject">驳回</el-dropdown-item>
                <el-dropdown-item command="excel">导出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
      </template>
      <template #img="{ row }">
        <zxn-image
          :imgList="row.settlement_confirmation_letter"
          :width="40"
          :height="40"
          targetClick
          ellipsis
        />
      </template>
      <template #operation="{ row }">
        <template v-if="!row.status">
          <!-- <el-button link type="primary" @click="handleReject([row.id])"
              >驳回</el-button
            > -->
          <!-- <el-button link type="primary" @click="handleUpload(row)"
              >上传发票</el-button
            > -->
        </template>
        <el-button link type="primary" @click="handleView(row)">查看</el-button>
        <el-button link type="primary" @click="handleLogistics(row)"
          >查看物流</el-button
        >
        <el-button link type="primary" @click="handleDownload(row)"
          >下载</el-button
        >
      </template>
    </zxn-table>
  </div>
</template>
<script setup lang="ts">
import type { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
import { getTreeList } from "@/api/common";
import {
  getInvoiceInCompany,
  getInvoiceInChannel,
  setStatus,
  channelSetStatus,
  getInvoiceExcel,
} from "@/api/invoice";
import { transformTimeRange } from "@/utils";
import { downloadByData } from "@/utils/download";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useRouteParams } from "@/store/modules/routeParams";
import { isNumber } from "@/utils/is";
const router = useRouter();
const props = defineProps({
  type: { type: String, default: "enterprise" },
});
const emits = defineEmits(["on-upload", "on-logistics"]);
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});

const formItem = reactive({
  keywords: "",
  timeData: [],
});
const columnList: any[] = reactive([
  { label: "企业名称", prop: "company_name", minWidth: 120 },
  { label: "税源地", prop: "tax_land_name", minWidth: 120 },
  { label: "完税月份", prop: "add_time", minWidth: 120 },
  { label: "上传账户", prop: "account", minWidth: 120 },
  { label: "上传时间", prop: "add_time", minWidth: 180 },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    align: "right",
    width: 230,
  },
]);
const tableData: any[] = reactive([]);

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
  const params = transformTimeRange({ ...formItem });
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  loading.value = true;
  try {
    const { data } =
      props.type === "enterprise"
        ? await getInvoiceInCompany(params)
        : await getInvoiceInChannel(params);
    loading.value = false;
    tableData.length = 0;
    pageInfo.page = data.current_page;
    pageInfo.total = data.total;
    tableData.push(...data.data);
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};
const handleView = (cur: any) => {
  router.push({ name: "invoiceView", query: { id: cur.id, type: props.type } });
};
const handleDownload = (cur: any) => {
  router.push({ name: "invoiceView", query: { id: cur.id, type: props.type } });
};
// const table = ref();
// const handleCommand = (type: string) => {
//   const selected = table.value.getSelectionRows();
//   const ids = selected.map((it) => it.id);
//   if (!ids.length) {
//     return ElMessage({
//       type: "error",
//       message: `请选择数据`,
//     });
//   }
//   switch (type) {
//     case "reject":
//       handleReject(ids);
//       break;
//     case "excel":
//       handleExcel(ids);
//       break;
//   }
// };
// const handleReject = (ids: number[]) => {
//   ElMessageBox.prompt("", "驳回原因", {
//     confirmButtonText: "确定",
//     cancelButtonText: "取消",
//     inputErrorMessage: "请输入驳回原因",
//     beforeClose: async (
//       action: string,
//       instance: { confirmButtonLoading: boolean; inputValue: string },
//       done: () => void
//     ) => {
//       if (action === "confirm") {
//         instance.confirmButtonLoading = true;
//         const params = {
//           ids,
//           status: 2,
//           reject_reason: instance.inputValue,
//         };
//         props.type === "enterprise"
//           ? await setStatus(params)
//           : await channelSetStatus(params);
//         instance.confirmButtonLoading = false;
//         done();
//       } else {
//         done();
//       }
//     },
//   }).then(() => {
//     ElMessage({
//       type: "success",
//       message: `驳回成功`,
//     });
//     getList();
//   });
// };
const handleExcel = async (ids: number[]) => {
  const params = {
    ids,
    page: 1,
    limit: pageInfo.limit,
  };
  const { data } = await getInvoiceExcel(params);
  downloadByData(data, "发票列表.xlsx");
  await getList();
};

const handleUpload = (cur: any) => {
  emits("on-upload", cur);
};
const handleLogistics = (cur: any) => {
  emits("on-logistics", cur);
};
onMounted(() => {});
// onActivated(() => {
//   const { pullParams } = useRouteParams();
//   const searchParams: any = pullParams("invoiceManager");
//   if (searchParams) {
//     formItem.status =
//       isNumber(searchParams.status) || searchParams.status
//         ? searchParams.status + ""
//         : "";
//   }
// });
defineExpose({
  getList,
});
</script>
