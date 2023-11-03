<template>
  <div class="p-24px">
    <zxn-search
      :formItem="formItem"
      @on-reset="handleReset"
      @on-search="handleSearch"
    >
      <el-form-item>
        <el-input placeholder="请输入">
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="合同状态">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="税源地">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="创建日期">
        <zxn-date-range v-model="date" />
      </el-form-item>
    </zxn-search>

    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      hasSelect
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <el-button type="primary">合同归档</el-button>
        <el-button type="primary" plain @click="onlineSignClick"
          >在线签署</el-button
        >
        <el-button type="primary" plain>下载</el-button>
      </template>
    </zxn-table>
    <!-- 在线签署 -->
    <zxn-dialog
      width="55vw"
      top="20"
      title="在线签署"
      :visible="isOnline"
      @close-dialog="onlineClose"
      @confirm-dialog="onlineConfirm"
    >
      <el-row :gutter="50">
        <el-col :span="8">
          <el-form-item label="合同名称">
            <el-input placeholder="请输入" />
          </el-form-item>
          <el-form-item label="合同类型">
            <el-select class="w-100" placeholder="请选择"></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同编号">
            <el-input placeholder="请输入" />
          </el-form-item>
          <el-form-item label="合同期限">
            <el-date-picker
              class="w-100"
              v-model="value1"
              type="date"
              placeholder="请选择"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择模板">
            <el-select placeholder="请选择"></el-select>
          </el-form-item>
          <el-form-item label="备注要求">
            <el-input placeholder="请输入" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 设置签署方 -->
      <div class="sign flex justify-between items-center mt-50px">
        <div class="title">设置签署方</div>
        <div>
          <el-button type="primary" plain @click="addBase"
            ><i-ep-Plus />添加主体</el-button
          >
        </div>
      </div>
      <div class="head p-x-20px m-y-20px">
        <div>参与主体</div>
        <div class="ml-60px">参与方信息</div>
      </div>

      <div
        class="form mt-20px flex items-center"
        v-for="(item, index) of baseList"
        :key="index"
      >
        <el-row class="w-full" :gutter="20" type="flex">
          <el-col :span="3">
            <el-form-item>
              <el-select placeholder="个人/企业"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input placeholder="签署方"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-input placeholder="真实姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input placeholder="手机号/邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input placeholder="企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mt-6px" :span="1">
            <i-ep-close class="cursor-pointer" @click="delBase(index)" />
          </el-col>
        </el-row>
      </div>
    </zxn-dialog>
  </div>
</template>

<script lang="ts" setup>
const formItem = reactive({});
const handleReset = () => {};
const handleSearch = () => {};
const date = ref("");
const tableData = reactive([] as any);
const columnList = [
  { label: "合同编号" },
  { label: "状态" },
  { label: "合同类型" },
  { label: "签署形式" },
  { label: "甲方" },
  { label: "乙方" },
  { label: "签约时间" },
  { label: "到期时间" },
  { label: "备注" },
  { label: "操作" },
];

const value1 = ref("");

const baseList = ref([] as any);

const addBase = () => {
  baseList.value.push({});
};

const delBase = (index) => {
  baseList.value.splice(index, 1);
};

const handleSelect = (val) => {
  console.log(val);
};
const isOnline = ref(false);
const onlineSignClick = () => {
  isOnline.value = true;
};
const onlineClose = () => {
  isOnline.value = false;
};
const onlineConfirm = () => {};
</script>

<style scoped lang="scss">
.sign {
  .title {
    font-size: 14px;
    font-family: SourceHanSansSC-Bold, SourceHanSansSC;
    font-weight: bold;
    color: #333333;
  }
}
.head {
  height: 56px;
  background: #eff4fe;
  display: flex;
  align-items: center;
}
.content {
  background: #eee;
  height: 30px;
}
.form {
  display: flex;
  align-items: center;
}
</style>
