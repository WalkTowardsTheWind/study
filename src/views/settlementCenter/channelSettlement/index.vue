<template>
  <div class="p-[24px] p-b-[0]">
    <div class="recharge">
      <div>
        累计下发<span class="money">{{ total_pay_money }}</span>
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
      <el-form-item label="任务状态">
        <el-select v-model="formItem.status" placeholder="全部" clearable>
          <el-option
            v-for="item in proxy.$const[
              'settlementCenterEnum.settlementCenterEnum'
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="date" label="申请日期">
        <zxn-date-range v-model="formItem.timeData" />
      </el-form-item>
    </zxn-search>

    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="handlePageChange"
      hasSelect
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <el-dropdown
          class="ml-4"
          trigger="click"
          @command="handleBatchOperation"
        >
          <el-button type="primary">批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">下发</el-dropdown-item>
              <el-dropdown-item command="2">删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template #operation="scope">
        <el-button
          v-if="scope.row.status == 0"
          link
          type="primary"
          @click="handleThaw(scope)"
          >下发</el-button
        >
        <el-button
          v-if="scope.row.status == 2"
          link
          type="primary"
          @click="handleDelete(scope)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="handleDelete(scope)"
          >删除</el-button
        >
        <el-button link @click="handleDetails(scope)">详情</el-button>
      </template>
    </zxn-table>
  </div>
  <viewDialog
    v-model:dialogVisible="dialogVisible"
    :formItem="formData"
    @up-Table="getTableData"
  />
</template>
<script setup lang="ts">
import { transformTimeRange } from "@/utils";
import viewDialog from "../components/viewDialog.vue";
import { useRouter } from "vue-router";
import {
  getChannelSettlementList,
  deleteChannelSettlementDoc,
  getChannelSettlementDetails,
} from "@/api/settlementCenter/channelSettlement";
import { ElMessage } from "element-plus";
const dialogVisible = ref(false);
const formData = ref({}) as any;
const { proxy } = getCurrentInstance() as any;
const router = useRouter();

// 查询重置
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const handleReset = () => {
  formItem.value = {
    keywords: "",
    timeData: [],
    status: "",
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
  timeData: [],
  status: "",
  page: "",
  limit: "",
});

const tableData = reactive([] as any);
const columnList = [
  { label: "结算单号", prop: "settlement_order_no" },
  {
    label: "状态",
    type: "enum",
    path: "settlementCenterEnum.distributeStatusEnum",
    prop: "status",
    // fixed: "left",
    color: {
      0: { color: "#1AB66B", backgroundColor: "#DAF3E7" },
      1: { color: "#366FF4", backgroundColor: "#DFE8FD" },
      2: { color: "#333333", backgroundColor: "#DEDEDE" },
      3: { color: "#F45136", backgroundColor: "#FDE3DF" },
    },
  },
  { label: "任务数量", prop: "task_count" },
  { label: "结算企业", prop: "company_name" },
  { label: "税源地", prop: "tax_land_name" },
  { label: "渠道点位", prop: "tax_point" },
  { label: "渠道", prop: "channel_name" },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 250,
    align: "right",
    headerAlign: "right",
  },
];

const handleThaw = async (scope: any) => {
  try {
    const { data } = await getChannelSettlementDetails(Number(scope.row.id));
    console.log(data);

    const {
      settlement_order_no,
      status,
      company_name,
      settlement_time,
      real_money,
      cooperate_pointnt,
      channel_name,
      before_tax,
      after_tax,
      bank,
      bank_account,
    } = data.info;
    formData.value = {
      id: scope.row.id,
      settlement_order_no,
      status,
      company_name,
      settlement_time,
      real_money,
      cooperate_pointnt,
      channel_name,
      before_tax,
      after_tax,
      bank,
      bank_account,
    };

    console.log(formData.value);

    dialogVisible.value = true;
  } catch (error) {
    console.log(error);
  }
};
const handleDetails = (scope: any) => {
  router.push({
    name: "channelSettlementA",
    query: { activeName: "1", id: scope.row.id },
  });
};
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
/**
 * 批量选择
 */
//选中的数据
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data;
  console.log(selectionData.value);
};

/**
 * 批量操作
 */
const handleBatchOperation = (command: string | number | object) => {
  var data = selectionData.value.map((item, index) => {
    return index;
  });
  if (command == 1) {
    console.log("删除", data);
  } else if (command == 2) {
    console.log("下载");
  }
};
const getTableData = async () => {
  const params = transformTimeRange({ ...formItem.value }) as any;
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  console.log(params);

  try {
    const { data } = await getChannelSettlementList(params);

    pageInfo.page = data.current_page;
    pageInfo.total = data.total;
    console.log(data, "=======>");
    total_pay_money.value = data.total_pay_money;

    var newData = data.data.map((item: any) => {
      return {
        id: item.id,
        settlement_order_no: item.settlement_order_no,
        status: item.status,
        task_count: item.task_count,
        company_name: item.company_name,
        tax_land_name: item.tax_land_name,
        tax_point: item.tax_point,
        channel_name: item.channel_name,
      };
    });
    tableData.length = 0;
    console.log(newData[0]);

    tableData.push(...newData);
  } catch (error) {
    console.log(error);
  }
};
getTableData();
onMounted(() => {
  // rou()
});
</script>
<style lang="scss" scoped>
.recharge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding-left: 25px;
  font-size: 14px;
  background: #fef1f0;
  border-radius: 4px;
  opacity: 1;
}

.money {
  margin-left: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
</style>
