<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
      :label-width="100"
    >
      <el-form-item label="" prop="invoice_name">
        <el-input v-model="formItem.invoice_name" placeholder="请输入企业名称">
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="开票状态" prop="status">
        <zxn-select v-model="formItem.status" @change="handleSearch">
          <el-option
            v-for="item in proxy.$const['statusEnum.invoiceStatus']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </zxn-select>
      </el-form-item>
      <el-form-item label="开票类型" prop="invoice_type">
        <el-select v-model="formItem.invoice_type" placeholder="请选择">
          <el-option
            v-for="item in proxy.$const['statusEnum.applyInvoiceType']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="开票行业类目"
        prop="category_id"
        v-if="type === 'enterprise'"
      >
        <el-cascader
          v-model="formItem.category_id"
          placeholder="请选择"
          :options="industryList"
          filterable
          clearable
          :props="{ label: 'name', value: 'id' }"
        />
      </el-form-item>
      <el-form-item prop="tax_land_id" label="税地名称">
        <tax-source-select
          v-model:taxId="formItem.tax_land_id"
          @change-tax="handleSearch"
        />
      </el-form-item>
      <el-form-item prop="timeData" label="申请日期">
        <zxn-date-range v-model="formItem.timeData" />
      </el-form-item>
    </zxn-search>
    <!-- 111 -->
    <!-- :hasSelect="['', '0'].includes(formItem.status)" 
      @selection-change="handleSelect"
    -->
    <zxn-table
      ref="table"
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      :loading="loading"
      hasSelect
      :selectable="selectable"
      @page-change="handlePageChange"
      :pageSizes="[10, 20, 30, 50, 200]"
    >
      <template #tableTop>
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button type="primary" plain>批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="reject">驳回</el-dropdown-item>
              <el-dropdown-item command="issue">开立</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!--  v-if="!(['', '0'].includes(formItem.status) && selectionData.length)" -->
        <el-dropdown class="ml-4" trigger="click" @command="handleExport">
          <el-button type="primary">导出</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">表格</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
        <el-button
          v-if="[0].includes(row.status)"
          link
          type="primary"
          @click="handleReject([row.id])"
          >驳回</el-button
        >
        <el-button
          v-if="[7].includes(row.status)"
          link
          type="primary"
          @click="handleWithdraw([row.id])"
          >撤回</el-button
        >
        <el-button
          v-if="[7].includes(row.status)"
          link
          type="primary"
          @click="handleUpload(row)"
          >上传发票</el-button
        >
        <el-button
          v-if="[0].includes(row.status)"
          link
          type="primary"
          @click="handleIssue([row.id])"
          >开立</el-button
        >
        <el-button
          v-if="[1, 5].includes(row.status)"
          link
          type="primary"
          @click="handleLogistics(row)"
          >查看物流</el-button
        >
        <el-button link type="primary" @click="handleView(row)">详情</el-button>
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
} from "@/api/invoice";
import { transformTimeRange } from "@/utils";
import { downloadByOnlineUrl } from "@/utils/download";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useRouteParams } from "@/store/modules/routeParams";
import { isNumber } from "@/utils/is";
const router = useRouter();
const props = defineProps({
  type: { type: String, default: "enterprise" },
});
const emits = defineEmits(["on-upload", "on-logistics"]);
const industryList = reactive([]);
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 200,
});
const getIndustryList = async () => {
  const { data } = await getTreeList({ type: 2 });
  industryList.length = 0;
  industryList.push(...data);
};
const formItem = reactive({
  invoice_name: "",
  tax_land_id: "",
  invoice_type: "",
  category_id: [],
  timeData: [],
  status: "",
});
const columnList: any[] = reactive([
  { label: "发票任务编号", prop: "invoice_no", width: 110, fixed: "left" },
  { label: "税地名称", prop: "tax_land_name", width: 120, fixed: "left" },
  {
    label: "发票类目",
    prop: "category_num",
    width: 100,
    fixed: "left",
  },
  { label: "申请开票企业", prop: "company_name", width: 120, fixed: "left" },
  {
    label: "开票样式",
    prop: "invoice_type",
    type: "enum",
    path: "statusEnum.applyInvoiceType",
    minWidth: 120,
  },
  { label: "申请开票金额", prop: "apply_amount", type: "money", minWidth: 120 },
  {
    label: "税地发票面额",
    prop: "invoice_denomination",
    type: "enum",
    path: "taxLandManagementEnum.invoice_denomination",
    minWidth: 110,
  },
  { label: "发票张数", prop: "invoice_num", minWidth: 80 },
  {
    label: "开票要求",
    prop: "invoice_require",
    type: "enum",
    path: "statusEnum.invoiceRequire",
    minWidth: 120,
  },
  { label: "申请时间", prop: "add_time", minWidth: 180 },
  { label: "结算确认函", slot: "img", minWidth: 200 },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.invoiceStatus",
    prop: "status",
    color: {
      0: { color: "#35C5F3", backgroundColor: "#dff6fd" },
      1: { color: "#356FF3", backgroundColor: "#dfe8fd" },
      2: { color: "#F35135", backgroundColor: "#fde3df" },
      3: { color: "#FFFFFF", backgroundColor: "#f9a89a" },
      5: { color: "#356FF3", backgroundColor: "#dfe8fd" },
      7: { color: "#19B56B", backgroundColor: "#DAF3E7" },
    },
    minWidth: 120,
  },
  {
    label: "是否导出",
    type: "enum",
    path: "common.yesOrNo",
    prop: "is_excel",
    minWidth: 120,
  },
  { label: "备注", prop: "reject_reason", minWidth: 180 },
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
const handlePageChange = (cur) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  getList();
};
const loading = ref(false);
const getList = async () => {
  const params = transformTimeRange({ ...formItem });
  params.category_id = params.category_id ? params.category_id.pop() : [].pop();
  params.task_type = props.type;
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
const selectable = (row) => {
  // return Boolean(!row.status);
  return true;
};
const handleView = (cur) => {
  router.push({ name: "invoiceView", query: { id: cur.id, type: props.type } });
};
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};
const table = ref();
const handleCommand = (type: string) => {
  const selected = table.value.getSelectionRows();
  const ids = selected.map((it) => it.id);
  if (!ids.length) {
    return ElMessage({
      type: "error",
      message: `请选择数据`,
    });
  }
  switch (type) {
    case "reject":
      handleReject(ids);
      break;
    // case "excel":
    //   handleExcel(ids);
    //   break;
    case "issue":
      handleIssue(ids);
      break;
  }
};
// const handleAllExcel = async () => {
//   const selected = table.value.getSelectionRows();
//   const ids = selected.map((it) => it.id);
//   if (!ids.length) {
//     return ElMessage({
//       type: "error",
//       message: `请选择数据`,
//     });
//   } else {
//     handleExcel(ids);
//   }
// };
/**
 * 导出批量操作
 */
