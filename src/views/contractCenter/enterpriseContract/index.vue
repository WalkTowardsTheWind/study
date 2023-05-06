<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="企业合同" name="first">
          <div class="mt-4 flex">
            <div>
              <el-input
                size="large"
                v-model="search"
                class="w-50 m-2"
                placeholder="请输入"
                ><template #prefix>
                  <el-icon><i-ep-Search /></el-icon> </template
              ></el-input>
            </div>
            <div class="ml-10" style="display: flex; align-items: center">
              合同状态：
              <el-select
                size="large"
                v-model="stateValue"
                filterable
                placeholder="Select"
              >
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="ml-10" style="display: flex; align-items: center">
              税源地：
              <el-select size="large" v-model="taxValue" placeholder="Select">
                <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" /> -->
              </el-select>
            </div>
          </div>

          <div class="mt-4">
            创建日期：
            <el-config-provider :locale="local">
              <el-date-picker
                size="large"
                v-model="dateValue"
                type="daterange"
                start-placeholder="Start date"
                end-placeholder="End date"
              />
            </el-config-provider>
            <el-button class="ml-5" color="#366FF3 " plain>查询</el-button>
            <el-button color="#366FF3 " plain>重置</el-button>
          </div>
          <div class="mt-4">
            <el-dropdown class="ml-5" @command="handleNewbuilt">
              <el-button color="#366FF3" plain> + 新建 </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="1">线上合同</el-dropdown-item>
                  <el-dropdown-item command="2">线下合同</el-dropdown-item>
                  <!-- <el-dropdown-item command="c">Action 3</el-dropdown-item>
                                    <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
                                    <el-dropdown-item command="e" divided>Action 5</el-dropdown-item> -->
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- <el-button @click="handle">{{selection}}批量操作</el-button> -->
            <el-dropdown class="ml-5" @command="handleBulkOperation">
              <el-button color="#366FF3 " plain> 批量处理 </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="1">批量删除</el-dropdown-item>
                  <el-dropdown-item command="2">批量下载</el-dropdown-item>
                  <!-- <el-dropdown-item command="c">Action 3</el-dropdown-item>
                                    <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
                                    <el-dropdown-item command="e" divided>Action 5</el-dropdown-item> -->
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="mt-4">
            <el-table
              ref="table"
              :data="tableData"
              style="width: 100%"
              row-key="id"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55"
                :reserve-selection="true"
              />
              <el-table-column label="Date" width="120">
                <template #default="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column property="name" label="Name" width="120" />
              <el-table-column
                property="address"
                label="Address"
                show-overflow-tooltip
              />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button size="small" @click="handleEdit()"
                    >编辑{{ scope }}</el-button
                  >
                  <el-button size="small" @click="handleDetails()"
                    >详情</el-button
                  >
                  <el-button size="small" type="danger" @click="handleDelete()"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <pagination
            v-if="total > 0"
            v-model:total="total"
            v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize"
            @pagination="handleQuery"
          />
        </el-tab-pane>
        <el-tab-pane label="渠道合同" name="second">Config</el-tab-pane>
        <el-tab-pane label="税源地合同" name="third">Role</el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 新建线上合同弹窗 -->
    <el-dialog
      title="新建"
      v-model="dialogNewbuilt1"
      width="600px"
      append-to-body
      @close="closeDialog"
    >
      <div>main</div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 新建线下合同弹窗 -->
    <el-dialog
      title="新建合同"
      v-model="dialogNewbuilt2"
      width="700px"
      append-to-body
      @close="closeDialog"
    >
      <el-form
        :inline="true"
        ref="dataNewbuilt2FormRef"
        :model="dataNewbuilt2"
        :rules="dataNewbuilt2Rules"
        label-position="right"
        label-width="100px"
        class="demo-form-inline"
      >
        <el-form-item prop="user" label="合同名称">
          <el-input v-model="dataNewbuilt2.user" placeholder="Approved by" />
        </el-form-item>
        <el-form-item prop="pwss" label="合同类型">
          <el-input v-model="dataNewbuilt2.pwss" placeholder="Approved by" />
        </el-form-item>
        <el-form-item prop="pwss" label="合同编号">
          <el-input v-model="dataNewbuilt2.pwss" placeholder="Approved by" />
        </el-form-item>
        <el-form-item prop="pwss" label="合同期限">
          <el-input v-model="dataNewbuilt2.pwss" placeholder="Approved by" />
        </el-form-item>
        <el-form-item prop="pwss" label="甲方">
          <el-input v-model="dataNewbuilt2.pwss" placeholder="Approved by" />
        </el-form-item>
        <el-form-item prop="pwss" label="乙方">
          <el-input v-model="dataNewbuilt2.pwss" placeholder="Approved by" />
        </el-form-item>
      </el-form>
      <el-form
        ref="dataNewbuilt2FormRef"
        :model="dataNewbuilt2"
        :rules="dataNewbuilt2Rules"
        class="demo-form-inline"
      >
        <el-form-item class="ml-6" prop="pwss" label="备注要求">
          <el-input v-model="dataNewbuilt2.pwss" type="textarea" />
        </el-form-item>
        <el-form-item class="ml-8" label="多图上传">
          <multi-upload v-model="multiPicUrls"></multi-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import zhcn from "element-plus/lib/locale/lang/zh-cn";
