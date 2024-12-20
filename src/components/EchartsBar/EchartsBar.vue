<template>
  <div
    ref="dateTrend"
    :style="{ height: `${boxHeight - 40}px`, width: '100%' }"
  ></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

// 定义组件的props
const props = defineProps({
  arrData: {
    type: Array,
    default: () => [],
  },
});

// 存储图表实例
let chart: echarts.ECharts | null = null;

// 监听arrData变化
watch(
  () => props.arrData,
  (val) => {
    const { XData, profit, gradientList } = processData(val);
    const option = getChartOption(XData, profit, gradientList);

    chart?.setOption(option);
  }
);
//
function generateGradients(
  gradientConfig: { direction: string; startColor: string; endColor: string }[]
) {
  const gradientList: echarts.types.Color[] = [];

  gradientConfig.forEach((config) => {
    let x0 = 0,
      y0 = 0,
      x1 = 0,
      y1 = 0;

    // 根据direction的不同，设置渐变的方向
    switch (config.direction) {
      case "left":
        x0 = 1;
        y0 = 0;
        x1 = 0;
        y1 = 0; // 从右到左
        break;
      case "right":
        x0 = 0;
        y0 = 0;
        x1 = 1;
        y1 = 0; // 从左到右
        break;
      case "top":
        x0 = 0;
        y0 = 0;
        x1 = 0;
        y1 = 1; // 从上到下
        break;
      case "bottom":
        x0 = 0;
        y0 = 1;
        x1 = 0;
        y1 = 0; // 从下到上
        break;
      default:
        console.warn(
          `Invalid direction: ${config.direction}. Defaulting to 'top'.`
        );
        x0 = 0;
        y0 = 0;
        x1 = 0;
        y1 = 1; // 默认为从上到下
    }

    // 创建渐变色对象
    const gradient = new echarts.graphic.LinearGradient(x0, y0, x1, y1, [
      { offset: 0, color: config.startColor }, // 起始颜色
      { offset: 1, color: config.endColor }, // 结束颜色
    ]);

    // 将生成的渐变色推送到gradientList
    gradientList.push(gradient);
  });

  return gradientList;
}

// // 示例调用
// const gradientConfig = [
//   { direction: 'top', startColor: '#f40', endColor: '#fff' },
//   { direction: 'top', startColor: '#000', endColor: '#fff' },
//   { direction: 'top', startColor: 'blue', endColor: '#fff' },
//   { direction: 'top', startColor: 'pink', endColor: '#fff' },
// ];

// const gradientList = generateGradients(gradientConfig);
// console.log(gradientList);

// 数据处理函数
function processData(arrData: Array<any>) {
  const XData: string[] = [];
  const profit: number[] = [1, 2, 3, 4];
  const colorList: string[] = []; // 用来存储每个数据项的颜色
  var gradientList: [] = []; // 用来存储每个数据项的渐变色

  arrData.forEach((it) => {
    XData.push(it.date_time);
    profit.push(it.amount[0]);
    gradientList = generateGradients([
      { direction: "top", startColor: "#f40", endColor: "#fff" },
      { direction: "top", startColor: "#000", endColor: "#fff" },
      { direction: "top", startColor: "blue", endColor: "#fff" },
      { direction: "top", startColor: "pink", endColor: "#fff" },
    ]);
  });

  return { XData, profit, colorList, gradientList };
}

// 获取ECharts图表配置
function getChartOption(XData: string[], profit: number[], gradientList: []) {
  return {
    title: {
      text: "数据趋势",
      top: "0",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "pink",
        },
      },
    },
    legend: {
      data: ["健康1"],
      right: 0,
    },
    grid: {
      left: "8%", // 增加左侧间距
      right: "5%",
      bottom: "0",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        data: XData,
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
          color: "#f40",
          fontSize: 14,
          rotate: 0,
          showMaxLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          lineStyle: {
            color: "#000",
            type: "dashed",
          },
        },
        axisLabel: {
          color: "red",
          fontSize: 14,
        },
      },
    ],
    series: [
      {
        name: "健康1",
        type: "bar", // 改为柱状图
        barWidth: "20", // 设置柱子的宽度
        data: profit,
        itemStyle: {
          color: (params: any) => {
            // 为每个柱状图使用不同的颜色
            return gradientList[params.dataIndex]; // 根据索引返回颜色
          },
        },
      },
    ],
  };
}

let boxHeight = ref(0);
const dateTrend = ref<HTMLDivElement>();

// 页面加载完成后，初始化echarts实例
onMounted(() => {
  const { bottom } = (dateTrend as any).value.getBoundingClientRect();
  boxHeight.value =
    window.innerHeight - bottom < 356 ? 356 : window.innerHeight - bottom;

  nextTick(() => {
    chart = echarts.init(dateTrend.value as HTMLDivElement);
    window.addEventListener("resize", () => {
      chart.resize();
    });
  });
});
</script>
