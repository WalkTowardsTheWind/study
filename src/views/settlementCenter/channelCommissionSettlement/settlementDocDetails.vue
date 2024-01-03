<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName"></zxn-tabs>
    <div class="p-[24px]">
      <el-form label-width="100px">
        <el-row :gutter="150">
          <el-col :span="8">
            <el-form-item label="结算状态">
              <el-input
                v-model="
                  ['结算中', '结算成功', '部分结算成功', '结算失败'][
                    formItem.status
                  ]
                "
                readonly
              />
            </el-form-item>
            <el-form-item label="结算账户">
              <el-input v-model="formItem.bank_account" readonly />
            </el-form-item>
            <el-form-item label="打款总额">
              <el-input v-model="formItem.payment_total_money" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算编号">
              <el-input v-model="formItem.settlement_order_no" readonly />
            </el-form-item>
            <el-form-item label="结算总额">
              <el-input v-model="formItem.settlement_total_money" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算企业">
              <el-input v-model="formItem.company_name" readonly />
            </el-form-item>
            <el-form-item label="服务费">
              <el-input v-model="formItem.commission" readonly />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <div class="title">
          <div class="line"></div>
          结算任务
        </div>
        <zxn-table
          :table-data="taskData"
          :column-list="columnList1"
          :hasPagination="false"
        >
          <template #task_money="scope">
            {{ scope.row.salary_min }}-{{ scope.row.salary_max }}
          </template>
        </zxn-table>
      </div>
      <div>
        <div class="title">
          <div class="line"></div>
          结算成员
        </div>
        <div class="task" v-if="taskMemberData.length > 0">
          <div
            class="item"
            v-for="(item, index) in taskMemberData"
            :key="index"
            :class="{ active: index == taskNum }"
            @click="filterTask(item, index)"
          >
            {{ item }}
          </div>
        </div>
        <zxn-table
          :table-data="filterUserData"
          :column-list="columnList2"
          :hasPagination="false"
        >
          <template #payment_receipt="scope">
            <!-- <el-image v-if="scope.row.payment_receipt.length" style="width: 30px; height: 30px"
							:src="scope.row.payment_receipt[0]" :zoom-rate="1.2" :preview-src-list="scope.row.payment_receipt"
							fit="contain" :z-index="999" :preview-teleported="true" /> -->
            <a
              v-if="scope.row.payment_receipt.length"
              target="_blank"
              style="color: #356ff3"
              :href="scope.row.payment_receipt"
              >查看</a
            >
            <span v-else>--</span>
          </template>
        </zxn-table>
      </div>
      <div v-if="failData.length">
        <div class="title">
          <div class="line"></div>
          结算失败成员
          <!-- <div v-if="failData.length > 0" class="reBtn">重新结算</div> -->
        </div>
        <zxn-table
          :table-data="failData"
          :column-list="columnList3"
          :hasPagination="false"
          @select-change="handleSelectChange"
        >
        </zxn-table>
      </div>
    </div>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getChannelSettlementDocDetails } from "@/api/settlementCenter/channelCommissionSettlement";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();

const tabsList = [{ label: "结算详情", name: "settle-detail" }];
const activeName = ref("settle-detail");

const taskNum = ref(0);

const formItem = reactive({
  status: 0,
  settlement_order_no: "",
  company_name: "",
  bank_account: "",
  settlement_amount: "",
  commission: "",
  payment_total_money: "",
  settlement_total_money: "",
});

const taskData = reactive([] as any);
const taskMemberData = reactive([] as any);
const filterUserData = reactive([] as any);

const columnList1 = [
  { label: "任务编号", prop: "task_no", minWidth: 200 },
  { label: "任务名称", prop: "task_name", minWidth: 150 },
  {
    label: "任务状态",
    prop: "status",
    type: "enum",
    path: "settlementCenterEnum.settleTaskType",
    minWidth: 150,
    color: {
      0: {
        color: "#1DE585",
        background: "#DBFBEB",
      },
      1: {
        color: "#356FF3",
        background: "#DFE8FD",
      },
      2: {
        color: "#35C5F3",
        background: "#DFF6FD",
      },
      3: {
        color: "#35C5F3",
        background: "#DFF6FD",
      },
      4: {
        color: "#35C5F3",
        background: "#DFF6FD",
      },
      5: {
        color: "#35C5F3",
        background: "#DFF6FD",
      },
      6: {
        color: "#35C5F3",
        background: "#DFF6FD",
      },
    },
  },
  { label: "结算人数", prop: "settlement_person_count" },
  { label: "行业", prop: "name", minWidth: 150 },
  { label: "任务金额", slot: "task_money", minWidth: 150 },
  { label: "创建账户", prop: "add_name", minWidth: 150 },
  { label: "申请时间", prop: "add_time", width: 200 },
  { label: "结算金额", prop: "settlement_amount" },
  { label: "服务费", prop: "commission" },
];
const userData = reactive([] as any);

