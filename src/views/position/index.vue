<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName"></zxn-tabs>
    <div class="px-24px pt-36px">
      <zxn-search
        :formItem="formItem"
        @on-search="handleSearch"
        @on-reset="handleReset"
      >
        <el-form-item label="">
          <el-input placeholder="请输入职位名称" v-model="formItem.keyword">
            <template #prefix>
              <i-ep-Search />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="职位状态">
          <el-select
            v-model="formItem.status"
            filterable
            clearable
            @change="handleSearch"
          >
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in proxy.$const['positionEnum.status']"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请日期">
          <zxn-date-range v-model="formItem.date" />
        </el-form-item>
      </zxn-search>
      <zxn-table
        :loading="isLoading"
        :table-data="tableData"
        :column-list="columnList"
        :page-info="pageInfo"
        @page-change="pageChange"
      >
        <template #money="{ row }">
          {{ row.job_attribute.salary_min }}-{{
            row.job_attribute.salary_max
          }}*{{ row.job_attribute.salary_type }}薪
        </template>
        <template #caozuo="{ row }">
          <el-button
            v-if="row.status == 1"
            type="primary"
            link
            @click="handleButton(row.id, 3)"
            >通过</el-button
          >
          <el-button
            v-if="row.status == 1"
            type="primary"
            link
            @click="handleButton(row.id, 2)"
            >驳回</el-button
          >
          <el-button type="primary" link @click="toDetail(row.id)"
            >详情</el-button
          >
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getPositionList, setPositionStatus } from "@/api/position";
import { useRouter } from "vue-router";
const router = useRouter();
const tabsList = [{ name: "1", label: "职位管理" }];
const activeName = ref("1");
const { proxy } = getCurrentInstance() as any;

const formItem = reactive({
  keyword: "",
  status: "",
  date: [],
});

const isLoading = ref(false);
const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});
const pageChange = (cur) => {
  const { limit, page } = cur;
  pageInfo.limit = limit;
  pageInfo.page = page;
};
const tableData = ref([]);
const columnList = [
  {
    label: "岗位编号",
    prop: "job_no",
    minWidth: 200,
  },
  {
    label: "职位名称",
    prop: "job_name",
    minWidth: 150,
  },
  // {
  //   label: "岗位分类",
  //   prop: "category_name",
  //   minWidth: 100,
  // },
  {
    label: "职位状态",
    prop: "status",
    type: "enum",
    path: "positionEnum.status",
    color: {
      0: { color: "#35C5F3", background: "#DFF6FD" },
      1: { color: "#1DE585", background: "#DBFBEB" },
      2: { color: "#F35135", background: "#FDE3DF" },
      3: { color: "#366FF3", background: "#DFE8FD" },
      4: { color: "#333333", background: "#DEDEDE" },
    },
    minWidth: 100,
  },
  { label: "关联企业", prop: "company_name", minWidth: 200 },
  {
    label: "就职地区",
    prop: "city_name",
  },
  {
    label: "招聘类型",
    type: "enum",
    prop: "job_type",
    path: "positionEnum.work_type",
  },
  {
    label: "需求人数",
    prop: "job_attribute.person_count",
  },
  {
    label: "薪资",
    slot: "money",
    minWidth: 200,
  },
  // {
  //   label: "福利",
  //   prop: "benefits_desc",
  //   minWidth: 150,
  // },
  {
    label: "申请时间",
    prop: "add_time",
    minWidth: 220,
  },

  {
    label: "操作",
    slot: "caozuo",
    fixed: "right",
    align: "right",
    minWidth: 200,
  },
];

const handleButton = (id, status) => {
  ElMessageBox.confirm(`是否${status == 3 ? "通过" : "驳回"}当前职位?`, {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  })
    .then(() => {
      setPositionStatus({ ids: [id], status }).then((res) => {
        console.log(res);
        ElMessage({
          type: "success",
          message: "操作成功",
        });
        handleSearch();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消操作",
      });
    });
};

const toDetail = (id) => {
  router.push({ name: "position-detail", params: { id } });
};

function handleSearch() {
  isLoading.value = true;
  let params = {
    keyword: formItem.keyword,
    status: formItem.status,
    start_time: formItem.date[0],
    end_time: formItem.date[1],
    page: pageInfo.page,
    limit: pageInfo.limit,
  };
  getPositionList(params).then((res) => {
    isLoading.value = false;
    pageInfo.total = res.data.total;
    tableData.value = res.data.data;
  });
}
function handleReset() {}

handleSearch();
</script>

<style scoped></style>
