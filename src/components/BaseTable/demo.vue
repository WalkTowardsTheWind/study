<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
    >
      <el-form-item>
        <el-input
          v-model="formItem.keywords"
          placeholder="请输入名称/编号/对接人"
          clearable
        >
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="税地状态">
        <zxn-select v-model="formItem.status" @change="handleSearch">
          <el-option
            v-for="item in proxy.$const['taxLandManagementEnum.taxLandStatus']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </zxn-select>
      </el-form-item>

      <el-form-item label="税地发票类型" label-width="110px">
        <zxn-select v-model="formItem.invoice_type" @change="handleSearch">
          <el-option
            v-for="item in proxy.$const['taxLandManagementEnum.InvoiceType']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </zxn-select>
      </el-form-item>

      <!-- <el-form-item label="发票面额">
        <zxn-select
          v-model="formItem.invoice_denomination"
          @change="handleSearch"
        >
          <el-option
            v-for="item in proxy.$const[
              'taxLandManagementEnum.invoice_denomination'
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </zxn-select>
      </el-form-item> -->

      <!-- <el-form-item label="计算方式">
        <zxn-select v-model="formItem.calculation_type" @change="handleSearch">
          <el-option
            v-for="item in proxy.$const[
              'taxLandManagementEnum.calculationType'
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </zxn-select>
      </el-form-item> -->
      <el-form-item prop="date" label="申请日期">
        <zxn-date-range v-model="formItem.timeData" />
      </el-form-item>
    </zxn-search>
    <BaseTable
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="handlePageChange"
      hasSelect
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <el-dropdown trigger="click" @command="handleAdd">
          <el-button type="primary">+ 新建</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">新建自营税地</el-dropdown-item>
              <el-dropdown-item command="2">新建采购税地</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown class="ml-4" trigger="click" @command="handleExport">
          <el-button type="primary">导出</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">资料包</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>

      <template #header-invoice_type="scope">
        <BasePopover
          type="checkbox"
          v-model="params.checkbox"
          @dataChange="DataChange"
          :lable="scope.column.label"
          title="标题1"
          placement="top"
        >
        </BasePopover>
      </template>
      <template #header-ground_time="scope">
        <BasePopover
          type="input"
          v-model="params.ly"
          @dataChange="DataChange"
          :lable="scope.column.label"
          title="标题2"
          placement="top"
        >
        </BasePopover>
      </template>
      <template #header-tax_land_head="scope">
        <BaseInput
          v-model="value"
          :title="scope.column.label"
          @dataChange="handleDataChange"
        ></BaseInput>
      </template>
      <template #IndustryRestrictions="scope">
        <el-button
          link
          type="primary"
          @click="handleIndustryRestrictions(scope)"
          >查看</el-button
        >
      </template>
      <template #operation="scope">
        <template v-if="[0, 1].includes(scope.row.status)">
          <el-button link type="primary" @click="handleUpdateStatus(scope)">{{
            [0].includes(scope.row.status) ? "上架" : "下架"
          }}</el-button>
        </template>

        <el-button link type="primary" @click="handleDelete(scope)"
          >删除</el-button
        >
        <el-button
          v-if="scope.row.status == 0"
          link
          type="primary"
          @click="handleEdit(scope)"
          >编辑</el-button
        >

        <!-- <el-button link type="primary" @click="handleF(scope)">导出</el-button> -->
        <el-button link type="primary" @click="handleDetails(scope)"
          >详情</el-button
        >
      </template>
    </BaseTable>
  </div>
  <InspectDialog
    v-model:dialogVisible="dialogVisible"
    :imageList="imageList"
    :title="title"
  />
</template>
<script setup lang="ts">
import { transformTimeRange } from "@/utils";
import { downloadByOnlineUrl } from "@/utils/download";
import { useRouter } from "vue-router";
import {
  getSelfOperatedTaxLandList,
  selfOperatedTaxLandDelete,
  selfOperatedTaxLandUpdateStatus,
} from "@/api/taxLandManagement/selfOperatedTaxLand";
import { ElMessage } from "element-plus";
import InspectDialog from "../components/InspectDialog.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BasePopover from "@/components/BasePopover/BasePopover.vue";
const router = useRouter();
const { proxy } = getCurrentInstance() as any;
//
const params = reactive({
  ly: "",
  checkbox: [],
});
const DataChange = (num: any) => {
  console.log(params, "DataChange", num);
};

