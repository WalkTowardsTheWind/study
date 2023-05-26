<template>
  <zxn-plan>
    <zxn-tabs
      :activeName="activeName"
      :tabsList="tabsList"
      @tabChange="handleTabChange"
    >
      <template #auto>
        <task-table ref="auto" :type="1" :industry-list="industryList" />
      </template>
      <template #manual>
        <task-table ref="manual" :type="0" :industry-list="industryList" />
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import taskTable from "./components/taskTable.vue";
import { getTreeList } from "@/api/common/index";
const activeName = ref("auto");
const tabsList = [
  {
    name: "auto",
    label: "自动任务",
  },
  {
    name: "manual",
    label: "人工任务",
  },
];
const industryList = reactive([]);
const auto = ref();
const manual = ref();
const getIndustryList = async () => {
  const { data } = await getTreeList({ type: 0 });
  industryList.length = 0;
  industryList.push(...data);
};
const handleTabChange = () => {
  console.log(auto.value);
  if (activeName.value === "auto") {
    auto.value.getTaskList();
  } else {
    manual.value.getTaskList();
  }
};
onMounted(() => {
  getIndustryList();
  handleTabChange();
});
</script>
