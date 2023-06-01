<template>
  <div class="top">
    <el-card class="top-item">
      <div class="top-item-title">净收入</div>
      <div class="top-item-money">{{ total_fee_amount }}</div>
    </el-card>
    <el-card class="top-item">
      <div class="top-item-title">打款金额</div>
      <div class="top-item-money">{{ total_payment_amount }}</div>
    </el-card>
    <el-card class="top-item">
      <div class="top-item-title">下发金额</div>
      <div class="top-item-money">{{ total_channel_amount }}</div>
    </el-card>
  </div>
  <div class="time">
    <div class="title">
      <div class="line"></div>
      <div>营收趋势图</div>
    </div>
    <div class="select">
      <el-button @click="changeType(1)">上周</el-button>
      <el-button @click="changeType(2)">本周</el-button>
      <el-button @click="changeType(3)">上月</el-button>
      <el-button @click="changeType(4)">本月</el-button>
    </div>
  </div>
  <div id="main" ref="chart"></div>
</template>

<script lang="ts" setup>
import { getFinanceList } from "@/api/money";
import * as echarts from "echarts";

// 1 2 3 4
const time_type = ref(3);

const total_channel_amount = ref();
const total_fee_amount = ref();
const total_payment_amount = ref();

function get3And1List() {
  // 时间类型 1本周 2上周 3本月 4上月
  let params = {
    time_type: time_type.value,
  };
  getFinanceList(params).then((res) => {
    console.log(res);
    total_channel_amount.value = res.data.total_channel_amount;
    total_fee_amount.value = res.data.total_fee_amount;
    total_payment_amount.value = res.data.total_payment_amount;

    options.value.xAxis.data = res.data?.income.map((item) => item.date_time);
    options.value.series[0].data = res.data?.income.map((item) => item.amount);
    chart.value?.clear();
    chart.value?.setOption(options.value);
  });
}

function changeType(type: number) {
  time_type.value = type;
  get3And1List();
}

const chart = ref({} as any);

const options = ref({
  title: {
    // text: "Stacked Line",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    orient: "horizontal", // 垂直方向显示
    left: "left", // 距离左侧距离
    data: [
      {
        name: "收入",
      },
    ],
  },
  grid: {
    left: "0%",
    right: "10%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
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
  ],
});

onMounted(() => {
  nextTick(() => {
    // 图表初始化
    chart.value = echarts.init(
      document.getElementById("main") as HTMLDivElement
    );

    // 大小自适应
    window.addEventListener("resize", () => {
      chart.resize();
    });
  });
});
get3And1List();
</script>

<style scoped lang="scss">
#main {
  width: 90vw;
  height: 500px;
}

.top {
  display: flex;
  gap: 0 16px;
  margin: 20px 0 30px;

  &-item {
    width: 272px;
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
  width: 85%;
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
