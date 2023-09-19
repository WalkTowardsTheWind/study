<template>
  <div class="top">
    <!-- 渠道结算合计 -->
    <card-view>
      <template #top>
        <span>渠道结算合计</span>
      </template>
      <template #main>
        <span class="yuan">￥</span>{{ proxy.$moneyFormat(commission_total) }}
      </template>
    </card-view>
  </div>
  <div class="time">
    <zxn-title>发佣统计</zxn-title>
    <div class="line_type">
      <div class="income">渠道支出</div>
    </div>
    <div class="date">
      <div
        v-for="(item, index) in dateList"
        :key="index"
        :class="{ active: index == currentDate }"
        @click="get3And1List(item.val, index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
  <div id="main2"></div>
</template>

<script lang="ts" setup>
import CardView from "./card.vue";
import * as echarts from "echarts";
import { getChannelList } from "@/api/money";

const { proxy } = getCurrentInstance() as any;

const dateList = [
  { name: "上周", val: "2" },
  { name: "本周", val: "1" },
  { name: "上月", val: "4" },
  { name: "本月", val: "3" },
];
const currentDate = ref(3);

const commission_total = ref();
const profit = ref();
const profit_rate = ref();

function get3And1List(time_type: number | string, index: number) {
  currentDate.value = index;
  nextTick(() => {
    chart = null;
    chart = echarts.init(document.getElementById("main2") as HTMLDivElement);
  });
  getChannelList({ time_type }).then((res) => {
    commission_total.value = res.data.commission_total;
    profit.value = res.data.profit;
    profit_rate.value = res.data.profit_rate;

    // console.log(res.data.commission_list);

    options.value.xAxis.data = res.data?.commission_list.map(
      (item: any) => item.date_time
    );
    options.value.series[0].data = res.data?.commission_list.map(
      (item: any) => item.commission
    );
    chart?.clear();
    chart?.setOption(options.value);
  });
}

let chart: echarts.ECharts | null = null;

const options = ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "1%",
    right: "10%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    show: false,
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [], // x轴
    axisTick: {
      show: false, // 不显示刻度
    },
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "支出",
      type: "line",
      stack: "total",
      data: [], // 数据
      showSymbol: false,
      smooth: true,
      itemStyle: {
        color: "#36C5F3", // 折线颜色
        symbol: "circle", // 圆点标记
        symbolSize: 10, // 圆点大小
        lineStyle: {
          width: 1, // 折线宽度
        },
      },
    },
  ],
});

onMounted(() => {
  nextTick(() => {
    // 图表初始化
    chart = echarts.init(document.getElementById("main2") as HTMLDivElement);

    // 大小自适应
    window.addEventListener("resize", () => {
      chart?.resize();
    });
  });
});

get3And1List(3, 3);
</script>

<style scoped lang="scss">
#main2 {
  width: 50vw;
  height: 500px;
}

.top {
  box-sizing: border-box;
  display: flex;
  gap: 0 16px;
  width: 55vw;
  margin: 20px 0 30px;
}

.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45vw;
}

.line_type {
  display: flex;
  gap: 0 50px;
  margin-left: 40%;
  font-size: 14px;

  .income {
    position: relative;

    &::before {
      position: absolute;
      top: 7px;
      left: -20px;
      width: 8px;
      height: 8px;
      content: "";
      background-color: #36c5f3;
      border-radius: 50%;
    }
  }
}
.date {
  display: flex;
  font-size: 14px;

  div {
    width: 60px;
    height: 40px;
    margin: 0 8px;
    line-height: 40px;
    color: #333;
    text-align: center;
    cursor: pointer;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
  }

  div.active {
    color: #366ff4;
    border-color: #366ff4;
  }
}
</style>
