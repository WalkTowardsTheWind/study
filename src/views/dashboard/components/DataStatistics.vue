<template>
  <dashboard-card title="数据汇总">
    <template #header-right>
      <div class="data-statistics-head-time">
        {{ chooseTime[0] }}-{{ chooseTime[1] }}
      </div>
    </template>
    <div class="data-statistics">
      <div class="data-statistics-head">
        <tax-source-select
          class="w-[120px] data-statistics-head-source"
          v-model:taxId="formItem.tax_land_id"
          @change-tax="handleSearch"
        />
        <div class="data-statistics-head-form">
          <div class="data-statistics-head-form-tag">
            <div
              class="data-statistics-head-form-tag-item"
              :class="{ active: dateType === index }"
              v-for="(item, index) in dateTypeMap"
              :key="item.text"
              @click="handleTypeChange(index)"
            >
              {{ item.text }}
            </div>
          </div>
          <div class="w-[220px] ml-[12px]">
            <el-date-picker
              v-model="formItem.date"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="-"
              value-format="YYYY-MM-DD"
              :clearable="false"
              @change="handleDateChange"
            />
          </div>
        </div>
      </div>
      <div class="data-statistics-card mb-[12px]">
        <statistics-card
          v-for="item in statistics"
          :key="item.title"
          :item-data="item"
        />
      </div>
      <trend-chart />
    </div>
  </dashboard-card>
</template>
<script setup lang="ts">
import DashboardCard from "./DashboardCard.vue";
import StatisticsCard from "./StatisticsCard.vue";
import TrendChart from "./TrendChart.vue";
import dayjs from "dayjs";
const formItem = ref({
  tax_land_id: "",
  date: [],
});
const dateType = ref(5);
const dateTypeMap = [
  {
    text: "今日",
    value: () => {
      const time = dayjs().format();
      return [time, time];
    },
  },
  {
    text: "昨日",
    value: () => {
      const time = dayjs().subtract(1, "d").format();
      return [time, time];
    },
  },
  {
    text: "本周",
    value: () => {
      const end = dayjs().endOf("week").format("YYYY-MM-DD");
      const start = dayjs().startOf("week").format("YYYY-MM-DD");
      return [start, end];
    },
  },
  {
    text: "上周",
    value: () => {
      const end = dayjs().endOf("week").subtract(1, "w").format("YYYY-MM-DD");
      const start = dayjs()
        .startOf("week")
        .subtract(1, "w")
        .format("YYYY-MM-DD");
      return [start, end];
    },
  },
  {
    text: "本月",
    value: () => {
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      return [start, end];
    },
  },
  {
    text: "上月",
    value: () => {
      const end = dayjs().endOf("month").subtract(1, "M").format("YYYY-MM-DD");
      const start = dayjs()
        .startOf("month")
        .subtract(1, "M")
        .format("YYYY-MM-DD");
      return [start, end];
    },
  },
  {
    text: "去年",
    value: () => {
      const end = dayjs().endOf("year").subtract(1, "y").format("YYYY-MM-DD");
      const start = dayjs()
        .startOf("year")
        .subtract(1, "y")
        .format("YYYY-MM-DD");
      return [start, end];
    },
  },
  {
    text: "今年",
    value: () => {
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      return [start, end];
    },
  },
];
const chooseTime = computed(() => {
  if (dateType.value !== -1) {
    return dateTypeMap[dateType.value].value();
  }
  return formItem.value.date;
});
const handleTypeChange = (index) => {
  dateType.value = index;
  formItem.value.date = [];
};
const handleDateChange = () => {
  dateType.value = -1;
};
const statistics = ref([
  {
    title: "利润总额(元)",
    num: "48262310.00",
    rate: "12.7%",
    type: "up",
  },
  {
    title: "打款总额(元)",
    num: "48260.00",
    rate: "12.7%",
    type: "down",
  },
  {
    title: "渠道结算总额(元)",
    num: "48260.00",
    rate: "12.7%",
    type: "up",
  },
  {
    title: "下发总额(元)",
    num: "48260.00",
    rate: "12.7%",
    type: "up",
  },
  {
    title: "成本总额(元)",
    num: "48260.00",
    rate: "12.7%",
    type: "up",
  },
]);
const handleSearch = () => {};
</script>
<style lang="scss" scoped>
.data-statistics-head-time {
  font-size: 14px;
  font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
  font-weight: 500;
  color: #999999;
}
.data-statistics {
  padding: 0 24px 24px 24px;
  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-source {
      flex: none;
    }
    &-form {
      flex: 1 auto;
      display: flex;
      align-items: center;
      margin-left: 12px;
      &-tag {
        display: flex;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        overflow: hidden;
        &-item {
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-right: 1px solid #e5e5e5;
          font-size: 14px;
          font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
          color: #333333;
          cursor: pointer;
          &:last-child {
            border-right: 0;
          }
          &.active {
            color: #fff;
            background-color: #366ff4;
          }
        }
      }
      :deep(.el-range-editor.el-input__wrapper) {
        width: 220px;
      }
    }
  }
  &-card {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    > div {
      width: calc((100% - (24px * 4)) / 5);
    }
  }
}
</style>