const columnList2 = [
  { label: "账户ID", prop: "account" },
  { label: "姓名", prop: "real_name" },
  {
    label: "状态",
    prop: "settlement_status",
    type: "enum",
    path: "settlementCenterEnum.settlePerson",
    color: {
      0: {
        color: "#1DE585",
        background: "#DBFBEB",
      },
      1: {
        color: "#356FF3",
        background: "#DFE8FD",
      },
      2: {
        color: "#F35135",
        background: "#FDE3DF",
      },
    },
  },
  { label: "联系号码", prop: "phone" },
  { label: "关联任务", prop: "task_no" },
  { label: "开户行名称", prop: "bank" },
  { label: "收款账户", prop: "bank_account", minWidth: "180" },
  { label: "结算金额", prop: "settlement_amount" },
  { label: "服务费", prop: "commission" },
  { label: "回单", slot: "payment_receipt" },
];
const failData = reactive([] as any);

const columnList3 = [
  { label: "姓名", prop: "real_name" },
  {
    label: "状态",
    prop: "settlement_status",
    type: "enum",
    path: "settlementCenterEnum.settlePerson",
    color: {
      0: {
        color: "#1DE585",
        background: "#DBFBEB",
      },
      1: {
        color: "#356FF3",
        background: "#DFE8FD",
      },
      2: {
        color: "#F35135",
        background: "#FDE3DF",
      },
    },
  },
  { label: "联系方式", prop: "phone" },
  { label: "身份证号", prop: "idcard" },
  { label: "结算任务", prop: "task_no" },
  { label: "结算金额", prop: "settlement_amount" },
  // { label: "结算时间", prop: "settlement_time" },
  { label: "原因", prop: "reason" },
  // { label: "操作", slot: "operation" },
];

function getSettleDetail() {
  getChannelSettlementDocDetails({
    company_settlement_id: route.query.id + "",
  }).then((res: any) => {
    formItem.status = Number(res.data.status);
    formItem.company_name = res.data.company_name;
    formItem.bank_account = res.data.bank_account;
    formItem.settlement_amount = res.data.settlement_amount;
    formItem.commission = res.data.commission;
    formItem.settlement_order_no = res.data.settlement_order_no;
    formItem.payment_total_money = res.data.payment_total_money;
    formItem.settlement_total_money = res.data.settlement_total_money;

    taskData.length = 0;
    taskData.push(...res.data.taskList);
    taskMemberData.push(
      ...new Set(
        taskData.map((item: any) => {
          return item.task_no;
        })
      )
    );

    userData.length = 0;
    userData.push(...res.data.userList);

    failData.length = 0;
    failData.push(...res.data.failUserList);

    filterTask(taskMemberData[0], 0);
  });
}

const handleSelectChange = (val: any) => {
  console.log(val);
};

function filterTask(name: string, index: number) {
  taskNum.value = index;
  // console.log(taskNum.value);

  filterUserData.length = 0;

  filterUserData.push(...userData.filter((item: any) => item.task_no === name));
}

getSettleDetail();
</script>

<style lang="scss" scoped>
.company {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eff4fe;
  height: 215px;
  border-radius: 8px;
  margin-bottom: 30px;

  .left {
    .item {
      font-size: 15px;
      display: flex;
      align-items: center;
      color: #656565;
      margin: 25px 0;
      margin-left: 25px;

      .head {
        margin-left: 20px;
        width: 80px;
      }

      .name {
        color: #333;
        font-weight: 500;
      }
    }
  }

  .right {
    display: flex;

    &-item {
      width: 180px;
      border-left: 2px solid #e5e5e5;
      display: flex;
      flex-direction: column;
      font-size: 13px;
      color: #656565;
      padding-left: 25px;
      margin-right: 25px;

      .num {
        font-size: 32px;
        color: #356ff3;
        font-weight: bold;
        margin: 15px 0;
      }
    }
  }
}

.title {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #366ff4;
  margin: 30px 0 20px;

  .line {
    width: 4px;
    height: 14px;
    background: #366ff4;
    border-radius: 4px;
    margin-right: 10px;
  }

  .reBtn {
    border: 1px solid #356ff3;
    background: #fff;
    padding: 5px 15px;
    border-radius: 4px;
    margin-left: 10px;
  }

  .reBtn:hover {
    color: #fff;
    background: #356ff3;
    cursor: pointer;
  }
}

.task {
  margin: 19px 0 16px;
  display: flex;

  .item {
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    padding: 10px 40px;
    margin-right: 15px;
    cursor: pointer;

    &:hover,
    &.active {
      border-color: #366ff3;
      color: #366ff3;
    }
  }
}

.btn {
  width: 56px;
  height: 24px;
  line-height: 24px;
  background: #d1dffc;
  border-radius: 12px;
  color: #356ff3;
  border-radius: 18px;
  text-align: center;

  &:hover {
    cursor: pointer;
    background: #356ff3;
    color: #fff;
  }
}

.money {
  position: relative;
  width: 100%;

  .balance {
    position: absolute;
    right: 10px;
    color: #f78968;
    font-weight: 600;
    font-size: 14px;
    top: 1px;
  }
}

.recharge {
  position: relative;
  width: 100%;

  .go {
    position: absolute;
    top: 1px;
    right: -50px;
    color: #356ff3;
    cursor: pointer;
  }
}
</style>
