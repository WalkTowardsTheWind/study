<template>
  <div class="dashboard">
    <div class="dashboard-left">
      <to-do-list />
      <data-statistics class="mt-[24px]" />
    </div>
    <div class="dashboard-right"></div>
  </div>
</template>
<script setup lang="ts">
import ToDoList from "./components/ToDoList.vue";
import DataStatistics from "./components/DataStatistics.vue";
</script>
<style lang="scss" scoped>
.dashboard {
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding: 24px 18px 24px 24px;
  &-left {
    flex: 1 auto;
  }
  &-right {
    flex: none;
    margin-left: 24px;
    width: 408px;
  }
}
</style>
