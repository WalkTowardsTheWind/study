<template>
  <zxn-plan>
    <zxn-tabs
      :activeName="activeName"
      :tabsList="tabsList"
      :hasBack="true"
      :hasUpdate="false"
    >
      <template #1>
        <div class="p-[24px] p-l-[53px] p-b-[0]">
          <div class="tabTop m-t-[20px]">
            <div class="box"></div>
            <span class="title">结算详情</span>
          </div>
          <div class="m-t-[20px]">
            <el-form
              :model="formItem"
              inline
              label-width="90px"
              label-position="right"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="结算单号">
                    <el-text class="mx-1">{{
                      formItem.settlement_order_no
                    }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道管理员" label-width="100px">
                    <el-text class="mx-1">{{
                      formItem.channel_admin_name
                    }}</el-text>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="渠道" label-width="100px">
                    <el-text class="mx-1">{{ formItem.channel_name }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="渠道点位">
                    <el-text class="mx-1">{{
                      formItem.cooperate_pointnt
                    }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道结算税前" label-width="100px">
                    <el-text class="mx-1">{{ formItem.before_tax }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道结算税后" label-width="100px">
                    <el-text class="mx-1">{{ formItem.after_tax }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="客户点位">
                    <el-text class="mx-1">{{ formItem.custom_point }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道结算佣金" label-width="100px">
                    <el-text class="mx-1">{{ formItem.before_tax }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成本点位" label-width="100px">
                    <el-text class="mx-1">{{
                      formItem.tax_cost_point
                    }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="所属供应商">
                    <el-text class="mx-1">{{ formItem.tax_land_name }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="tabTop m-t-[20px]">
            <div class="box"></div>
            <span class="title">企业信息</span>
          </div>
          <div class="m-t-[20px]">
            <el-form
              :model="formItem"
              inline
              label-width="90px"
              label-position="right"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="企业名称">
                    <el-text class="mx-1">{{ formItem.company_name }}</el-text>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                  <el-form-item label="账户名称">
                    <el-text class="mx-1">{{ formItem.channel_name }}</el-text>
                  </el-form-item>
                </el-col> -->

                <el-col :span="8">
                  <el-form-item label="下发金额">
                    <el-text class="mx-1">{{ formItem.real_money }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </template>
      <template #2>
        <div class="p-[24px] p-b-[0]">
          <zxn-table
            :table-data="tableData"
            :column-list="columnList"
            :page-info="pageInfo"
            @page-change="handlePageChange"
            hasSelect
            @selection-change="handleSelect"
          >
            <template #operation="scope">
              <el-button link type="primary" @click="handleInspect(scope)"
                >查看</el-button
              >
            </template>
          </zxn-table>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { getTaskList } from "@/api/settlementCenter/enterpriseSettlement";
import { getChannelSettlementDetails } from "@/api/settlementCenter/channelSettlement";
const route = useRoute();
const router = useRouter();
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "结算详情",
  },
  {
    name: "2",
    label: "结算任务列表",
  },
];
const handleInspect = (scope: any) => {
  console.log(scope.row.task_id);

  router.push({
    name: "channelSettlementB",
    query: { activeName: "1", task_id: scope.row.task_id },
  });
};

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
};

//表单信息
const formItem = ref({
  settlement_order_no: "",
  channel_admin_name: "",
  channel_name: "",
  cooperate_pointnt: "",
  before_tax: "",
  after_tax: "",
  custom_point: "",
  tax_cost_point: "",
  tax_land_name: "",
  company_name: "",
  real_money: "",
  company_id: "",
  tax_land_id: "",
});
//
const tableData = reactive([] as any);
const columnList = [
  { label: "任务编号", prop: "task_no", width: 120 },
  { label: "任务名称", prop: "task_name", width: 120 },
  { label: "需求人数", prop: "person_count", width: 120 },
  { label: "预算", prop: "salary", width: 120 },
  { label: "申请时间", prop: "add_time", width: 120 },
  { label: "任务详情", slot: "operation", fixed: "right" },
];
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
 * 获取数据
 */
const getTableData = async () => {
  const ID = Number(route.query.id);
  console.log(ID);
  await getChannelSettlementDetails(ID)
    .then((response: any) => {
      const {
        settlement_order_no,
        channel_admin_name,
        channel_name,
        cooperate_pointnt,
        before_tax,
        after_tax,
        custom_point,
        tax_cost_point,
        tax_land_name,
        company_name,
        real_money,
        company_id,
        tax_land_id,
      } = response.data.info;
      formItem.value = {
        settlement_order_no,
        channel_admin_name,
        channel_name,
        cooperate_pointnt,
        before_tax,
        after_tax,
        custom_point,
        tax_cost_point,
        tax_land_name,
        company_name,
        real_money,
        company_id,
        tax_land_id,
      };
    })
    .catch();
  const params = {
    company_id: formItem.value.company_id,
    tax_land_id: formItem.value.tax_land_id,
  } as any;
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  console.log(params);

  try {
    const { data } = await getTaskList(params);
    tableData.length = 0;
    pageInfo.page = data.current_page;
    pageInfo.total = data.total;
    console.log(data.list.data);

    var newData = data.list.data.map((item: any) => {
      return {
        id: item.id,
        task_no: item.task_no,
        task_name: item.task_name,
        task_id: item.id,
        person_count: item.task_attribute.person_count,
        salary: item.task_attribute.salary,
        add_time: item.add_time,
        task_user: item.task_user,
      };
    });
    console.log(newData);

    tableData.push(...newData);
  } catch (error) {
    console.log(error);
  }
};

getTableData();
onMounted(() => {});
</script>
<style lang="scss" scoped>
.tabTop {
  display: flex;
  align-items: center;

  .box {
    width: 4px;
    height: 18px;
    margin-right: 18px;
    background: #356ff3;
    border-radius: 4px;
  }

  .title {
    font-size: 14px;
    font-weight: 500;
    color: #356ff3;
  }
}
</style>
