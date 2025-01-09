<template>
  <div :class="n()">
    <slot name="head" :title="title">
      <div :class="n('head')">
        <div @click="changeYear('prev')" class="year-button">{{ "<<" }}</div>
        <div :class="n('head-left')" @click="changeMonth('prev')">
          {{ "<" }}
        </div>
        {{ title }}
        <div :class="n('head-right')" @click="changeMonth('next')">
          {{ ">" }}
        </div>
        <div @click="changeYear('next')" class="year-button">{{ ">>" }}</div>
      </div>
    </slot>

    <div :class="n('body')">
      <table :class="n('table')" cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
            <th
              v-for="item in WEEKS"
              :key="item"
              :aria-label="item + ''"
              scope="col"
            >
              <div :class="n('col-title')">{{ item }}</div>
            </th>
          </tr>
          <tr v-for="(row, rowKey) in rows" :key="rowKey">
            <td
              v-for="(col, colKey) in row"
              :key="`${rowKey + colKey}`"
              :class="[n('col'), col.type, { selected: col.isSelected }]"
            >
              <div :class="[n('col-wrap')]" @click="handleDate(col, colKey)">
                <slot name="date-cell" :data="col">
                  <div :class="n('col-wrap-box')">
                    <!-- <div :class="n('col-inner')"> -->
                    <div :class="[n('col-inner'), col.type]">
                      {{ col.text }}
                    </div>
                    <div :class="[n('col-drop'), col.drop]"></div>
                  </div>
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  type DateCellType,
  type DateCell,
  type DropType,
  createNamespace,
} from "./calendar";
import { computed, ref } from "vue";
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData.js";
dayjs.extend(localeData);

const props = defineProps({
  modelValue: [String, Number, Date],
  selectedTime: {
    type: Array<string>,
    default: [],
  },
});
const emit = defineEmits(["update:modelValue"]);
const { n } = createNamespace("calendar");

const title = computed(() => date.value.format("YYYY年MM月DD日"));

const changeYear = (direction: "prev" | "next") => {
  if (direction === "prev") {
    date.value = date.value.subtract(1, "year");
  } else {
    date.value = date.value.add(1, "year");
  }
};

const changeMonth = (direction: "prev" | "next") => {
  if (direction === "prev") {
    date.value = date.value.subtract(1, "month");
  } else {
    date.value = date.value.add(1, "month");
  }
};

const selectedDay = ref<Dayjs>();
const date = computed<Dayjs>({
  get: () => {
    return props.modelValue
      ? dayjs(props.modelValue)
      : dayjs(selectedDay.value);
  },
  set: (val) => {
    selectedDay.value = val;
    emit("update:modelValue", val.toDate());
  },
});
const tableRows = ref<DateCell[][]>([[], [], [], [], [], []]);

// 使用dayjs获取weekdays
const WEEKS_CONSTANT = computed(() =>
  date.value
    .locale("en")
    .localeData()
    .weekdaysShort()
    .map((_) => _.toLowerCase())
);
// 表头数据
// const WEEKS = computed(() => WEEKS_CONSTANT.value.map(w => w[0].toUpperCase() + w.substring(1)))
const WEEKS = computed(() => [
  "周一",
  "周二",
  "周三",
  "周四",
  "周五",
  "周六",
  "周日",
]);
// 表格开始日期
const startDate = computed(() => {
  const startDayOfMonth = date.value.startOf("month");
  return startDayOfMonth.subtract(startDayOfMonth.day() || 7, "day");
});

