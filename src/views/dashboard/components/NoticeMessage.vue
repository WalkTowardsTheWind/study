<template>
  <div ref="noticeMessage" class="notice-message">
    <div class="notice-message-header">
      <span class="notice-message-header-title">系统通知</span>
      <span class="notice-message-header-more">更多></span>
    </div>
    <div :style="{ height: `${boxHeight}px` }">
      <el-scrollbar ref="scrollbar">
        <div class="notice-message-item" v-for="item in 10" :key="item">
          <div class="notice-message-item-type">
            <div class="notice-message-item-type-icon"></div>
            <div class="notice-message-item-type-text">
              10名健身教练已经发布完成{{ boxHeight }}
            </div>
          </div>
          <div class="notice-message-item-content">
            后台进行中的任务，进度完成
          </div>
          <div class="notice-message-item-btn">
            <el-button>确定</el-button>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
const noticeMessage = ref<HTMLDivElement>();
let boxHeight = ref(0);
onMounted(() => {
  setTimeout(() => {
    const parentHeight = noticeMessage.value.offsetParent.clientHeight;
    const offTop = noticeMessage.value.offsetTop;
    boxHeight.value = parentHeight - offTop - 37;
  });
});
</script>
<style lang="scss" scoped>
.notice-message {
  margin-top: 30px;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 500;
    color: #333;

    &-more {
      cursor: pointer;
    }
  }

  &-item {
    padding: 24px 14px 14px 24px;
    margin-bottom: 16px;
    background: #fff;
    border-radius: 4px;

    &-type {
      display: flex;

      &-icon {
        width: 24px;
        height: 24px;
        margin-right: 16px;
        background: #36c5f3;
        border-radius: 50%;
      }

      &-text {
        font-size: 14px;
        font-weight: bold;
        color: #333;
      }
    }

    &-content {
      padding-left: 40px;
      margin-top: 16px;
      overflow: hidden;
      font-size: 14px;
      font-weight: 500;
      color: #999;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-btn {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
  }
}
</style>
