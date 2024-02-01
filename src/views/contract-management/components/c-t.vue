<template>
  <div class="p-y-24px p-x-37px">
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="pageChange"
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <div class="flex justify-between">
          <div class="l">
            <el-button type="primary" @click="addNew">新建</el-button>
            <!-- <el-button type="primary" plain>批量操作</el-button> -->
          </div>
          <div class="r flex">
            <el-input class="w-80" placeholder="请输入关键字" v-model="keyword">
              <template #prefix>
                <i-ep-Search />
              </template>
            </el-input>
            <el-button type="primary" class="ml-20px" @click="handleSearch"
              >搜索</el-button
            >
            <el-button type="info" class="ml-20px" @click="handleReset"
              >重置</el-button
            >
          </div>
        </div>
      </template>
      <template #type="{ row }">
        {{ row.type == 1 ? "企业合同" : "渠道合同" }}
      </template>
      <template #seal_type="{ row }">
        {{ row.seal_type == 1 ? "单页签署" : "多页签署" }}</template
      >
      <template #caozuo="{ row }">
        <el-button link type="primary" @click="toEdit(row.id)">编辑</el-button>
        <el-button link type="primary" @click="delById(row.id)">删除</el-button>
        <el-button link type="primary" @click="toDetail(row.id)"
          >详情</el-button
        >
        <!-- <el-button link type="primary">下载</el-button> -->
      </template>
    </zxn-table>

    <!-- 新建/编辑/详情-->
    <zxn-dialog
      :title="title"
      width="700px"
      top="10"
      :visible="isVisible"
      :hasBottomBtn="isHasBtn"
      @close-dialog="closeAdd(addFormRef)"
      @confirm-dialog="submitAdd(addFormRef)"
    >
      <template #default>
        <el-form
          :model="addForm"
          :rules="rules"
          ref="addFormRef"
          :disabled="!isHasBtn"
          label-width="auto"
        >
          <el-form-item label="模板名称" required prop="template_name">
            <el-input placeholder="请输入" v-model="addForm.template_name" />
          </el-form-item>
          <el-form-item label="模板类型" required prop="type">
            <el-select
              filterable
              clearable
              class="w-full"
              placeholder="请选择"
              v-model="addForm.type"
            >
              <el-option label="企业合同" :value="1"></el-option>
              <el-option label="渠道合同" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="isAdd" label="签署形式" required prop="seal_type">
            <el-select
              filterable
              clearable
              class="w-full"
              placeholder="请选择"
              v-model="addForm.seal_type"
            >
              <el-option label="单页签署" :value="1"></el-option>
              <el-option label="多页签署" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注要求">
            <el-input
              placeholder="请输入"
              type="textarea"
              v-model="addForm.remark"
            />
          </el-form-item>
          <!-- 单页 -->
          <template v-if="isAdd && addForm.seal_type == 1">
            <div class="flex">
              <el-form-item label="甲方签字处"></el-form-item>
              <el-form-item label="页码" prop="posPage">
                <el-input v-model="addForm.a_sign_pos.posPage" />
              </el-form-item>
              <el-form-item label="X轴" prop="posX">
                <el-input v-model="addForm.a_sign_pos.posX" />
              </el-form-item>
              <el-form-item label="Y轴" prop="posY">
                <el-input v-model="addForm.a_sign_pos.posY" />
              </el-form-item>
            </div>
            <div class="flex">
              <el-form-item label="甲方盖章处"></el-form-item>
              <el-form-item label="页码" prop="posPage">
                <el-input v-model="addForm.a_seal_pos.posPage" />
              </el-form-item>
              <el-form-item label="X轴" prop="posX">
                <el-input v-model="addForm.a_seal_pos.posX" />
              </el-form-item>
              <el-form-item label="Y轴" prop="posY">
                <el-input v-model="addForm.a_seal_pos.posY" />
              </el-form-item>
            </div>
            <div class="flex">
              <el-form-item label="乙方签字处"></el-form-item>
              <el-form-item label="页码" prop="posPage">
                <el-input v-model="addForm.b_sign_pos.posPage" />
              </el-form-item>
              <el-form-item label="X轴" prop="posX">
                <el-input v-model="addForm.b_sign_pos.posX" />
              </el-form-item>
              <el-form-item label="Y轴" prop="posY">
                <el-input v-model="addForm.b_sign_pos.posY" />
              </el-form-item>
            </div>
            <div class="flex">
              <el-form-item label="乙方盖章处"></el-form-item>
              <el-form-item label="页码" prop="posPage">
                <el-input v-model="addForm.b_seal_pos.posPage" />
              </el-form-item>
              <el-form-item label="X轴" prop="posX">
                <el-input v-model="addForm.b_seal_pos.posX" />
              </el-form-item>
              <el-form-item label="Y轴" prop="posY">
                <el-input v-model="addForm.b_seal_pos.posY" />
              </el-form-item>
            </div>
          </template>
          <!-- 多页 -->
          <template v-if="isAdd && addForm.seal_type == 2">
            <el-form-item label="甲方签字处关键字" prop="a_sign_key    ">
              <el-input placeholder="请输入" v-model="addForm.a_sign_key" />
            </el-form-item>
            <el-form-item label="甲方盖章处关键字" prop="a_seal_key    ">
              <el-input placeholder="请输入" v-model="addForm.a_seal_key" />
            </el-form-item>
            <el-form-item label="乙方签字处关键字" prop="b_sign_key  ">
              <el-input placeholder="请输入" v-model="addForm.b_sign_key" />
            </el-form-item>
            <el-form-item label="乙方盖章处关键字" prop="b_seal_key">
              <el-input placeholder="请输入" v-model="addForm.b_seal_key" />
            </el-form-item>
          </template>
          <!-- 编辑详情 -->
          <el-form-item v-if="isEdit && !isAdd" label="合同文件">
            <el-button link type="primary" @click="checkUrl(addForm.file_url)"
              >查看</el-button
            >
          </el-form-item>
          <!-- 新建 -->
          <el-form-item v-if="isAdd" label="添加合同" required>
            <el-upload
              class="w-full"
              :headers="headers"
              :action="action"
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :limit="1"
              v-model:file-list="fileList"
            >
              <div class="el-upload__text">
                <el-button type="primary" plain>+上传文件</el-button>
              </div>
              <template #tip>
                <div class="el-upload__tip">仅支持pdf文件</div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item class="" label="甲方必填字段">
            <svg
              t="1706269653250"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3401"
              width="16"
              height="16"
            >
              <path
                d="M950.856 0H73.144A73.144 73.144 0 0 0 0 73.144v877.712A73.144 73.144 0 0 0 73.144 1024h877.712A73.144 73.144 0 0 0 1024 950.856V73.144A73.144 73.144 0 0 0 950.856 0z m-85.467 336.764L462.882 750.69a45.41 45.41 0 0 1-18.214 11.51 46.303 46.303 0 0 1-50.113-9.061L159.87 529.768a46.406 46.406 0 0 1 63.968-67.24l202.443 192.66 372.6-383.124a46.395 46.395 0 0 1 79.654 32.436 45.983 45.983 0 0 1-13.135 32.264z"
                fill="#366ff3"
                p-id="3402"
              ></path>
            </svg>
          </el-form-item>
          <div class="flex flex-wrap gap-x-50px">
            <div
              class="flex gap-x-10px"
              v-for="(item, index) of addForm.fields"
              :key="index"
            >
              <el-form-item>
                <el-checkbox v-model="item.checked" size="large"></el-checkbox>
                <el-input
                  class="w-80px ml-10px"
                  disabled
                  v-model="item.field_name"
                />
              </el-form-item>
              <el-form-item>
                <el-input
                  class="w-150px"
                  placeholder="label"
                  v-model="item['label']"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </template>
    </zxn-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useUserStoreHook } from "@/store/modules/user";
