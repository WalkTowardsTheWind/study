<template>
  <div class="p-[37px]">
    <!-- 上级渠道 -->
    <div class="high">
      <div class="title">
        <zxn-title>上级渠道</zxn-title>
        <!-- <el-button
          v-if="isEdit"
          class="add"
          plain
          type="primary"
          @click="add(newFormRef, 'top')"
          >+新增</el-button
        > -->
      </div>
      <zxn-table
        :table-data="tableData1"
        :column-list="columnList1"
        :page-info="pageInfo1"
        @page-change="pageChange1"
      >
        <template #opera="{ row }">
          <template v-if="isEdit">
            <!-- <el-button link type="primary" @click="edit(row, 'top')"
              >编辑</el-button
            > -->
            <el-button
              v-if="row.status == 1"
              link
              type="primary"
              @click="setStatus(row.id, 0)"
              >解绑</el-button
            >
            <el-button v-else link type="primary" @click="setStatus(row.id, 1)"
              >绑定</el-button
            >
          </template>
          <el-button link type="primary" @click="check('top', row.id)"
            >查看</el-button
          >
        </template>
      </zxn-table>
    </div>
    <!-- 下级渠道 -->
    <div class="low mt-[50px]">
      <div class="title">
        <zxn-title>下级渠道</zxn-title>
        <el-button
          v-if="isEdit"
          class="add"
          plain
          type="primary"
          @click="add(newFormRef, 'bottom')"
          >+新增</el-button
        >
      </div>
      <zxn-table
        :table-data="tableData2"
        :column-list="columnList2"
        :page-info="pageInfo2"
        @page-change="pageChange2"
      >
        <template #opera="{ row }">
          <template v-if="isEdit">
            <el-button
              :disabled="row.status == 0"
              link
              type="primary"
              @click="edit(row, 'bottom')"
              >编辑</el-button
            >
            <el-button
              v-if="row.status == 1"
              link
              type="primary"
              @click="setStatus(row.id, 0)"
              >解绑</el-button
            >
            <el-button v-else link type="primary" @click="setStatus(row.id, 1)"
              >绑定</el-button
            >
          </template>
          <el-button link type="primary" @click="check('bottom', row.id)"
            >查看</el-button
          >
        </template>
      </zxn-table>
      <!-- 新增/编辑 弹框 -->
      <zxn-dialog
        v-model:visible="visible"
        :title="dialogTitle"
        @confirm-dialog="confirmClick(newFormRef)"
        @close-dialog="closeDialog(newFormRef)"
      >
        <el-form
          :model="newForm"
          :rules="rules"
          ref="newFormRef"
          label-width="100"
        >
          <el-row>
            <el-col :span="22">
              <el-form-item
                v-if="isDialogAdd"
                label="税地名称"
                prop="tax_land_id"
              >
                <el-select
                  class="w-full"
                  placeholder="请选择"
                  v-model="newForm.tax_land_id"
                  @change="handleSelectTaxland"
                >
                  <el-option
                    v-for="i in taxlandList"
                    :key="i.tax_land_id"
                    :label="i.tax_land_name"
                    :value="i.tax_land_id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-else label="税地名称">
                <el-input disabled v-model="newForm.tax_land_name" />
              </el-form-item>
              <template v-if="dialogType == 'top'">
                <el-form-item
                  v-if="isDialogAdd"
                  label="上级渠道"
                  prop="bind_channel_id"
                >
                  <el-select
                    class="w-full"
                    placeholder="请选择"
                    v-model="newForm.bind_channel_id"
                  >
                    <el-option
                      v-for="i in channelList"
                      :key="i.id"
                      :label="i.channel_name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-else label="上级渠道">
                  <el-input disabled v-model="newForm.channel_name" />
                </el-form-item>
              </template>
              <template v-if="dialogType == 'bottom'">
                <el-form-item
                  v-if="isDialogAdd"
                  label="下级渠道"
                  prop="bind_channel_id"
                >
                  <el-select
                    class="w-full"
                    placeholder="请选择"
                    v-model="newForm.bind_channel_id"
                  >
                    <el-option
                      v-for="i in channelList"
                      :key="i.id"
                      :label="i.channel_name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-else label="下级渠道">
                  <el-input disabled v-model="newForm.channel_name" />
                </el-form-item>
              </template>
              <el-form-item v-if="!isDialogAdd" label="下级点位" prop="point">
                <el-input placeholder="请输入" v-model="newForm.point">
                  <template #append>%</template>
                </el-input>
              </el-form-item>
              <el-form-item label="说明" v-if="!isDialogAdd">
                <el-input
                  placeholder="请输入"
                  v-model="newForm.remark"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zxn-dialog>
      <!-- 查看 -->
      <zxn-dialog
        v-model:visible="checkVisible"
        :title="checkTitle"
        width="80vw"
        :hasBottomBtn="false"
        @close-dialog="checkVisible = false"
      >
        <zxn-table
          :table-data="tableData3"
          :column-list="dialogType == 'top' ? columnList3 : columnList4"
          :hasPagination="false"
        ></zxn-table>
      </zxn-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  bindChannel,
  getChannelAccountInfoTopAndBottomList,
  bindChannelByTaxland,
  setStatusChannelTopAndBottom,
  editTopAndBottomChannel,
  getChannelInfoLogByChannel,
  getChannelAccountTaxland,
} from "@/api/account/channel";
import useTaxlandList from "@/hooks/useTaxlandList";

