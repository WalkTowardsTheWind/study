<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList">
      <template #channelCommissionSettlementDoc>
        <div class="p-[24px] p-b-[0]">
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
            <el-form-item label="结算状态">
              <zxn-select v-model="formItem.status" @change="handleSearch">
                <el-option
                  v-for="item in proxy.$const[
                    'settlementCenterEnum.channelSettlementStatus'
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </zxn-select>
            </el-form-item>
            <el-form-item label="结算类型">
              <zxn-select
                v-model="formItem.settlement_type"
                @change="handleSearch"
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
            <el-form-item label="渠道名称">
              <el-select
                v-model="formItem.channel_id"
                filterable
                clearable
                placeholder="请选择渠道"
                @change="getCompany"
              >
                <el-option
                  v-for="item in optionsChannel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="企业名称">
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
            </el-form-item>
            <el-form-item prop="date" label="结算时间">
              <zxn-date-range v-model="formItem.timeData" />
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
            hasSelect
            @selection-change="handleSelect"
            rowKey="id"
          >
          </zxn-table>
        </div>
        <zxn-bottom-btn>
          <el-button color="#ACACAC" @click="handleClose" plain>取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button type="primary" @click="handleSend" plain>发送</el-button>
        </zxn-bottom-btn>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { transformTimeRanges } from "@/utils";
import { useRouter, useRoute } from "vue-router";
import {
  getChannelList,
  getCompanyList,
  getAddChannelSettlementDocList,
  addChannelSettlementDoc,
  rebuild,
} from "@/api/settlementCenter/channelCommissionSettlement";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const route = useRoute();
const activeName = ref("channelCommissionSettlementDoc");
const tabsList = reactive([
  {
    name: "channelCommissionSettlementDoc",
    label: "新建渠道佣金结算单",
  },
]);
//获取渠道列表
interface ListItem {
  value: string;
  label: string;
}
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
//获取企业列表
const companySelect = ref();
const optionsCompany = ref<ListItem[]>([]);
const getCompany = async () => {
  let params = {
    channel_id: formItem.value.channel_id,
  };
  const { data } = await getCompanyList(params);
  const newData = data.map((item: any) => {
    return {
      label: item.company_name,
      value: item.id,
    };
  });
  optionsCompany.value = [];
  optionsCompany.value.push(...newData);
};
// 查询重置
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const handleReset = () => {
  formItem.value = {
    keywords: "",
    settlement_type: "",
    company_id: "",
    channel_id: "",
    status: "",
    timeData: [],
    page: "",
    limit: "",
  };
  handleSearch();
};
const handleIsSelect = () => {
  if (!formItem.value.channel_id) {
    companySelect.value.blur();
    ElMessage({
      type: "warning",
      message: `请先选择渠道名称`,
    });
  }
  return;
};
const handleSearch = () => {
  console.log("查询");
  pageInfo.page = 1;
  get();
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
  settlement_type: "",
  company_id: "",
  channel_id: "",
  status: "",
  timeData: [],
  page: "",
  limit: "",
});

const tableData = reactive([] as any);
const columnList = [
  { label: "企业名称", prop: "company_name" },
  { label: "结算类型", prop: "settlement_type" },
  { label: "发票类型", prop: "invoice_type" },
  { label: "成本点位", prop: "cost_tax_point" },
  { label: "企业点位", prop: "tax_point" },
  { label: "渠道点位", prop: "channel_point" },
  { label: "渠道名称", prop: "channel_name" },
  { label: "渠道管理员", prop: "channel_admin", width: 100 },
  { label: "所属税地", prop: "tax_land_name", width: 150 },
  { label: "打款金额", prop: "payment_amount" },
  { label: "下发金额", prop: "settlement_amount" },
  { label: "服务费", prop: "commission" },
  { label: "成本费用", prop: "cost_amount" },
  { label: "供应商结算", prop: "supplier_amount", width: 100 },
  { label: "渠道结算税前", prop: "channel_amount", width: 110 },
  { label: "渠道结算税后", prop: "after_channel_amount", width: 110 },
  { label: "结算时间", prop: "settlement_time" },
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
    },
    width: 120,
  },
];
//取消
const handleClose = () => {
  router.push({
    name: "settlementCenter",
    query: { activeName: "channelCommission" },
  });
};
//保存
const handleSave = () => {
  if (selectionData.value.length === 0) {
    ElMessage({
      type: "warning",
      message: `请选择任务`,
    });

    return;
  }
  const params = {
    ids: selectionData.value,
    status: 0,
  };

  addChannelSettlementDoc(params)
    .then(() => {
      ElMessage({
        type: "success",
        message: `新建渠道佣金结算单成功`,
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
//发送
const handleSend = () => {
  if (selectionData.value.length === 0) {
    ElMessage({
      type: "warning",
      message: `请选择任务`,
    });

    return;
  }
  const params = {
    ids: selectionData.value,
    status: 1,
  };

  addChannelSettlementDoc(params)
    .then(() => {
      ElMessage({
        type: "success",
        message: `新建渠道佣金结算单成功`,
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
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};
/**
 * 获取勾选id
 */
//
const getCheckStatusData = async () => {
  try {
    const { data } = await rebuild({ id: route.query.id + "" });
    checkStatusData.value = data.ids;
    formItem.value.channel_id = data.channel_id;
    formItem.value.company_id = data.company_id;
    const options = await getChannelList();
    const newData = options.data.map((item: any) => {
      return {
        label: item.channel_name,
        value: item.id,
      };
    });
    optionsChannel.value = [];
    optionsChannel.value.push(...newData);
    //
    let params = {
      channel_id: formItem.value.channel_id,
    };
    const Company = await getCompanyList(params);
    const newData2 = Company.data.map((item: any) => {
      return {
        label: item.company_name,
        value: item.id,
      };
    });
    optionsCompany.value = [];
    optionsCompany.value.push(...newData2);
  } catch (error) {
    console.log(error);
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
  if (!(formItem.value.channel_id && formItem.value.company_id)) {
    ElMessage({
      type: "warning",
      message: `请先选择渠道和企业`,
    });
    return;
  }
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

    var newData = data.map((item: any) => {
      return {
        id: item.id,
        company_name: item.company_name,
        settlement_type: item.settlement_type,
        invoice_type: item.invoice_type,
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
      };
    });
    tableData.length = 0;

    tableData.push(...newData);
    if (route.query.id) {
      toggleRowSelection();
    }
  } catch (error) {
    console.log(error);
  }
};

const get = async () => {
  if (route.query.id) {
    await getCheckStatusData();
  } else {
    await getChannel();
  }
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
</style>
