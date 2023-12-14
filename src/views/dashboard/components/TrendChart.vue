<template>
  <div
    ref="dateTrend"
    :style="{ height: `${boxHeight - 40}px`, width: '100%' }"
  >
    ss
  </div>
</template>
<script setup lang="ts">
import * as echarts from "echarts";

let chart: echarts.ECharts | null = null;

const chartInits = async () => {
  const option = {
    title: {
      text: "数据趋势",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#366ff4",
        },
      },
    },
    legend: {
      data: ["利润", "打款", "渠道结算", "下发", "成本"],
      right: 0,
    },
    grid: {
      left: "0",
      right: "1%",
      bottom: "0",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["1号", "2号", "3号", "4号", "5号", "6号", "7号"],
        axisLine: {
          lineStyle: {
            color: "#F3F5F5",
            width: 4,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#999",
          fontSize: 14,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          lineStyle: {
            color: "#F3F5F5",
            type: "dashed",
          },
        },
        axisLabel: {
          color: "#999",
          fontSize: 14,
        },
      },
    ],
    series: [
      {
        name: "利润",
        type: "line",
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(54,111,243,0.3)",
            },
            {
              offset: 1,
              color: "rgba(54,111,243,0.01)",
            },
          ]),
        },
        lineStyle: {
          color: "#366ff4",
        },
        smooth: true,
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      // {
      //   name: "Union Ads",
      //   type: "line",
      //   areaStyle: {},
      // 	smooth: true,
      //   emphasis: {
      //     focus: "series",
      //   },
      //   data: [220, 182, 191, 234, 290, 330, 310],
      // },
      // {
      //   name: "Video Ads",
      //   type: "line",
      //   areaStyle: {},
      // 	smooth: true,
      //   emphasis: {
      //     focus: "series",
      //   },
      //   data: [150, 232, 201, 154, 190, 330, 410],
      // },
      // {
      //   name: "Direct",
      //   type: "line",
      //   areaStyle: {},
      // 	smooth: true,
      //   emphasis: {
      //     focus: "series",
      //   },
      //   data: [320, 332, 301, 334, 390, 330, 320],
      // },
      // {
      //   name: "Search Engine",
      //   type: "line",
      //   areaStyle: {},
      // 	smooth: true,
      //   emphasis: {
      //     focus: "series",
      //   },
      //   data: [820, 932, 901, 934, 1290, 1330, 1320],
      // },
    ],
  };
  chart.setOption(option);
};
let boxHeight = ref(0);
const dateTrend = ref<HTMLDivElement>();
onMounted(() => {
  const { bottom } = (dateTrend as any).value.getBoundingClientRect();
  boxHeight.value =
    window.innerHeight - bottom < 356 ? 356 : window.innerHeight - bottom;
  nextTick(() => {
    chart = echarts.init(dateTrend.value as HTMLDivElement);
    chartInits();
    // 大小自适应
    window.addEventListener("resize", () => {
      chart.resize();
    });
  });
});
</script>
