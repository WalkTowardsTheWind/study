<template>
  <div
    ref="dateTrend"
    :style="{ height: `${boxHeight - 40}px`, width: '100%' }"
  ></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted, watch, nextTick } from "vue";

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
    if (chart) {
      // 确保图表实例已存在
      const { XData, profit, gradientList } = processData(val);
      const option = getChartOption(XData, profit, gradientList);
      chart.setOption(option); // 更新图表配置
    }
  },
  { immediate: true } // 初次加载时也会触发
);

// 生成渐变色
function generateGradient(
  direction: string,
  startColor: string,
  endColor: string
): echarts.graphic.LinearGradient {
  let x0 = 0,
    y0 = 0,
    x1 = 0,
    y1 = 0;

  // 根据direction的不同，设置渐变的方向
  switch (direction) {
    case "right":
      x0 = 1;
      y0 = 0;
      x1 = 0;
      y1 = 0; // 从右到左
      break;
    case "left":
      x0 = 0;
      y0 = 0;
      x1 = 1;
      y1 = 0; // 从左到右
      break;
    case "bottom":
      x0 = 0;
      y0 = 0;
      x1 = 0;
      y1 = 1; // 从上到下
      break;
    case "top":
      x0 = 0;
      y0 = 1;
      x1 = 0;
      y1 = 0; // 从下到上
      break;
    default:
      console.warn(`Invalid direction: ${direction}. Defaulting to 'top'.`);
      x0 = 0;
      y0 = 0;
      x1 = 0;
      y1 = 1; // 默认为从上到下
  }

  // 创建并返回渐变色对象
  return new echarts.graphic.LinearGradient(x0, y0, x1, y1, [
    { offset: 0, color: startColor }, // 起始颜色
    { offset: 1, color: endColor }, // 结束颜色
  ]);
}

// 数据处理函数
function processData(arrData: Array<any>) {
  const XData: string[] = [];
  const profit: number[] = [];
  const gradientList: echarts.graphic.LinearGradient[] = []; // 用来存储每个数据项的渐变色

  arrData.forEach((it) => {
    XData.push(it.date_time);
    profit.push(it.amount[0]);
    gradientList.push(
      generateGradient(it.direction, it.startColor, it.endColor)
    );
  });

  return { XData, profit, gradientList };
}

// 获取ECharts图表配置
function getChartOption(
  XData: string[],
  profit: number[],
  gradientList: echarts.graphic.LinearGradient[]
) {
  return {
    title: {
      text: "健康",
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
    // legend: {
    //   data: ["健康1"],
    //   right: 0,
    // },
    grid: {
      left: "1%", // 增加左侧间距
      right: "5%",
      bottom: "0",
      containLabel: true,
    },
    xAxis: [
      {
        name: "x",
        nameLocation: "end", // 名称显示在坐标轴的结束位置
        nameGap: 20, // 坐标轴名称与坐标轴的间距
        nameRotate: 45, // 坐标轴名称旋转45度
        type: "category",
        boundaryGap: ["20%", "20%"], // 两端留白20% true 表示两端有间隔。false 表示两端没有间隔。
        data: XData,
        axisLine: {
          // show:true,
          lineStyle: {
            color: "#000",
            width: 2,
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true, // 刻度线与标签对齐
        },
        //         show: 是否显示标签，默认值为 true。
        // rotate: 标签的旋转角度。
        // formatter: 用于格式化刻度标签的函数。
        // interval: 控制标签的显示间隔。
        // align: 标签对齐方式。
        // verticalAlign: 标签垂直对齐方式。
        axisLabel: {
          color: "#f40",
          fontSize: 14,
          rotate: 0,
          showMaxLabel: true,
          //       formatter: '{value}年',  // 标签格式化
          // interval: 0,  // 强制显示所有标签
        },
        splitArea: {
          show: false, //是否显示区域背景。
          areaStyle: {
            color: ["#f2f2f2", "#e6e6e6"],
          }, //区域背景的样式配置。
        },
      },
    ],
    yAxis: [
      {
        name: "y",
        nameLocation: "end", // 名称显示在坐标轴的结束位置
        nameGap: 20, // 坐标轴名称与坐标轴的间距
        nameRotate: 45, // 坐标轴名称旋转45度
        type: "value",
        // 设置坐标轴指示器（用于提示数据的提示框指示）。
        axisPointer: {
          show: true,
          type: "shadow", // 坐标轴指示器类型
        },
        axisLine: {
          show: true, // 显示 X 轴坐标线
          lineStyle: {
            color: "#000", // 设置坐标线颜色
            width: 2, // 设置坐标线宽度
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true, // 刻度线与标签对齐
        },

        splitLine: {
          show: false, // 显示分隔线
          lineStyle: {
            color: "#ccc", // 颜色
            type: "dashed", // 虚线
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
        name: "健康",
        type: "bar", // 改为柱状图
        barWidth: "20", // 设置柱子的宽度
        data: profit,
        itemStyle: {
          color: (params: any) => {
            // 为每个柱状图使用不同的颜色
            return gradientList[params.dataIndex]; // 根据索引返回颜色
          },
        },
        emphasis: {
          focus: "self", // 鼠标悬浮时，突出显示整个系列（而非单个柱状图）
        },
        animation: true, // 开启动画
        animationEasing: "cubicIn", // 动画效果，支持多种效果（'linear', 'quadraticIn', 'quadraticOut'等）
        animationDuration: 1000, // 动画持续时间（单位：ms）
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

    // 确保图表实例已初始化时再绑定 resize 事件
    window.addEventListener("resize", () => {
      chart.resize();
    });

    // 处理初始数据
    if (props.arrData.length > 0) {
      const { XData, profit, gradientList } = processData(props.arrData);
      const option = getChartOption(XData, profit, gradientList);
      chart.setOption(option);
    }
  });
});
</script>
