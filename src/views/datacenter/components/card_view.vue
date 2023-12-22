<template>
  <div class="title">
    <div>{{ cardData.name }}</div>
    <span class="more" @click="$router.push({ name: cardData.route })"
      >查看更多<i-ep-arrow-right class="arrow"
    /></span>
  </div>
  <div class="box">
    <div
      class="item"
      v-for="(item, index) in cardData.subItem"
      :style="{ width: item.width + 'px' }"
      :key="index"
    >
      <div class="item-name">{{ item.name }}</div>
      <div class="item-val">
        {{ item.isNeedFormat ? proxy.$moneyFormat(item.value) : item.value }}
      </div>
      <div class="flex justify-between">
        <div
          class="item-sub"
          v-for="(j, j_index) in item.subItem"
          :key="j_index"
        >
          <div class="item-sub-name">{{ j.name }}</div>
          <div class="item-sub-val">
            <span
              >{{ j.isNeedFormat ? proxy.$moneyFormat(j.value) : j.value }}
              {{ j.isPercent ? "%" : "" }}</span
            >
            <img
              v-if="j.value !== 0"
              :src="j.isUpOrDown === 'up' ? UPimg : DOWNimg"
              class="img"
              alt=""
            />
            <div v-if="j.value == 0 && j.isPercent" class="notype"></div>
          </div>
        </div>
        <!-- <div class="item-sub" v-if="j.name">
          <div class="item-sub-name">{{ j.name }}</div>
          <div class="item-sub-val">
            <div>
              <span>{{ j.value }} </span>
            </div>
          </div>
        </div> -->
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
  name: string;
  route: string;
  subItem: IsubItem[];
}

interface IsubItem {
  name: string;
  value: number;
  width?: number;
  isNeedFormat?: boolean;
  isPercent?: boolean;
  isUpOrDown?: "up" | "down" | string;
  subItem?: IsubItem[];
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
  gap: 20px;
  flex-wrap: wrap;
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
        align-items: center;
        img {
          margin-left: 10px;
          width: 12px;
          height: 16px;
        }
        .notype {
          margin-left: 10px;
          width: 12px;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.6);
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
