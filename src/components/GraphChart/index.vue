<template>
  <div ref="graphChart" style="width: 100%; height: 500px"></div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

interface GraphNode {
  name: string;
  category?: number;
  draggable: boolean;
  symbol: string;
}

interface GraphLink {
  source: number;
  target: number;
  value: string;
  lineStyle: {
    color: string;
  };
}

export default {
  name: "GraphChart",
  setup() {
    const graphChart = ref<HTMLDivElement | null>(null); // 图表容器的引用

    onMounted(() => {
      if (!graphChart.value) return;

      // 初始化 ECharts 实例
      const myChart = echarts.init(graphChart.value);

      // 图表配置
      const option = {
        title: {
          text: "",
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        label: {
          show: true,
          fontSize: 12,
        },
        legend: {
          x: "center",
          show: true,
          data: ["夫妻", "战友", "亲戚", "子女", "表亲", "叔叔"],
        },
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 45,
            emphasis: {
              focus: "adjacency",
            },
            roam: true,
            categories: [
              {
                name: "夫妻",
                itemStyle: {
                  color: "#009800",
                },
              },
              {
                name: "战友",
                itemStyle: {
                  color: "#4592FF",
                },
              },
              {
                name: "亲戚",
                itemStyle: {
                  color: "#3592F",
                },
              },
              {
                name: "子女",
                itemStyle: {
                  color: "#3592F",
                },
              },
              {
                name: "表亲",
                itemStyle: {
                  color: "#3592F",
                },
              },
              {
                name: "叔叔",
                itemStyle: {
                  color: "#3592F",
                },
              },
            ],
            label: {
              show: true,
              position: "bottom", // 设置文字显示在图片下方
              fontSize: 12,
              align: "center", // 文字居中
              verticalAlign: "middle", // 文字垂直居中
            },
            force: {
              repulsion: 1000,
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
              show: true,
              fontSize: 10,
              formatter: "{c}",
            },
            symbol:
              "image://data:image/jpeg;base64,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",
            data: [
              {
                name: "赵成",
                category: 1,
                draggable: true,
              },
              {
                name: "陈现忠",
                category: 1,
                draggable: true,
              },
              {
                name: "陶泳",
                category: 1,
                draggable: true,
              },
              {
                name: "王德福",
                category: 1,
                draggable: true,
              },
              {
                name: "徐贱云",
                draggable: true,
              },
              {
                name: "冯可梁",
                category: 1,
                draggable: true,
                // 节点2为图片
              },
              {
                name: "邓志荣",
                category: 1,
                draggable: true,
              },
              {
                name: "李荣庆",
                category: 1,
                draggable: true,
              },
              {
                name: "郑志勇",
                category: 1,
                draggable: true,
              },
              {
                name: "赵英杰",
                category: 1,
                draggable: true,
              },
              {
                name: "王承军",
                category: 1,
                draggable: true,
              },
              {
                name: "陈卫东",
                category: 1,
                draggable: true,
              },
              {
                name: "邹劲松",
                category: 1,
                draggable: true,
              },
            ] as GraphNode[], // 类型注解
            links: [
              {
                source: 0,
                target: 1,
                category: 0,
                value: "夫妻",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 0,
                target: 2,
                value: "子女",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 0,
                target: 3,
                value: "夫妻",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 0,
                target: 4,
                value: "父母",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 1,
                target: 2,
                value: "表亲",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 0,
                target: 5,
                value: "朋友",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 4,
                target: 5,
                value: "朋友",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 2,
                target: 8,
                value: "叔叔",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 0,
                target: 12,
                value: "朋友",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 6,
                target: 11,
                value: "爱人",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 6,
                target: 3,
                value: "朋友",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 7,
                target: 5,
                value: "朋友",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 9,
                target: 10,
                value: "朋友",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 3,
                target: 10,
                value: "朋友",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 10,
                target: 12,
                value: "朋友",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
              {
                source: 2,
                target: 11,
                value: "同学",
                lineStyle: {
                  color: "#00FF00", // 连接线颜色为绿色
                },
              },
            ] as GraphLink[], // 类型注解
            lineStyle: {
              opacity: 0.9,
              width: 1,
              curveness: 0,
            },
          },
        ],
      };

      // 设置图表配置项
      myChart.setOption(option as any);

      // 监听窗口resize事件
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    });

    return {
      graphChart,
    };
  },
};
</script>

<style scoped>
/* 根据需要自定义样式 */
</style>
