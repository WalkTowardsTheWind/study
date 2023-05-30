<template>
  <div class="p-x-[48px]">
    <div class="top">
      <el-card class="top-item" v-for="item in 3" :key="item">
        <div class="top-item-title">净收入</div>
        <div class="top-item-money">126.500</div>
        <div class="top-item-bi">
          <div class="left">
            <span>周同比</span>
            <span class="per">12%</span>
            <img :src="iconTop" />
          </div>
          <div class="right">
            <span>日环比</span>
            <span class="per">12%</span>
            <img :src="iconBottom" />
          </div>
        </div>
      </el-card>
    </div>
    <div class="time">
      <div class="title">
        <div class="line"></div>
        <div>营收趋势图</div>
      </div>
      <zxn-date-picker :isRange="true" @change="change" />
    </div>
    <div class="line-chart">
      <LineChart />
    </div>
  </div>

  <!-- 详情 -->
  <el-dialog v-model="visible" title="企业明细">
    <div class="title">
      <span>企业名称：1000000000</span>
      <span class="ml-10">企业账户ID：1000001</span>
    </div>
    <h4>充值明细</h4>
    <el-table></el-table>
    <h4>企业结算明细</h4>
    <el-table> </el-table>
  </el-dialog>
</template>

<script lang="ts" setup>
import LineChart from "./LineChart.vue";
import iconTop from "@/assets/icons-jpg/top.png";
import iconBottom from "@/assets/icons-jpg/bottom.png";

const visible = ref(false);
const change = (date: any) => {
  if (date) {
    console.log(date);
  }
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  gap: 0 16px;
  margin: 20px 0 30px;

  &-item {
    width: 272px;
    height: 160px;
    background: #f5f5f5;
    border: none;
    border-radius: 4px;

    &-title {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }

    &-money {
      margin: 10px 0 20px;
      font-size: 32px;
      font-weight: bold;
      color: #356ff3;
    }

    &-bi {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      color: #656565;

      .left,
      .right {
        display: flex;
        align-items: center;
      }

      .per {
        margin: 0 5px 0 10px;
        color: #333;
      }
    }
  }
}

.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: sans-serif;
    font-size: 14px;
    color: #356ff3;
  }

  .line {
    display: flex;
    width: 4px;
    height: 14px;
    margin-right: 10px;
    background: #356ff3;
    border-radius: 4px;
  }
}
</style>