const handleExport = (command: string | number | object) => {
  if (command == 1) {
    const selected = table.value.getSelectionRows();
    const ids = selected.map((it: any) => it.id);
    if (!ids.length) {
      return ElMessage({
        type: "error",
        message: `请选择数据`,
      });
    } else {
      handleExcel(ids);
    }
  }
};
const handleReject = (ids: number[]) => {
  let confirmed = ids.filter((item) => {
    let obj = tableData.find((o: any) => {
      return o.id == item;
    });
    return obj.status === 0;
  });
  let unconfirmed = ids.filter((item) => {
    let obj = tableData.find((o: any) => {
      return o.id == item;
    });
    return obj.status !== 0;
  });
  if (confirmed.length != 0 && unconfirmed.length == 0) {
    ElMessageBox.prompt("", "驳回原因", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputErrorMessage: "请输入驳回原因",
      beforeClose: async (
        action: string,
        instance: { confirmButtonLoading: boolean; inputValue: string },
        done: () => void
      ) => {
        if (action === "confirm") {
          instance.confirmButtonLoading = true;
          const params = {
            ids: confirmed,
            status: 2,
            reject_reason: instance.inputValue,
          };
          props.type === "enterprise"
            ? await setStatus(params)
            : await channelSetStatus(params);
          instance.confirmButtonLoading = false;
          done();
        } else {
          done();
        }
      },
    }).then(() => {
      ElMessage({
        type: "success",
        message: `驳回成功`,
      });
      getList();
    });
  } else {
    return ElMessage.warning('存在非"申请中"状态的信息，请重新勾选');
  }
};
// 开立
const handleIssue = (ids: number[]) => {
  let confirmed = ids.filter((item) => {
    let obj = tableData.find((o: any) => {
      return o.id == item;
    });
    return obj.status === 0;
  });
  let unconfirmed = ids.filter((item) => {
    let obj = tableData.find((o: any) => {
      return o.id == item;
    });
    return obj.status !== 0;
  });
  if (confirmed.length != 0 && unconfirmed.length == 0) {
    ElMessageBox({
      title: "",
      message: h("p", null, `确定开立？`),
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
          try {
            const params = {
              ids: confirmed,
              status: 7,
            };
            props.type === "enterprise"
              ? await setStatus(params)
              : await channelSetStatus(params);
            instance.confirmButtonLoading = false;
            done();
            ElMessage({
              type: "success",
              message: "开立成功",
            });
          } catch (error) {
            instance.confirmButtonLoading = false;
            done();
            ElMessage({
              type: "error",
              message: "开立失败",
            });
          }
        } else {
          done();
        }
      },
    })
      .then(() => {})
      .catch((action) => {
        if (action === "cancel") {
          ElMessage({
            type: "warning",
            message: "取消操作",
          });
        }
      })
      .finally(() => {
        getList();
      });
  } else {
    return ElMessage.warning('存在非"申请中"状态的信息，请重新勾选');
  }
};
// 撤回
const handleWithdraw = (ids: number[]) => {
  ElMessageBox({
    title: "",
    message: h("p", null, `确定撤回？`),
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
        try {
          const params = {
            ids,
            status: 0,
          };
          props.type === "enterprise"
            ? await setStatus(params)
            : await channelSetStatus(params);
          instance.confirmButtonLoading = false;
          done();
          ElMessage({
            type: "success",
            message: "撤回成功",
          });
        } catch (error) {
          instance.confirmButtonLoading = false;
          done();
          ElMessage({
            type: "error",
            message: "撤回失败",
          });
        }
      } else {
        done();
      }
    },
  })
    .then(() => {})
    .catch((action) => {
      if (action === "cancel") {
        ElMessage({
          type: "warning",
          message: "取消操作",
        });
      }
    })
    .finally(() => {
      getList();
    });
};
const handleExcel = async (ids: Array<number>) => {
  // const params = transformTimeRange({ ...formItem });
  // params.category_id = params.category_id.pop();
  // params.task_type = props.type;
  // params.page = 1;
  // params.limit = "9999";
  const params = {
    ids,
    tax_land_id: formItem.tax_land_id,
    page: 1,
    limit: "9999",
  };
  await downloadByOnlineUrl("/adminapi/invoice/get_excel", params);
};

const handleUpload = (cur: any) => {
  emits("on-upload", cur);
};
const handleLogistics = (cur: any) => {
  emits("on-logistics", cur);
};
onMounted(() => {
  if (props.type === "enterprise") {
    getIndustryList();
  }
});
onActivated(() => {
  const { pullParams } = useRouteParams();
  const searchParams: any = pullParams("invoiceManager");
  if (searchParams) {
    formItem.status =
      isNumber(searchParams.status) || searchParams.status
        ? searchParams.status + ""
        : "";
  }
});
defineExpose({
  getList,
});
</script>
