<template>
  <div class="top">
    <el-card class="top-item">
      <div class="top-item-title">服务费</div>
      <div class="top-item-money">
        <span class="yuan">￥</span>{{ proxy.$moneyFormat(total_fee_amount) }}
      </div>
    </el-card>
    <el-card class="top-item">
      <div class="top-item-title">企业充值金额</div>
      <div class="top-item-money">
        <span class="yuan">￥</span
        >{{ proxy.$moneyFormat(total_payment_amount) }}
      </div>
    </el-card>
    <el-card class="top-item">
      <div class="top-item-title">企业下发金额</div>
      <div class="top-item-money">
        <span class="yuan">￥</span
        >{{ proxy.$moneyFormat(total_channel_amount) }}
      </div>
    </el-card>
  </div>
  <div class="time">
    <div class="title">
      <div class="line"></div>
      <div>营收趋势</div>
    </div>
    <div class="line_type">
      <div class="income">收入</div>
      <!-- <div class="spend">支出</div> -->
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
  <div id="main" ref="chart"></div>
</template>

<script lang="ts" setup>
import { getFinanceList } from "@/api/money";
import * as echarts from "echarts";

const { proxy } = getCurrentInstance() as any;

const dateList = [
  { name: "上周", val: "2" },
  { name: "本周", val: "1" },
  { name: "上月", val: "4" },
  { name: "本月", val: "3" },
];
const currentDate = ref(3);
let chart = null;

const total_channel_amount = ref();
const total_fee_amount = ref();
const total_payment_amount = ref();

function get3And1List(time_type: number, index: number) {
  currentDate.value = index;

  getFinanceList({ time_type }).then((res) => {
    console.log(res);
    total_channel_amount.value = res.data.total_channel_amount;
    total_fee_amount.value = res.data.total_fee_amount;
    total_payment_amount.value = res.data.total_payment_amount;

    options.value.xAxis.data = res.data?.income.map((item) => item.date_time);
    options.value.series[0].data = res.data?.income.map((item) => item.amount);
    chart?.clear();
    chart?.setOption(options.value);
  });
}

const options = ref({
  title: {
    // text: "Stacked Line",
  },
  tooltip: {
    trigger: "axis",
  },
  // legend: {
  // 	orient: "horizontal", // 垂直方向显示
  // 	left: "left", // 距离左侧距离
  // 	data: [
  // 		{
  // 			name: "收入",
  // 		},
  // 	],
  // 	selectedMode: false,
  // },
  grid: {
    left: "0%",
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
      name: "收入",
      type: "line",
      stack: "total",
      data: [], // 数据
      showSymbol: false,
      smooth: true,
      itemStyle: {
        color: "#366ff4", // 折线颜色
        symbol: "circle", // 圆点标记
        symbolSize: 10, // 圆点大小
        lineStyle: {
          width: 1, // 折线宽度
        },
      },
    },
    {
      name: "支出",
      type: "line",
      stack: "total",
      data: [], // 数据
      showSymbol: false,
      smooth: true,
      itemStyle: {
        color: "#35C5F3", // 折线颜色
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
    chart = echarts.init(document.getElementById("main") as HTMLDivElement);

    // 大小自适应
    window.addEventListener("resize", () => {
      chart.resize();
    });
  });
});
get3And1List(3, 3);
</script>

<style scoped lang="scss">
#main {
  width: 60vw;
  height: 500px;
}

.top {
  display: flex;
  gap: 0 16px;
  width: 55vw;
  margin: 20px 0 30px;

  &-item {
    flex: 1;
    height: 160px;
    background: #f5f5f5;
    border: none;
    border-radius: 4px;

    &-title {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }

    &-money {
      margin: 10px 0 20px;
      font-size: 32px;
      font-weight: bold;
      color: #356ff3;
    }

    &-bi {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      color: #656565;

      .left,
      .right {
        display: flex;
        align-items: center;
      }

      .per {
        margin: 0 5px 0 10px;
        color: #333;
      }
    }
  }
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: sans-serif;
  font-size: 14px;
  color: #356ff3;
}

.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 55vw;
}

.line {
  display: flex;
  width: 4px;
  height: 14px;
  margin-right: 10px;
  background: #356ff3;
  border-radius: 4px;
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
      background-color: #366ff4;
      border-radius: 50%;
    }
  }

  .spend {
    position: relative;

    &::before {
      position: absolute;
      top: 7px;
      left: -20px;
      width: 8px;
      height: 8px;
      content: "";
      background-color: #36c5f4;
      border-radius: 50%;
    }
  }
}
</style>
