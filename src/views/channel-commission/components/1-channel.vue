<template>
  <div class="p-x-[48px]">
    <div class="top">
      <el-card class="top-item" v-for="item in 2" :key="item">
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
    <div class="chart">
      <div class="head">
        <div class="left">
          <div class="line"></div>
          <div>下发趋势图</div>
        </div>
        <div class="right">筛选<el-select></el-select></div>
      </div>
      <div class="body">图</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import iconTop from "@/assets/icons-jpg/top.png";
import iconBottom from "@/assets/icons-jpg/bottom.png";
</script>

<style scoped lang="scss">
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

.chart {
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 14px;
    color: #356ff3;

    .line {
      width: 5px;
      height: 15px;
      background: #356ff3;
      border-radius: 4px;
    }

    .left {
      display: flex;
      gap: 0 10px;
      align-items: center;
    }
  }
}
</style>
