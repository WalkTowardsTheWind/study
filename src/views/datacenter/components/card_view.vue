<template>
  <div class="title">
    <div>{{ cardData.title }}</div>
    <span class="more" @click="$router.push({ name: cardData.route })"
      >查看更多<i-ep-arrow-right class="arrow"
    /></span>
  </div>
  <div class="box">
    <div class="item" v-for="(item, index) in cardData.subItem" :key="index">
      <div class="item-name">{{ item.title }}</div>
      <div class="item-val">
        {{ item.isNeedFormat ? proxy.$moneyFormat(item.val) : item.val }}
      </div>
      <div class="flex justify-between">
        <div class="item-sub">
          <div class="item-sub-name">{{ item.sub_title }}</div>
          <div class="item-sub-val">
            <div>
              <span>{{ item.sub_val }} {{ item.isPercent ? "%" : "" }}</span>
              <img
                v-if="item.sub_val != 0"
                :src="item.sub_val > 0 ? UPimg : DOWNimg"
                class="img"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="item-sub" v-if="item.sub_title2">
          <div class="item-sub-name">{{ item.sub_title2 }}</div>
          <div class="item-sub-val">
            <div>
              <span>{{ item.sub_val2 }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UPimg from "@/assets/dashboard/up.png";
import DOWNimg from "@/assets/dashboard/down.png";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance() as any;

interface IcardData {
  title: string;
  route: string;
  subItem: IsubItem[];
}

interface IsubItem {
  title: string;
  val: number;
  sub_title: string;
  sub_val: number;
  isPercent?: boolean;
  isNeedFormat?: boolean;
  sub_title2?: string;
  sub_val2?: number;
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
  font-weight: bold;
  color: #333333;
  .more {
    font-size: 14px;
    font-family: SourceHanSansSC, SourceHanSansSC;
    font-weight: 400;
    color: #999999;
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
      color: #356ff3;
    }

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
    &:hover {
      box-shadow: 13px 9px 12px 0 rgba(0, 0, 0, 0.08);
      .item-val {
        color: #356ff3;
      }
    }
    &-name {
      font-size: 14px;
      font-family: SourceHanSansSC, SourceHanSansSC;
      font-weight: 500;
      color: #656565;
    }
    &-val {
      font-size: 18px;
      font-family: DINBold;
      color: #333333;
      font-weight: bold;
      margin: 10px 0;
    }
    &-sub {
      &-name {
        font-size: 14px;
        font-family: SourceHanSansSC, SourceHanSansSC;
        font-weight: 400;
        color: #999999;
        margin: 10px 0;
      }
      &-val {
        font-size: 16px;
        font-family: SourceHanSansSC, SourceHanSansSC;
        font-weight: bold;
        color: #333333;
        display: flex;
        justify-content: space-between;
        img {
          margin-left: 10px;
          width: 12px;
          height: 16px;
        }
      }
    }
  }
}
</style>
