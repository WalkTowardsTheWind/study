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
  console.log(params, "222");
  const _params = JSON.parse(JSON.stringify(params));
  if (_params[oldField] && _params[oldField].length) {
    _params.start_time = _params[oldField][0] || "";
    _params.end_time = _params[oldField][1] || "";
  }
  if (isTime) {
    _params.start_time = _params.start_time
      ? new Date(_params.start_time).getTime().toString().substring(0, 10)
      : "";
    _params.end_time = _params.end_time
      ? new Date(_params.end_time).getTime().toString().substring(0, 10)
      : "";
  }
  delete _params[oldField];
  return _params;
}
