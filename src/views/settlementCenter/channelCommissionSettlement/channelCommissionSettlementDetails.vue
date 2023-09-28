<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList">
      <template #channelCommissionSettlementDetails>
        <div class="p-[24px] p-b-[0]">
          <el-form class="zxn-box" :model="formData" label-width="130px">
            <div class="head">
              <el-form-item label="结算单号">
                <el-input
                  readonly
                  v-model="formData.channel_order_no"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item label="结算状态">
                <el-select
                  class="w-[100%]"
                  disabled
                  v-model="formData.status"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in proxy.$const[
                      'settlementCenterEnum.channelCommissionSettlementList'
                    ]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="渠道">
                <el-input
                  readonly
                  v-model="formData.channel_name"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item label="企业结算总额">
                <el-input
                  readonly
                  v-model="formData.settlement_amount"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item label="渠道结算税前">
                <el-input
                  readonly
                  v-model="formData.commission"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item label="渠道结算税后">
                <el-input
                  readonly
                  v-model="formData.after_commission"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item
                v-if="!['3'].includes(formData.status)"
                label="所属供应商"
              >
                <el-input
                  readonly
                  v-model="formData.tax_land_name"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item label="创建时间">
                <el-input
                  readonly
                  v-model="formData.add_time"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item
                v-if="['2', '3'].includes(formData.status)"
                label="确认时间"
              >
                <el-input
                  readonly
                  v-model="formData.confirm_time"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item
                v-if="['3'].includes(formData.status)"
                label="打款时间"
              >
                <el-input
                  readonly
                  v-model="formData.settlement_time"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item
                v-if="['3'].includes(formData.status)"
                label="打款凭证"
              >
                <el-button link type="primary" @click="handleInspect"
                  >查看</el-button
                >
              </el-form-item>
              <el-form-item
                v-if="!['0'].includes(formData.status)"
                label="佣金确认单"
              >
                <el-button link type="primary" @click="handleInspectDoc"
                  >查看</el-button
                >
              </el-form-item>
            </div>
          </el-form>

          <div class="title">
            <div class="left">
              <div class="line"></div>
              <div>结算任务列表</div>
            </div>
            <div class="right">
              <el-button type="primary" @click="handleExport" plain
                >导出excel</el-button
              >
            </div>
          </div>
          <zxn-table
            :table-data="tableData"
            :column-list="columnList"
            :page-info="pageInfo"
            @page-change="handlePageChange"
            hasSelect
            @selection-change="handleSelect"
          >
            <template #operation="scope">
              <el-button link @click="handleDetails(scope)">详情</el-button>
            </template>
          </zxn-table>
        </div>
      </template>
    </zxn-tabs>
    <viewDialog
      v-model:dialogVisible="dialogVisible"
      :formItem="docData"
      :viewType="1"
      @up-Table="getTableData"
    />
  </zxn-plan>
</template>
<script setup lang="ts">
import { transformTimeRange } from "@/utils";
import { downloadByData } from "@/utils/download";
import { useRouter, useRoute } from "vue-router";
import {
  getChannelSettlementDetails,
  getDocDetails,
} from "@/api/settlementCenter/channelCommissionSettlement";
import viewDialog from "../components/viewDialog.vue";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const route = useRoute();
//发佣确认
const dialogVisible = ref(false);
const docData = ref([]);
//
const activeName = ref("channelCommissionSettlementDetails");
const tabsList = reactive([
  {
    name: "channelCommissionSettlementDetails",
    label: "结算详情",
  },
]);

const formData = ref({
  id: "",
  channel_order_no: "",
  status: "",
  channel_name: "",
  settlement_amount: "",
  commission: "",
  after_commission: "",
  tax_land_name: "",
  add_time: "",
  confirm_time: "",
  settlement_time: "",
  transfer_certificate: "",
  confirm_receipt: "",
});

// 查询重置
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const handlePageChange = (cur: any) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  getTableData();
};
const formItem = ref({
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
  // { label: "供应商结算", prop: "supplier_amount", width: 100 },
  { label: "渠道结算税前", prop: "channel_amount", width: 110 },
  { label: "渠道结算税后", prop: "after_channel_amount", width: 110 },
  { label: "结算时间", prop: "settlement_time" },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    align: "right",
    headerAlign: "right",
  },
];
// 发送佣金确认单
const handleInspectDoc = async () => {
  try {
    const { data } = await getDocDetails(Number(formData.value.id));
    docData.value = data;
    dialogVisible.value = true;
  } catch (error) {
    console.log(error);
  }
};
// 查看
const handleInspect = () => {
  window.open(formData.value.transfer_certificate[0], "_blank");
};
// 详情
const handleDetails = (scope: any) => {
  router.push({
    name: "settlementDocDetails",
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
//导出
const handleExport = () => {
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
 * 下载Excel
 */
const handleExcel = async (ids: Array<string>) => {
  // const params = {
  //   ids,
  //   page: 1,
  //   limit: pageInfo.limit,
  // };
  // const { data } = await getChannelSettlementDocExcel(params);
  // downloadByData(data, "渠道佣金结算单Excel.xlsx");
};
//获取数据
const getTableData = async () => {
  const params = transformTimeRange({ ...formItem.value }) as any;
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  console.log(params, route.query.id);

  try {
    const { data } = await getChannelSettlementDetails(Number(route.query.id));
    pageInfo.page = data.current_page ?? "1";
    pageInfo.total = data.total ?? data.list.length + "";
    formData.value = data;
    formData.value.status = data.status + "";

    var newData = data.list.map((item: any) => {
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
        company_settlement_id: item.company_settlement_id,
      };
    });
    tableData.length = 0;

    tableData.push(...newData);
  } catch (error) {
    console.log(error);
  }
};
getTableData();
onMounted(() => {});
</script>
<style lang="scss" scoped>
.head {
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
// 蓝色标题样式
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 25px;
  font-size: 14px;
  font-family: SourceHanSansSC-Medium, SourceHanSansSC;
  font-weight: 500;
  color: #356ff3;
}
.left {
  display: flex;
  align-items: center;
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
