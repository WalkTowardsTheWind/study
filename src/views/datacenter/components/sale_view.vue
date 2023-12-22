<template>
  <div class="p-24px">
    <div class="title flex justify-between">
      <div class="title-item flex items-center">
        <div class="title1">销售计划</div>
        <div class="title2 cursor-pointer" @click="setClick">设置经营计划</div>
      </div>
      <div class="title-item">
        <tax-source-select class="w-300px" />
      </div>
    </div>
    <div class="content">
      <div class="content-item left">
        <div class="title">今年销售情况</div>
        <div class="sum">{{ sum1 }}%</div>
        <div class="line">
          <div class="line-item" :style="`width:${sum1}%`"></div>
        </div>
        <div class="money">
          <div class="money-item">
            <div class="title">目标（元）</div>
            <div class="money-num">10,000,000.00</div>
          </div>
          <div class="money-item">
            <div class="title">已完成（元）</div>
            <div class="money-num">7,960,160.00</div>
          </div>
        </div>
      </div>
      <div class="content-item right">
        <div class="title">本月销售情况</div>
        <div class="sum">{{ sum2 }}%</div>
        <div class="line">
          <div class="line-item" :style="`width:${sum2}%`"></div>
        </div>
        <div class="money">
          <div class="money-item">
            <div class="title">
              目标（元）
              <span class="set" @click="setMonth">设置</span>
            </div>
            <div class="money-num">10,000,000.00</div>
          </div>
          <div class="money-item">
            <div class="title">已完成（元）</div>
            <div class="money-num">7,960,160.00</div>
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
            >￥{{ proxy.$moneyFormat(10000000) }}</span
          ></span
        >
      </div>
      <div class="goal-item ml-200px">
        <span
          >全部税地本月销售目标
          <span class="goal-money"
            >￥{{ proxy.$moneyFormat(8333333.33) }}</span
          ></span
        >
      </div>
    </div>
    <el-link :underline="false" type="primary" class="mt-20px" @click="add"
      >+添加</el-link
    >
    <el-form :model="form" ref="formRef" label-position="left">
      <el-row
        :gutter="50"
        class="form"
        v-for="(item, index) of form"
        :key="index"
      >
        <el-col :span="11">
          <el-form-item label="税地名称">
            <tax-source-select
              :isShowAll="false"
              v-model="item.name"
              class="w-full"
            />
          </el-form-item>
          <el-form-item label="经营月份">
            <zxn-date-range v-model="item.date" class="w-full" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label-width="140" label="年度经营目标￥">
            <el-input v-model="item.money1" placeholder="请输入" />
          </el-form-item>
          <el-form-item label-width="140" label="平均每月经营目标￥">
            <el-input disabled :value="item.money2" />
          </el-form-item>
        </el-col>
        <el-link
          :underline="false"
          type="primary"
          class="del"
          @click="del(index)"
          >删除该税地</el-link
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
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance() as any;

const sum1 = ref(54.11);
const sum2 = ref(42.99);

const form = ref([]);

const visible = ref(false);
const setClick = () => {
  visible.value = true;
};
const handleClose = () => {
  visible.value = false;
};
const handleConfirm = () => {};

const add = () => {
  form.value.push({
    name: "",
    moeny1: "",
    money2: "",
    date: [],
  });
};

const del = (index) => {
  form.value.splice(index, 1);
};

const showPlan = ref(false);
const setMonth = () => {
  showPlan.value = true;
};
const handleClosePlan = () => {
  showPlan.value = false;
};
const handleConfirmPlan = () => {};
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
  margin: 10px 0;
  .del {
    position: absolute;
    right: 20px;
    top: 30%;
  }
}
</style>
