<template>
  <zxn-plan has-bottom>
    <zxn-tabs :tabsList="[{ name: 'role', label: '新增角色' }]" has-back />
    <div class="mt-10px">
      <el-form label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="角色名称">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地区">
              <area-select
                v-model="formItem.area"
                :area-list="areaList as []"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="功能权限">
              <role-select :role-list="roleList" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <zxn-bottom-btn>
      <el-button type="primary">保存</el-button>
      <el-button>取消</el-button>
    </zxn-bottom-btn>
  </zxn-plan>
</template>
<script setup lang="ts">
import areaSelect from "./components/areaSelect.vue";
import roleSelect from "./components/roleSelect.vue";
const formItem = reactive({
  name: "",
  area: [2, 4],
  role: [],
});
const areaList = reactive([
  {
    label: "湖北省",
    children: [
      { label: "武汉市", code: 1 },
      { label: "黄石市", code: 2 },
      { label: "武汉市", code: 3 },
      { label: "黄石事实上事实上市", code: 4 },
      { label: "武汉市", code: 5 },
    ],
  },
  {
    label: "湖南省",
    children: [
      { label: "长沙市", code: 11 },
      { label: "衡阳市", code: 22 },
    ],
  },
]);
const roleList = reactive([
  {
    label: "账户管理",
    children: [
      {
        label: "企业账户",
        children: [
          { label: "新增", code: 1 },
          { label: "编辑", code: 2 },
          { label: "详情", code: 3 },
        ],
      },
      {
        label: "企业合同",
        children: [
          { label: "新增", code: 1 },
          { label: "编辑", code: 2 },
          { label: "详情", code: 3 },
        ],
      },
      {
        label: "个人账户",
        children: [
          { label: "新增", code: 1 },
          { label: "编辑", code: 2 },
          { label: "详情", code: 3 },
        ],
      },
    ],
  },
  {
    label: "任务管理",
    children: [
      {
        label: "人工任务",
        children: [
          { label: "新增", code: 1 },
          { label: "编辑", code: 2 },
          { label: "详情", code: 3 },
        ],
      },
      {
        label: "自动任务",
        children: [
          { label: "新增", code: 1 },
          { label: "编辑", code: 2 },
          { label: "详情", code: 3 },
        ],
      },
      {
        label: "个人账户",
        children: [
          { label: "新增", code: 1 },
          { label: "编辑", code: 2 },
          { label: "详情", code: 3 },
        ],
      },
    ],
  },
]);
</script>
