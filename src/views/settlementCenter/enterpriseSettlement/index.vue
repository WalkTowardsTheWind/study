<template>
  <div class="app-container">
    <el-card>
      <div class="text-black"></div>
      <div class="mt-4">累计下发： 124.543.23元</div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="企业合同" name="first">
          <div>
            任务状态：
            <el-button color="#000" :plain="false">全部</el-button>
            <el-button color="#000" plain>待下发</el-button>
            <el-button color="#000" plain>已下发</el-button>
            <el-button color="#000" plain>下发异常</el-button>
          </div>
          <div class="mt-4">
            <el-input v-model="search" placeholder="请输入" class="w-100 h-10">
              <template #append>
                <el-button>搜索</el-button>
              </template>
            </el-input>
          </div>
          <div class="mt-4">
            任务日期：
            <el-config-provider :locale="local">
              <el-date-picker
                size="large"
                v-model="dateValue"
                type="daterange"
                start-placeholder="Start date"
                end-placeholder="End date"
              />
            </el-config-provider>
            <el-button class="ml-5" color="#000" plain>查询</el-button>
            <el-button color="#000" plain>重置</el-button>
          </div>
          <div class="mt-4">
            <el-button color="#000" plain>今</el-button>
            <el-button color="#000" plain>昨</el-button>
            <el-button color="#000" plain>本月</el-button>
            <el-button color="#000" plain>上月</el-button>
            <el-button color="#000" plain>今年</el-button>
          </div>
          <div class="mt-4">
            <el-dropdown class="ml-5" @command="handleNewbuilt">
              <el-button type="primary"> 新建 </el-button>
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
              <el-button type="primary"> 批量处理 </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="1">批量1</el-dropdown-item>
                  <el-dropdown-item command="2">批量2</el-dropdown-item>
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
    <!-- 结算任务详情页弹窗 -->
    <el-dialog v-model="dialogSettlement1" width="600px" @close="closeDialog">
      <template #header>
        <div class="my-header">
          <template>
            <el-steps :space="200" :active="1" finish-status="success">
              <el-step title="Done" />
              <el-step title="Processing" />
              <el-step title="Step 3" />
            </el-steps>
          </template>
        </div>
      </template>
      <hr />
      This is dialog content.
    </el-dialog>
    <!-- 成员详情弹窗 -->
    <el-dialog
      title="新建合同"
      v-model="dialogSettlement2"
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
// import { CircleCloseFilled } from '@element-plus/icons-vue'
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
 * 文件上传
 */
const multiPicUrls = ref([
  "https://oss.youlai.tech/default/2022/11/20/8af5567816094545b53e76b38ae9c974.webp",
  "https://oss.youlai.tech/default/2022/11/20/13dbfd7feaf848c2acec2b21675eb9d3.webp",
]);

/**
 * 结算详情弹窗
 */
const dialogSettlement1 = ref(false);
const dialogSettlement2 = ref(false);
/**
 * 税源地
 */
// const taxValue = ref()
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
    dialogSettlement1.value = true;
    console.log("结算xian'qu");
  } else if (command == 2) {
    dialogSettlement2.value = true;
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
  dialogSettlement1.value = false;
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
// }
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
.el-tabs__active-bar {
  top: 0;

  /* 只需要找到该节点修改就可以，新增top,去掉bottom */
  bottom: none;

  /* color: #f40; */
  background-color: #f40;
}

.el-tabs__item {
  &.is-active {
    color: #000;
  }

  &:hover {
    color: gray;
  }
}

.el-tabs__nav-wrap::after {
  top: 0;

  /* 只需要找到该节点修改就可以，新增top,去掉bottom */
  bottom: none;
}

// .demo-tabs>.el-tabs__content {
//     /* color: #6b778c; */
//     // color: #f40c;
// }
</style>
