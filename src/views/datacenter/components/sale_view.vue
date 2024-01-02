<template>
  <div class="p-24px">
    <div class="title flex justify-between">
      <div class="title-item flex items-center">
        <div class="title1">销售计划</div>
        <div class="title2 cursor-pointer" @click="setClick">设置经营计划</div>
      </div>
      <div class="title-item">
        <tax-source-select
          class="w-300px"
          v-model="tax_land_id"
          @change="getPlan"
        />
      </div>
    </div>
    <div class="content">
      <div class="content-item left">
        <div class="title">今年销售情况</div>
        <div class="sum">{{ plan.total_rate }}%</div>
        <div class="line">
          <div class="line-item" :style="`width:${plan.total_rate}%`"></div>
        </div>
        <div class="money">
          <div class="money-item">
            <div class="title">目标（元）</div>
            <div class="money-num">{{ plan.total_plan }}</div>
          </div>
          <div class="money-item">
            <div class="title">已完成（元）</div>
            <div class="money-num">{{ plan.settlement_total }}</div>
          </div>
        </div>
      </div>
      <div class="content-item right">
        <div class="title">本月销售情况</div>
        <div class="sum">{{ plan.month_rate }}%</div>
        <div class="line">
          <div class="line-item" :style="`width:${plan.month_rate}%`"></div>
        </div>
        <div class="money">
          <div class="money-item">
            <div class="title">
              目标（元）
              <!-- <span v-if="tax_land_id != ''" class="set" @click="setMonth"
                >设置</span
              > -->
            </div>
            <div class="money-num">{{ plan.month_plan }}</div>
          </div>
          <div class="money-item">
            <div class="title">已完成（元）</div>
            <div class="money-num">{{ plan.settlement_month }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 设置经营计划 -->
  <zxn-dialog
    :visible="visible"
    title="设置经营计划"
    width="50vw"
    top="15"
    @close-dialog="handleClose"
    @confirm-dialog="handleConfirm"
  >
    <div class="goal">
      <div class="goal-item">
        <span
          >全部税地今年销售目标
          <span class="goal-money"
            >￥{{ proxy.$moneyFormat(total_plan) }}</span
          ></span
        >
      </div>
      <div class="goal-item ml-200px">
        <span
          >全部税地本月销售目标
          <span class="goal-money"
            >￥{{ proxy.$moneyFormat(month_plan) }}</span
          ></span
        >
      </div>
    </div>
    <!-- <el-link :underline="false" type="primary" class="mt-20px" @click="add"
      >+添加</el-link
    > -->
    <el-form :model="form" ref="formRef" label-position="left">
      <el-row :gutter="50" class="form">
        <el-col :span="11">
          <el-form-item label="税地名称">
            <tax-source-select
              :isShowAll="false"
              v-model="form.tax_land_id"
              class="w-full"
              @change="changeTax"
            />
          </el-form-item>
          <el-form-item label="经营月份">
            <!-- <el-date-picker
              v-model="form.date"
              type="monthrange"
              range-separator="~"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            /> -->
            <el-select class="w-full" v-model="form.plan_time">
              <el-option :value="1" label="一个月"></el-option>
              <el-option :value="2" label="两个月"></el-option>
              <el-option :value="3" label="三个月"></el-option>
              <el-option :value="4" label="四个月"></el-option>
              <el-option :value="5" label="五个月"></el-option>
              <el-option :value="6" label="六个月"></el-option>
              <el-option :value="7" label="七个月"></el-option>
              <el-option :value="8" label="八个月"></el-option>
              <el-option :value="9" label="九个月"></el-option>
              <el-option :value="10" label="十个月"></el-option>
              <el-option :value="11" label="十一个月"></el-option>
              <el-option :value="12" label="十二个月"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label-width="140" label="年度经营目标￥">
            <el-input
              v-model="form.amount"
              placeholder="请输入"
              @input="checkNumber(form.amount)"
              maxlength="12"
            />
          </el-form-item>
          <el-form-item label-width="140" label="平均每月经营目标￥">
            <el-input disabled v-model="form.month_amount" />
          </el-form-item>
        </el-col>
        <el-link :underline="false" type="primary" class="del" @click="clean"
          >清除计划</el-link
        >
      </el-row>
    </el-form>
  </zxn-dialog>
  <!-- 本月计划 -->
  <zxn-dialog
    title="设置本月计划"
    :visible="showPlan"
    @close-dialog="handleClosePlan"
    @confirm-dialog="handleConfirmPlan"
  >
    <el-form-item label="本月目标">
      <el-input placeholder="请输入" />
    </el-form-item>
  </zxn-dialog>
</template>

<script lang="ts" setup>
import {
  cleanPlan,
  getPlanByTaxLandId,
  getPlanList,
  savePlan,
} from "@/api/datacenter";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance() as any;

const form = ref({
  tax_land_id: "",
  amount: "",
  plan_time: "",
  month_amount: "",
});
const tax_land_id = ref("");

const plan = reactive({
  month_plan: "",
  month_rate: "",
  settlement_month: "",
  settlement_total: "",
  total_plan: "",
  total_rate: "",
});

const total_plan = ref("");
const month_plan = ref("");

const visible = ref(false);
const setClick = () => {
  visible.value = true;
  form.value.tax_land_id = "";
  form.value.amount = "";
  form.value.plan_time = "";
  form.value.month_amount = "";
};
const handleClose = () => {
  visible.value = false;
};
const handleConfirm = () => {
  let params = {
    tax_land_id: form.value.tax_land_id,
    amount: form.value.amount,
    plan_time: form.value.plan_time,
  };
  savePlan(params).then((res) => {
    ElMessage.success("设置成功");
    visible.value = false;
    tax_land_id.value = form.value.tax_land_id;
    getPlan();
  });
};

const clean = () => {
  if (!form.value.tax_land_id) {
    return ElMessage.error("先选择税地");
  }
  if (!form.value.month_amount) {
    return ElMessage.info("当前税地暂无计划清除");
  }
  cleanPlan({ tax_land_id: form.value.tax_land_id }).then(() => {
    ElMessage.success("操作成功");
    changeTax(form.value.tax_land_id);
  });
};

const showPlan = ref(false);
const setMonth = () => {
  showPlan.value = true;
};
const handleClosePlan = () => {
  showPlan.value = false;
};
const handleConfirmPlan = () => {};

const getPlan = () => {
  getPlanList({ tax_land_id: tax_land_id.value }).then((res) => {
    // console.log(res);
    plan.month_plan = res.data.month_plan;
    plan.month_rate = res.data.month_rate;
    plan.settlement_month = res.data.settlement_month;
    plan.settlement_total = res.data.settlement_total;
    plan.total_plan = res.data.total_plan;
    plan.total_rate = res.data.total_rate;
    if (tax_land_id.value == "") {
      month_plan.value = res.data.month_plan;
      total_plan.value = res.data.total_plan;
    }
  });
};
getPlan();

const changeTax = (tax_land_id) => {
  getPlanByTaxLandId({ tax_land_id }).then((res) => {
    form.value.plan_time = res.data.plan_time;
    form.value.amount = res.data.total_amount;
    form.value.month_amount = res.data.month_amount;
  });
};

const checkNumber = (val) => {
  const regex = /^\d+$/;
  if (!regex.test(val)) {
    form.value.amount = "";
    ElMessage.error("请输入数字");
  }
};
</script>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: baseline;
  .title1 {
    font-size: 18px;
    font-family: SourceHanSansSC, SourceHanSansSC;
    font-weight: bold;
    color: #333333;
    margin-right: 20px;
  }
  .title2 {
    font-size: 14px;
    font-family: SourceHanSansSC, SourceHanSansSC;
    font-weight: 500;
    color: #356ff3;
  }
}
.content {
  display: flex;
  margin-top: 20px;
  gap: 0 50px;
  &-item {
    width: 528px;
    .title {
      font-size: 14px;
      font-family: SourceHanSansSC, SourceHanSansSC;
      font-weight: 400;
      color: #656565;
    }
    .sum {
      margin: 20px 0 5px;
      font-size: 24px;
      font-weight: bold;
      color: #356ff3;
    }
    .line {
      width: 100%;
      background: #f5f5f5;
      height: 8px;
      border-radius: 4px;
      margin: 20px 0;
      &-item {
        width: 0;
        background-color: #356ff3;
        border-radius: 4px;
        height: 100%;
        box-shadow: 0px 0px 8px 0px #356ff3;
      }
    }

    .money {
      display: flex;
      gap: 0 20px;
      position: relative;
      &-item {
        flex: 1;
        width: 50%;
        .title {
          font-size: 14px;
          font-family: SourceHanSansSC, SourceHanSansSC;
          font-weight: 400;
          color: #656565;
          margin-bottom: 10px;
        }
        .money-num {
          font-size: 16px;
          font-family: SourceHanSansSC, SourceHanSansSC;
          font-weight: bold;
          color: #333333;
        }
      }
      .set {
        cursor: pointer;
        color: #356ff3;
      }
    }
  }
  &-item.right {
    .sum {
      color: #36c5f3;
    }
    .line-item {
      background-color: #36c5f3;
      box-shadow: 0px 0px 8px 0px #36c5f3;
    }
  }
}
.add {
  margin: 20px 0;
  font-size: 16px;
  cursor: pointer;
  font-family: SourceHanSansSC, SourceHanSansSC;
  font-weight: 500;
  color: #356ff3;
}
.goal {
  margin-top: 10px;
  display: flex;
  &-item {
    font-size: 16px;
    font-family: SourceHanSansSC, SourceHanSansSC;
    font-weight: 400;
    color: #333333;
  }
  &-money {
    margin-left: 15px;
    font-size: 18px;
    font-family: SourceHanSansSC, SourceHanSansSC;
    font-weight: bold;
    color: #356ff3;
  }
}
.form {
  position: relative;
  margin-top: 20px;
  .del {
    position: absolute;
    right: 20px;
    top: 30%;
  }
}
</style>
