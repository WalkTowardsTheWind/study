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
    name: "dashboard",
    meta: { title: "首页", icon: "dashboard" },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "工作台", affix: true },
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
  // 账户管理
  {
    path: "/accountManage",
    component: Layout,
    meta: { title: "账户管理", icon: "account" },
    children: [
      {
        path: "business-account",
        component: () => import("@/views/account-management/index.vue"),
        name: "business-account",
        meta: { title: "账户中心" },
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
      // {
      // 	path: "personal-account",
      // 	component: () =>
      // 		import("@/views/account-management/personal/index.vue"),
      // 	name: "personal-account",
      // 	meta: {
      // 		hidden: true,
      // 	},
      // },
      {
        path: "personal-account-detail",
        component: () =>
          import("@/views/account-management/personal/detail-or-edit.vue"),
        name: "personal-account-detail",
        meta: {
          hidden: true,
        },
      },
      {
        path: "contractCenter",
        component: () => import("@/views/contractCenter/index.vue"),
        name: "contractCenter",
        meta: { title: "合同中心" },
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
  // 任务中心
  {
    path: "/taskManager",
    component: Layout,
    meta: { title: "任务管理", icon: "task" },
    children: [
      {
        path: "index",
        component: () => import("@/views/taskManager/index.vue"),
        name: "taskManagerIndex",
        meta: { title: "任务中心", keepAlive: true },
      },
      {
        path: "view",
        component: () => import("@/views/taskManager/taskView.vue"),
        name: "taskManagerView",
        meta: { title: "任务详情", hidden: true },
      },
    ],
  },
  // 财务
  {
    path: "/assetManagement",
    component: Layout,
    meta: { title: "财务管理", icon: "asset" },
    children: [
      {
        path: "assetIndex",
        component: () => import("@/views/asset-management/index.vue"),
        name: "asset-management",
        meta: { title: "财务中心" },
      },
      {
        path: "asset-management-detail",
        component: () => import("@/views/asset-management/detail.vue"),
        name: "asset-management-detail",
        meta: { hidden: true },
      },
      {
        path: "recharge-detail",
        component: () =>
          import("@/views/asset-management/components/recharge-detail.vue"),
        name: "recharge-detail",
        meta: { hidden: true, title: "企业列表详情" },
      },
      {
        path: "rechargeIndex",
        component: () => import("@/views/recharge-center/index.vue"),
        name: "recharge-center",
        meta: { title: "充值中心" },
      },
      {
        path: "rechargeDetail",
        component: () => import("@/views/recharge-center/detail.vue"),
        name: "recharge-center-detail",
        meta: { hidden: true },
      },
      {
        path: "settlementCenter",
        component: () => import("@/views/settlementCenter/index.vue"),
        name: "settlementCenter",
        meta: { title: "结算中心" },
      },
      {
        path: "enterpriseSettlementDetails",
        component: () =>
          import(
            "@/views/settlementCenter/enterpriseSettlement/enterpriseSettlementDetails.vue"
          ),
        name: "enterpriseSettlementDetails",
        meta: { title: "企业结算详情", hidden: true },
      },
      {
        path: "enterpriseSettlementA",
        component: () =>
          import(
            "@/views/settlementCenter/enterpriseSettlement/enterpriseSettlementA.vue"
          ),
        name: "enterpriseSettlementA",
        meta: { title: "企业", hidden: true },
      },
      {
        path: "channelSettlementA",
        component: () =>
          import(
            "@/views/settlementCenter/channelSettlement/channelSettlementA.vue"
          ),
        name: "channelSettlementA",
        meta: { title: "渠道佣金介绍", hidden: true },
      },
      {
        path: "channelSettlementB",
        component: () =>
          import(
            "@/views/settlementCenter/channelSettlement/channelSettlementB.vue"
          ),
        name: "channelSettlementB",
        meta: { title: "任务", hidden: true },
      },
    ],
  },
  // 发票
  {
    path: "/invoice",
    component: Layout,
    meta: { title: "发票管理", icon: "invoice" },
    children: [
      {
        path: "manager",
        component: () => import("@/views/invoice/invoiceManager/index.vue"),
        name: "invoiceManager",
        meta: { title: "发票中心", keepAlive: true },
      },
      {
        path: "invoiceView",
        component: () => import("@/views/invoice/invoiceManager/view.vue"),
        name: "invoiceView",
        meta: { title: "发票详情", hidden: true },
      },
    ],
  },
  // 帨地
  {
    path: "/taxLandManagement",
    component: Layout,
    redirect: "/taxLandManagement",
    meta: { title: "税地管理", icon: "taxLand" },
    children: [
      {
        path: "taxLandManagement",
        component: () => import("@/views/taxLandManagement/index.vue"),
        name: "taxLandManagementIndex",
        meta: { title: "税地管理" },
      },
      {
        path: "selfOperatedTaxLandAdd",
        component: () =>
          import(
            "@/views/taxLandManagement/selfOperatedTaxLand/selfOperatedTaxLandAdd.vue"
          ),
        name: "selfOperatedTaxLandAdd",
        meta: { title: "新建自营税地", hidden: true },
      },
      {
        path: "selfOperatedTaxLandEdit",
        component: () =>
          import(
            "@/views/taxLandManagement/selfOperatedTaxLand/selfOperatedTaxLandEdit.vue"
          ),
        name: "selfOperatedTaxLandEdit",
        meta: { title: "编辑自营税地", hidden: true },
      },
      {
        path: "selfOperatedTaxLandDetails",
        component: () =>
          import(
            "@/views/taxLandManagement/selfOperatedTaxLand/selfOperatedTaxLandDetails.vue"
          ),
        name: "selfOperatedTaxLandDetails",
        meta: { title: "自营税地详情", hidden: true },
      },
      {
        path: "purchaseTaxLandAdd",
        component: () =>
          import(
            "@/views/taxLandManagement/purchaseTaxLand/purchaseTaxLandAdd.vue"
          ),
        name: "purchaseTaxLandAdd",
        meta: { title: "新建采购税地", hidden: true },
      },
      {
        path: "selfOperatedTaxLandEdit",
        component: () =>
          import(
            "@/views/taxLandManagement/purchaseTaxLand/purchaseTaxLandEdit.vue"
          ),
        name: "purchaseTaxLandEdit",
        meta: { title: "编辑采购税地", hidden: true },
      },
      {
        path: "selfOperatedTaxLandDetails",
        component: () =>
          import(
            "@/views/taxLandManagement/purchaseTaxLand/purchaseTaxLandDetails.vue"
          ),
        name: "purchaseTaxLandDetails",
        meta: { title: "采购税地详情", hidden: true },
      },
    ],
  },
  // 类目
  {
    path: "/category-management",
    component: Layout,
    meta: { title: "类目管理", icon: "category" },
    children: [
      {
        path: "index",
        component: () => import("@/views/category-management/index.vue"),
        name: "category-management",
        meta: { title: "类目中心" },
      },
    ],
  },
  // 系统设置
  {
    path: "/system",
    component: Layout,
    meta: { title: "系统设置", icon: "system" },
    children: [
      {
        path: "role",
        component: () => import("@/views/system/role/index.vue"),
        name: "roleIndex",
        meta: { title: "角色管理" },
      },
      {
        path: "addRole",
        component: () => import("@/views/system/role/roleView.vue"),
        name: "addRole",
        meta: { title: "新增角色", hidden: true },
      },
      {
        path: "editRole:id",
        component: () => import("@/views/system/role/roleView.vue"),
        name: "editRole",
        meta: { title: "编辑角色", hidden: true },
      },
      {
        path: "menu",
        component: () => import("@/views/system/menu/index.vue"),
        name: "menuIndex",
        meta: { title: "菜单管理" },
      },
      {
        path: "log",
        component: () => import("@/views/system/log/index.vue"),
        name: "log",
        meta: { title: "日志中心" },
      },
      {
        path: "account",
        component: () => import("@/views/system/account/index.vue"),
        name: "account",
        meta: { title: "账号设置", hidden: true },
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

export function refreshSelectedTag() {
  console.log(router);
  const { currentRoute } = router;
  router
    .replace({ path: "/redirect" + currentRoute.value.fullPath })
    .catch((err) => {
      console.warn(err);
    });
}

export default router;
