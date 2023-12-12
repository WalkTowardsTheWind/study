<template>
  <dashboard-card title="基本信息">
    <div class="base-info">
      <div class="base-info-head">
        <img class="base-info-head-avatar" src="@/assets/avatar.png" />
        <div class="base-info-head-content">
          <span class="base-info-head-content-name">{{
            useUser.nickname
          }}</span>
          <span class="base-info-head-content-time">
            上次登录时间: 2021/11/2 10:23
          </span>
        </div>
      </div>
      <div class="quick-btn">
        <div
          v-for="item in quickBtns"
          :key="item.title"
          @click="handleView(item)"
          class="quick-btn-item"
        >
          <img :src="item.img" alt="" />
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
  </dashboard-card>
</template>
<script setup lang="ts">
import DashboardCard from "./DashboardCard.vue";
import { useUserStoreHook } from "@/store/modules/user";
import { useRouter } from "vue-router";
const router = useRouter();
const useUser = useUserStoreHook();
const quickBtns = ref([
  {
    title: "新建企业",
    img: new URL(`@/assets/dashboard/info.png`, import.meta.url).href,
    route: "business-account-add",
  },
  {
    title: "新建税地",
    img: new URL(`@/assets/dashboard/info2.png`, import.meta.url).href,
    route: "selfOperatedTaxLandAdd",
  },
  {
    title: "新建渠道",
    img: new URL(`@/assets/dashboard/info3.png`, import.meta.url).href,
    route: "channel-account-add-business",
  },
  {
    title: "新建合同",
    img: new URL(`@/assets/dashboard/info4.png`, import.meta.url).href,
    route: "contract-management-template",
  },
  {
    title: "上传完税凭证",
    img: new URL(`@/assets/dashboard/info5.png`, import.meta.url).href,
    route: "invoiceManager",
  },
]);
const handleView = (item) => {
  router.push({ name: item.route });
};
</script>
<style lang="scss" scoped>
.base-info {
  padding: 0px 24px 16px 24px;
  .base-info-head {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .base-info-head-avatar {
      width: 61px;
      height: 61px;
      border-radius: 50%;
    }
    .base-info-head-content {
      display: flex;
      flex-direction: column;
      margin-left: 16px;
      .base-info-head-content-name {
        font-size: 18px;
        font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
        font-weight: bold;
        color: #356ff3;
      }
      .base-info-head-content-time {
        font-size: 14px;
        font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
        font-weight: 500;
        color: #656565;
      }
    }
  }
  .quick-btn {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &-item {
      display: flex;
      align-items: center;
      padding-left: 18px;
      margin-top: 8px;
      width: calc((100% - 32px) / 2);
      height: 40px;
      background: #f9f9f9;
      border-radius: 12px;
      cursor: pointer;
      &:hover {
        box-shadow: 13px 9px 12px 0 rgb(0 0 0 / 8%);
        span {
          color: #356ff3;
        }
      }
    }
    img {
      width: 18px;
      height: 18px;
    }
    span {
      margin-left: 6px;
      font-size: 14px;
      font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
      font-weight: 500;
      color: #333333;
    }
  }
}
</style>
