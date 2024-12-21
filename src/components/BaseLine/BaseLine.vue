<template>
  <div
    ref="dateTrend"
    :style="{ height: `${boxHeight}px`, width: '100%' }"
  ></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted, watch, nextTick } from "vue";

const props = defineProps({
  arrData: {
    type: Array,
    default: () => [],
  },
  threshold: {
    type: Number,
    default: null,
  },
  range: {
    type: Array,
    default: null,
  },
});

// Store chart instance
let chart: echarts.ECharts | null = null;

// Watch for changes in arrData and threshold
watch(
  () => props.arrData,
  (val) => {
    if (chart && val && val.length > 0) {
      const { XData, YData } = processData(val);
      const option = getChartOption(XData, YData, props.threshold, props.range);
      chart.setOption(option);
    }
  },
  { immediate: true }
);
function processData(arrData: Array<any>) {
  const XData: string[] = [];
  const YData: number[] = [];

  arrData.forEach((it) => {
    XData.push(it.date_time);
    YData.push(it.amount);
  });

  return { XData, YData };
}

// Get chart options with dynamic threshold
function getChartOption(
  XData: string[],
  YData: number[],
  threshold: number | null,
  range: [] | null
) {
  const option: echarts.EChartOption = {
    title: {
      text: "健康数据趋势",
      top: "0",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        label: {
          backgroundColor: "pink",
        },
      },
    },
    grid: {
      left: "0",
      right: "0",
      bottom: "0",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: ["10%", "10%"], // 两端留白
        data: XData,
        axisLine: {
          lineStyle: {
            color: "#000",
            width: 1,
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
        },
        axisLabel: {
          color: "#f40",
          fontSize: 14,
          rotate: 0,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisPointer: {
          show: false,
          type: "shadow",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#000",
            width: 1,
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: "red",
          fontSize: 14,
        },
      },
    ],
    series: [
      {
        name: "健康数据",
        type: "line",
        smooth: 0,
        data: YData,
        emphasis: {
          focus: "series", // Focus on the series when hovering
        },
        animation: true,
        animationEasing: "cubicIn",
        animationDuration: 1000,
      },
    ],
  };
  if (Number(threshold)) {
    option.visualMap = {
      show: false,
      pieces: [
        {
          min: Math.min(...YData),
          max: Number(threshold),
        },
        {
          min: Number(threshold),
          max: Math.max(...YData),
        },
      ],
      inRange: {
        color: ["pink", "red"], // 阈值以下为红色，阈值以上为蓝色
      },
    };
    option.series.forEach(
      (i: any) =>
        (i.markLine = {
          data: threshold
            ? [
                {
                  yAxis: threshold, // Use threshold value if provided
                  label: {
                    show: true,
                    position: "end",
                    formatter: `阀值线: ${threshold}`,
                    offset: [-80, -15], // Adjust label position
                  },
                  lineStyle: {
                    color: "red",
                    width: 1,
                    type: "dashed",
                  },
                  silent: true,
                  emphasis: {
                    label: {
                      show: true,
                    },
                    lineStyle: {
                      color: "red",
                      width: 1,
                      type: "dashed",
                    },
                  },
                },
              ]
            : [], // If no threshold is provided, do not display the line
          symbol: "none",
          symbolSize: 2,
        })
    );
  }
  if (range?.length) {
    option.visualMap = {
      show: false,
      pieces: range,
      //  [{
      //           gt: 0,
      //           lte: 50,
      //           color: '#096'
      //       }, {
      //           gt: 50,
      //           lte: 100,
      //           color: '#ffde33'
      //       }, {
      //           gt: 100,
      //           lte: 150,
      //           color: '#ff9933'
      //       }, {
      //           gt: 150,
      //           lte: 200,
      //           color: '#cc0033'
      //       }, {
      //           gt: 200,
      //           lte: 300,
      //           color: '#660099'
      //       }, {
      //           gt: 300,
      //           color: '#7e0023'
      //       }],
      outOfRange: {
        color: "#999",
      },
    };
  }

  return option;
}

let boxHeight = ref(0);
const dateTrend = ref<HTMLDivElement>();

// Initialize chart on mounted
onMounted(() => {
  const { bottom } = (dateTrend as any).value.getBoundingClientRect();
  boxHeight.value =
    window.innerHeight - bottom < 356 ? 356 : window.innerHeight - bottom;

  nextTick(() => {
    chart = echarts.init(dateTrend.value as HTMLDivElement);

    // Ensure the chart resizes correctly
    window.addEventListener("resize", () => {
      chart?.resize();
    });

    // Process data if present
    if (props.arrData.length > 0) {
      const { XData, YData } = processData(props.arrData);
      const option = getChartOption(XData, YData, props.threshold, props.range);
      chart.setOption(option);
    }
  });
});
</script>
