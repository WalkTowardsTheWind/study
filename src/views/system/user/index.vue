<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList">
      <template #user>
        <div class="p-[24px] p-b-[0]">
          <zxn-search
            :formItem="formItem"
            @on-search="handleSearch"
            @on-reset="handleReset"
          >
            <el-form-item>
              <el-input v-model="formItem.name" placeholder="请输入关键字">
                <template #prefix>
                  <i-ep-Search />
                </template>
              </el-input>
            </el-form-item>
            <!--      <el-form-item label="账户状态">-->
            <!--        <el-select v-model="formItem.status" placeholder="请选择">-->
            <!--          <el-option-->
            <!--            v-for="item in statusOption"-->
            <!--            :key="item.value"-->
            <!--            :label="item.label"-->
            <!--            :value="item.value"-->
            <!--          />-->
            <!--        </el-select>-->
            <!--      </el-form-item>-->
            <el-form-item label="角色">
              <zxn-select
                v-model="formItem.roles"
                placeholder="请选择"
                @change="handleSearch"
              >
                <el-option
                  v-for="item in roleOption"
                  :key="item.id"
                  :label="item.role_name"
                  :value="item.id"
                />
              </zxn-select>
            </el-form-item>
            <el-form-item prop="date" label="创建日期">
              <el-date-picker
                v-model="date"
                type="daterange"
                unlink-panels
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </zxn-search>
          <zxn-table
            :table-data="tableData"
            :column-list="columnList"
            hasSelect
            :page-info="pageInfo"
          >
            <template #tableTop>
              <el-button type="primary" @click="add('add')">+ 新建</el-button>
              <!-- <el-dropdown class="ml-4" trigger="click">
                <el-button type="primary">批量操作</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="1">删除</el-dropdown-item>
                    <el-dropdown-item command="2">下载</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown> -->
            </template>
            <template #operation="scope">
              <el-button
                v-if="scope.row.status == 1"
                link
                type="primary"
                @click="stop(scope.row.id, '0')"
                >关闭</el-button
              >
              <el-button
                v-else
                link
                type="primary"
                @click="stop(scope.row.id, '1')"
                >启用</el-button
              >
              <!-- <el-button link type="primary" @click="add('detail', scope.row)">详情</el-button> -->
              <el-button link type="primary" @click="add('edit', scope.row)"
                >编辑</el-button
              >
              <el-button link type="primary" @click="del(scope.row.id)"
                >删除</el-button
              >
            </template>
          </zxn-table>
          <el-dialog
            v-model="visible"
            :title="dialogTitle"
            width="500px"
            :close-on-click-modal="false"
            @closed="closeDialog"
          >
            <!-- 新增编辑 -->
            <el-form
              ref="elFormRef"
              :model="addForm"
              label-width="80px"
              v-if="isAdd"
              :rules="rules"
            >
              <el-form-item label="账户ID" prop="account">
                <el-input v-model="addForm.account" placeholder="请输入" />
              </el-form-item>
              <el-form-item v-if="!isEdit" label="密码" prop="pwd">
                <el-input
                  v-model="addForm.pwd"
                  type="password"
                  placeholder="请输入"
                  show-password
                >
                </el-input>
              </el-form-item>
              <el-form-item v-if="!isEdit" label="确认密码" prop="conf_pwd">
                <el-input
                  v-model="addForm.conf_pwd"
                  type="password"
                  placeholder="请输入"
                  show-password
                >
                </el-input>
              </el-form-item>
              <el-form-item label="角色" prop="roles">
                <el-select
                  class="w-full"
                  placeholder="请选择"
                  filterable
                  clearable
                  v-model="addForm.roles"
                >
                  <el-option
                    v-for="item in enableRoleOption"
                    :key="item.id"
                    :label="item.role_name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="地区">
                <el-cascader
                  class="w-full"
                  v-model="area"
                  :options="options"
                  :props="props2"
                  clearable
                  placeholder="请选择"
                  :show-all-levels="false"
                />
              </el-form-item> -->
              <el-form-item label="联系人">
                <el-input v-model="addForm.real_name" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input
                  v-if="isAdd"
                  v-model="addForm.mobile"
                  placeholder="请输入"
                />
                <span v-else>{{ addForm.mobile }}</span>
              </el-form-item>
              <div class="btn">
                <el-button type="primary" @click="addSubmit">{{
                  isAdd ? "保存" : "完成"
                }}</el-button>
                <el-button type="info" @click="visible = false">取消</el-button>
              </div>
            </el-form>
            <!-- 详情 -->
            <el-form label-width="70px" v-else>
              <el-form-item label="账户ID">
                <span>{{ addForm.account }}</span>
              </el-form-item>
              <el-form-item label="角色">
                <span>{{ addForm.role_name }}</span>
              </el-form-item>
              <el-form-item label="地区">
                <span>{{ addForm.areas_name }}</span>
              </el-form-item>
              <el-form-item label="联系人">
                <span>{{ addForm.real_name }}</span>
              </el-form-item>
              <el-form-item label="联系方式">
                <span>{{ addForm.mobile }}</span>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import {
  createOtherAccount,
  delOtherAccount,
  getAreaIdList,
  getOtherAccountList,
  getRolePage,
  getEnableRole,
  updateOtherAccount,
  updateOtherAccountStatus,
  getOtherAccountDetail,
} from "@/api/system";
const rules = {
  account: [{ required: true, message: "请输入账户ID", trigger: "blur" }],
  pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
  conf_pwd: [{ required: true, message: "请确认密码", trigger: "blur" }],
  roles: [{ required: true, message: "请选择密码", trigger: "change" }],
};
//
const activeName = ref("user");
const tabsList = reactive([
  {
    name: "user",
    label: "账号管理",
  },
]);
const props2 = {
  label: "name",
  value: "id",
  multiple: true,
  children: "child",
  emitPath: false,
};

