<template>
  <div class="statistic-card">
    <div class="statistic-card-header">{{ itemData.title }}</div>
    <div class="statistic-card-num">
      {{ proxy.$moneyFormat(itemData.num) }}
    </div>
    <div class="statistic-card-tip">环比</div>
    <div class="statistic-card-rate">
      <span>
        {{ itemData.rate === "0%" ? "" : itemData.type === "up" ? "+" : "-"
        }}{{ itemData.rate }}
      </span>
      <span v-if="itemData.rate === '0%'"></span>
      <img v-else :src="itemData.type === 'up' ? up : down" alt="" />
    </div>
  </div>
</template>
<script setup lang="ts">
import up from "@/assets/dashboard/up.png";
import down from "@/assets/dashboard/down.png";
const { proxy } = getCurrentInstance() as any;
defineProps({
  itemData: {
    type: Object,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.statistic-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 24px;
  &:hover {
    box-shadow: 13px 9px 12px 0 rgb(0 0 0 / 8%);
    .statistic-card-num {
      color: #356ff3;
    }
  }
  &-header {
    font-size: 14px;
    font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
    font-weight: 500;
    color: #656565;
  }
  &-num {
    margin-top: 16px;
    font-size: 20px;
    font-family: DINBold, sans-serif;
    font-weight: bold;
    color: #333333;
  }
  &-tip {
    margin-top: 20px;
    font-size: 14px;
    font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
    color: #999999;
  }
  &-rate {
    display: flex;
    align-items: center;
    margin-top: 4px;
    & > span {
      font-size: 14px;
      font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
      font-weight: bold;
      color: #333333;
      &:last-child {
        margin-left: 10px;
        width: 12px;
        height: 4px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 2px;
      }
    }
    & > img {
      width: 12px;
      height: 16px;
      margin-left: 10px;
    }
  }
}
</style>
