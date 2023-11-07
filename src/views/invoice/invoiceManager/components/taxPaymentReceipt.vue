<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
      :label-width="100"
    >
      <el-form-item label="" prop="keywords">
        <el-input
          v-model="formItem.keywords"
          placeholder="请输入企业名称或税源地"
        >
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
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <el-button type="primary" @click="handleUpload">上传</el-button>
        <el-button type="primary" @click="handleBatchDownload">下载</el-button>
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
        <el-button link type="primary" @click="handleView(row)">查看</el-button>
        <el-button link type="primary" @click="handleUpload(row)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="handleDownload([Number(row.id)])"
          >下载</el-button
        >
        <el-button link type="primary" @click="handleDelete(row)"
          >删除</el-button
        >
      </template>
    </zxn-table>
  </div>
</template>
<script setup lang="ts">
import {
  getCredentialsList,
  downloadCredentials,
  delCredentials,
} from "@/api/invoice";
import { transformTimeRange } from "@/utils";
import { downloadByData } from "@/utils/download";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { isArray } from "../../../../utils/is";
import { number } from "echarts";
const router = useRouter();
const props = defineProps({
  type: { type: String, default: "enterprise" },
});
const emits = defineEmits(["on-upload", "on-view"]);
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
  { label: "企业名称", prop: "company_name", minWidth: 160 },
  { label: "税源地", prop: "tax_land_name", minWidth: 160 },
  { label: "完税月份", prop: "month", minWidth: 120 },
  { label: "上传账户", prop: "real_name", minWidth: 160 },
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
    const { data } = await getCredentialsList(params);
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
  emits("on-view", cur);
};
const handleEdit = (cur: any) => {
  // emits("on-view", cur);
};
/**
 * 下载完税凭证ZIP
 */
const handleDownload = async (ids: Array<number>) => {
  const params = {
    ids,
  };
  const { data } = await downloadCredentials(params);
  downloadByData(data, "完税凭证.zip");
};
const handleDelete = (row: any) => {
  ElMessageBox({
    title: "",
    message: h("p", null, `确定删除该凭证`),
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    beforeClose: async (
      action: string,
      instance: { confirmButtonLoading: boolean },
      done: () => void
    ) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        await delCredentials(row.id);
        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: "成功删除该凭证",
    });
    getList();
  });
};
const handleUpload = (cur: any) => {
  emits("on-upload", cur);
};

/**
 * 批量选择
 */
//选中的数据
//返回id数组
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};

/**
 * 批量操作
 */
const handleBatchDownload = async () => {
  if (Object.keys(selectionData.value).length == 0) {
    ElMessage({
      type: "error",
      message: `请选择完税凭证!`,
    });
  } else {
    const params = {
      ids: selectionData.value,
    };
    const { data } = await downloadCredentials(params);
    downloadByData(data, "完税凭证.zip");
  }
};
onMounted(() => {});
defineExpose({
  getList,
});
</script>
