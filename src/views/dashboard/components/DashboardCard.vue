<template>
  <div class="dashboard-card">
    <div class="dashboard-card-header">
      <div class="dashboard-card-header-title">{{ title }}</div>
      <div class="dashboard-card-header-slot">
        <slot name="header-right" />
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: { type: String, default: "" },
});
</script>
<style lang="scss" scoped>
.dashboard-card {
  overflow: hidden;
  border-radius: 16px;
  background: #fff;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 24px;
    &-title {
      font-size: 18px;
      font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
      font-weight: bold;
      color: #333333;
    }
  }
}
</style>
