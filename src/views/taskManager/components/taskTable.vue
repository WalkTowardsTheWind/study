<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
    >
      <el-form-item label="" prop="task_name">
        <el-input v-model="formItem.task_name" placeholder="请输入关键字">
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="任务状态" prop="status">
        <el-select v-model="formItem.status" placeholder="全部">
          <el-option
            v-for="item in proxy.$const['statusEnum.TaskEnum']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="行业类型" prop="category_id">
        <el-cascader
          v-model="formItem.category_id"
          placeholder="请选择"
          :options="industryList"
          :props="{ label: 'name', value: 'id' }"
        />
      </el-form-item>
      <el-form-item prop="timeData" label="申请日期">
        <zxn-date-range v-model="formItem.timeData" />
      </el-form-item>
    </zxn-search>
    <zxn-table
      ref="taskTable"
      :table-data="tableData"
      :column-list="columnList"
      hasSelect
      :page-info="pageInfo"
      :selectable="selectable"
      @page-change="handlePageChange"
    >
      <template #tableTop>
        <el-dropdown
          trigger="click"
          @command="(instar) => handleCommand(instar)"
        >
          <el-button type="primary" plain>批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="reject">驳回</el-dropdown-item>
              <el-dropdown-item command="fulfill">通过</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template #operation="{ row }">
        <template v-if="row.status === 0">
          <el-button
            link
            type="primary"
            @click="handleCommand('fulfill', row.id)"
            >通过</el-button
          >
          <el-button
            link
            type="primary"
            @click="handleCommand('reject', row.id)"
            >驳回</el-button
          >
        </template>
        <el-button link type="primary" @click="handleView(row)">详情</el-button>
        <el-button link type="primary" @click="handleDelete(row)"
          >删除</el-button
        >
      </template>
    </zxn-table>
  </div>
</template>
<script setup lang="ts">
import { transformTimeRange } from "@/utils";
import { getTaskIndex, removeTask, setTaskStatus } from "@/api/task";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();

const props = defineProps({
  industryList: { type: Array, default: () => [] },
  type: { type: Number, default: 1 },
});
const { proxy } = getCurrentInstance() as any;
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const formItem = reactive({
  task_name: "",
  status: "",
  timeData: [],
  category_id: "",
  task_type: "",
});
const tableData = reactive([]);
const columnList = [
  { label: "任务编号", prop: "task_no", minWidth: 140 },
  { label: "任务名称", prop: "task_name", minWidth: 120 },
  { label: "关联企业", prop: "company_name", minWidth: 140 },
  { label: "需求人数", prop: "task_attribute.person_count", type: "deep" },
  { label: "行业", prop: "category_name", minWidth: 80 },
  { label: "金额", prop: "task_attribute.salary", type: "deep" },
  {
    label: "申请时间",
    sortable: "custom",
    minWidth: 120,
    prop: "open_start_time",
  },
  {
    label: "任务描述",
    prop: "task_desc",
    showOverflowTooltip: true,
    minWidth: 100,
  },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.TaskEnum",
    prop: "status",
    minWidth: 100,
    fixed: "left",
    color: {
      0: { color: "#19B56B", backgroundColor: "#daf3e7" },
      1: { color: "#F35135", backgroundColor: "#fde3df" },
      2: { color: "#356FF3", backgroundColor: "#dfe8fd" },
      3: { color: "#356FF3", backgroundColor: "#dfe8fd" },
      4: { color: "#FFFFFF", backgroundColor: "#9ab7f9" },
      5: { color: "#35C5F3", backgroundColor: "#dff6fd" },
      6: { color: "#333333", backgroundColor: "#dedede" },
      7: { color: "#333333", backgroundColor: "#999999" },
    },
  },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 190,
    align: "right",
  },
];
const handleReset = () => {
  handleSearch();
};
const handleSearch = () => {
  pageInfo.page = 1;
  getTaskList();
};
const handlePageChange = (cur) => {
  const { page } = cur;
  pageInfo.page = page;
  getTaskList();
};
const getTaskList = async () => {
  const params = transformTimeRange({ ...formItem });
  params.task_type = props.type;
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  try {
    const { data } = await getTaskIndex(params);
    console.log(data, "222");
    tableData.length = 0;
    pageInfo.page = data.current_page;
    pageInfo.total = data.count;
    tableData.push(...data.data);
  } catch (e) {
    console.log(e);
  }
};
const selectable = (row) => {
  return Boolean(!row.status);
};
const taskTable = ref();
const handleCommand = async (instar: "reject" | "fulfill", id) => {
  const selected = taskTable.value.getSelectionRows();
  const ids = id ? [id] : selected.map((it) => it.id);
  if (!ids.length) {
    return ElMessage({
      type: "error",
      message: `请选择数据`,
    });
  }
  ElMessageBox({
    title: "",
    message: h("p", null, `确定${instar === "reject" ? "驳回" : "通过"}该任务`),
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    beforeClose: async (
      action: string,
      instance: { confirmButtonLoading: boolean },
      done: () => void
    ) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        const params = {
          ids,
          status: instar === "reject" ? 1 : 3,
        };
        await setTaskStatus(params);
        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: `${instar === "reject" ? "驳回" : "通过"}成功`,
    });
    getTaskList();
  });
};
const handleDelete = (row: { id: number }) => {
  ElMessageBox({
    title: "",
    message: h("p", null, "确定删除该任务"),
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    beforeClose: async (
      action: string,
      instance: { confirmButtonLoading: boolean },
      done: () => void
    ) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        await removeTask(row.id);
        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: `删除成功`,
    });
    getTaskList();
  });
};
const handleView = (row: { id: number }) => {
  router.push({ name: "taskManagerView", query: { id: row.id } });
};
defineExpose({
  getTaskList,
});
</script>
