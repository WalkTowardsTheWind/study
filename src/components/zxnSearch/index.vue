<template>
  <div class="zxn-search">
    <el-form :inline="true" :model="formItem" class="zxn-search-content">
      <slot />
    </el-form>
    <div class="zxn-search-btn">
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  formItem: { type: Object, default: () => ({}) },
});
</script>
<style scoped lang="scss">
.zxn-search {
  display: flex;

  &-content {
    display: flex;
    flex: 1 auto;
    flex-wrap: wrap;
  }

  &-btn {
    flex: none;
  }
}
</style>
