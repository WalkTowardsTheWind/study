<template>
  <div id="main"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";

const options = {
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
      {
        name: "支出",
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
    data: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
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
      data: [120, 132, 101, 134, 90, 230, 310],
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
      stack: "stack",
      data: [120, 132, 191, 234, 290, 130, 310],
      showSymbol: false,
      smooth: true,
      itemStyle: {
        color: "#36c5f4", // 折线颜色
        symbol: "circle", // 圆点标记
        symbolSize: 10, // 圆点大小
        lineStyle: {
          width: 1, // 折线宽度
        },
      },
    },
  ],
};

onMounted(() => {
  // 图表初始化
  const chart = echarts.init(document.getElementById("main") as HTMLDivElement);
  chart.setOption(options);

  // 大小自适应
  window.addEventListener("resize", () => {
    chart.resize();
  });
});
</script>

<style scoped>
#main {
  width: 80vw;
  height: 500px;
}
</style>
