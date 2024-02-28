<template>
  <zxn-plan>
    <zxn-tabs
      :tabs-list="[{ label: '职位详情', name: 1 }]"
      :activeName="1"
    ></zxn-tabs>
    <div class="p-36px">
      <el-form label-width="100">
        <el-form-item label="职位名称">
          <span>{{ formItem.job_name }}</span>
        </el-form-item>
        <el-form-item label="岗位编号">
          <span>{{ formItem.job_no }}</span>
        </el-form-item>
        <el-form-item label="招聘类型">
          <span>{{
            proxy.$const["positionEnum.work_type"][formItem.job_type]?.label
          }}</span>
        </el-form-item>
        <el-form-item label="就职地点">
          <span>{{ formItem.address }}</span>
        </el-form-item>
        <el-form-item label="招聘人数">
          <span>{{ formItem.job_attribute?.person_count }}</span>
        </el-form-item>
        <el-form-item label="学历要求">
          <span>{{
            proxy.$const["positionEnum.education"][
              formItem.job_attribute_user?.education_type
            ]?.label
          }}</span>
        </el-form-item>
        <el-form-item label="经验要求">
          <span>{{
            proxy.$const["positionEnum.work_exe"][
              formItem.job_attribute_user?.work_experience
            ]?.label
          }}</span>
        </el-form-item>
        <el-form-item label="薪资">
          <span>{{
            formItem.job_attribute?.salary_min +
            " - " +
            formItem.job_attribute?.salary_max +
            " · " +
            formItem.job_attribute?.salary_type +
            "薪"
          }}</span>
        </el-form-item>
        <!-- <el-form-item label="职位标签">
          <span>{{ formItem.job_label }}</span>
        </el-form-item> -->
        <el-form-item label="福利待遇">
          <span>{{ formItem.benefits_desc }}</span>
        </el-form-item>
        <el-form-item label="岗位职责">
          <span>{{ formItem.job_desc }}</span>
        </el-form-item>
        <el-form-item label="岗位要求">
          <span>{{ formItem.job_ask }}</span>
        </el-form-item>
      </el-form>
    </div>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getDetailById } from "@/api/position";
import { useRoute } from "vue-router";
const { proxy } = getCurrentInstance() as any;

const route = useRoute();
const id = route.params.id;

const formItem = ref({} as any);

const getDetail = () => {
  getDetailById(id).then((res) => {
    formItem.value = res.data;
    console.log(formItem.value);
  });
};

getDetail();
</script>

<style scoped></style>
