<template>
  <div>line 折线图</div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
// series: [
//   {
//     name: '系列名称', // 系列名称，用于 tooltip 和 legend 显示
//     type: 'line', // 图表类型：line 是折线图，bar 是柱状图，pie 是饼图等
//     smooth: true, // 是否平滑曲线，设置为 true 时为平滑曲线，false 为直线
//     symbol: 'circle', // 数据点的形状，可选值：'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'等
//     symbolSize: 8, // 数据点的大小，数字越大，点越大
//     showSymbol: true, // 是否显示数据点
//     lineStyle: {
//       // 线条样式
//       normal: {
//         color: '#ff0000', // 线条的颜色
//         width: 2, // 线条的宽度
//         type: 'solid', // 线条类型：'solid', 'dashed', 'dotted'
//       },
//     },

//     itemStyle: {
//       // 数据点的样式
//       normal: {
//         color: '#ff0000', // 数据点的颜色
//         borderColor: '#fff', // 数据点的边框颜色
//         borderWidth: 2, // 数据点的边框宽度
//         shadowBlur: 10, // 数据点的阴影模糊程度
//         shadowColor: 'rgba(0, 0, 0, 0.5)', // 数据点阴影的颜色
//       },
//     },

//     label: {
//       // 数据标签配置
//       show: true, // 是否显示数据标签
//       position: 'top', // 数据标签的位置，可选值：'top', 'inside', 'outside', 'left', 'right'
//       distance: 5, // 数据标签与数据点的距离
//       formatter: '{c}', // 数据标签显示的内容，{c}表示数据值，{b}表示类目
//       fontSize: 14, // 字体大小
//       fontWeight: 'bold', // 字体粗细
//       color: '#fff', // 字体颜色
//       backgroundColor: '#000', // 背景颜色
//       padding: [5, 10], // 标签的内边距
//       borderRadius: 5, // 标签的边框圆角
//     },

//     data: [120, 200, 150, 80, 70, 110, 130], // 数据项，按顺序对应每个点的值
//     markLine: {
//       // 在折线图上添加一条参考线
//       data: [
//         { type: 'average', name: '平均值' }, // 平均值线
//         { xAxis: 2, yAxis: 200, name: '某个值' }, // 固定位置的参考线
//       ],
//       label: {
//         position: 'end', // 标注的位置
//       },
//       lineStyle: {
//         color: 'red', // 参考线颜色
//         type: 'dashed', // 参考线类型（实线，虚线）
//         width: 2, // 参考线宽度
//       },
//     },

//     markPoint: {
//       // 在折线图上添加标记点
//       data: [
//         {
//           type: 'max', // 标记最大值
//           name: '最大值',
//           itemStyle: {
//             color: '#FF0000', // 标记点颜色
//           },
//         },
//         {
//           type: 'min', // 标记最小值
//           name: '最小值',
//           itemStyle: {
//             color: '#00FF00', // 标记点颜色
//           },
//         },
//       ],
//     },

//     areaStyle: {
//       // 区域填充样式，仅在平滑曲线时有效
//       normal: {
//         color: 'rgba(0, 0, 255, 0.1)', // 填充区域的颜色
//         opacity: 0.3, // 填充区域的透明度
//       },
//     },

//     emphasis: {
//       // 鼠标悬浮时的高亮样式
//       focus: 'series', // 鼠标悬浮时，突出显示整个系列（而非单个点）
//       itemStyle: {
//         color: 'yellow', // 悬浮时点的颜色
//       },
//       label: {
//         show: true, // 悬浮时显示标签
//         color: '#000', // 标签的颜色
//       },
//     },

//     animation: true, // 开启动画
//     animationDuration: 1000, // 动画的持续时间（单位：ms）
//     animationEasing: 'cubicInOut', // 动画的缓动效果，支持多种效果（'linear', 'quadraticIn', 'quadraticOut'等）
//     animationDelay: 0, // 动画延迟时间
//   }
// ]

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