import { pointValidationRule } from "./options";

const props = defineProps({
  channel_id: {
    type: String || Number,
  },
  isEdit: {
    type: Boolean,
  },
});

const checkVisible = ref(false);
const checkTitle = ref("");

const isDialogAdd = ref(false); // 弹框 新增 / 编辑
const dialogType = ref("top");
const dialogTitle = ref("");
const channelList = reactive([] as any);
const taxlandList = reactive([] as any);

const tableData1 = reactive([] as any);
const tableData2 = reactive([] as any);

const visible = ref(false);

const columnList1 = [
  { label: "上级渠道", prop: "channel_name" },
  {
    label: "状态",
    prop: "status",
    type: "enum",
    path: "accountEnum.taxLandStatusType",
    color: {
      0: {
        color: "#333333",
        background: "#DEDEDE",
      },
      1: {
        color: "#366FF3",
        background: "#DFE8FD",
      },
    },
    width: 120,
  },
  { label: "绑定税地名称", prop: "tax_land_name" },
  { label: "上级点位", prop: "bind_point" },
  { label: "我的点位", prop: "point" },
  { label: "绑定时间", prop: "add_time" },
  {
    label: "操作",
    slot: "opera",
    fixed: "right",
    align: "right",
    minWidth: 100,
  },
];
const columnList2 = [
  { label: "下级渠道", prop: "channel_name" },
  {
    label: "状态",
    prop: "status",
    type: "enum",
    path: "accountEnum.taxLandStatusType",
    color: {
      0: {
        color: "#333333",
        background: "#DEDEDE",
      },
      1: {
        color: "#366FF3",
        background: "#DFE8FD",
      },
    },
    width: 120,
  },
  { label: "绑定税地名称", prop: "tax_land_name" },
  { label: "下级点位", prop: "bind_point" },
  { label: "我的点位", prop: "point" },
  { label: "绑定时间", prop: "add_time" },
  {
    label: "操作",
    slot: "opera",
    fixed: "right",
    align: "right",
    minWidth: 100,
  },
];

const pageInfo1 = reactive({
  page: 1,
  limit: 20,
  total: 0,
});
const pageInfo2 = reactive({
  page: 1,
  limit: 20,
  total: 0,
});
const newFormRef = ref();

const newForm = reactive({
  id: "", // 编辑传
  bind_channel_id: "",
  tax_land_id: "",
  point: "",
  remark: "",
  tax_land_name: "",
  channel_name: "",
});

const rules = {
  bind_channel_id: [{ required: true, message: "必填", trigger: "blur" }],
  tax_land_id: [{ required: true, message: "必填", trigger: "blur" }],
  point: pointValidationRule,
};

const pageChange1 = (cur: { limit: any; page: any }) => {
  const { limit, page } = cur;
  pageInfo1.limit = limit;
  pageInfo1.page = page;
  getTopLevel();
};
const pageChange2 = (cur: { limit: any; page: any }) => {
  const { limit, page } = cur;
  pageInfo2.limit = limit;
  pageInfo2.page = page;
  getBottomLevel();
};

const tableData3 = reactive([] as any);
const columnList3 = [
  { label: "上级渠道", prop: "channel_name" },
  { label: "绑定税地名称", prop: "tax_land_name" },
  { label: "修改类型", prop: "type" },
  { label: "修改说明", prop: "remark" },
  { label: "上级点位", prop: "bind_point" },
  { label: "我的点位", prop: "channel_point" },
  { label: "修改时间", prop: "add_time" },
  { label: "修改账号", prop: "account" },
];
const columnList4 = [
  { label: "下级渠道", prop: "channel_name" },
  { label: "绑定税地名称", prop: "tax_land_name" },
  { label: "修改类型", prop: "type" },
  { label: "修改说明", prop: "remark" },
  { label: "下级点位", prop: "bind_point" },
  { label: "我的点位", prop: "channel_point" },
  { label: "修改时间", prop: "add_time" },
  { label: "修改账号", prop: "account" },
];

const add = async (formInstance: any, type: string) => {
  formInstance?.resetFields();
  const func = async () => {
    newForm.bind_channel_id = "";
    newForm.point = "";
    newForm.remark = "";
    isDialogAdd.value = true;
    taxlandList.length = 0;
    const { data } = await getChannelAccountTaxland({
      channel_id: props.channel_id,
      limit: 1000,
    });
    taxlandList.push(...data.data);
    visible.value = true;
  };
  switch (type) {
    case "top":
      dialogTitle.value = "新增上级渠道";
      dialogType.value = "top";
      func();
      break;
    case "bottom":
      dialogTitle.value = "新增下级渠道";
      dialogType.value = "bottom";
      func();
      break;
  }
};

