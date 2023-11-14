import type { DirectiveBinding } from "vue";
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding, vnode) {
    const { max = 8, decimal = 2 } = binding.value;
    let input = vnode.el;
    if (input.tagName !== "INPUT") {
      input = input.querySelector("input");
    }
    if (!input) return;
    input.addEventListener("compositionstart", () => {
      vnode.inputLocking = true;
    });
    input.addEventListener("compositionend", () => {
      vnode.inputLocking = false;
      input.dispatchEvent(new Event("input"));
    });
    input.addEventListener(
      "input",
      (e) => {
        e.preventDefault(); // 阻止掉默认的change事件
        if (vnode.inputLocking) {
          return;
        }
        const oldValue = input.value;
        let newValue = input.value;
        newValue = newValue.replace(/[^\d.]/g, "");
        newValue = newValue.replace(/^\./g, "");
        newValue = newValue
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
        const _decimal = Number(decimal) || 2; // 默认两位小数
        const reg = new RegExp(`^(\\-)*(\\d+)\\.(\\d{${_decimal}}).*$`);
        newValue = newValue.replace(reg, "$1$2.$3");
        if (newValue) {
          const arr = newValue.split(".");
          newValue =
            Number(arr[0]) + (arr[1] === undefined ? "" : "." + arr[1]); // 去掉开头多余的0
          if (max && arr[0].length > max) {
            newValue =
              Number(arr[0].slice(0, max)) +
              (arr[1] === undefined ? "" : "." + arr[1]); // 去掉开头多余的0
          }
        }
        // 判断是否需要更新，避免进入死循环
        if (newValue !== oldValue) {
          input.value = newValue;
          input.dispatchEvent(new Event("input")); // 通知v-model更新
        }
      },
      true
    );
    // input 事件无法处理小数点后面全是零的情况 因为无法确定用户输入的0是否真的应该清除，如3.02。放在blur中去处理
    input.addEventListener("blur", () => {
      const oldValue = input.value;
      let newValue = input.value;
      if (newValue) {
        newValue = Number(newValue).toString();
      }
      // 判断是否需要更新，避免进入死循环
      if (newValue !== oldValue) {
        input.value = newValue;
        input.dispatchEvent(new Event("input")); // 通知v-model更新
      }
    });
  },
};
