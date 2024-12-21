<template>
  <div>bar 柱状图</div>
</template>

<style scoped lang="scss"></style>
<script setup lang="ts">
// var series=[
//   {
//     name: '系列名称', // 系列名称，用于 tooltip 和 legend 显示
//     type: 'bar', // 图表类型：bar 是柱状图，line 是折线图，pie 是饼图等
//     barWidth: 'auto', // 设置柱子的宽度，可以是数值（比如像素）或百分比
//     barMaxWidth: 50, // 设置最大宽度，防止柱子过宽，特别是在数据量大的时候
//     barGap: '30%', // 同一类别之间的间距，可以是百分比，默认是 30%
//     barCategoryGap: '20%', // 柱状图类别之间的间距，同一类别的柱子之间的间距

//     data: [120, 200, 150, 80, 70, 110, 130], // 数据项，按顺序对应每个柱子的高度
//     itemStyle: {
//       // 柱状图样式配置
//       normal: {
//         // 默认状态下的样式
//         color: '#3398DB', // 单个柱子颜色，支持颜色值、渐变色、图片等
//         borderColor: '#fff', // 柱子边框颜色
//         borderWidth: 2, // 边框宽度
//         shadowBlur: 10, // 阴影模糊程度
//         shadowColor: 'rgba(0, 0, 0, 0.5)', // 阴影颜色
//         shadowOffsetX: 0, // 阴影横向偏移量
//         shadowOffsetY: 0, // 阴影纵向偏移量
//       },
//       emphasis: {
//         // 鼠标悬浮时的样式
//         color: 'orange', // 悬浮时柱子的颜色
//         borderColor: '#000', // 悬浮时的边框颜色
//         borderWidth: 3, // 悬浮时的边框宽度
//         shadowBlur: 15, // 悬浮时的阴影模糊度
//         shadowColor: 'rgba(0, 0, 0, 0.8)', // 悬浮时的阴影颜色
//         shadowOffsetX: 5, // 悬浮时的阴影横向偏移
//         shadowOffsetY: 5, // 悬浮时的阴影纵向偏移
//       },
//       // 每个柱子的渐变色
//       color: (params) => {
//         // 根据不同的值设置不同的颜色
//         const colorList = ['#ff0', '#f40', '#f00', '#0f0', '#00f'];
//         return colorList[params.dataIndex % colorList.length];
//       },
//     },

//     label: {
//       // 数据标签配置
//       show: true, // 是否显示数据标签
//       position: 'top', // 数据标签的位置，可选值：'top', 'inside', 'outside', 'left', 'right'
//       distance: 5, // 数据标签与柱子之间的距离
//       formatter: '{c}', // 数据标签显示的内容，{c}表示值，{b}表示类目名
//       fontSize: 14, // 字体大小
//       fontWeight: 'bold', // 字体粗细
//       color: '#fff', // 字体颜色
//       backgroundColor: '#000', // 背景颜色
//       padding: [5, 10], // 标签的内边距
//       borderRadius: 5, // 标签的边框圆角
//       shadowColor: '#000', // 阴影颜色
//       shadowBlur: 10, // 阴影模糊程度
//     },

//     // 点击柱子时的动作
//     clickable: true, // 是否支持点击
//     triggerEvent: true, // 启用事件触发

//     // 可以显示参考线、参考点等标记
//     markLine: {
//       // 在柱状图上添加一条参考线
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
//       // 在柱状图上添加标记点
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

//     // 图形高亮样式
//     emphasis: {
//       focus: 'series', // 鼠标悬浮时，突出显示整个系列（而非单个柱状图）
//     },

//     // 鼠标触发时的动画效果
//     animation: true, // 开启动画
//     animationEasing: 'cubicInOut', // 动画效果，支持多种效果（'linear', 'quadraticIn', 'quadraticOut'等）
//     animationDuration: 1000, // 动画持续时间（单位：ms）
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
