<template>
  <div>bar 柱状图</div>
</template>

<style scoped lang="scss"></style>
<script setup lang="ts">
const option = {
  // title — 标题
  // text: 主标题内容
  // subtext: 副标题内容
  // left: 主标题位置，支持 'center'、'left'、'right'、'auto'、百分比和像素值
  // top: 主标题垂直位置，支持 'top'、'middle'、'bottom' 等
  title: {
    text: "月度销售情况",
    subtext: "2024年",
    left: "center",
    top: "10px",
    textStyle: {
      color: "#333",
      fontSize: 18,
      fontWeight: "bold",
    },
  },
  // tooltip — 提示框
  // trigger: 触发类型，'item'（根据项触发）或者'axis'（根据坐标轴触发）
  // formatter: 自定义提示框内容，{b}表示数据项名称，{c}表示数据值，{a}表示系列名称等
  // backgroundColor: 背景颜色
  // borderColor: 边框颜色
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} units", // {b}为分类，{c}为数值
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },

  // legend — 图例
  // data: 图例的项数组，通常是系列名称
  // left / right / top / bottom: 图例的位置
  // orient: 图例排列方式，'horizontal'（水平）或 'vertical'（垂直）
  // itemWidth / itemHeight: 图例标识的宽度和高度
  legend: {
    data: ["2024年", "2023年"],
    left: "left",
    top: "top",
    itemWidth: 10,
    itemHeight: 10,
  },
  // grid — 网格
  // left, right, top, bottom: 网格距离容器的距离（百分比或像素）
  // containLabel: 是否包含坐标轴标签（设置为 true 时，图表会自动调整以确保标签完整显示）
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  // xAxis / yAxis — 坐标轴
  // type: 坐标轴的类型，'category'（类目轴），'value'（数值轴），'log'（对数轴），'time'（时间轴）
  // data: 类目轴的刻度数据（仅 type: 'category' 时有效）
  // axisLabel: 刻度标签的设置，包括 rotate（旋转角度）、formatter（格式化标签）
  // axisLine: 坐标轴线设置，包括 show（是否显示）和 lineStyle（线条样式）
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    axisLabel: {
      rotate: 45, // 标签旋转
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#ccc",
      },
    },
  },

  yAxis: {
    type: "value",
    axisLine: {
      show: false,
    },
    axisLabel: {
      formatter: "{value} units",
    },
  },
  // series — 系列
  // series 是一个数组，包含多个数据系列。每个系列的配置项可以指定如下：
  // name: 系列名称
  // type: 图表类型，'bar' 表示柱状图
  // data: 数据项，必须是一个数组
  // itemStyle: 数据项的样式，包括 color（柱子颜色）、borderColor（边框颜色）、borderWidth（边框宽度）等
  // barWidth: 设置柱状图的柱宽，百分比或像素值
  // barGap: 设置不同系列之间的间隔
  // label: 标签的配置
  // show: 是否显示标签
  // position: 标签位置，'top'、'inside'、'bottom'等
  // formatter: 标签的格式化方式
  series: [
    {
      name: "2024年",
      type: "bar",
      data: [150, 230, 224, 218, 135, 147],
      itemStyle: {
        color: "#ff5733",
      },
      barWidth: "50%",
      label: {
        show: true,
        position: "top",
        formatter: "{c} units",
      },
    },
  ],
};
</script>
