<!--  线 + 柱混合图 -->
<template>
  <div
    ref="dashboardBar"
    class="dashboard-bar"
    :style="{ width, height: `${boxHeight}px` }"
  >
    <div class="dashboard-title mt-30px">盈利看板</div>
    <div class="dashboard-bar-content">
      <div class="dashboard-bar-content-search">
        <div class="dashboard-bar-content-search-quick">
          <span>今年</span>
          <span>本季度</span>
          <span>本月</span>
          <span>本周</span>
        </div>
        <!--        <div class="dashboard-bar-content-search-date">-->
        <!--          <zxn-date-range class="w-272px mr-16px" />-->
        <!--          <el-button type="primary">查询</el-button>-->
        <!--        </div>-->
      </div>
      <div
        :id="id"
        :class="className"
        :style="{ height: `${boxHeight - 130}px`, width }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

const props = defineProps({
  id: {
    type: String,
    default: "barChart",
  },
  className: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "200px",
    required: true,
  },
});

const options = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "0",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Direct",
      type: "line",
      barWidth: "60%",
      itemStyle: {
        color: "#356FF3",
      },
      data: [10, 52, 200, 334, 390, 330, 220],
    },
  ],
};
const dashboardBar = ref<HTMLDivElement>();
let boxHeight = ref(0);

onMounted(() => {
  const { bottom } = (dashboardBar as any).value.getBoundingClientRect();
  boxHeight.value = bottom < 360 ? 360 : bottom;
  console.log(bottom, "222222222");
  nextTick(() => {
    // 图表初始化
    const chart = echarts.init(
      document.getElementById(props.id) as HTMLDivElement
    );
    chart.setOption(options);
    // 大小自适应
    window.addEventListener("resize", () => {
      chart.resize();
    });
  });
});
</script>
<style lang="scss" scoped>
.dashboard-bar {
  &-content {
    margin-top: 16px;
    background: #fff;
    border-radius: 4px;

    &-search {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 24px 24px 0;

      &-quick {
        display: flex;

        > span {
          box-sizing: border-box;
          width: 56px;
          height: 36px;
          margin-right: 8px;
          font-size: 14px;
          line-height: 36px;
          text-align: center;
          cursor: pointer;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
        }
      }

      &-date {
        display: flex;
      }
    }
  }
}
</style>
