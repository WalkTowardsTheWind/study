<template>
  <div class="p-x-[48px]">
    <div class="line-chart">
      <LineChart1 />
    </div>
  </div>
</template>

<script lang="ts" setup>
import LineChart1 from "./line-chart1.vue";
</script>

<style lang="scss" scoped>
.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
}
</style>
