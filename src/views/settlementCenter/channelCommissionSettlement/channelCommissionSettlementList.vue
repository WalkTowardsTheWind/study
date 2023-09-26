<template>
  <div class="p-[24px] p-b-[0]">
    <div class="recharge">
      <div class="item">
        <div class="title">渠道佣金累计下发</div>
        <div>
          <span class="logo">￥</span>
          <span class="money">{{ proxy.$moneyFormat(total_pay_money) }}</span>
          <!-- <span class="unit">元</span> -->
        </div>
      </div>
      <div class="p-l-[140px] item">
        <div class="title">渠道佣金待下发</div>
        <div>
          <span class="logo">￥</span>
          <span class="money">{{ proxy.$moneyFormat(total_pay_money) }}</span>
          <!-- <span class="unit">元</span> -->
        </div>
      </div>
    </div>
    <zxn-search
      class="m-t-[20px]"
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
    >
      <el-form-item>
        <el-input v-model="formItem.keywords" placeholder="请输入关键字">
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="状态">
        <zxn-select v-model="formItem.status" @change="handleSearch">
          <el-option
            v-for="item in proxy.$const[
              'settlementCenterEnum.channelCommissionSettlementList'
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </zxn-select>
      </el-form-item>
      <el-form-item label="收入类型">
        <zxn-select v-model="formItem.settlement_type" @change="handleSearch">
          <el-option
            v-for="item in proxy.$const['settlementCenterEnum.settlement_type']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </zxn-select>
      </el-form-item>
      <el-form-item prop="date" label="创建日期">
        <zxn-date-range v-model="formItem.createTimeData" />
      </el-form-item>
      <el-form-item prop="date" label="打款日期">
        <zxn-date-range v-model="formItem.paymentTimeData" />
      </el-form-item>
    </zxn-search>

    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="handlePageChange"
      hasSelect
      @selection-change="handleSelect"
      fieldTotal="channel_order_no"
    >
      <template #tableTop>
        <el-button type="primary" @click="handleAdd">新建佣金结算单</el-button>
        <!-- <el-button class="ml-4" type="primary" plain @click="handleExport"
          >导出EXCEL</el-button
        > -->
      </template>
      <template #operation="scope">
        <el-button
          link
          type="primary"
          @click="handleSend(scope)"
          v-if="[1].includes(scope.row.status)"
          >发送佣金确认单</el-button
        >
        <el-button
          link
          type="primary"
          @click="handleWithdraw(scope)"
          v-if="[1].includes(scope.row.status)"
          >撤回</el-button
        >
        <el-button
          link
          type="primary"
          @click="handleDistribute(scope)"
          v-if="[0].includes(scope.row.status)"
          >下发</el-button
        >
        <el-button
          link
          type="primary"
          @click="handleRebuild(scope)"
          v-if="[3].includes(scope.row.status)"
          >重新生成</el-button
        >
        <el-button
          link
          type="primary"
          @click="handleDelete(scope)"
          v-if="[3].includes(scope.row.status)"
          >删除</el-button
        >
        <el-button link @click="handleDetails(scope)">详情</el-button>
      </template>
    </zxn-table>
  </div>
  <viewDialog v-model:dialogVisible="dialogVisible" :formItem="formData" />
  <uploadCredentials
    v-model:dialogVisible="uploadCredentialsDialogVisible"
    :formItem="imageData"
  />
</template>
<script setup lang="ts">
import { transformTimeRanges } from "@/utils";
import { downloadByData } from "@/utils/download";
import { useRouter } from "vue-router";
import {
  getChannelSettlementList,
  getChannelSettlementDetails,
  updateChannelSettlementStatus,
  deleteChannelSettlementDoc,
} from "@/api/settlementCenter/channelCommissionSettlement";
import viewDialog from "../components/viewDialog.vue";
import uploadCredentials from "../components/uploadCredentials.vue";
import { ElMessage } from "element-plus";
import configAutoPlugin from "../../../../build/vite/plugin/autoImportPlugin";
import { isBoolean } from "@/utils/is";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
//发佣确认
const dialogVisible = ref(false);
const formData = ref([]);
//下发
const uploadCredentialsDialogVisible = ref(false);
const imageData = ref([]);
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
    settlement_type: "",
    createTimeData: [],
    paymentTimeData: [],
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
// 累计
var total_pay_money = ref();
const formItem = ref({
  keywords: "",
  status: "",
  settlement_type: "",
  createTimeData: [],
  paymentTimeData: [],
  page: "",
  limit: "",
});

