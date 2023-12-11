<template>
  <dashboard-card title="待办事项">
    <div class="to-do-list">
      <div
        v-for="item in statisticsList"
        :key="item.title"
        class="to-do-list-item"
        @click="handleView(item)"
      >
        <div class="to-do-list-item-info">
          <div class="to-do-list-item-info-title">{{ item.title }}</div>
          <div class="to-do-list-item-info-num">{{ item.count }}</div>
        </div>
        <img class="to-do-list-item-icon" :src="item.img" alt="" />
      </div>
    </div>
  </dashboard-card>
</template>
<script lang="ts" setup>
import DashboardCard from "./DashboardCard.vue";
import { workbench } from "@/api/dashboard";
import { useRouteParams } from "@/store/modules/routeParams";
import { useRouter } from "vue-router";
const router = useRouter();
const statisticsList: any[] = reactive([]);

const initData = async () => {
  const { data } = await workbench();
  statisticsList.push(
    {
      title: "待审核任务",
      count: data.task_count || 0,
      img: new URL(`@/assets/dashboard/toDo.png`, import.meta.url).href,
    },
    {
      title: "充值订单",
      count: data.finance_recharge_count || 0,
      img: new URL(`@/assets/dashboard/toDo2.png`, import.meta.url).href,
    },
    {
      title: "结算订单",
      count: data.finance_settlement_company_count || 0,
      img: new URL(`@/assets/dashboard/toDo3.png`, import.meta.url).href,
    },
    {
      title: "开票申请",
      count: data.invoice_count || 0,
      img: new URL(`@/assets/dashboard/toDo4.png`, import.meta.url).href,
    }
  );
};

const handleView = (item) => {
  const routerMap = {
    待审核任务: "taskManagerIndex",
    充值订单: "recharge-center",
    结算订单: "settlementCenter",
    开票申请: "invoiceManager",
    异常数据: "Dashboard",
  };
  if (item.title === "开票申请") {
    const { pushParams } = useRouteParams();
    pushParams("invoiceManager", { status: 0 });
  }
  if (item.title === "待审核任务") {
    const { pushParams } = useRouteParams();
    pushParams("taskManagerIndex", { status: 1 });
  }
  router.push({ name: routerMap[item.title] });
};
onMounted(() => {
  initData();
});
</script>
<style lang="scss" scoped>
.to-do-list {
  display: flex;
  justify-content: space-between;
  padding: 0 24px 24px 24px;
}
.to-do-list-item {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 24px 24px 10px 32px;
  width: calc((100% - 72px) / 4);
  background: #f9f9f9;
  border-radius: 16px;
  cursor: pointer;
  &:hover {
    box-shadow: 13px 9px 12px 0 rgb(0 0 0 / 8%);
    .to-do-list-item-info-num {
      color: #356ff3;
    }
  }
  &-info {
    &-title {
      font-size: 14px;
      font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
      font-weight: 500;
      color: #333333;
    }
    &-num {
      font-size: 28px;
      font-family: DINBold, sans-serif;
      font-weight: bold;
      color: #333333;
    }
  }
  &-icon {
    flex: none;
    width: 50px;
    height: 50px;
  }
}
</style>