// 表格数据
const rows = computed(() => {
  const rows_ = tableRows.value;
  const cols = WEEKS.value.length;

  // 当前选中的日期
  const cur = date.value;
  // 当月第一天
  const monthstartDay = cur.startOf("month").day();
  // 当月最后一天
  const lastDate = cur.endOf("month").date();

  let count = 1;
  // 循环填充表格，6行7列
  for (let row = 0; row < tableRows.value.length; row++) {
    for (let col = 0; col < cols; col++) {
      const cellDate = startDate.value.add(count, "day");
      let text;
      text = cellDate.date();
      if (cellDate.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")) {
        text = "今";
      }
      // 是否选中
      const isSelected =
        cellDate.format("YYYY-MM-DD") === date.value.format("YYYY-MM-DD");
      // 默认当月日期
      let type: DateCellType = "normal";
      if (count < monthstartDay) {
        // 上个月日期
        type = "prev-month";
      } else if (count - monthstartDay >= lastDate) {
        // 下个月日期
        type = "next-month";
      } else if (text === "今") {
        // 今天
        type = "today";
      }
      let drop: DropType = "none";
      if (props.selectedTime.includes(cellDate.format("YYYY-MM-DD"))) {
        // 上个月日期
        drop = "drop";
      }

      rows_[row][col] = {
        type,
        date: cellDate,
        text,
        isSelected,
        drop,
      };
      count++;
    }
  }

  return rows_;
});
const handleDate = (col: any, colkey: any) => {
  date.value = dayjs(col.date);
  console.log(col, "col", colkey, "colkey");
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.es-calendar {
  --es-calendar-light-bg: #242729;
  --es-calendar-light-color: #fff;

  --es-color-primary: #0078d7;
  --es-text-color: black;
  --es-calendar-color-bg: var(--es-calendar-black-bg);

  width: 100%;
  // background-color: var(--es-calendar-color-bg);
  // background-color: pink;
  color: var(--es-text-color);
  padding: 10px;
  font-size: 14px;

  &__head {
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    height: 14px;
    font-size: 14px;
    font-family: SourceHanSansSC, SourceHanSansSC;
    font-weight: bold;
    color: #333333;
    line-height: 14px;
    &-left {
      margin-right: 15px;
      cursor: pointer;
    }
    &-right {
      margin-left: 15px;
      cursor: pointer;
    }
  }
  &__body {
    position: relative;
    overflow: hidden;
  }

  &__table {
    position: relative;
    width: 100%;
    //   background-color: var(--es-calendar-color-bg);
    // background-color: pink;
    border-collapse: collapse;
  }
  th {
    position: relative;
    width: 50px;
    height: 50px;
  }
  &__col-title {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    width: 100%;
    height: 100%;
    //   background-color: var(--es-calendar-color-bg);
    // background-color: pink;
  }
  &__col {
    position: relative;
    width: 50px;
    height: 55px;
    font-size: 14px;
    border-top: 2px solid #f5f5f5; //上下边框线
    border-bottom: 2px solid #f5f5f5;
    //   border-top: 1px solid pink;
    //   border-bottom: 1px solid pink;
    &.selected {
      .es-calendar__col-wrap {
        //   border: 2px solid var(--es-color-primary);
        .es-calendar__col-wrap-box {
          border-color: var(--es-calendar-color-bg);
        }
        .es-calendar__col-inner {
          // width: 30px;
          // height: 30px;
          // border-radius: 50%;
          // background-color: var(--es-color-primary);
          border: 1px solid var(--es-color-primary);
        }
      }
    }

    &.next-month,
    &.prev-month {
      color: #5b5b5b;
    }
  }
  &__col-wrap {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    //   border: 1px solid var(--es-calendar-color-bg);
    // background-color: pink;
    cursor: pointer;
    &:hover {
      .es-calendar__col-inner {
        border: 1px solid var(--es-color-primary);
      }
    }
    &-box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .es-calendar__col-inner {
      width: 33px;
      height: 33px;
      margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      &.today {
        width: 33px;
        height: 33px;
        margin-top: 5px;
        color: #fff;
        border-radius: 50%;
        background-color: var(--es-color-primary);
      }
    }
    .es-calendar__col-drop {
      width: 4px;
      height: 4px;
      &.drop {
        margin-top: 5px;
        border-radius: 50%;
        background-color: var(--es-color-primary);
      }
    }
  }
}
.year-button {
  cursor: pointer;
  margin: 0 10px;
  font-weight: bold;
  font-size: 14px;
  display: inline-block;
  padding: 0 10px;
}
</style>