const confirmClick = (formInstance: any) => {
  if (!formInstance) return;
  // 新增
  if (isDialogAdd.value) {
    let params_add = {
      channel_id: props.channel_id,
      bind_channel_id: newForm.bind_channel_id,
      tax_land_id: newForm.tax_land_id,
      // point: newForm.point,
      bind_type: 0,
    };
    const func = async (func_params: {
      channel_id: string | undefined;
      bind_channel_id: string;
      tax_land_id: string;
      bind_type: number;
    }) => {
      await formInstance.validate((valid: any, fields: any) => {
        if (valid) {
          bindChannel(func_params).then(() => {
            ElMessage.success({
              message: `${dialogTitle.value}成功`,
            });
            visible.value = false;
            handleSearch();
          });
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    switch (dialogType.value) {
      case "top":
        params_add.bind_type = 1;
        func(params_add);
        break;
      case "bottom":
        params_add.bind_type = 2;
        func(params_add);
        break;
    }
  } else {
    // 编辑
    let params_edit = {
      id: newForm.id,
      point: newForm.point,
      remark: newForm.remark,
    };
    editTopAndBottomChannel(params_edit).then((res) => {
      console.log(res);
      ElMessage.success({
        message: "更新成功",
      });
      visible.value = false;
      handleSearch();
    });
  }
};
const closeDialog = (formInstance: any) => {
  visible.value = false;
  formInstance?.clearValidate();
};

const getTopLevel = () => {
  let params = {
    page: pageInfo1.page,
    limit: pageInfo1.limit,
    bind_type: 1,
    channel_id: props.channel_id,
  };
  getChannelAccountInfoTopAndBottomList(params).then((res) => {
    // console.log(res, 111111111111);
    tableData1.length = 0;
    tableData1.push(...res.data.data);
    pageInfo1.total = res.data.total;
  });
};
const getBottomLevel = () => {
  let params = {
    page: pageInfo2.page,
    limit: pageInfo2.limit,
    bind_type: 2,
    channel_id: props.channel_id,
  };
  getChannelAccountInfoTopAndBottomList(params).then((res) => {
    // console.log(res, 2222222222222);

    tableData2.length = 0;
    tableData2.push(...res.data.data);
    pageInfo2.total = res.data.total;
  });
};

const handleSearch = () => {
  getTopLevel();
  getBottomLevel();
};

const handleSelectTaxland = (tax_land_id: any) => {
  let params = {
    channel_id: props.channel_id,
    bind_type: 0,
    tax_land_id,
  };
  const func = (func_params: any) => {
    bindChannelByTaxland(func_params).then((res) => {
      channelList.length = 0;
      channelList.push(...res.data);
      newForm.bind_channel_id = "";
    });
  };
  switch (dialogType.value) {
    case "top":
      params.bind_type = 1;
      func(params);
      break;
    case "bottom":
      params.bind_type = 2;
      func(params);
      break;
  }
};

const setStatus = (id: any, status: any) => {
  const func = () => {
    setStatusChannelTopAndBottom({ id, status }).then(() => {
      ElMessage.success({
        message: "操作成功",
      });
      handleSearch();
    });
  };
  switch (status) {
    case 1:
      ElMessageBox.confirm("是否绑定渠道？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      })
        .then(() => {
          func();
        })
        .catch(() => {
          ElMessage.info({
            message: "取消操作",
          });
        });
      break;
    case 0:
      ElMessageBox.confirm("是否解绑渠道？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      })
        .then(() => {
          func();
        })
        .catch(() => {
          ElMessage.info({
            message: "取消操作",
          });
        });
      break;
  }
};

const edit = (row: any, type: any) => {
  const func = () => {
    isDialogAdd.value = false;
    visible.value = true;
    newForm.id = row.id;
    newForm.tax_land_name = row.tax_land_name;
    newForm.channel_name = row.channel_name;
    newForm.point = row.bind_point;
    newForm.remark = row.remark;
  };
  switch (type) {
    case "top":
      dialogTitle.value = "编辑上级渠道";
      dialogType.value = "top";
      func();
      break;
    case "bottom":
      dialogTitle.value = "编辑下级渠道";
      dialogType.value = "bottom";

      func();
      break;
  }
};

const check = (type, id) => {
  const func = () => {
    getChannelInfoLogByChannel(id).then((res) => {
      console.log(res);
      tableData3.length = 0;
      tableData3.push(...res.data);
      checkVisible.value = true;
    });
  };
  switch (type) {
    case "top":
      dialogType.value = "top";
      checkTitle.value = "查看上级渠道历史点位";
      func();
      break;
    case "bottom":
      dialogType.value = "bottom";
      checkTitle.value = "查看下级渠道历史点位";
      func();
      break;
  }
};

handleSearch();
</script>

<style scoped lang="scss">
.title {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
