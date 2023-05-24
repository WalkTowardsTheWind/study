<!-- 饼图 -->
<template>
  <div class="pie-chart" :style="{ width, height }">
    <div
      class="pie-chart-box"
      :id="id"
      :class="className"
      :style="{ height }"
    />
    <div class="pie-chart-legend">
      <div
        class="pie-chart-legend-item"
        v-for="(item, index) in chartData"
        :key="item.name"
        @mouseenter="handleLegendEnter(item)"
      >
        <div class="pie-chart-legend-item-left">
          <span
            class="pie-chart-legend-item-icon"
            :style="{ backgroundColor: color[index] }"
          />
          <span class="pie-chart-legend-item-name">{{ item.name }}</span>
        </div>
        <span class="pie-chart-legend-item-rate">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

const props = defineProps({
  id: {
    type: String,
    default: "pieChart",
  },
  className: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "200px",
    required: true,
  },
  height: {
    type: String,
    default: "200px",
    required: true,
  },
  chartData: {
    type: Array,
    default: () => [],
  },
  color: {
    type: Array,
    default: () => [],
  },
  hasRing: {
    type: Boolean,
    default: true,
  },
});
const options = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    show: false,
  },
  color: props.color,
  series: [
    {
      type: "pie",
      radius: props.hasRing ? ["40%", "70%"] : ["70%"],
      top: "10px",
      bottom: "10px",
      // right: "200px",
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      selectedMode: "single",
      data: props.chartData,
    },
  ],
};
let chart: echarts.ECharts | null = null;
const handleLegendEnter = (it) => {
  chart.dispatchAction({
    type: "select",
    seriesIndex: 0,
    name: it.name,
  });
};
onMounted(() => {
  chart = echarts.init(document.getElementById(props.id) as HTMLDivElement);
  chart.setOption(options);
  window.addEventListener("resize", () => {
    (chart as echarts.ECharts).resize();
  });
});
</script>
<style lang="scss" scoped>
.pie-chart {
  display: flex;

  &-box {
    flex: 1 auto;
  }

  &-legend {
    display: flex;
    flex: none;
    flex-direction: column;
    justify-content: center;
    width: 200px;
    padding-right: 40px;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      cursor: pointer;

      &-left {
        display: flex;
        align-items: center;
      }

      &-icon {
        width: 8px;
        height: 8px;
        margin-right: 10px;
        border-radius: 50%;
      }
    }
  }
}
</style>