const tableData = reactive([] as any);
const columnList = [
  { label: "发佣单号", prop: "channel_order_no" },
  {
    label: "状态",
    type: "enum",
    path: "settlementCenterEnum.channelCommissionSettlementList",
    prop: "status",
    // fixed: "left",
    color: {
      0: { color: "#1EE685", backgroundColor: "#DBFBEB" },
      1: { color: "#FFFFFF", backgroundColor: "#9AB7F9" },
      2: { color: "#36C5F4", backgroundColor: "#DFF6FD" },
      3: { color: "#366FF4", backgroundColor: "#DFE8FD" },
      4: { color: "#F45136", backgroundColor: "#FDE3DF" },
    },
    width: 100,
  },
  { label: "收入类型", prop: "settlement_type" },
  { label: "渠道名称", prop: "channel_name" },
  { label: "结算金额", prop: "settlement_amount" },
  { label: "渠道佣金（税后）", prop: "after_commission", width: 140 },
  { label: "创建时间", prop: "add_time" },
  { label: "下发时间（打款日）", prop: "settlement_time", width: 150 },
  { label: "驳回原因", prop: "reason" },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 250,
    align: "right",
    headerAlign: "right",
  },
];
// 新建
const handleAdd = () => {
  router.push({
    name: "addChannelCommissionSettlementDoc",
  });
};
// 发送佣金确认单
const handleSend = async (scope: any) => {
  dialogVisible.value = true;
  // try {
  //   const { data } = await getChannelSettlementDetails(Number(scope.row.id));

  //   const {
  //     channel_order_no,
  //     status,
  //     company_name,
  //     settlement_time,
  //     real_money,
  //     cooperate_pointnt,
  //     channel_name,
  //     before_tax,
  //     after_tax,
  //     bank,
  //     bank_account,
  //   } = data.info;
  // } catch (error) {
  //   console.log(error);
  // }
};
// 撤回
const handleWithdraw = async (scope: any) => {
  // try {
  //   const { data } = await getChannelSettlementDetails(Number(scope.row.id));
  //   const {
  //     channel_order_no,
  //     status,
  //     company_name,
  //     settlement_time,
  //     real_money,
  //     cooperate_pointnt,
  //     channel_name,
  //     before_tax,
  //     after_tax,
  //     bank,
  //     bank_account,
  //   } = data.info;
  // } catch (error) {
  //   console.log(error);
  // }
};
// 下发
const handleDistribute = async (scope: any) => {
  uploadCredentialsDialogVisible.value = true;
  // try {
  //   const { data } = await getChannelSettlementDetails(Number(scope.row.id));

  //   const {
  //     channel_order_no,
  //     status,
  //     company_name,
  //     settlement_time,
  //     real_money,
  //     cooperate_pointnt,
  //     channel_name,
  //     before_tax,
  //     after_tax,
  //     bank,
  //     bank_account,
  //   } = data.info;
  // } catch (error) {
  //   console.log(error);
  // }
};
// 重新生成
const handleRebuild = async (scope: any) => {
  // try {
  //   const { data } = await getChannelSettlementDetails(Number(scope.row.id));
  //   const {
  //     channel_order_no,
  //     status,
  //     company_name,
  //     settlement_time,
  //     real_money,
  //     cooperate_pointnt,
  //     channel_name,
  //     before_tax,
  //     after_tax,
  //     bank,
  //     bank_account,
  //   } = data.info;
  // } catch (error) {
  //   console.log(error);
  // }
};
// 删除
const handleDelete = (scope: any) => {
  ElMessageBox({
    title: "",
    message: h("p", null, `确定删除该任务`),
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

        await deleteChannelSettlementDoc(scope.row.id);

        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: "成功删除该任务",
    });
    getTableData();
  });
};
// 详情
const handleDetails = (scope: any) => {
  router.push({
    name: "channelCommissionSettlementDetails",
    query: { activeName: "1", id: scope.row.id },
  });
};
/**
 * 批量
 */
