import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/demo",
    component: () => import("@/views/login/demo.vue"),
    meta: { hidden: true },
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "dashboard", icon: "homepage", affix: true },
      },
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        meta: { hidden: true },
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        meta: { hidden: true },
      },
    ],
  },
  {
    path: "/test",
    component: Layout,
    children: [
      {
        path: "test2",
        component: () => import("@/views/test/index.vue"),
        name: "test2",
        meta: { title: "测试", icon: "homepage", affix: true },
      },
    ],
  },
  // 合同中心
  {
    path: "/contractCenter",
    component: Layout,
    meta: { title: "合同中心", icon: "homepage" },
    children: [
      {
        path: "enterprise-contract",
        component: () =>
          import("@/views/contractCenter/enterpriseContract/index.vue"),
        name: "enterprise-contract",
        meta: { title: "企业合同", icon: "homepage" },
      },
      {
        path: "channel-contract",
        component: () =>
          import("@/views/contractCenter/channelContract/index.vue"),
        name: "channel-contract",
        meta: { title: "渠道合同", icon: "homepage" },
      },
      {
        path: "tax-contract",
        component: () => import("@/views/contractCenter/taxContract/index.vue"),
        name: "tax-contract",
        meta: { title: "税地合同", icon: "homepage" },
      },
    ],
  },
  // 结算中心
  {
    path: "/settlementCenter",
    component: Layout,
    meta: { title: "结算中心", icon: "homepage" },
    children: [
      {
        path: "enterprise-settlement",
        component: () =>
          import("@/views/settlementCenter/enterpriseSettlement/index.vue"),
        name: "enterprise-settlement",
        meta: { title: "企业结算", icon: "homepage" },
      },
      {
        path: "channel-settlement",
        component: () =>
          import("@/views/settlementCenter/channelSettlement/index.vue"),
        name: "channel-settlement",
        meta: { title: "渠道结算", icon: "homepage" },
      },
    ],
  },
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
  location.reload();
}

export default router;
