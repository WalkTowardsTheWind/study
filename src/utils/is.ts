const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== "undefined";
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, "Object");
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

export function isDate(val: unknown): val is Date {
  return is(val, "Date");
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

export function isNumber(val: unknown): val is number {
  return is(val, "Number");
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    is(val, "Promise") &&
    isObject(val) &&
    isFunction(val.then) &&
    isFunction(val.catch)
  );
}

export function isString(val: unknown): val is string {
  return is(val, "String");
}

export function isFunction(val: unknown): val is () => any {
  return typeof val === "function";
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, "Boolean");
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, "RegExp");
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isWindow(val: any): val is Window {
  return typeof window !== "undefined" && is(val, "Window");
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName;
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, "Map");
}

export const isServer = typeof window === "undefined";

export const isClient = !isServer;

export function isUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return reg.test(path);
}

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};

export function isPwd(pwd: string): boolean {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,16}$/;
  return reg.test(pwd);
}

/** 是否图片格式
 * @param {Object} value
 */
export function isImage(value: string) {
  const newValue = value.split("?")[0];
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|ico)/i;
  return IMAGE_REGEXP.test(newValue);
}

export function isPdf(value: string) {
  const newValue = value.split("?")[0];
  const PDF_REGEXP = /\.(pdf)/i;
  return PDF_REGEXP.test(newValue);
}
export function isBase64(value: string) {
  return value.indexOf("data:") != -1 && value.indexOf("base64") != -1;
}
