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
        path: "supplyContractAdd",
        component: () =>
          import("@/views/contractCenter/supplyContract/supplyContractAdd.vue"),
        name: "supplyContractAdd",
        meta: { title: "供应合同新建", icon: "homepage", hidden: true },
      },
      {
        path: "supplyContractEdit",
        component: () =>
          import(
            "@/views/contractCenter/supplyContract/supplyContractEdit.vue"
          ),
        name: "supplyContractEdit",
        meta: { title: "供应合同编辑", icon: "homepage", hidden: true }, //hidden: true
      },
      {
        path: "supplyContractDetails",
        component: () =>
          import(
            "@/views/contractCenter/supplyContract/supplyContractDetails.vue"
          ),
        name: "supplyContractDetails",
        meta: { title: "供应合同详情", icon: "homepage", hidden: true }, //hidden: true
      },
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
      {
        path: "enterpriseSettlementA",
        component: () =>
          import(
            "@/views/settlementCenter/enterpriseSettlement/enterpriseSettlementA.vue"
          ),
        name: "enterpriseSettlementA",
        meta: { title: "企业", icon: "homepage" },
      },
      {
        path: "channelSettlementA",
        component: () =>
          import(
            "@/views/settlementCenter/channelSettlement/channelSettlementA.vue"
          ),
        name: "channelSettlementA",
        meta: { title: "渠道佣金介绍", icon: "homepage" },
      },
      {
        path: "channelSettlementB",
        component: () =>
          import(
            "@/views/settlementCenter/channelSettlement/channelSettlementB.vue"
          ),
        name: "channelSettlementB",
        meta: { title: "任务", icon: "homepage" },
      },
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
        meta: { title: "税地管理", icon: "homepage" },
      },
      {
        path: "selfOperatedTaxLandAdd",
        component: () =>
          import(
            "@/views/taxLandManagement/selfOperatedTaxLand/selfOperatedTaxLandAdd.vue"
          ),
        name: "selfOperatedTaxLandAdd",
        meta: { title: "新建自营税地", icon: "homepage" },
      },
      {
        path: "selfOperatedTaxLandEdit",
        component: () =>
          import(
            "@/views/taxLandManagement/selfOperatedTaxLand/selfOperatedTaxLandEdit.vue"
          ),
        name: "selfOperatedTaxLandEdit",
        meta: { title: "编辑自营税地", icon: "homepage" },
      },
      {
        path: "selfOperatedTaxLandDetails",
        component: () =>
          import(
            "@/views/taxLandManagement/selfOperatedTaxLand/selfOperatedTaxLandDetails.vue"
          ),
        name: "selfOperatedTaxLandDetails",
        meta: { title: "自营税地详情", icon: "homepage" },
      },
      {
        path: "purchaseTaxLandAdd",
        component: () =>
          import(
            "@/views/taxLandManagement/purchaseTaxLand/purchaseTaxLandAdd.vue"
          ),
        name: "purchaseTaxLandAdd",
        meta: { title: "新建采购税地", icon: "homepage" },
      },
      {
        path: "selfOperatedTaxLandEdit",
        component: () =>
          import(
            "@/views/taxLandManagement/purchaseTaxLand/purchaseTaxLandEdit.vue"
          ),
        name: "purchaseTaxLandEdit",
        meta: { title: "编辑采购税地", icon: "homepage" },
      },
      {
        path: "selfOperatedTaxLandDetails",
        component: () =>
          import(
            "@/views/taxLandManagement/purchaseTaxLand/purchaseTaxLandDetails.vue"
          ),
        name: "purchaseTaxLandDetails",
        meta: { title: "采购税地详情", icon: "homepage" },
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
        meta: { title: "任务中心", icon: "homepage" },
      },
      {
        path: "view",
        component: () => import("@/views/taskManager/taskView.vue"),
        name: "taskManagerView",
        meta: { title: "任务详情", hidden: true },
      },
    ],
  },
  {
    path: "/invoice",
    component: Layout,
    meta: { title: "发票中心", icon: "homepage" },
    children: [
      {
        path: "manager",
        component: () => import("@/views/invoice/invoiceManager/index.vue"),
        name: "invoiceManager",
        meta: { title: "发票管理", icon: "homepage" },
      },
      {
        path: "invoiceView",
        component: () => import("@/views/invoice/invoiceManager/view.vue"),
        name: "invoiceView",
        meta: { title: "发票详情", hidden: true },
      },
    ],
  },
  {
    path: "/system",
    component: Layout,
    meta: { title: "系统设置", icon: "homepage" },
    children: [
      {
        path: "role",
        component: () => import("@/views/system/role/index.vue"),
        name: "roleIndex",
        meta: { title: "角色管理", icon: "homepage" },
      },
      {
        path: "addRole",
        component: () => import("@/views/system/role/roleView.vue"),
        name: "addRole",
        meta: { title: "新增角色", hidden: true },
      },
      {
        path: "menu",
        component: () => import("@/views/system/menu/index.vue"),
        name: "menuIndex",
        meta: { title: "菜单管理", icon: "homepage" },
      },
      {
        path: "log",
        component: () => import("@/views/system/log/index.vue"),
        name: "log",
        meta: { title: "日志中心", icon: "homepage" },
      },
      {
        path: "account",
        component: () => import("@/views/system/account/index.vue"),
        name: "account",
        meta: { title: "账号设置", hidden: true },
      },
    ],
  },
  // 账户管理模块
  {
    path: "/account-management",
    component: Layout,
    name: "account-management",
    children: [
      {
        path: "business-account",
        component: () => import("@/views/account-management/index.vue"),
        name: "business-account",
        meta: { title: "账户管理", icon: "homepage" },
      },
      {
        path: "business-account-detail",
        component: () =>
          import("@/views/account-management/business/detail-or-edit.vue"),
        name: "business-account-detail",
        meta: {
          hidden: true,
        },
      },
      {
        path: "business-account-add",
        component: () => import("@/views/account-management/business/add.vue"),
        name: "business-account-add",
        meta: {
          hidden: true,
        },
      },
      {
        path: "channel-account-detail",
        component: () =>
          import("@/views/account-management/channel/detail-or-edit.vue"),
        name: "channel-account-detail",
        meta: {
          hidden: true,
        },
      },
      {
        path: "channel-account-add",
        component: () => import("@/views/account-management/channel/add.vue"),
        name: "channel-account-add",
        meta: {
          hidden: true,
        },
      },
      {
        path: "personal-account",
        component: () =>
          import("@/views/account-management/personal/index.vue"),
        name: "personal-account",
        meta: {
          hidden: true,
        },
      },
      {
        path: "personal-account-detail",
        component: () =>
          import("@/views/account-management/personal/detail-or-edit.vue"),
        name: "personal-account-detail",
        meta: {
          hidden: true,
        },
      },
    ],
  },
  {
    path: "/asset-management",
    component: Layout,
    meta: { title: "资产管理", icon: "homepage" },
    children: [
      {
        path: "index",
        component: () => import("@/views/asset-management/index.vue"),
        name: "asset-management",
        meta: { title: "资产管理", icon: "homepage" },
      },
      {
        path: "detail",
        component: () => import("@/views/asset-management/detail.vue"),
        name: "asset-management-detail",
        meta: { hidden: true },
      },
    ],
  },

  {
    path: "/recharge-center",
    component: Layout,
    meta: { title: "充值中心", icon: "homepage" },
    children: [
      {
        path: "index",
        component: () => import("@/views/recharge-center/index.vue"),
        name: "recharge-center",
        meta: { title: "充值中心", icon: "homepage" },
      },
      {
        path: "detail",
        component: () => import("@/views/recharge-center/detail.vue"),
        name: "recharge-center-detail",
        meta: { hidden: true },
      },
    ],
  },
  {
    path: "/channel-commission",
    component: Layout,
    meta: { title: "渠道佣金", icon: "homepage" },
    children: [
      {
        path: "index",
        component: () => import("@/views/channel-commission/index.vue"),
        name: "channel-commission",
        meta: { title: "渠道佣金", icon: "homepage" },
      },
    ],
  },
  // 类目
  {
    path: "/category-management",
    component: Layout,
    meta: { title: "类目管理", icon: "homepage" },
    children: [
      {
        path: "index",
        component: () => import("@/views/category-management/index.vue"),
        name: "category-management",
        meta: { title: "类目管理", icon: "homepage" },
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
