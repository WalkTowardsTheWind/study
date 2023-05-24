<template>
  <zxn-plan has-bottom>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList" has-back />
    <div class="pl-36px pr-36px pt-45px" v-show="activeName === 'info'">
      <zxn-title>
        任务信息
        <template #right>
          <span
            v-if="formItem.status"
            class="zxn-table-label ml-14px"
            :style="colorType[formItem.status]"
          >
            {{ proxy.$enumSet["statusEnum.TaskEnum"][formItem.status] }}
          </span>
        </template>
      </zxn-title>
      <el-form
        class="mt-34px zxn-view-form"
        label-position="right"
        label-width="80"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务名称">
              {{ formItem.task_name }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行业">{{ formItem.category_id }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求人数">
              {{ formItem.person_count }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公示周期">
              {{ formItem.open_time }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人">{{ formItem.task_head }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式">
              {{ formItem.task_head_phone }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务日期">
              {{ formItem.task_date }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务时间">
              {{ formItem.task_time }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="薪资待遇">{{ formItem.salary }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人员要求">{{ formItem.request }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务地点">{{ formItem.address }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="其他要求">
              {{ formItem.require_desc }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="任务描述">
              <el-input
                :model-value="formItem.task_desc"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
                readonly
                resize="none"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="mt-47px">
          <el-col :span="24">
            <el-form-item label="申请时间">{{
              formItem.add_time
            }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="通过时间">{{
              formItem.pass_time
            }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="验收时间">{{
              formItem.check_time
            }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="p-24px" v-show="activeName === 'member'">
      <zxn-table
        :column-list="columnList"
        :table-data="tableData"
        :hasPagination="false"
      >
        <template #operation>
          <el-button link type="primary">详情</el-button>
        </template>
      </zxn-table>
    </div>
    <div v-show="activeName === 'certificate'" class="pl-36px pr-36px pt-45px">
      <zxn-title>验收凭证</zxn-title>
      <div class="flex flex-items-center mt-30px">
        <!--        <el-image-->
        <!--          v-for="item in 3"-->
        <!--          style="width: 88px; height: 88px"-->
        <!--          :src="logo"-->
        <!--          :zoom-rate="1.2"-->
        <!--          :preview-src-list="[logo , logo, logo]"-->
        <!--          :initial-index="item"-->
        <!--          fit="cover"-->
        <!--					class="mr-25px"-->
        <!--        />-->
      </div>
    </div>
  </zxn-plan>
</template>
<script setup lang="ts">
import type { Ref } from "vue";
import { getTaskView } from "@/api/task";
import { useRoute } from "vue-router";
import { ElLoading } from "element-plus";

const route = useRoute();
const { proxy } = getCurrentInstance() as any;

const activeName: Ref<string> = ref("info");
// const logo = ref(
//   new URL(`../../assets/20230506141258.jpg`, import.meta.url).href
// );
type TabsType = {
  name: string;
  label: string;
};
const colorType = {
  0: { color: "#19B56B", backgroundColor: "#daf3e7" },
  1: { color: "#F35135", backgroundColor: "#fde3df" },
  2: { color: "#356FF3", backgroundColor: "#dfe8fd" },
  3: { color: "#356FF3", backgroundColor: "#dfe8fd" },
  4: { color: "#FFFFFF", backgroundColor: "#9ab7f9" },
  5: { color: "#35C5F3", backgroundColor: "#dff6fd" },
  6: { color: "#333333", backgroundColor: "#dedede" },
  7: { color: "#333333", backgroundColor: "#999999" },
};
const tabsList: TabsType[] = reactive([
  {
    name: "info",
    label: "任务信息",
  },
  {
    name: "member",
    label: "任务成员",
    disabled: true,
  },
  {
    name: "certificate",
    label: "验收凭证",
    disabled: true,
  },
]);
const columnList = [
  { label: "账户ID", prop: "user_id" },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.personnelType",
    prop: "status",
  },
  { label: "姓名", prop: "real_name" },
  { label: "联系方式", prop: "phone" },
  { label: "申请时间", prop: "settlement_time" },
  { label: "操作", slot: "operation", fixed: "right", width: 75 },
];
const formItem = reactive({
  status: "",
  task_name: "",
  category_id: "",
  person_count: "",
  open_time: "",
  task_head: "",
  task_head_phone: "",
  task_date: "",
  task_time: "",
  salary: "",
  request: "",
  address: "",
  task_desc: "",
  require_desc: "",
  add_time: "",
  check_time: "",
  pass_time: "",
});
const tableData = reactive([]);
const getView = async () => {
  tabsList[1].disabled = true;
  tabsList[2].disabled = true;
  const { id } = route.query;
  const loading = ElLoading.service({
    text: "加载中...",
  });
  try {
    const { data } = await getTaskView(id * 1);
    loading.close();
    const taskAttribute = data.taskAttribute || {};
    formItem.status = data.status;
    formItem.task_name = data.task_name;
    formItem.category_id = data.category_id;
    formItem.person_count = taskAttribute.person_count || "";
    formItem.open_time =
      data.open_type === 1
        ? "长期"
        : `${data.open_start_time} - ${data.open_end_time}`;

    formItem.task_head = data.task_head;
    formItem.task_head_phone = data.task_head_phone;
    formItem.task_date =
      taskAttribute.task_date_type === 1 ? "不限时间" : "指定时间段";

    formItem.task_time =
      taskAttribute.task_date_type === 1
        ? "不限时间"
        : `${taskAttribute.task_start_time || ""} - ${
            taskAttribute.task_end_time || ""
          }`;

    formItem.salary =
      taskAttribute.salary_type === 1
        ? taskAttribute.salary
        : `${taskAttribute.salary_min || ""} - ${
            taskAttribute.salary_max || ""
          }`;

    formItem.request = data.request.filter(Boolean).join("/");
    formItem.address = data.address;
    formItem.require_desc = data.taskAttributeUser?.require_desc || "";
    formItem.task_desc = data.task_desc;
    formItem.add_time = data.add_time;
    formItem.check_time = data.check_time;
    formItem.pass_time = data.pass_time;
    if (data.taskUser && data.taskUser.length) {
      tabsList[1].disabled = false;
      tableData.push(...data.taskUser);
    }
  } catch (err) {
    loading.close();
  }
};
onMounted(() => {
  getView();
});
</script>
