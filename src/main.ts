import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { setupStore } from "@/store";
import { setupDirective } from "@/directive";
import { currencyFormat } from "@/utils";

import "@/permission";

// 本地SVG图标
import "virtual:svg-icons-register";

// 国际化
import i18n from "@/lang/index";
// @ts-ignore
import enums from "@/enums/index";

// 样式
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
import "uno.css";

const app = createApp(App);
app.config.globalProperties.$moneyFormat = (value: any, precision = 2) => {
  return currencyFormat(value, precision);
};
// 全局注册 自定义指令(directive)
setupDirective(app);
// 全局注册 状态管理(store)
setupStore(app);

app.use(router).use(i18n).use(enums).mount("#app");
