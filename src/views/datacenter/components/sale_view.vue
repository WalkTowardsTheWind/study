<template>
  <div class="p-24px">
    <div class="title">
      <div class="title1">销售计划</div>
      <div class="title2">设置经营计划</div>
    </div>
    <div class="content">
      <div class="content-item left">
        <div class="title">今年销售情况</div>
        <div class="sum">{{ sum1 }}%</div>
        <div class="line">
          <div class="line-item" :style="`width:${sum1}%`"></div>
        </div>
        <div class="money">
          <div class="money-item">
            <div class="title">目标（元）</div>
            <div class="money-num">10,000,000.00</div>
          </div>
          <div class="money-item">
            <div class="title">已完成（元）</div>
            <div class="money-num">7,960,160.00</div>
          </div>
        </div>
      </div>
      <div class="content-item right">
        <div class="title">本月销售情况</div>
        <div class="sum">{{ sum2 }}%</div>
        <div class="line">
          <div class="line-item" :style="`width:${sum2}%`"></div>
        </div>
        <div class="money">
          <div class="money-item">
            <div class="title">
              目标（元）
              <span class="set">设置</span>
            </div>
            <div class="money-num">10,000,000.00</div>
          </div>
          <div class="money-item">
            <div class="title">已完成（元）</div>
            <div class="money-num">7,960,160.00</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const sum1 = ref(54.11);
const sum2 = ref(42.99);
</script>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: baseline;
  .title1 {
    font-size: 18px;
    font-family: SourceHanSansSC, SourceHanSansSC;
    font-weight: bold;
    color: #333333;
    margin-right: 20px;
  }
  .title2 {
    font-size: 14px;
    font-family: SourceHanSansSC, SourceHanSansSC;
    font-weight: 500;
    color: #356ff3;
  }
}
.content {
  display: flex;
  margin-top: 20px;
  gap: 0 50px;
  &-item {
    width: 528px;
    .title {
      font-size: 14px;
      font-family: SourceHanSansSC, SourceHanSansSC;
      font-weight: 400;
      color: #656565;
    }
    .sum {
      margin: 20px 0 5px;
      font-size: 24px;
      font-weight: bold;
      color: #356ff3;
    }
    .line {
      width: 100%;
      background: #f5f5f5;
      height: 8px;
      border-radius: 4px;
      margin: 20px 0;
      &-item {
        width: 0;
        background-color: #356ff3;
        border-radius: 4px;
        height: 100%;
        box-shadow: 0px 0px 8px 0px #356ff3;
      }
    }

    .money {
      display: flex;
      gap: 0 20px;
      position: relative;
      &-item {
        flex: 1;
        width: 50%;
        .title {
          font-size: 14px;
          font-family: SourceHanSansSC, SourceHanSansSC;
          font-weight: 400;
          color: #656565;
          margin-bottom: 10px;
        }
        .money-num {
          font-size: 16px;
          font-family: SourceHanSansSC, SourceHanSansSC;
          font-weight: bold;
          color: #333333;
        }
      }
      .set {
        cursor: pointer;
        color: #356ff3;
      }
    }
  }
  &-item.right {
    .sum {
      color: #36c5f3;
    }
    .line-item {
      background-color: #36c5f3;
      box-shadow: 0px 0px 8px 0px #36c5f3;
    }
  }
}
</style>