const options = ref([] as any);
const area = ref([] as any);

const visible = ref(false);
const dialogTitle = ref("");
const dialogType = ref("");

const isAdd = ref(false);
const isEdit = ref(false);

const roleOption = ref([] as any);
const enableRoleOption = ref([] as any);

const addForm = reactive({
  id: "",
  account: "",
  pwd: "",
  conf_pwd: "",
  roles: "" as number | string,
  area_id: [] as any,
  real_name: "",
  role_name: "",
  mobile: "",
  areas_name: "",
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const date = ref([] as any);

const formItem = reactive({
  name: "",
  status: "",
  add_time: "",
  roles: "",
});
const tableData = reactive([] as any);

const columnList = [
  { label: "账户名称", prop: "account" },
  {
    label: "状态",
    prop: "status",
    type: "enum",
    path: "system.userStatus",
    color: {
      0: {
        color: "#333333",
        background: "#dedede",
      },
      1: {
        color: "#366FF3",
        background: "#dfe8fd",
      },
    },
  },
  { label: "联系人", prop: "real_name" },
  { label: "联系号码", prop: "mobile" },
  { label: "角色", prop: "roles" },
  { label: "功能权限", prop: "role_menus" },
  { label: "创建时间", prop: "add_time" },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    align: "right",
    width: 200,
  },
];

const add = (str: string, item?: any) => {
  if (str === "add") {
    dialogTitle.value = "新建账号";
    isAdd.value = true;
    isEdit.value = false;
    dialogType.value = "add";
    addForm.id = "";
    addForm.account = "";
    addForm.pwd = "";
    addForm.conf_pwd = "";
    addForm.roles = "";
    addForm.area_id = "";
    area.value = [];
    addForm.real_name = "";
    addForm.mobile = "";
  }
  if (str === "edit") {
    dialogTitle.value = "编辑账号";
    isAdd.value = true;
    isEdit.value = true;
    dialogType.value = "edit";
    getOtherAccountDetail(item.id).then((res) => {
      let arr = [] as any;
      res.data.areas.forEach((item: any) => {
        return arr.push([item.parent_id, item.id]);
      });
      addForm.id = res.data.id;
      area.value = arr;
      addForm.account = res.data.account;
      addForm.roles = res.data.roles ? Number(res.data.roles) : "";
      addForm.real_name = res.data.real_name;
      addForm.mobile = res.data.mobile;
    });
  }
  if (str === "detail") {
    dialogTitle.value = "账户详情";
    isAdd.value = false;
    dialogType.value = "detail";
    getOtherAccountDetail(item.id).then((res) => {
      addForm.id = res.data.id;
      addForm.account = res.data.account;
      addForm.roles = Number(res.data.roles);
      addForm.role_name = res.data.role_name;
      addForm.areas_name = res.data.areas_name;
      addForm.real_name = res.data.real_name;
      addForm.mobile = res.data.mobile;
    });
  }
  visible.value = true;
};
// const loading = ref(false);
function handleSearch() {
  tableData.length = 0;
  let params = {
    ...formItem,
    ...pageInfo,
  };
  getOtherAccountList(params).then((res: any) => {
    console.log(res.data, 12121212121212);

    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  });
}
function getStatusOption() {
  getRolePage().then((res) => {
    roleOption.value.push(...res.data.list);
  });
  getEnableRole().then((res) => {
    enableRoleOption.value.push(...res.data.list);
  });
}

// 启用 关闭
const stop = (id: string, status: string) => {
  // 启用
  if (status == "1") {
    ElMessageBox.confirm("是否启用账号?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      center: true,
    }).then(() => {
      updateOtherAccountStatus({ id, status })
        .then(() => {
          ElMessage({
            type: "success",
            message: "操作成功",
          });
          handleSearch();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
  // 关闭
  if (status == "0") {
    ElMessageBox.confirm("是否关闭账户?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      center: true,
    }).then(() => {
      updateOtherAccountStatus({ id, status })
        .then(() => {
          ElMessage({
            type: "success",
            message: "操作成功",
          });
          handleSearch();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
};

const del = (id: string) => {
  ElMessageBox.confirm("是否删除账号?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  }).then(() => {
    delOtherAccount(id)
      .then(() => {
        ElMessage({
          type: "success",
          message: "操作成功",
        });
        handleSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "canceled",
        });
      });
  });
};

function getAreaList() {
  options.value.length = 0;
  getAreaIdList().then((res) => {
    options.value.push(...res.data);
  });
}
const elFormRef = ref();
function addSubmit() {
  elFormRef.value.validate((valid) => {
    if (valid) {
      // console.log(area.value);
      // console.log(Object.values(area.value));
      if (typeof area.value === "object") {
        addForm.area_id = Object.values(area.value);
      }
      area.value.forEach((item: any) => {
        if (Array.isArray(item)) {
          addForm.area_id = area.value.map((item2: any) => item2[1]);
        }
      });

      // 新增
      if (isAdd.value === true && isEdit.value === false) {
        addForm.area_id = Object.values(area.value);
        createOtherAccount(addForm).then(() => {
          visible.value = false;
          ElMessage({
            type: "success",
            message: "操作成功",
          });
          handleSearch();
        });
      }
      if (isEdit.value) {
        // 编辑
        updateOtherAccount(addForm).then(() => {
          visible.value = false;
          ElMessage({
            type: "success",
            message: "操作成功",
          });
          handleSearch();
        });
      }
    }
  });
}
const closeDialog = () => {
  elFormRef.value.clearValidate();
};

function handleReset() {
  formItem.name = "";
  formItem.status = "";
  formItem.roles = "";
  date.value = [];
}

handleSearch();
getStatusOption();
getAreaList();
</script>

<style lang="scss">
.searchForm {
  margin-top: 10px;
}

.line {
  margin: 0 2px;
  font-size: 1px;
  color: #ccc;
  border: none !important;
}

.btn {
  display: flex;
  justify-content: center;
}
</style>
