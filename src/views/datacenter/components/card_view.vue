<template>
  <div class="title">
    <div>{{ cardData.title }}</div>
    <span class="more">查看更多<i-ep-arrow-right class="arrow" /></span>
  </div>
  <div class="box">
    <div class="item" v-for="(item, index) in cardData.subItem" :key="index">
      <div class="item-name">{{ item.title }}</div>
      <div class="item-val">{{ proxy.$moneyFormat(item.val) }}</div>
      <div class="item-sub-name">{{ item.sub_title }}</div>
      <div class="item-sub-val">
        <span>{{ proxy.$moneyFormat(item.sub_val) }}%</span>
        <img :src="item.sub_val > 0 ? UPimg : DOWNimg" class="img" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UPimg from "@/assets/dashboard/up.png";
import DOWNimg from "@/assets/dashboard/down.png";
const { proxy } = getCurrentInstance() as any;

interface IcardData {
  title: string;
  subItem: IsubItem[];
}

interface IsubItem {
  title: string;
  val: number;
  sub_title: string;
  sub_val: number;
}

defineProps({
  cardData: {
    default: {} as IcardData,
  },
});
</script>

<style scoped lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-family: SourceHanSansSC, SourceHanSansSC;
  font-weight: 500;
  color: #333333;
  .more {
    font-size: 14px;
    font-family: SourceHanSansSC, SourceHanSansSC;
    font-weight: 400;
    color: #999999;
    display: flex;
    align-items: center;
    cursor: pointer;

    .arrow {
      margin-left: 5px;
    }
  }
}
.box {
  margin-top: 20px;
  display: flex;
  gap: 0 20px;
  .item {
    padding: 20px 16px;
    width: 180px;
    height: 164px;
    background: #f9f9f9;
    border-radius: 24px;
    &-name {
      font-size: 14px;
      font-family: SourceHanSansSC, SourceHanSansSC;
      font-weight: 500;
      color: #656565;
    }
    &-val {
      font-size: 24px;
      font-family: DINBold;
      color: #333333;
      font-weight: bold;
      margin: 10px 0;
    }
    &-sub-name {
      font-size: 14px;
      font-family: SourceHanSansSC, SourceHanSansSC;
      font-weight: 400;
      color: #999999;
      margin-bottom: 5px;
    }
    &-sub-val {
      font-size: 16px;
      font-family: SourceHanSansSC, SourceHanSansSC;
      font-weight: bold;
      color: #333333;
      img {
        margin-left: 10px;
        width: 12px;
        height: 16px;
      }
    }
  }
}
</style>
