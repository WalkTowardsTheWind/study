<!-- <template>
  <el-scrollbar wrap-class="scrollbar" :min-size="20" :always="true">
    <div
      ref="dateTrend"
      :style="{ height: `${boxHeight}px`, width: '2500px' }"
    ></div>
  </el-scrollbar>
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
// 字体大小
const fontSize = 14;
const itemLength = computed(() => props.arrData[0]?.date_time?.length);

// Watch for changes in arrData and threshold
watch(
  () => props.arrData,
  (val) => {
    if (chart && val && val.length > 0) {
      const { XData, YData } = processData(val);
      const option = getChartOption(XData, YData, props.threshold, props.range);
      chart.setOption(option);
      // 获取容器宽度
      const containerWidth = chart.getWidth();

      // 获取 X 轴的数量
      const xAxisDataCount = option.xAxis.data.length;

      // 计算每个 X 轴项的宽度
      const xAxisItemWidth = containerWidth / xAxisDataCount;

      // 计算总宽度
      const totalWidth = xAxisItemWidth * xAxisDataCount;

      console.log("X轴总宽度1:", totalWidth);
    }
  },
  { immediate: true }
);
function processData(arrData: Array<any>) {
  const XData: string[] = [];
  const YData: {}[] = [];

  arrData.forEach((it) => {
    XData.push(it.date_time);
    YData.push(it.val);
  });

  return { XData, YData };
}

function getChartOption(
  XData: string[],
  YData: number[],
  threshold: number | null,
  range: {}[] | null
) {
  const option: echarts.EChartOption = {
    title: {
      text: "健康数据趋势22",
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
      bottom: "15",
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
          fontSize: fontSize,
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
        lineStyle: {
          width: 2, // 线条的宽度
          type: "solid", // 线条类型：'solid', 'dashed', 'dotted'
        },
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
          max: 1000,
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
          symbolSize: 1,
        })
    );
  }
 else  if (range?.length) {
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
let boxWidth = ref(0);
const dateTrend = ref<HTMLDivElement>();

// Initialize chart on mounted
onMounted(() => {
  const { bottom } = (dateTrend as any).value.getBoundingClientRect();
  boxHeight.value =
    window.innerHeight - bottom < 356 ? 356 : window.innerHeight - bottom;

  // 计算总宽度
  boxWidth.value = 12 * fontSize * itemLength.value;

  console.log("X轴总宽度2:", boxWidth.value);

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

<style lang="scss">
.el-scrollbar {
  --el-scrollbar-opacity: 0.3;
  --el-scrollbar-bg-color: pink;
  --el-scrollbar-hover-opacity: 0.3;
  --el-scrollbar-hover-bg-color: #000;
  .el-scrollbar__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    &.is-horizontal {
      height: 2px;
      left: 18px;
      .el-scrollbar__thumb {
        height: 4px;
      }
    }
    &.is-horizontal {
      height: 2px;
      left: 18px;
      .el-scrollbar__thumb {
        height: 4px;
      }
    }
  }
}
</style> -->