//
const value = ref("123");
const handleDataChange = (num: any) => {
  console.log(value.value, "数据更新", num);
};

//
const dialogVisible = ref(false);
const title = ref("");
const imageList = ref([]);
//

// 查询重置
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const handleReset = () => {
  formItem.value = {
    keywords: "",
    status: "",
    tax_land_type: "0",
    timeData: [],
    invoice_type: "",
    invoice_denomination: "",
    calculation_type: "",
    page: "",
    limit: "",
  };
  handleSearch();
};
const handleSearch = () => {
  console.log("查询");
  pageInfo.page = 1;
  getTableData();
  // 时间选择判断
  // if (!formItem.value.timeData[0] && !formItem.value.timeData[1]) {
  //   getTableData();
  // } else if (formItem.value.timeData[0] && formItem.value.timeData[1]) {
  //   getTableData();
  // } else if (!formItem.value.timeData[0] && formItem.value.timeData[1]) {
  //   ElMessage({
  //     type: "warning",
  //     message: `请选择开始时间`,
  //   });
  // } else if (formItem.value.timeData[0] && !formItem.value.timeData[1]) {
  //   ElMessage({
  //     type: "warning",
  //     message: `请选择结束时间`,
  //   });
  // }
};
const handlePageChange = (cur: any) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  getTableData();
};

const formItem = ref({
  keywords: "",
  status: "",
  tax_land_type: "0",
  timeData: [],
  invoice_type: "",
  invoice_denomination: "",
  calculation_type: "",
  page: "",
  limit: "",
});
const tableData = reactive([] as any);
const columnList = [
  { label: "税地编号", prop: "tax_land_no", width: 100, fixed: "left" },
  {
    label: "状态",
    type: "enum",
    path: "taxLandManagementEnum.taxLandStatus",
    prop: "status",
    width: 100,
    fixed: "left",
    color: {
      0: { color: "#36C5F4", backgroundColor: "#DFF6FD" },
      1: { color: "#366FF4", backgroundColor: "#DFE8FD" },
      2: { color: "#333333", backgroundColor: "#DEDEDE" },
      3: { color: "#F45136", backgroundColor: "#FDE3DF" },
    },
  },
  { label: "税地名称", prop: "tax_land_name", width: 100, fixed: "left" },
  { label: "税地地区", prop: "merger_name", minWidth: 120 },
  { label: "税地成本", prop: "tax_cost_point", minWidth: 120 },
  { label: "签约数量", prop: "sign_count", minWidth: 120 },
  { label: "税地类型", prop: "tax_land_type", minWidth: 120 },

  // { label: "计算方式", prop: "calculation_type" },
  { label: "对接人", prop: "tax_land_head", minWidth: 120 },
  { label: "税地发票类型", prop: "invoice_type", minWidth: 120 },
  // { label: "发票面额", prop: "invoice_denomination", minWidth: 120 },
  {
    label: "上架时间",
    prop: "ground_time",
    //  sortable: "custom",
    width: 180,
  },
  {
    label: "行业限制",
    slot: "IndustryRestrictions",
    minWidth: 80,
    // fixed: "right",
    // headerAlign: "center",
  },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 200,
    align: "right",
    headerAlign: "right",
  },
];

const handleIndustryRestrictions = (scope: any) => {
  dialogVisible.value = true;
  imageList.value = scope.row.industry_limit;
  title.value = "行业限制";
};
/**
 * 上下架
 */
