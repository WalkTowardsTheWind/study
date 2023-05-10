<template>
  <div class="zxn-title">
    <div class="zxn-title-content">
      <slot />
    </div>
    <div class="zxn-title-back" @click="handleBack">
      <el-icon size="12" color="#474747"><i-ep-ArrowLeft /></el-icon>
      <span>返回上一级</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const handleBack = (): void => {
  console.log(route, router);
  router.go(-1);
};
</script>
<style lang="scss" scoped>
.zxn-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px 0 50px;
  border-bottom: 1px solid #f5f5f5;

  &-content {
    position: relative;
    height: 100%;
    font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 64px;
    color: #356ff3;

    &::before {
      position: absolute;
      right: 2px;
      bottom: 0;
      left: 2px;
      height: 4px;
      content: "";
      background: #3561e9;
      border-radius: 2px;
    }
  }

  &-back {
    display: flex;
    align-items: center;
    cursor: pointer;

    > span {
      font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #474747;
    }
  }
}
</style>
