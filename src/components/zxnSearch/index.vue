<template>
  <div class="zxn-search">
    <el-form
      :inline="true"
      label-position="right"
      :label-width="labelWidth"
      :model="formItem"
      class="zxn-search-content"
    >
      <slot />
    </el-form>
    <div class="zxn-search-btn">
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button type="info">重置</el-button>
      <slot name="rightBtn" />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  formItem: { type: Object, default: () => ({}) },
  labelWidth: { type: [String, Number], default: 90 },
});
const emit = defineEmits(["on-search"]);
const handleSearch = () => {
  emit("on-search");
};
</script>
<style scoped lang="scss">
.zxn-search {
  display: flex;
  align-items: flex-end;

  &-content {
    flex: 1 auto;

    :deep(.el-form-item) {
      width: 100%;
      margin-right: 0;
      margin-bottom: 16px;

      .el-form-item__label {
        font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: #656565;
      }

      .el-form-item__content {
        .el-select,
        .el-input {
          width: 100%;
        }
      }
    }
  }

  &-btn {
    flex: none;
    padding-bottom: 16px;
    padding-left: 16px;
  }
}
</style>
