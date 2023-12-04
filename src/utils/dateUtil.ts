/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from "dayjs";

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
const DATE_FORMAT = "YYYY-MM-DD";

export function formatToDateTime(
  date?: dayjs.ConfigType,
  format = DATE_TIME_FORMAT
): string {
  return dayjs(date).format(format);
}

export function formatToDate(
  date?: dayjs.ConfigType,
  format = DATE_FORMAT
): string {
  return dayjs(date).format(format);
}

export const shortcuts = [
  {
    text: "今年",
    value: () => {
      const end = dayjs().endOf("year").format();
      const start = dayjs().startOf("year").format();
      return [start, end];
    },
  },
  {
    text: "去年",
    value: () => {
      const end = dayjs().endOf("year").subtract(1, "y").format();
      const start = dayjs().startOf("year").subtract(1, "y").format();
      return [start, end];
    },
  },
  {
    text: "上周",
    value: () => {
      const end = dayjs().endOf("week").subtract(1, "w").format();
      const start = dayjs().startOf("week").subtract(1, "w").format();
      return [start, end];
    },
  },
  {
    text: "本周",
    value: () => {
      const end = dayjs().endOf("week").format();
      const start = dayjs().startOf("week").format();
      return [start, end];
    },
  },
  {
    text: "上月",
    value: () => {
      const end = dayjs().endOf("month").subtract(1, "M").format();
      const start = dayjs().startOf("month").subtract(1, "M").format();
      return [start, end];
    },
  },
  {
    text: "本月",
    value: () => {
      const end = dayjs().endOf("month").format();
      const start = dayjs().startOf("month").format();
      return [start, end];
    },
  },
];

export const dateUtil = dayjs;
