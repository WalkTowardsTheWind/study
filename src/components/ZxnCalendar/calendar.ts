import type { Dayjs } from "dayjs";

export function createNamespace(name: string) {
  const namespace = `es-${name}`;

  const createBEM = (suffix?: string): string => {
    if (!suffix) return namespace;
    return suffix.startsWith("--")
      ? `${namespace}${suffix}`
      : `${namespace}__${suffix}`;
  };

  return {
    n: createBEM,
  };
}

export type DateCellType =
  | "normal"
  | "today"
  | "week"
  | "next-month"
  | "prev-month"
  | "drop";
export type DropType = "drop" | "none";
export interface DateCell {
  text?: number | string;
  isSelected?: boolean;
  date: Dayjs;
  type?: DateCellType;
  drop?: DropType;
}
