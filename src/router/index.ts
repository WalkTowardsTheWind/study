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
  {
    path: "/demo",
    component: Layout,
    children: [
      {
        path: "demo1",
        component: () => import("@/views/Ademo/demo.vue"),
        name: "test2",
        meta: { title: "demo", icon: "homepage", affix: true },
      },
    ],
  },
  // 合同中心
  {
    path: "/contractCenter",
    component: Layout,
    redirect: "/contractCenter",
    meta: { title: "合同中心", icon: "homepage" },
    children: [
      {
        path: "contractCenter",
        component: () => import("@/views/contractCenter/index.vue"),
        name: "contractCenter",
        meta: { title: "合同中心", icon: "homepage" },
      },
      {
        path: "enterpriseContractAdd",
        component: () =>
          import(
            "@/views/contractCenter/enterpriseContract/enterpriseContractAdd.vue"
          ),
        name: "enterpriseContractAdd",
        meta: { title: "企业合同新建", icon: "homepage", hidden: true }, //hidden: true
      },
      {
        path: "enterpriseContractEdit",
        component: () =>
          import(
            "@/views/contractCenter/enterpriseContract/enterpriseContractEdit.vue"
          ),
        name: "enterpriseContractEdit",
        meta: { title: "企业合同编辑", icon: "homepage", hidden: true }, //hidden: true
      },
      {
        path: "enterpriseContractDetails",
        component: () =>
          import(
            "@/views/contractCenter/enterpriseContract/enterpriseContractDetails.vue"
          ),
        name: "enterpriseContractDetails",
        meta: { title: "企业合同详情", icon: "homepage", hidden: true }, //hidden: true
      },
      {
        path: "channelContractAdd",
        component: () =>
          import(
            "@/views/contractCenter/channelContract/channelContractAdd.vue"
          ),
        name: "channelContractAdd",
        meta: { title: "渠道合同新建", icon: "homepage", hidden: true },
      },
      {
        path: "channelContractEdit",
        component: () =>
          import(
            "@/views/contractCenter/channelContract/channelContractEdit.vue"
          ),
        name: "channelContractEdit",
        meta: { title: "渠道合同编辑", icon: "homepage", hidden: true }, //hidden: true
      },
      {
        path: "channelContractDetails",
        component: () =>
          import(
            "@/views/contractCenter/channelContract/channelContractDetails.vue"
          ),
        name: "channelContractDetails",
        meta: { title: "渠道合同详情", icon: "homepage", hidden: true }, //hidden: true
      },
      {
        path: "taxContractAdd",
        component: () =>
          import("@/views/contractCenter/taxContract/taxContractAdd.vue"),
        name: "taxContractAdd",
        meta: { title: "供应合同新建", icon: "homepage", hidden: true },
      },
      {
        path: "taxContractEdit",
        component: () =>
          import("@/views/contractCenter/taxContract/taxContractEdit.vue"),
        name: "taxContractEdit",
        meta: { title: "供应合同编辑", icon: "homepage", hidden: true }, //hidden: true
      },
      {
        path: "taxContractDetails",
        component: () =>
          import("@/views/contractCenter/taxContract/taxContractDetails.vue"),
        name: "taxContractDetails",
        meta: { title: "供应合同详情", icon: "homepage", hidden: true }, //hidden: true
      },
      // {
      //   path: "enterprise-contract",
      //   component: () =>
      //     import("@/views/contractCenter/enterpriseContract/index.vue"),
      //   name: "enterprise-contract",
      //   meta: { title: "企业合同", icon: "homepage" },
      // },
      // {
      //   path: "channel-contract",
      //   component: () =>
      //     import("@/views/contractCenter/channelContract/index.vue"),
      //   name: "channel-contract",
      //   meta: { title: "渠道合同", icon: "homepage" },
      // },
      // {
      //   path: "tax-contract",
      //   component: () => import("@/views/contractCenter/taxContract/index.vue"),
      //   name: "tax-contract",
      //   meta: { title: "税地合同", icon: "homepage" },
      // },
    ],
  },
  // 资产
  {
    path: "/settlementCenter",
    component: Layout,
    redirect: "/settlementCenter",
    meta: { title: "结算中心", icon: "homepage" },
    children: [
      {
        path: "settlementCenter",
        component: () => import("@/views/settlementCenter/index.vue"),
        name: "settlementCenter",
        meta: { title: "结算中心", icon: "homepage" },
      },
      {
        path: "enterpriseSettlementDetails",
        component: () =>
          import(
            "@/views/settlementCenter/enterpriseSettlement/enterpriseSettlementDetails.vue"
          ),
        name: "enterpriseSettlementDetails",
        meta: { title: "企业结算详情", icon: "homepage" },
      },
      // {
      //   path: "enterprise-settlement",
      //   component: () =>
      //     import("@/views/settlementCenter/enterpriseSettlement/index.vue"),
      //   name: "enterprise-settlement",
      //   meta: { title: "企业结算", icon: "homepage" },
      // },
      // {
      //   path: "channel-settlement",
      //   component: () =>
      //     import("@/views/settlementCenter/channelSettlement/index.vue"),
      //   name: "channel-settlement",
      //   meta: { title: "渠道结算", icon: "homepage" },
      // },
    ],
  },
  {
    path: "/taxLandManagement",
    component: Layout,
    redirect: "/taxLandManagement",
    meta: { title: "税地管理", icon: "homepage" },
    children: [
      {
        path: "taxLandManagement",
        component: () => import("@/views/taxLandManagement/index.vue"),
        name: "taxLandManagementIndex",
        meta: { title: "税地管理", icon: "homepage", affix: true },
      },
      {
        path: "selfOperatedTaxLandAdd",
        component: () =>
          import(
            "@/views/taxLandManagement/selfOperatedTaxLand/selfOperatedTaxLandAdd.vue"
          ),
        name: "selfOperatedTaxLandAdd",
        meta: { title: "新建税地", icon: "homepage", affix: true },
      },
      {
        path: "selfOperatedTaxLandEdit",
        component: () =>
          import(
            "@/views/taxLandManagement/selfOperatedTaxLand/selfOperatedTaxLandEdit.vue"
          ),
        name: "selfOperatedTaxLandEdit",
        meta: { title: "编辑税地", icon: "homepage", affix: true },
      },
      {
        path: "selfOperatedTaxLandDetails",
        component: () =>
          import(
            "@/views/taxLandManagement/selfOperatedTaxLand/selfOperatedTaxLandDetails.vue"
          ),
        name: "selfOperatedTaxLandDetails",
        meta: { title: "税地详情", icon: "homepage", affix: true },
      },
    ],
  },
  {
    path: "/taskManager",
    component: Layout,
    meta: { title: "任务管理", icon: "homepage" },
    children: [
      {
        path: "index",
        component: () => import("@/views/taskManager/index.vue"),
        name: "taskManagerIndex",
        meta: { title: "任务中心", icon: "homepage", affix: true },
      },
      {
        path: "log",
        component: () => import("@/views/system/log/index.vue"),
        name: "log",
        meta: { title: "日志中心", icon: "homepage", affix: true },
      },
      {
        path: "account",
        component: () => import("@/views/system/account/index.vue"),
        name: "account",
        meta: { title: "账号设置", icon: "homepage", affix: true },
      },
      {
        path: "addRole",
        component: () => import("@/views/system/role/roleView.vue"),
        name: "addRole",
        meta: { title: "新增角色", hidden: true },
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
