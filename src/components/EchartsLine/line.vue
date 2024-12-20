<template>
  <div>line 折线图</div>
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
    left: "center", // 标题位置
  },
  // tooltip — 提示框
  // trigger: 触发类型，'item'（根据项触发）或者 axis（根据坐标轴触发）
  // formatter: 自定义提示框内容，{b}表示数据项名称，{c}表示数据值，{a}表示系列名称等
  // backgroundColor: 背景颜色
  // borderColor: 边框颜色
  // borderWidth: 边框宽度
  tooltip: {
    trigger: "axis", // tooltip触发方式：'item' / 'axis'
    formatter: "{b}: {c}", // 提示框格式化
  },
  // legend — 图例
  // data: 图例项数组，通常是系列名称
  // left / right / top / bottom: 图例的位置
  // orient: 图例排列方式，'horizontal'（水平）或 'vertical'（垂直）
  // itemWidth / itemHeight: 图例标识的宽度和高度
  legend: {
    data: ["2024年", "2023年"], // 图例数据
    left: "left", // 图例位置
  },
  //grid — 网格
  // left, right, top, bottom: 网格距离容器的距离（百分比或像素）
  // containLabel: 是否包含坐标轴标签（设置为 true 时，图表会自动调整以确保标签完整显示）
  grid: {
    left: "3%", // grid 边距
    right: "4%",
    bottom: "3%",
    containLabel: true, // 是否包含刻度标签
  },
  // xAxis / yAxis — 坐标轴
  // type: 坐标轴的类型，'category'（类目轴），'value'（数值轴），'log'（对数轴），'time'（时间轴）
  // data: 类目轴的刻度数据（仅 type: 'category' 时有效）
  // axisLabel: 刻度标签的设置，包括 rotate（旋转角度）、formatter（格式化标签）
  // axisLine: 坐标轴线设置，包括 show（是否显示）和 lineStyle（线条样式）
  xAxis: {
    type: "category", // x 轴类型：'category' / 'value'
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // x 轴刻度
    axisLabel: {
      rotate: 45, // 标签旋转角度
    },
    axisLine: {
      show: true, // 是否显示轴线
      lineStyle: {
        color: "#ccc", // 轴线颜色
      },
    },
  },
  yAxis: {
    type: "value", // y 轴类型：'value' / 'category'
    axisLine: {
      show: false, // 不显示 y 轴的轴线
    },
    axisLabel: {
      formatter: "{value} units", // y 轴刻度标签格式化
    },
  },
  // series — 系列
  // series 是一个数组，包含多个数据系列。每个系列的配置项可以指定如下：

  // name: 系列名称
  // type: 图表类型，'line' 表示折线图
  // data: 数据项，必须是一个数组
  // itemStyle: 数据项的样式，包括 color（点的颜色）、borderColor（边框颜色）、borderWidth（边框宽度）等
  // lineStyle: 线条样式，包括 width（线条宽度）、type（线条类型：'solid'、'dashed'、'dotted'）等
  // smooth: 是否平滑曲线，true 表示平滑曲线，false 表示直线连接
  series: [
    {
      name: "2024年",
      type: "line", // 图表类型：折线图
      data: [150, 230, 224, 218, 135, 147], // 数据
      itemStyle: {
        color: "#ff5733", // 数据点的颜色
      },
      lineStyle: {
        width: 2, // 线条宽度
        type: "solid", // 线条样式：'solid' / 'dashed' / 'dotted'
      },
      label: {
        show: true, // 是否显示数据标签
        position: "top", // 标签位置：'top' / 'inside' / 'bottom'
        formatter: "{c}", // 标签内容
      },
      smooth: true, // 是否平滑曲线
    },
    {
      name: "2023年",
      type: "line",
      data: [130, 210, 220, 200, 180, 160],
      lineStyle: {
        color: "#4e73df",
        width: 2,
        type: "dashed", // 使用虚线
      },
      smooth: false, // 不平滑曲线
    },
  ],
  //   dataZoom — 数据缩放（适用于大数据量图表）
  // type: slider（滑动条）或者 inside（内部缩放）
  // start: 数据视图的起始比例，0-100
  // end: 数据视图的结束比例，0-100

  // color — 调色盘（设置多个系列的颜色）
  // color: 一个颜色数组，用于指定每个系列的颜色

  // axisPointer — 坐标轴指示器（用于提示数据）
  // show: 是否显示
  // type: 指示器的类型，'line'（线型指示器）、'shadow'（阴影指示器）
};
</script>
