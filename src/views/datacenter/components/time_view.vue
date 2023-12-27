<template>
  <div class="p-24px">
    <div class="title">数据统计</div>
    <div class="select">
      <tax-source-select
        class="w-240px"
        v-model:taxId="formItem.tax_land_id"
        @change-tax="handleSearch"
      />
      <div class="week">
        <div
          class="week-item"
          :class="{ active: dateType === index }"
          v-for="(item, index) in dateTypeMap"
          :key="item.text"
          @click="handleTypeChange(index)"
        >
          {{ item.text }}
        </div>
      </div>
      <div class="time">
        <el-date-picker
          class="w-full"
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
      <div class="choose">
        （统计时间：{{ chooseTime[0] }} - {{ chooseTime[1] }}）
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
const emits = defineEmits(["update"]);

const formItem = ref({
  tax_land_id: "",
  date: [],
});
const dateType = ref(4);

const chooseTime = computed(() => {
  if (dateType.value !== -1) {
    return dateTypeMap[dateType.value].value();
  }
  return formItem.value.date;
});

const tax_land_id = ref("");
const start_time = ref(0);
const end_time = ref();

const handleSearch = () => {
  tax_land_id.value = formItem.value.tax_land_id;
  (start_time.value = dayjs(chooseTime.value[0]).unix()),
    (end_time.value = dayjs(chooseTime.value[1])
      .add(1, "d")
      .subtract(1, "s")
      .unix()),
    emits("update", tax_land_id.value, start_time.value, end_time.value);
};
const dateTypeMap = [
  {
    text: "今日",
    value: () => {
      const time = dayjs().format("YYYY-MM-DD");
      return [time, time];
    },
  },
  {
    text: "昨日",
    value: () => {
      const time = dayjs().subtract(1, "d").format("YYYY-MM-DD");
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
const handleTypeChange = (index) => {
  dateType.value = index;
  formItem.value.date = [];
  handleSearch();
};
const handleDateChange = () => {
  dateType.value = -1;
  handleSearch();
};
handleTypeChange(4);
</script>

<style scoped lang="scss">
.title {
  font-size: 18px;
  font-family: SourceHanSansSC, SourceHanSansSC;
  font-weight: bold;
  color: #333333;
}
.select {
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 0 24px;
  position: relative;
  .choose {
    position: absolute;
    right: 0;
    font-size: 14px;
    font-family: SourceHanSansSC, SourceHanSansSC;
    font-weight: 500;
    color: #999999;
  }
  .time {
    height: 100%;
  }
  .week {
    display: flex;
    width: 481px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
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

      &.active,
      &:hover {
        color: #fff;
        background-color: #366ff4;
      }
    }
  }
}
</style>