//选中的数据
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};
/**
 * 批量操作
 */
// 导出
// const handleExport = () => {
//   if (Object.keys(selectionData.value).length == 0) {
//     ElMessage({
//       type: "error",
//       message: `请选择结算单`,
//     });
//   } else {
//     ElMessageBox({
//       title: "",
//       message: h("p", null, `确定批量导出表格`),
//       showCancelButton: true,
//       confirmButtonText: "确定",
//       cancelButtonText: "取消",
//       beforeClose: async (
//         action: string,
//         instance: { confirmButtonLoading: boolean },
//         done: () => void
//       ) => {
//         if (action === "confirm") {
//           instance.confirmButtonLoading = true;
//           await handleExcel(selectionData.value);

//           instance.confirmButtonLoading = false;
//           done();
//         } else {
//           done();
//         }
//       },
//     })
//       .then(() => {
//         ElMessage({
//           type: "success",
//           message: "导出成功",
//         });
//       })
//       .catch((action) => {
//         if (action === "cancel") {
//           ElMessage({
//             type: "warning",
//             message: "取消操作",
//           });
//         } else {
//           ElMessage({
//             type: "error",
//             message: "导出失败",
//           });
//         }
//       });
//   }
// };
/**
 * 下载Excel
 */
// const handleExcel = async (ids: Array<string>) => {
//   const params = {
//     ids,
//     page: 1,
//     limit: pageInfo.limit,
//   };
//   const { data } = await getChannelSettlementListExcel(params);
//   downloadByData(data, "渠道佣金结算列表Excel.xlsx");
// };
// 拉取数据
const getTableData = async () => {
  const newParams = transformTimeRanges(
    { ...formItem.value },
    "createTimeData"
  ) as any;
  const params = transformTimeRanges(
    { ...newParams },
    "paymentTimeData",
    "settlement_time_start",
    "settlement_time_end"
  ) as any;
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  console.log(params, "====223333332");

  try {
    const { data } = await getChannelSettlementList(params);
    pageInfo.page = data.current_page;
    pageInfo.total = data.total;
    console.log(data, "=======>");
    total_pay_money.value = data.total_pay_money;

    var newData = data.data.map((item: any) => {
      return {
        id: item.id,
        channel_order_no: item.channel_order_no,
        status: item.status,
        settlement_type:
          proxy.$enumSet["settlementCenterEnum.settlement_type"][
            item.settlement_type
          ],
        channel_name: item.channel_name,
        settlement_amount: item.settlement_amount,
        after_commission: item.after_commission,
        add_time: item.add_time,
        settlement_time: item.settlement_time,
        reason: item.reason,
      };
    });
    tableData.length = 0;
    tableData.push(...newData);
  } catch (error) {
    console.log(error);
  }
};
getTableData();
onMounted(() => {
  // rou()
});
defineExpose({
  getTableData,
});
</script>
<style lang="scss" scoped>
.recharge {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  height: 88px;
  padding-left: 25px;
  font-size: 14px;
  background: #fef1f0;
  border-radius: 4px;
  opacity: 1;
}

.item {
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  font-size: 14px;
  font-family: SourceHanSansSC-Medium, SourceHanSansSC;
  font-weight: 500;
  color: #333333;
}
.logo {
  margin-left: 0px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
.money {
  font-size: 18px;
  font-family: SourceHanSansSC-Bold, SourceHanSansSC;
  font-weight: bold;
  color: #333333;
  margin-left: 10px;
  margin-right: 10px;
}
.unit {
  margin-left: 5px;
  font-size: 18px;
  font-family: SourceHanSansSC-Bold, SourceHanSansSC;
  font-weight: bold;
  color: #333333;
}
</style>
