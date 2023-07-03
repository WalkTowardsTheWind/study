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
          <span
            v-for="item in typeMap"
            :key="item.value"
            :class="{ active: activeType === item.value }"
            @click="handleChange(item)"
          >
            {{ item.label }}
          </span>
        </div>
        <!--        <div class="dashboard-bar-content-search-date">-->
        <!--          <zxn-date-range class="w-272px mr-16px" />-->
        <!--          <el-button type="primary">查询</el-button>-->
        <!--        </div>-->
      </div>
      <div
        :id="id"
        :class="className"
        :style="{ height: `${boxHeight - 110}px`, width }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { dateUtil } from "@/utils/dateUtil";
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
const typeMap = [
  { label: "今年", value: 1 },
  { label: "本季度", value: 2 },
  { label: "本月", value: 3 },
  { label: "本周", value: 4 },
];
const activeType = ref(1);
const xAxisData: string[] = ref([]);
const handleChange = (item: any) => {
  activeType.value = item.value;
};
const chartInits = () => {
  setTimeout(() => {
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
          data: xAxisData.value,
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
          data: [],
        },
      ],
    };
    console.log(options, 2222);
    chart.setOption(options);
  }, 1000);
};
watch(
  activeType,
  (val) => {
    const currentMonth = new Date().getMonth() + 1;
    switch (val) {
      case 1:
        console.log(new Date().getMonth());
        xAxisData.value = [...new Array(currentMonth).keys()].map(
          (it) => `${it + 1}月`
        );
        break;
      case 2:
        // console.log(dateUtil().quarter(2))
        xAxisData.value = [];
        break;
    }
    chartInits();
  },
  {
    immediate: true,
  }
);

let chart: echarts.ECharts | null = null;
const dashboardBar = ref<HTMLDivElement>();
let boxHeight = ref(0);

onMounted(() => {
  const { bottom } = (dashboardBar as any).value.getBoundingClientRect();
  console.log(bottom, "2222222222222");
  boxHeight.value = bottom < 360 ? 360 : bottom;
  nextTick(() => {
    // 图表初始化
    chart = echarts.init(document.getElementById(props.id) as HTMLDivElement);
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

          &.active {
            color: #356ff3;
            border-color: #356ff3;
          }
        }
      }

      &-date {
        display: flex;
      }
    }
  }
}
</style>
