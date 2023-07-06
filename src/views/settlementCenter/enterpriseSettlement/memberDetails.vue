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
          <el-form :model="formItem" label-width="90px" label-position="right">
            <div class="tabTop m-t-[20px]">
              <div class="box"></div>
              <span class="title">个人身份信息</span>
            </div>
            <div class="m-t-[20px]">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="账户ID">
                    <el-text class="mx-1">{{ formItem.task_name }}</el-text>
                  </el-form-item>
                  <el-form-item label="证件类型">
                    <el-text class="mx-1">{{ formItem.task_name }}</el-text>
                  </el-form-item>
                  <el-form-item label="开户行">
                    <el-text class="mx-1">{{ formItem.task_name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="姓名">
                    <el-text class="mx-1">{{ formItem.category_name }}</el-text>
                  </el-form-item>
                  <el-form-item label="身份证号">
                    <el-text class="mx-1">{{ formItem.category_name }}</el-text>
                  </el-form-item>
                  <el-form-item label="开户行号">
                    <el-text class="mx-1">{{ formItem.category_name }}</el-text>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="联系方式">
                    <el-text class="mx-1">{{ formItem.person_count }}</el-text>
                  </el-form-item>
                  <el-form-item label="地点">
                    <el-text class="mx-1">{{ formItem.person_count }}</el-text>
                  </el-form-item>
                  <el-form-item label="开户地址">
                    <el-text class="mx-1">{{ formItem.person_count }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="tabTop m-t-[20px]">
              <div class="box"></div>
              <span class="title">个人任务信息</span>
            </div>
            <div class="m-t-[20px]">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="任务名称">
                    <el-text class="mx-1">{{ formItem.person_count }}</el-text>
                  </el-form-item>
                  <el-form-item label="结算时间">
                    <el-text class="mx-1">{{}}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="任务状态">
                    <el-text class="mx-1">{{
                      formItem.settlement_amount
                    }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结算金额">
                    <el-text class="mx-1">{{}}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="tabTop m-t-[20px]">
              <div class="box"></div>
              <span class="title">结算回单</span>
            </div>
            <div class="m-t-[20px]">
              <el-row :gutter="50">
                <el-col :span="8">
                  <el-form-item label="结算回单">
                    <picture-preview
                      :imageList="formItem.check_url"
                    ></picture-preview>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const imageList = ref([]) as any;
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "成员详情",
  },
];
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
  // getTableData();
};
//表单信息
const formItem = ref({
  task_name: "",
  category_name: "",
  person_count: "",
  open_type: "",
  open_start_time: "",
  open_end_time: "",
  task_head: "",
  task_head_phone: "",
  task_date_type: "",
  task_start_time: "",
  task_end_time: "",
  salary: "",
  request: [],
  address: "",
  condition_desc: "",
  require_desc: "",
  settlement_person_count: "",
  company_name: "",
  settlement_amount: "",
  payment_amount: "",
  payment_time: "",
  status: "",
  reason: "",
  invoice_status: "",
  bank_account: "",
  check_url: [],
}) as any;
//

const tableData = reactive([
  { value: "020" },
  { value: "020" },
  { value: "020" },
]);
const color = {
  0: { color: "#1AB66B", backgroundColor: "#DAF3E7" },
  1: { color: "#366FF4", backgroundColor: "#DFE8FD" },
  2: { color: "#333333", backgroundColor: "#DEDEDE" },
};
const columnList = [
  { label: "账户ID", prop: "account" },
  // 雷门绝学
  // { label: "状态", slot: "status", width: 100, headerAlign: "left" },
  {
    label: "结算状态",
    type: "enum",
    width: 100,
    path: "settlementCenterEnum.settlementCenterEnum",
    prop: "settlement_status",
    // fixed: "left",
    color: {
      0: { color: "#1AB66B", backgroundColor: "#DAF3E7" },
      1: { color: "#366FF4", backgroundColor: "#DFE8FD" },
      2: { color: "#333333", backgroundColor: "#DEDEDE" },
    },
  },
  { label: "姓名", prop: "real_name" },
  { label: "联系方式", prop: "phone" },
  { label: "收款银行", prop: "bank" },
  { label: "银行卡号", prop: "bank_account" },
  { label: "下发时间", prop: "payment_time" },
  { label: "结算金额", prop: "payment_amount" },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 200,
    align: "right",
    headerAlign: "left",
  },
];
// 操作
// const handleInspect = (scope: any) => {
//   dialogVisible.value = true;
//   imageList.value = scope.row.payment_receipt;
// };
/**
 * 批量选择
 */
//选中的数据
//返回id数组
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};

// const getTableData = async () => {
//   try {

//     // const { data } = await getTaskView(Number(route.query.task_id));
//     console.log(data);

//     const {
//       task_name,
//       category_name,
//       open_type,
//       open_start_time,
//       open_end_time,
//       task_head,
//       task_head_phone,
//       request,
//       address,
//       company_name,
//       status,
//       reason,
//       bank_account,
//       check_url,
//     } = data;
//     const {
//       person_count,
//       task_date_type,
//       task_start_time,
//       task_end_time,
//       salary,
//       condition_desc,
//     } = data.taskAttribute;

//     const { require_desc } = data.taskAttributeUser;
//     const {
//       settlement_person_count,
//       settlement_amount,
//       payment_amount,
//       payment_time,
//       invoice_status,
//     } = data.finance_settlement_company_task;
//     formItem.value = {
//       task_name,
//       category_name,
//       person_count,
//       open_type,
//       open_start_time,
//       open_end_time,
//       task_head,
//       task_head_phone,
//       task_date_type,
//       task_start_time,
//       task_end_time,
//       salary,
//       request,
//       address,
//       condition_desc,
//       require_desc,
//       settlement_person_count,
//       company_name,
//       settlement_amount,
//       payment_amount,
//       payment_time,
//       status,
//       reason,
//       invoice_status,
//       bank_account,
//       check_url,
//     };
//     const newData = data.taskUser.map((item: any) => {
//       return {
//         account: item.account,
//         settlement_status: item.settlement_status,

//         real_name: item.real_name,
//         phone: item.phone,
//         bank: item.bank,
//         bank_account: item.bank_account,
//         payment_time: item.payment_time,
//         payment_amount: item.payment_amount,

//         payment_receipt: item.payment_receipt,
//       };
//     });
//     tableData.length = 0;

//     tableData.push(...newData);
//   } catch (error) {
//     console.log(error);
//   }
// };
// getTableData();

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