import {
  createContractTemp,
  getContractTempList,
  getContractTempListDetail,
  deleteContractTemp,
  editContractTemp,
} from "@/api/contract-m/index";

const userStore = useUserStoreHook();
const token = userStore.token;
const action = ref(
  import.meta.env.VITE_APP_BASE_API + "/adminapi/contract/tpl/upload"
);
const headers = {
  Authorization: `Bearer ${token}`,
};

const keyword = ref("");
const fileList = ref([] as any);

const pageInfo = reactive({
  limit: 20,
  page: 1,
  total: 0,
});
const tableData = reactive([] as any);

let addForm = reactive({
  id: "",
  template_name: "",
  type: "",
  seal_type: "",
  file_url: "",
  file_path: "",
  fields: [],
  remark: "",
  a_seal_pos: {
    posPage: "",
    posX: "",
    posY: "",
  },
  a_sign_pos: {
    posPage: "",
    posX: "",
    posY: "",
  },
  b_seal_pos: {
    posPage: "",
    posX: "",
    posY: "",
  },
  b_sign_pos: {
    posPage: "",
    posX: "",
    posY: "",
  },
  a_seal_key: "",
  a_sign_key: "",
  b_seal_key: "",
  b_sign_key: "",
} as any);

const rules = {
  template_name: [
    {
      required: true,
      message: "必填",
      trigger: "blur",
    },
  ],
  type: [
    {
      required: true,
      message: "必填",
      trigger: "change",
    },
  ],
  seal_type: [
    {
      required: true,
      message: "必填",
      trigger: "change",
    },
  ],
};