const handleUpdateStatus = (scope: any) => {
  ElMessageBox({
    title: "",
    message: h(
      "p",
      null,
      `确定${[0].includes(scope.row.status) ? "上架" : "下架"}该税地`
    ),
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
          var data = {
            id: scope.row.id,
            status: [0].includes(scope.row.status) ? "1" : "0",
          };
          await selfOperatedTaxLandUpdateStatus(data);
          instance.confirmButtonLoading = false;
          done();
          ElMessage({
            type: "success",
            message: `${
              [0].includes(scope.row.status) ? "上架" : "下架"
            }该税地成功`,
          });
        } catch (error) {
          instance.confirmButtonLoading = false;
          done();
          ElMessage({
            type: "error",
            message: `${
              [0].includes(scope.row.status) ? "上架" : "下架"
            }该税地失败`,
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
      getTableData();
    });
};
/**
 * 编辑
 */
const handleEdit = (scope: any) => {
  router.push({
    name: "selfOperatedTaxLandEdit",
    query: { activeName: "1", id: scope.row.id },
  });
  console.log(scope.row.value, "编辑");
};
/**
 * 删除
 */
const handleDelete = (scope: any) => {
  ElMessageBox({
    title: "",
    message: h("p", null, `确定删除税地?`),
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
          await selfOperatedTaxLandDelete(scope.row.id);
          instance.confirmButtonLoading = false;
          done();
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        } catch (error) {
          instance.confirmButtonLoading = false;
          done();
          ElMessage({
            type: "error",
            message: "删除失败",
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
      getTableData();
    });
};
/**
 * 下载资料包
 */
const handleDownloadInformationPack = (ids: Array<number>) => {
  ElMessageBox({
    title: "",
    message: h("p", null, `确定导出资料包?`),
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
          await downloadByOnlineUrl(`/adminapi/tax/get_zip_download`, { ids });
          instance.confirmButtonLoading = false;
          done();
          ElMessage({
            type: "success",
            message: "导出成功",
          });
        } catch (error) {
          instance.confirmButtonLoading = false;
          done();
          ElMessage({
            type: "error",
            message: "导出失败",
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
      getTableData();
    });
};

/**
 * 详情
 */
const handleDetails = (scope: any) => {
  router.push({
    name: "selfOperatedTaxLandDetails",
    query: { activeName: "1", id: scope.row.id },
  });
  console.log(scope.row.value, "详情");
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
 * 新建
 */
const handleAdd = (command: string | number | object) => {
  if (command == 1) {
    router.push({ name: "selfOperatedTaxLandAdd", query: { activeName: "1" } });
  } else if (command == 2) {
    router.push({ name: "purchaseTaxLandAdd", query: { activeName: "1" } });
  }
};
/**
 * 导出批量操作
 */
const handleExport = (command: string | number | object) => {
  if (command == 1) {
    handleDownloadInformationPack(selectionData.value);
  }
};

const getTableData = async () => {
  const params = transformTimeRange({ ...formItem.value }) as any;
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;

  try {
    const { data } = await getSelfOperatedTaxLandList(params);
    tableData.length = 0;
    pageInfo.page = data.current_page;
    pageInfo.total = data.total;

    var newData = data.data.map((item: any) => {
      return {
        id: item.id,
        tax_land_no: item.tax_land_no,
        status: item.status,
        tax_land_name: item.tax_land_name,
        merger_name: item.merger_name || "—",
        tax_cost_point: item.tax_cost_point + "%",
        sign_count: item.sign_count,
        calculation_type:
          proxy.$enumSet["taxLandManagementEnum.calculationType"][
            item.calculation_type
          ],
        tax_land_head: item.tax_land_head || "—",
        invoice_type:
          proxy.$enumSet["taxLandManagementEnum.InvoiceType"][
            item.invoice_type
          ],
        invoice_denomination:
          proxy.$enumSet["taxLandManagementEnum.invoice_denomination"][
            item.invoice_denomination
          ],
        ground_time: item.ground_time || "—",
        industry_limit: item.industry_limit,
        tax_land_type:
          proxy.$enumSet["taxLandManagementEnum.tax_land_type"][
            item.tax_land_type
          ],
        payment_type:
          proxy.$enumSet["taxLandManagementEnum.paymentType"][
            item.payment_type
          ],
      };
    });
    tableData.push(...newData);
  } catch (error) {
    console.log(error);
  }
};
getTableData();
onMounted(() => {});
defineExpose({
  getTableData,
});
</script>
