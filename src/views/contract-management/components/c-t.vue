<template>
  <div class="p-37px">
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="pageChange"
      hasSelect
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <div class="flex justify-between">
          <div class="l">
            <el-button type="primary" @click="addNew">新建</el-button>
            <el-button type="primary" plain>批量操作</el-button>
          </div>
          <div class="r flex">
            <el-input class="w-80" placeholder="请输入关键字">
              <template #prefix>
                <i-ep-Search />
              </template>
            </el-input>
            <el-button type="primary" class="ml-20px">搜索</el-button>
            <el-button type="info" class="ml-20px">重置</el-button>
          </div>
        </div>
      </template>
      <template #caozuo>
        <el-button link type="primary" @click="toDetail">详情</el-button>
        <el-button link type="primary" @click="toDetail('edit')"
          >编辑</el-button
        >
        <el-button link type="primary">删除</el-button>
        <el-button link type="primary">下载</el-button>
      </template>
    </zxn-table>

    <!-- 编辑详情 -->
    <zxn-dialog
      :title="title"
      width="25vw"
      top="15"
      :visible="isShow"
      :hasBottomBtn="isEdit"
      @close-dialog="closeDialog"
      @confirm-dialog="editDialog"
    >
      <template #default>
        <el-form-item label="模板名称">
          <el-input
            placeholder="请输入"
            :readonly="!isEdit"
            v-model="addForm.name"
          />
        </el-form-item>
        <el-form-item label="模板编号">
          <el-input placeholder="请输入" disabled v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="合同文件">
          <MultiUpload limit="1" v-model="addForm.contract" />
        </el-form-item>
        <el-form-item label="备注要求">
          <el-input
            placeholder="请输入"
            :readonly="!isEdit"
            type="textarea"
            v-model="addForm.remark"
          />
        </el-form-item>
      </template>
    </zxn-dialog>
    <!-- 新建 -->
    <zxn-dialog
      title="新建合同模板"
      width="25vw"
      top="15"
      :visible="isAddShow"
      @close-dialog="closeAdd"
      @confirm-dialog="submitAdd"
    >
      <template #default>
        <el-form ref="addFormRef">
          <el-form-item label="模板名称">
            <el-input placeholder="请输入" v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="添加合同">
            <MultiUpload limit="1" v-model="addForm.contract" />
            <span class="ml-20px">仅支持pdf</span>
          </el-form-item>
          <el-form-item label="备注要求">
            <el-input
              placeholder="请输入"
              type="textarea"
              v-model="addForm.remark"
            />
          </el-form-item>
        </el-form>
      </template>
    </zxn-dialog>
  </div>
</template>

<script lang="ts" setup>
const pageInfo = reactive({
  limit: 20,
  page: 1,
  total: 0,
});
const tableData = reactive([
  {
    no: "1312312",
    no1: "1312312",
    no2: "1312312",
  },
] as any);

const addForm = reactive({
  name: "",
  contract: [],
  remark: "",
});

const isShow = ref(false);
const isAddShow = ref(false);
const isEdit = ref(false);
const title = ref("");
const columnList = [
  {
    label: "模板编号",
    prop: "no",
  },
  {
    label: "合同模板名称",
    prop: "no1",
  },
  {
    label: "税源地",
    prop: "no2",
  },
  {
    label: "创建账户",
  },
  {
    label: "创建时间",
  },
  {
    label: "操作",
    width: 200,
    fixed: "right",
    align: "right",
    slot: "caozuo",
  },
];

const pageChange = (cur) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
};

const toDetail = (type) => {
  if (type == "edit") {
    title.value = "编辑合同模版";
    isEdit.value = true;
  } else {
    title.value = "合同模版详情";
    isEdit.value = false;
  }
  isShow.value = true;
};
const addFormRef = ref();
const addNew = () => {
  addForm.name = "";
  addForm.contract = [];
  addForm.remark = "";
  isAddShow.value = true;
};

const closeAdd = () => {
  addForm.name = "";
  addForm.contract = [];
  addForm.remark = "";
  isAddShow.value = false;
};
const closeDialog = () => {
  isShow.value = false;
};

const addSubmit = () => {};

const editDialog = () => {};

const handleSelect = (val) => {
  console.log(val);
};
</script>

<style scoped></style>