const temp_fields = reactive([] as any);

const isVisible = ref(false);
const isAdd = ref(false);
const isHasBtn = ref(false);
const isEdit = ref(false);

const title = ref("");
const columnList = [
  {
    label: "合同模板名称",
    prop: "template_name",
  },
  {
    label: "合同类型",
    prop: "type",
    slot: "type",
  },
  {
    label: "签署方式",
    slot: "seal_type",
  },
  {
    label: "税源地",
    prop: "tax_land_name",
  },
  {
    label: "创建账户",
    prop: "account",
  },
  {
    label: "创建时间",
    prop: "add_time",
  },
  {
    label: "操作",
    width: 200,
    fixed: "right",
    align: "right",
    slot: "caozuo",
  },
];
const addFormRef = ref();

const pageChange = (cur) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
};

const toDetail = (id) => {
  getTD(id);
  title.value = "合同模版详情";
  isHasBtn.value = false;
  isAdd.value = false;
  isEdit.value = false;
  isVisible.value = true;
};
const toEdit = (id) => {
  getTD(id);
  title.value = "编辑合同模版";
  isHasBtn.value = true;
  isAdd.value = false;
  isEdit.value = true;
  isVisible.value = true;
};

const getTD = (id) => {
  getContractTempListDetail(id).then((res) => {
    addForm.id = res.data.id;
    addForm.template_name = res.data.template_name;
    addForm.type = res.data.type;
    addForm.remark = res.data.remark;
    addForm.file_url = res.data.file_url;
    addForm.fields = res.data.fields;
  });
};

const resetAddForm = () => {
  for (let key in addForm) {
    if (Array.isArray(addForm[key])) {
      addForm[key] = []; // 重置为一个空数组
    } else if (typeof addForm[key] === "object" && addForm[key] !== null) {
      for (let subKey in addForm[key]) {
        addForm[key][subKey] = ""; // 重置对象内部的属性为""
      }
    } else {
      addForm[key] = ""; // 其他类型的属性重置为""
    }
  }
};
const addNew = () => {
  title.value = "新建合同模板";
  isHasBtn.value = true;
  isAdd.value = true;
  isVisible.value = true;
};

const closeAdd = (formI) => {
  isVisible.value = false;
  fileList.value.length = 0;
  formI.resetFields();
  resetAddForm();
};

const submitAdd = async (formI) => {
  // 新增
  if (isAdd.value) {
    if (!formI) return;
    if (!fileList.value.length) return ElMessage.error("请上传文件！");
    await formI.validate((valid, fields) => {
      if (valid) {
        console.log(addForm);
        createContractTemp(addForm).then(() => {
          ElMessage.success("操作成功！");
          isVisible.value = false;
          handleSearch();
        });
      } else {
        console.log("error submit!", fields);
      }
    });
  }
  // 编辑
  if (isEdit.value) {
    await formI.validate((valid, fields) => {
      if (valid) {
        editContractTemp(addForm).then(() => {
          ElMessage.success("操作成功！");
          isVisible.value = false;
          handleSearch();
        });
      } else {
        console.log("error submit!", fields);
      }
    });
  }
};

const handleSelect = (val) => {
  console.log(val);
};

const beforeUpload = (rawFile: any) => {
  if (rawFile.type !== "application/pdf") {
    ElMessage.error("请上传PDF文件！");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error("上传文件不能超过20MB!");
    return false;
  }
  return true;
};
const handleSuccess = (response) => {
  const { fields, file_path, file_url } = response.data;
  addForm.file_path = file_path;
  addForm.file_url = file_url;
  temp_fields.length = 0;
  temp_fields.push(...fields);
  for (let index = 0; index < fields.length; index++) {
    addForm.fields.push({ label: "", field_name: temp_fields[index] });
  }
};
const handleRemove = () => {
  addForm.fields.length = 0;
  addForm.fields = [];
};

const handleSearch = () => {
  let params = {
    keyword: keyword.value,
    page: pageInfo.page,
    limit: pageInfo.limit,
  };
  getContractTempList(params).then((res) => {
    tableData.length = 0;
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  });
};
const handleReset = () => {
  keyword.value = "";
  handleSearch();
};

const checkUrl = (url) => {
  window.open(url, "_blank");
};

const delById = (id) => {
  ElMessageBox({
    title: "",
    message: h("p", null, "是否删除当前模板？"),
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "Loading...";
        deleteContractTemp(id).then(() => {
          setTimeout(() => {
            done();
            setTimeout(() => {
              instance.confirmButtonLoading = false;
            }, 300);
          }, 1000);
        });
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage.success("删除成功");
    handleSearch();
  });
};

handleSearch();
</script>
