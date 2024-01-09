<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList">
      <template #channelCommissionSettlementDoc>
        <div class="p-[24px] p-b-[0]">
          <zxn-search
            class="m-t-[20px]"
            :formItem="formItem"
            :labelWidth="100"
            @on-search="handleSearch"
            @on-reset="handleReset"
          >
            <el-form-item>
              <el-input
                v-model="formItem.keywords"
                placeholder="请输入企业名称、渠道名称、渠道管理员或所属税地"
              >
                <template #prefix>
                  <el-icon><i-ep-Search /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="渠道名称">
              <el-select
                ref="channelSelect"
                v-model="formItem.channel_id"
                filterable
                clearable
                placeholder="请选择渠道"
                @change="handleUpdata"
              >
                <el-option
                  v-for="item in optionsChannel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="结算类型">
              <zxn-select
                v-model="formItem.settlement_type"
                @change="handleUpdata"
              >
                <el-option
                  v-for="item in proxy.$const[
                    'settlementCenterEnum.settlement_type'
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </zxn-select>
            </el-form-item>
            <!-- <el-form-item label="税地名称">
              <el-select
                v-model="formItem.tax_land_id"
                filterable
                clearable
                placeholder="请选择税地"
                @change="handleUpdataTaxLand"
              >
                <el-option
                  v-for="item in optionsTaxLand"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item> -->

            <!-- <el-form-item label="企业名称">
              <el-select
                ref="companySelect"
                v-model="formItem.company_id"
                filterable
                clearable
                placeholder="请选择企业"
                @change="handleSearch"
                @focus="handleIsSelect"
              >
                <el-option
                  v-for="item in optionsCompany"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item> -->

            <el-form-item prop="date" label="结算时间">
              <zxn-date-range v-model="formItem.timeData" />
            </el-form-item>
            <el-form-item label="渠道结算状态">
              <el-select v-model="formItem.status" @change="handleSearch">
                <el-option
                  v-for="item in proxy.$const[
                    'settlementCenterEnum.channelSettlementStatus'
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </zxn-search>
          <div class="title">
            <div class="line"></div>
            <div>结算任务列表</div>
          </div>
          <zxn-table
            ref="table"
            :table-data="tableData"
            :column-list="columnList"
            :page-info="pageInfo"
            @page-change="handlePageChange"
            :pageSizes="[10, 20, 30, 50, 200, 1000]"
            hasSelect
            @selection-change="handleSelect"
            rowKey="id"
            :selectable="selectable"
          >
            <template #tableTop>
              <el-dropdown trigger="click" @command="handleCommand">
                <el-button type="primary" plain>批量操作</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="1"
                      >生成佣金结算单</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-dropdown class="ml-4" trigger="click" @command="handleExport">
                <el-button type="primary">导出</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="1">表格</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <template #operation="{ row }">
              <el-button
                link
                type="primary"
                @click="handleOnly(row)"
                v-if="[5].includes(row.status)"
                >生成佣金结算单</el-button
              >
              <span v-else>---</span>
            </template>
          </zxn-table>
        </div>
      </template>
    </zxn-tabs>
    <viewDialog
      v-model:dialogVisible="dialogVisible"
      :formItem="formData"
      :viewType="2"
      @up-Table="up"
    />
  </zxn-plan>
</template>
<script setup lang="ts">
import { transformTimeRanges } from "@/utils";
import { downloadByOnlineUrl } from "@/utils/download";
import { useRouter, useRoute } from "vue-router";
import {
  getChannelList,
  getAddChannelSettlementDocList,
  addChannelSettlementDoc,
} from "@/api/settlementCenter/channelCommissionSettlement";
import { getSelectLandList, getLandList } from "@/api/common";
import viewDialog from "../components/viewDialog.vue";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const route = useRoute();
const activeName = ref("channelCommissionSettlementDoc");
const tabsList = reactive([
  {
    name: "channelCommissionSettlementDoc",
    label: "渠道待结算列表",
  },
]);
//获取税地列表
interface ListItem {
  value: string;
  label: string;
}
//获取渠道列表
const channelSelect = ref();
const optionsChannel = ref<ListItem[]>([]);
const getChannel = async () => {
  const { data } = await getChannelList();
  const newData = data.map((item: any) => {
    return {
      label: item.channel_name,
      value: item.id,
    };
  });
  optionsChannel.value = [];
  optionsChannel.value.push(...newData);
};
getChannel();

