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
        <CardView> </CardView>
      </div>
    </div>
    <div class="cardbox">
      <div>3</div>
      <div>4</div>
    </div>
    <div class="cardbox">
      <div>5</div>
      <div>6</div>
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
  subItem: [
    {
      title: "利润总额（元）",
      val: 123213123,
      sub_title: "环比",
      sub_val: -12.24,
    },
    {
      title: "销售总额（元）",
      val: 123213123,
      sub_title: "环比",
      sub_val: 13.44,
    },
    {
      title: "渠道总额（元）",
      val: 123213123,
      sub_title: "环比",
      sub_val: 22.4,
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
