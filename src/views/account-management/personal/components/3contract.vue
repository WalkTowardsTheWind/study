<template>
  <div class="m-24px">
    <zxn-search @on-search="search" @on-reset="reset">
      <el-form-item label="签约时间">
        <zxn-date-range v-model="date" />
      </el-form-item>
    </zxn-search>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="pageChange"
    >
      <template #tableTop>
        <el-button :disabled="isDisabled" type="primary" @click="toRoute"
          >编辑合同</el-button
        >
      </template>
      <template #type>
        {{ "个人合同" }}
      </template>
      <template #sign>
        {{ "在线签署" }}
      </template>
      <template #caozuo>
        <el-button type="primary" link>查看合同</el-button>
        <el-button type="primary" link>查看证书</el-button>
        <el-button type="primary" link>下载</el-button>
      </template>
    </zxn-table>
  </div>
</template>

<script lang="ts" setup>
import { getContractInfo } from "@/api/account/personal";
import router from "@/router";
import { useRoute } from "vue-router";
const route = useRoute();
const props = defineProps({
  idcard: {
    default: () => "",
  },
});
const date = ref([] as any);

const tableData = ref([] as any);
const columnList = [
  { label: "合同类型", slot: "type" },
  {
    label: "状态",
    prop: "status",
    type: "enum",
    path: "accountEnum.perContractEnum",
    color: {
      1: { color: "#356FF3", background: "#dfe8fd" },
      0: { color: "#333333", background: "#dedede" },
    },
  },
  { label: "签署形式", slot: "sign" },
  { label: "甲方", prop: "tax_land_name" },
  { label: "乙方", prop: "real_name" },
  { label: "签约时间", prop: "sign_time" },
  // { label: "操作" },
];
const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});
const pageChange = (cur) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  search();
};
const search = () => {
  let params = {
    keyword: props.idcard,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
    page: pageInfo.page,
    limit: pageInfo.limit,
  };

  getContractInfo(params).then((res) => {
    tableData.value = res.data.data;
    pageInfo.total = res.data.total;
  });
};
const reset = () => {
  date.value = [];
  search();
};

const isDisabled = ref(true);
const getIsDisabled = () => {
  const list = JSON.parse(localStorage.getItem("menusList")!) || [];
  let found = false; // 标记是否找到相等的项
  for (const item of list) {
    if (item.module === "contract-management") {
      found = true;
      break; // 找到相等的项后跳出循环
    }
  }
  isDisabled.value = !found; // 根据标记给 isDisabled.value 赋值
};

getIsDisabled();

const toRoute = () => {
  router.push({
    name: "contract-management-list",
    query: {
      company_name: route.query.name!,
      type: 5,
    },
  });
};
search();
</script>

<style scoped></style>