const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const handleReset = () => {
  formItem.value = {
    keywords: "",
    settlement_type: "",
    channel_id: "",
    status: "5",
    timeData: [],
    page: "",
    limit: "",
  };
  handleSearch();
};
const handleUpdata = () => {
  getTableData();
};
const handleSearch = () => {
  console.log("查询");
  pageInfo.page = 1;
  get();
};
const handlePageChange = (cur: any) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  getTableData();
};
// 累计
var total_pay_money = ref();
const formItem = ref({
  keywords: "",
  settlement_type: "",
  channel_id: "",
  status: "5",
  timeData: [],
  page: "",
  limit: "",
});

const tableData = reactive([] as any);
const columnList = [
  { label: "企业名称", prop: "company_name" },
  { label: "结算类型", prop: "settlement_type", width: 120 },
  { label: "发票类型", prop: "invoice_type", width: 100 },
  { label: "渠道名称", prop: "channel_name", width: 200 },
  {
    label: "渠道结算状态",
    type: "enum",
    path: "settlementCenterEnum.channelSettlementStatus",
    prop: "status",
    // fixed: "left",
    color: {
      0: { color: "#1EE685", backgroundColor: "#DBFBEB" },
      1: { color: "#FFFFFF", backgroundColor: "#9AB7F9" },
      2: { color: "#36C5F4", backgroundColor: "#DFF6FD" },
      3: { color: "#366FF4", backgroundColor: "#DFE8FD" },
      4: { color: "#F45136", backgroundColor: "#FDE3DF" },
      5: { color: "#FFFFFF", backgroundColor: "#96AEF6" },
    },
    width: 120,
  },
  { label: "成本点位", prop: "cost_tax_point" },
  { label: "企业点位", prop: "tax_point" },
  { label: "渠道点位", prop: "channel_point" },
  { label: "渠道管理员", prop: "channel_admin", width: 100 },
  { label: "所属税地", prop: "tax_land_name", width: 150 },
  { label: "打款金额", prop: "payment_amount" },
  { label: "下发金额", prop: "settlement_amount" },
  { label: "服务费", prop: "commission" },
  { label: "渠道结算税前", prop: "channel_amount", width: 110 },
  { label: "渠道结算税后", prop: "after_channel_amount", width: 110 },
  { label: "结算时间", prop: "settlement_time" },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 150,
    align: "right",
    headerAlign: "right",
  },
];
// 是否勾选
const selectable = (row: any) => {
  return row.status === 5;
};

//导出表格
const handleExportDoc = () => {
  if (Object.keys(selectionData.value).length == 0) {
    ElMessage({
      type: "error",
      message: `请选择结算单`,
    });
  } else {
    ElMessageBox({
      title: "",
      message: h("p", null, `确定批量导出表格`),
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
          await handleExcel(selectionData.value);

          instance.confirmButtonLoading = false;
          done();
        } else {
          done();
        }
      },
    })
      .then(() => {
        ElMessage({
          type: "success",
          message: "导出成功",
        });
      })
      .catch((action) => {
        if (action === "cancel") {
          ElMessage({
            type: "warning",
            message: "取消操作",
          });
        } else {
          ElMessage({
            type: "error",
            message: "导出失败",
          });
        }
      });
  }
};
/**
 * 导出批量操作
 */
const handleExport = (command: string | number | object) => {
  if (command == 1) {
    handleExportDoc();
  }
};
/**
 * 下载Excel
 */
const handleExcel = (ids: Array<string>) => {
  const params = {
    ids,
    page: 1,
    limit: pageInfo.limit,
  };
  downloadByOnlineUrl("/adminapi/finance/channel/get_list_excel", params);
};

