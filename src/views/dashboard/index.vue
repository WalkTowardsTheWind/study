<template>
  <div class="dashboard-container">
    <div class="dashboard-container-statistics">
      <div
        class="dashboard-container-statistics-item"
        v-for="item in statisticsList"
        :key="item.title"
      >
        <div class="dashboard-container-statistics-item-icon"></div>
        <div class="dashboard-container-statistics-item-info">
          <span class="dashboard-container-statistics-item-info-title">
            {{ item.title }}
          </span>
          <span class="dashboard-container-statistics-item-info-count">
            {{ item.count }}
          </span>
        </div>
      </div>
    </div>
    <el-row class="mt-30px" gutter="16">
      <el-col :span="16">
        <div class="flex">
          <risk-ring />
          <div class="w-16px"></div>
          <industry-ring />
        </div>
        <el-row class="w-100%">
          <bar-chart height="400px" width="100%" />
        </el-row>
      </el-col>
      <el-col :span="8">
        <convenient-entry />
        <notice-message />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import ConvenientEntry from "./components/ConvenientEntry.vue";
import RiskRing from "./components/RiskRing.vue";
import IndustryRing from "./components/IndustryRing.vue";
import BarChart from "./components/BarChart.vue";
import NoticeMessage from "./components/NoticeMessage.vue";
const statisticsList = reactive([
  {
    title: "发布申请",
    count: 184,
  },
  {
    title: "充值订单",
    count: 1842,
  },
  {
    title: "结算订单",
    count: 184,
  },
  {
    title: "开票订单",
    count: 184,
  },
  {
    title: "异常数据",
    count: 184,
  },
]);
</script>
<style lang="scss">
.dashboard-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
</style>
<style lang="scss" scoped>
.dashboard-container {
  padding: 16px 24px;

  &-statistics {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &-item {
      display: flex;
      align-items: center;
      width: calc((100% - 64px) / 5);
      min-width: 192px;
      height: 104px;
      padding-left: 26px;
      background: #fff;
      border-radius: 4px;

      &-icon {
        width: 37px;
        height: 37px;
        background: #fff linear-gradient(#366ff3 0%, #36c5f3 0%);
        border-radius: 50%;
      }

      &-info {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        &-title {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        &-count {
          font-size: 28px;
          font-weight: bold;
          color: #356ff3;
        }
      }
    }
  }
}
</style>
