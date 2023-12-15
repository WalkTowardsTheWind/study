<template>
  <div
    ref="dateTrend"
    :style="{ height: `${boxHeight - 40}px`, width: '100%' }"
  ></div>
</template>
<script setup lang="ts">
import * as echarts from "echarts";
const props = defineProps({
  arrData: {
    type: Array,
    default: () => [],
  },
});

let chart: echarts.ECharts | null = null;
watch(
  () => props.arrData,
  (val) => {
    const XData = [];
    const profit = [];
    const totalAmount = [];
    const commissionTotal = [];
    const totalSettlementAmount = [];
    const totalCostAmount = [];
    val.forEach((it) => {
      XData.push(it.date_time);
      profit.push(it.amount[0]);
      totalAmount.push(it.amount[1]);
      commissionTotal.push(it.amount[2]);
      totalSettlementAmount.push(it.amount[3]);
      totalCostAmount.push(it.amount[4]);
    });

    const option = {
      title: {
        text: "数据趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#356FF3",
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
            color: "#999",
            fontSize: 14,
            rotate: -15,
            showMaxLabel: false,
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
          smooth: true,
          emphasis: {
            focus: "series",
          },
          lineStyle: {
            color: "#356FF3",
          },
          data: profit,
        },
        {
          name: "打款",
          type: "line",
          showSymbol: false,
          smooth: true,
          emphasis: {
            focus: "series",
          },
          data: totalAmount,
        },
        {
          name: "渠道结算",
          type: "line",
          showSymbol: false,
          smooth: true,
          emphasis: {
            focus: "series",
          },
          data: commissionTotal,
        },
        {
          name: "下发",
          type: "line",
          showSymbol: false,
          smooth: true,
          emphasis: {
            focus: "series",
          },
          data: totalSettlementAmount,
        },
        {
          name: "成本",
          type: "line",
          showSymbol: false,
          smooth: true,
          emphasis: {
            focus: "series",
          },
          lineStyle: {
            color: "#36C5F3",
          },
          data: totalCostAmount,
        },
      ],
    };
    chart?.setOption(option);
  }
);

let boxHeight = ref(0);
const dateTrend = ref<HTMLDivElement>();
onMounted(() => {
  const { bottom } = (dateTrend as any).value.getBoundingClientRect();
  boxHeight.value =
    window.innerHeight - bottom < 356 ? 356 : window.innerHeight - bottom;
  nextTick(() => {
    chart = echarts.init(dateTrend.value as HTMLDivElement);
    // 大小自适应
    window.addEventListener("resize", () => {
      chart.resize();
    });
  });
});
</script>
