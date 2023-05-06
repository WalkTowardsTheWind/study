<template>
  <div class="zxn-plan">
    <div class="zxn-plan-content">
      <slot />
    </div>
  </div>
</template>
<style scoped lang="scss">
.zxn-plan {
  box-sizing: border-box;
  padding: 16px 24px 0;

  &-content {
    min-height: calc(100vh - 72px);
    background: #fff;
    border-radius: 8px;
  }
}
</style>
<script setup lang="ts"></script>
