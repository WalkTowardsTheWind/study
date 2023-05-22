<template>
  <div class="risk-ring">
    <div class="dashboard-title">行业类型占比</div>
    <div class="risk-ring-content">
      <pie-chart
        height="100%"
        width="100%"
        id="industry"
        :chart-data="chartData"
        :hasRing="false"
        :color="['#f4e036', '#F3B736']"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import PieChart from "./PieChart.vue";
const chartData = reactive([
  { value: 36, name: "建筑" },
  { value: 64, name: "其他" },
]);
</script>
<style lang="scss" scoped>
.risk-ring {
  flex: 1;

  &-content {
    height: 240px;
    margin-top: 16px;
    background: #fff;
    border-radius: 4px;
  }
}
</style>
