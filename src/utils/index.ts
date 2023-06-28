import { isNumber, isStringNumber, isString } from "@/utils/is";
import { dateUtil } from "./dateUtil";

/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
}

export function transformTimeRange(
  params: any,
  oldField = "timeData",
  isTime = false
) {
  const _params = JSON.parse(JSON.stringify(params));
  if (_params[oldField] && _params[oldField].length) {
    _params.start_time = _params[oldField][0] || "";
    _params.end_time = _params[oldField][1] || "";
  }
  if (isTime) {
    console.log(_params.end_time);
    _params.start_time = _params.start_time
      ? dateUtil(_params.start_time).unix()
      : "";
    _params.end_time = _params.end_time
      ? dateUtil(_params.end_time)
          .add(24 * 60 - 1, "minute")
          .unix()
      : "";
  }
  delete _params[oldField];
  return _params;
}

export function getPercentValue(arrList, index, precision) {
  if (!arrList[index]) {
    return 0;
  }
  if (!precision) precision = 2;
  const sum = arrList.reduce((acc, val) => {
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
  if (sum === 0) {
    return 0;
  }
  const digits = Math.pow(10, precision);
  const votesPerQuota = arrList.map((val) => {
    return ((isNaN(val) ? 0 : val) / sum) * digits * 100;
  });

  const targetSeats = digits * 100;
  const seats = votesPerQuota.map((votes) => {
    return Math.floor(votes);
  });

  let currentSum = seats.reduce((acc, val) => {
    return acc + val;
  }, 0);

  const remainder = votesPerQuota.map(function (votes, index) {
    return votes - seats[index];
  });

  while (currentSum < targetSeats) {
    let max = Number.NEGATIVE_INFINITY;
    let maxId = null;
    for (let i = 0, len = remainder.length; i < len; ++i) {
      if (remainder[i] > max) {
        max = remainder[i];
        maxId = i;
      }
    }
    ++seats[maxId];
    remainder[maxId] = 0;
    ++currentSum;
  }

  return seats[index] / digits;
}

export function addUnit(value?: string | number, defaultUnit = "px") {
  if (!value) return "";
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
}