import MultiUpload from "@/components/Upload/MultiUpload.vue";
/**
 * tabs
 */
const activeName = ref("first");
/**
 * 搜索
 */
const search = ref();
/**
 * 合同状态
 */
const stateValue = ref("");
const stateOptions = [
  {
    value: "1",
    label: "全部",
  },
  {
    value: "2",
    label: "正常",
  },
  {
    value: "3",
    label: "过期",
  },
  {
    value: "4",
    label: "停用",
  },
];
/**
 * 文件上传
 */
const multiPicUrls = ref([
  "https://oss.youlai.tech/default/2022/11/20/8af5567816094545b53e76b38ae9c974.webp",
  "https://oss.youlai.tech/default/2022/11/20/13dbfd7feaf848c2acec2b21675eb9d3.webp",
]);

/**
 * 新建线上合同弹窗
 */
const dialogNewbuilt1 = ref(false);
const dialogNewbuilt2 = ref(false);
// const dialogNewbuilt3 = ref(false);
/**
 * 税源地
 */
const taxValue = ref();
/**
 * 日期
 */
const dateValue = ref("");
let local = zhcn;
/**
 * 分页
 */
const total = ref(100);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
});
/**
 * 线下合同表单
 */
const dataNewbuilt2FormRef = ref(ElForm);
const dataNewbuilt2 = reactive({
  user: 1,
  pwss: 10,
});
const dataNewbuilt2Rules = {
  user: [{ required: true, trigger: "blur" }],
  pwss: [{ required: true, trigger: "blur" }],
};

/**
 * 分页
 */
const handleQuery = () => {};
/**
 * 批量操作
 */
const handleNewbuilt = (command: string | number | object) => {
  if (command == 1) {
    dialogNewbuilt1.value = true;
    console.log("线上合同");
  } else if (command == 2) {
    dialogNewbuilt2.value = true;
    console.log("线下合同");
  }
};
const handleBulkOperation = (command: string | number | object) => {
  console.log(multipleSelection.value);
  if (command == 1) {
    console.log(multipleSelection.value[0]);
    console.log("上");
  } else if (command == 2) {
    console.log(multipleSelection.value[0]);
    console.log("下");
  }
};

/**
 * 取消
 */

const closeDialog = () => {
  dialogNewbuilt2.value = false;
};
/**
 * 确定
 */

const handleSubmit = () => {};

/**
 * 表格数据
 */
interface User {
  id: number;
  date: string;
  name: string;
  address: string;
}
const tableData: User[] = [
  {
    id: 1,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 3,
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 5,
    date: "2016-05-08",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

// const table = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([]);
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
/**
 * tabs
 */
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

// const handle = () => {
//     console.log(multipleSelection.value);
// };
/**
 * 编辑
 */
const handleEdit = () => {};
/**
 * 详情
 */
const handleDetails = () => {};
/**
 * 删除
 */
const handleDelete = () => {};
</script>
<style lang="scss">
/* 修改tabs样式 */
.el-tabs__nav-scroll {
  height: 50px;
}

.el-tabs__active-bar {
  //   top: 0;

  /* 只需要找到该节点修改就可以，新增top,去掉bottom */
  bottom: -10px;
  height: 4px;

  /* color: #f40; */
  background-color: #366ff3;
}

.el-tabs__item {
  &.is-active {
    color: #366ff3;
  }

  &:hover {
    color: #366ff3;
  }
}

.el-tabs__nav-wrap::after {
  //   top: 0;

  /* 只需要找到该节点修改就可以，新增top,去掉bottom */
  bottom: 2px;
  height: 1px;
}
</style>
