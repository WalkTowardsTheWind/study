<template>
  <div
    ref="dateTrend"
    :style="{ height: `${boxHeight - 40}px`, width: '100%' }"
  />
</template>
<script setup lang="ts">
import * as echarts from "echarts";

let chart: echarts.ECharts | null = null;
let boxHeight = ref(0);
const dateTrend = ref<HTMLDivElement>();
onMounted(() => {
  const { bottom } = (dateTrend as any).value.getBoundingClientRect();
  boxHeight.value = bottom < 360 ? 360 : bottom;
  nextTick(() => {
    // 图表初始化
    chart = echarts.init(dateTrend.value as HTMLDivElement);
    // 大小自适应
    window.addEventListener("resize", () => {
      chart.resize();
    });
  });
});
</script>
