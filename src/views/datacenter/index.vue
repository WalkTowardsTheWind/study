<template>
  <div class="p-24px">
    <div class="sale">
      <SaleView />
    </div>
    <div class="time_view">
      <TimeView />
    </div>
    <div class="chart">
      <ChartView :arr-data="arrData" />
    </div>
    <div class="cardbox">
      <div>
        <CardView :cardData="cardData1"> </CardView>
      </div>
      <div>
        <CardView :cardData="cardData2"> </CardView>
      </div>
    </div>
    <div class="cardbox">
      <div>
        <CardView :cardData="cardData3"> </CardView>
      </div>
      <div>
        <CardView :cardData="cardData4"> </CardView>
      </div>
    </div>
    <div class="cardbox">
      <div>
        <CardView :cardData="cardData5"> </CardView>
      </div>
      <div>
        <CardView :cardData="cardData6"> </CardView>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SaleView from "./components/sale_view.vue";
import TimeView from "./components/time_view.vue";
import ChartView from "./components/chart_view.vue";
import CardView from "./components/card_view.vue";
import { reactive } from "vue";

const arrData = ref([]);

const cardData1 = reactive({
  title: "利润数据",
  route: "asset-management",
  subItem: [
    {
      title: "利润总额（元）",
      val: 123213123,
      sub_title: "环比",
      sub_val: -12.24,
      isPercent: true,
      isNeedFormat: true,
    },
    {
      title: "销售总额（元）",
      val: 123213123,
      sub_title: "环比",
      sub_val: 13.44,
      isPercent: true,
      isNeedFormat: true,
    },
    {
      title: "渠道总额（元）",
      val: 123213123,
      sub_title: "环比",
      sub_val: 22.4,
      isPercent: true,
      isNeedFormat: true,
    },
  ],
});
const cardData2 = reactive({
  title: "账户数据",
  route: "business-account",
  subItem: [
    {
      title: "总账户数量",
      val: 9271,
      sub_title: "新增",
      sub_val: 123,
    },
    {
      title: "企业账户",
      val: 123312,
      sub_title: "新增",
      sub_val: 13,
    },
    {
      title: "渠道账户",
      val: 241,
      sub_title: "新增",
      sub_val: 22,
    },
    {
      title: "自由职业者",
      val: 24112,
      sub_title: "新增",
      sub_val: 111,
      sub_title2: "下发数量",
      sub_val2: 1211,
    },
  ],
});
const cardData3 = reactive({
  title: "税地数据",
  route: "taxLandManagement",
  subItem: [
    {
      title: "总税地",
      val: 9271,
      sub_title: "新增",
      sub_val: 123,
    },
    {
      title: "自营税地",
      val: 123312,
      sub_title: "新增",
      sub_val: 13,
    },
    {
      title: "采购税地",
      val: 241,
      sub_title: "新增",
      sub_val: 22,
    },
  ],
});
const cardData4 = reactive({
  title: "充值数据",
  route: "recharge-center",
  subItem: [
    {
      title: "充值总额（元）",
      val: 2100200260,
      sub_title: "环比",
      sub_val: -123,
      isPercent: true,
      isNeedFormat: true,
    },
    {
      title: "充值企业数量",
      val: 1050,
      sub_title: "环比",
      sub_val: 9.1,
      isPercent: true,
    },
    {
      title: "充值次数",
      val: 2411,
      sub_title: "新增",
      sub_val: 1.9,
      isPercent: true,
    },
  ],
});
const cardData5 = reactive({
  title: "结算数据",
  route: "settlementCenter",
  subItem: [
    {
      title: "结算总额（元）",
      val: 2100200260,
      sub_title: "环比",
      sub_val: -123,
      isPercent: true,
      isNeedFormat: true,
    },
    {
      title: "结算企业数量",
      val: 1050,
      sub_title: "环比",
      sub_val: 9.1,
      isPercent: true,
    },
    {
      title: "结算次数",
      val: 2411,
      sub_title: "新增",
      sub_val: 1.9,
      isPercent: true,
    },
  ],
});
const cardData6 = reactive({
  title: "开票数据",
  route: "invoiceManager",
  subItem: [
    {
      title: "已开总额（元）",
      val: 2100200260,
      sub_title: "环比",
      sub_val: -123,
      isPercent: true,
      isNeedFormat: true,
    },
    {
      title: "待开企业数量",
      val: 1050,
      sub_title: "环比",
      sub_val: 9.1,
      isPercent: true,
    },
    {
      title: "开票企业数量",
      val: 2411,
      sub_title: "新增",
      sub_val: 1.9,
      isPercent: true,
    },
    {
      title: "开票次数",
      val: 2411,
      sub_title: "新增",
      sub_val: 1.9,
      isPercent: true,
    },
  ],
});
</script>

<style lang="scss">
$backgound: #fff;
$border-radius: 16px;

.p-24px {
  padding: 24px;
}
.sale {
  width: 100%;
  height: 264px;
  background: $backgound;
  border-radius: $border-radius;
}

.time_view {
  margin: 24px 0;
  width: 100%;
  height: 120px;
  background: $backgound;
  border-radius: $border-radius;
}
.chart {
  width: 100%;
  height: 400px;
  background: $backgound;
  border-radius: $border-radius;
}
.cardbox {
  margin-top: 24px;
  width: 100%;
  display: flex;
  gap: 24px;
  & > div {
    height: 252px;
    flex: 1;
    background: $backgound;
    border-radius: $border-radius;
    padding: 24px;
  }
}
</style>