// 单笔生成佣金结算单
const handleOnly = (row: any) => {
  handleSave([row.id]);
};
//保存
const handleSave = (ids: any) => {
  const params = {
    ids,
  };

  addChannelSettlementDoc(params)
    .then(() => {
      ElMessage({
        type: "success",
        message: `新建渠道佣金结算单保存成功`,
      });
      router.push({
        name: "channelCommissionSettlementList",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
//发佣确认
const dialogVisible = ref(false);
const formData = ref([]);

const up = () => {
  const params = {
    ids: selectionData.value,
    status: 1,
  };
  addChannelSettlementDoc(params)
    .then(() => {
      ElMessage({
        type: "success",
        message: `新建渠道佣金结算单发送成功`,
      });
      router.push({
        name: "settlementCenter",
        query: { activeName: "channelCommission" },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
/**
 * 批量
 */
//选中的数据
const selectionData = ref([]) as any;
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};
// 判断是否存在多税地
const istaxland = () => {
  let newdata = tableData.filter((it: any) => {
    return selectionData.value.includes(it.id);
  });
  if (newdata.length >= 1) {
    let is = newdata.every((item: any) => {
      return item.channel_name == newdata[0].channel_name;
    });
    return is;
  }
};

const handleCommand = (command: string | number | object) => {
  if (command == 1) {
    if (selectionData.value.length === 0) {
      ElMessage({
        type: "warning",
        message: `请选择任务`,
      });
      return;
    }
    if (istaxland()) {
      handleSave(selectionData.value);
    } else {
      ElMessage({
        type: "warning",
        message: `请选择相同渠道`,
      });
    }
  }
};

/**
 * 批量
 */
//选中的数据
const checkStatusData = ref([]);
const table = ref();
const toggleRowSelection = () => {
  const tableEl = table.value.getTable();
  tableEl.clearSelection();
  checkStatusData.value.forEach((it) => {
    const _row = tableData.find((row: any) => {
      return row.id === it;
    });
    tableEl.toggleRowSelection(_row, true);
  });
};

/**
 * 批量操作
 */

//获取数据
const getTableData = async () => {
  const params = transformTimeRanges({ ...formItem.value }) as any;
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  console.log(params);

  try {
    const { data } = await getAddChannelSettlementDocList(params);

    pageInfo.page = data.current_page ?? "1";
    pageInfo.total = data.total ?? "1";
    console.log(data, "=======>");
    total_pay_money.value = data.total_pay_money;

    var newData = data.data.map((item: any) => {
      return {
        id: item.id,
        company_name: item.company_name,
        settlement_type:
          proxy.$enumSet["settlementCenterEnum.settlement_type"][
            item.settlement_type
          ],
        invoice_type:
          proxy.$enumSet["settlementCenterEnum.InvoiceType"][item.invoice_type],
        cost_tax_point: item.cost_tax_point,
        tax_point: item.tax_point,
        channel_point: item.channel_point,
        channel_name: item.channel_name,
        channel_admin: item.channel_admin,
        tax_land_name: item.tax_land_name,
        payment_amount: item.payment_amount,
        settlement_amount: item.settlement_amount,
        commission: item.commission,
        cost_amount: item.cost_amount,
        supplier_amount: item.supplier_amount,
        channel_amount: item.channel_amount,
        after_channel_amount: item.after_channel_amount,
        settlement_time: item.settlement_time,
        status: item.status,
        channel_settlement_id: item.channel_settlement_id,
      };
    });
    tableData.length = 0;

    tableData.push(...newData);
    if (route.query.params) {
      toggleRowSelection();
    }
  } catch (error) {
    console.log(error);
  }
};

const get = async () => {
  await getTableData();
};
onMounted(() => {
  get();
});
</script>
<style lang="scss" scoped>
// 蓝色标题样式
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 25px;
  font-size: 14px;
  font-family: SourceHanSansSC-Medium, SourceHanSansSC;
  font-weight: 500;
  color: #356ff3;
}

.line {
  display: flex;
  width: 4px;
  height: 14px;
  margin-right: 10px;
  background: #356ff3;
  border-radius: 4px;
}
.bottom-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
