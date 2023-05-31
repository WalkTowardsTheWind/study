<template>
  <div class="role-table">
    <div class="role-table-header">
      <span class="role-table-header-title">一级分类</span>
      <el-checkbox />
    </div>
    <div v-for="item in list" :key="item.label" class="role-table-item">
      <span class="role-table-item-text">{{ item.label }}</span>
      <span>
        <el-icon color="#333333"><i-ep-ArrowRightBold /></el-icon>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  list: { type: Array, default: () => [] },
});
</script>
<style lang="scss" scoped>
.role-table {
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    background-color: #eff4fe;

    &-title {
      font-size: 14px;
      color: #656565;
    }
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    border-bottom: 1px solid #f5f5f5;

    &-text {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
  }
}
</style>
