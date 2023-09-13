<template>
  <div class="p-[37px]">
    <!-- 上级渠道 -->
    <div class="high">
      <div class="title">
        <zxn-title>上级渠道</zxn-title>
        <el-button
          class="add"
          plain
          type="primary"
          @click="addHigh(newForm1Ref)"
          >+新增</el-button
        >
      </div>
      <zxn-table
        :table-data="tableData1"
        :column-list="columnList1"
        :page-info="pageInfo1"
        @page-change="pageChange1"
      >
        <template v-if="isEdit" #opera="{ row }">
          <el-button link type="primary" @click="edit1(row)">编辑</el-button>
          <el-button
            v-if="row.status == 1"
            link
            type="primary"
            @click="setStatus(row.id, 2)"
            >禁用</el-button
          >
          <el-button v-else link type="primary" @click="setStatus(row.id, 1)"
            >启用</el-button
          >
          <el-button link type="primary">查看</el-button>
        </template>
      </zxn-table>
      <zxn-dialog
        v-model:visible="visible1"
        title="新增上级渠道"
        @confirm-dialog="confirmClick1(newForm1Ref)"
        @close-dialog="closeDialog1(newForm1Ref)"
      >
        <el-form
          :model="newForm1"
          :rules="rules1"
          ref="newForm1Ref"
          label-width="100"
        >
          <el-row>
            <el-col :span="22">
              <el-form-item label="税地名称" prop="tax_land_id">
                <el-select
                  v-if="isAdd"
                  class="w-full"
                  placeholder="请选择"
                  v-model="newForm1.tax_land_id"
                  @change="handleSelectTaxland1"
                >
                  <el-option
                    v-for="(i, index) in taxlandList"
                    :key="i.id"
                    :label="i.tax_land_name"
                    :value="i.id"
                  ></el-option>
                </el-select>
                <el-input v-else disabled v-model="newForm1.tax_land_name" />
              </el-form-item>
              <el-form-item label="上级渠道" prop="bind_channel_id">
                <el-select
                  v-if="isAdd"
                  class="w-full"
                  placeholder="请选择"
                  v-model="newForm1.bind_channel_id"
                >
                  <el-option
                    v-for="i in channelList"
                    :key="i.id"
                    :label="i.channel_name"
                    :value="i.id"
                  ></el-option>
                </el-select>
                <el-input v-else disabled v-model="newForm1.channel_name" />
              </el-form-item>

              <el-form-item label="我的点位" prop="point">
                <el-input placeholder="请输入" v-model="newForm1.point">
                  <template #append>%</template>
                </el-input>
              </el-form-item>
              <el-form-item label="说明" v-if="!isAdd">
                <el-input
                  placeholder="请输入"
                  v-model="newForm1.remark"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zxn-dialog>
    </div>
    <!-- 下级渠道 -->
    <div class="low mt-[50px]">
      <div class="title">
        <zxn-title>下级渠道</zxn-title>
        <el-button class="add" plain type="primary" @click="addLow(newForm2Ref)"
          >+新增</el-button
        >
      </div>
      <zxn-table
        :table-data="tableData2"
        :column-list="columnList2"
        :page-info="pageInfo2"
        @page-change="pageChange2"
      >
        <template v-if="isEdit" #opera="{ row }">
          <el-button link type="primary">编辑</el-button>
          <el-button
            v-if="row.status == 1"
            link
            type="primary"
            @click="setStatus(row.id, 2)"
            >禁用</el-button
          >
          <el-button v-else link type="primary" @click="setStatus(row.id, 1)"
            >启用</el-button
          >
          <el-button link type="primary">查看</el-button>
        </template>
      </zxn-table>
      <zxn-dialog
        v-model:visible="visible2"
        title="新增下级渠道"
        @confirm-dialog="confirmClick2(newForm2Ref)"
        @close-dialog="closeDialog2(newForm2Ref)"
      >
        <el-form
          :model="newForm2"
          :rules="rules2"
          ref="newForm2Ref"
          label-width="100"
        >
          <el-row>
            <el-col :span="22">
              <el-form-item label="税地名称" prop="tax_land_id">
                <el-select
                  v-if="isAdd"
                  class="w-full"
                  placeholder="请选择"
                  v-model="newForm2.tax_land_id"
                  @change="handleSelectTaxland2"
                >
                  <el-option
                    v-for="(i, index) in taxlandList"
                    :key="i.id"
                    :label="i.tax_land_name"
                    :value="i.id"
                  ></el-option>
                </el-select>
                <el-input v-else disabled v-model="newForm2.tax_land_name" />
              </el-form-item>
              <el-form-item label="下级渠道" prop="bind_channel_id">
                <el-select
                  v-if="isAdd"
                  class="w-full"
                  placeholder="请选择"
                  v-model="newForm2.bind_channel_id"
                >
                  <el-option
                    v-for="i in channelList"
                    :key="i.id"
                    :label="i.channel_name"
                    :value="i.id"
                  ></el-option>
                </el-select>
                <el-input v-else disabled v-model="newForm2.channel_name" />
              </el-form-item>

              <el-form-item label="我的点位" prop="point">
                <el-input placeholder="请输入" v-model="newForm2.point">
                  <template #append>%</template>
                </el-input>
              </el-form-item>
              <el-form-item label="说明" v-if="!isAdd">
                <el-input
                  placeholder="请输入"
                  v-model="newForm2.remark"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zxn-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  bindChannel,
  getChannelAccountInfoTopAndBottomList,
  bindChannelByTaxland,
} from "@/api/account/channel";
import useTaxlandList from "@/hooks/useTaxlandList";

const props = defineProps({
  channel_id: {
    type: String || Number,
  },
  isEdit: {
    type: Boolean,
  },
});

const isAdd = ref(false);
const channelList = reactive([] as any);
const taxlandList = reactive([] as any);

const tableData1 = reactive([] as any);
const tableData2 = reactive([] as any);

const visible1 = ref(false);
const visible2 = ref(false);

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
const newForm1Ref = ref();
const newForm2Ref = ref();

const newForm1 = reactive({
  id: "", // 编辑传
  bind_channel_id: "",
  tax_land_id: "",
  point: "",
  remark: "",
  tax_land_name: "",
  channel_name: "",
});
const newForm2 = reactive({
  id: "", // 编辑传
  bind_channel_id: "",
  tax_land_id: "",
  point: "",
  remark: "",
  tax_land_name: "",
  channel_name: "",
});

const rules1 = {
  bind_channel_id: [{ required: true, message: "必填" }],
  tax_land_id: [{ required: true, message: "必填" }],
  point: [{ required: true, message: "必填" }],
};
const rules2 = {
  bind_channel_id: [{ required: true, message: "必填" }],
  tax_land_id: [{ required: true, message: "必填" }],
  point: [{ required: true, message: "必填" }],
};

const pageChange1 = () => {};
const pageChange2 = () => {};

const addHigh = async (formInstance) => {
  formInstance?.resetFields();
  isAdd.value = true;
  taxlandList.length = 0;
  const arr = await useTaxlandList();
  taxlandList.push(...arr);

  visible1.value = true;
};
const addLow = async (formInstance) => {
  formInstance?.resetFields();
  isAdd.value = true;
  taxlandList.length = 0;
  const arr = await useTaxlandList();
  taxlandList.push(...arr);

  visible2.value = true;
};

const confirmClick1 = async (formInstance) => {
  if (!formInstance) return;
  await formInstance.validate((valid, fields) => {
    if (valid) {
      let params = {
        channel_id: props.channel_id,
        bind_channel_id: newForm1.bind_channel_id,
        tax_land_id: newForm1.tax_land_id,
        point: newForm1.point,
        bind_type: 1, // 绑定类型 1绑定上级渠道 2绑定下级渠道
      };
      bindChannel(params).then((res) => {
        console.log(res);
        ElMessage.success({
          message: "新增上级渠道成功",
        });
        visible1.value = false;
        handleSearch();
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
const confirmClick2 = async (formInstance) => {
  if (!formInstance) return;
  await formInstance.validate((valid, fields) => {
    if (valid) {
      let params = {
        channel_id: props.channel_id,
        bind_channel_id: newForm2.bind_channel_id,
        tax_land_id: newForm2.tax_land_id,
        point: newForm2.point,
        bind_type: 2, // 绑定类型 1绑定上级渠道 2绑定下级渠道
      };
      bindChannel(params).then((res) => {
        console.log(res);
        ElMessage.success({
          message: "新增下级渠道成功",
        });
        visible2.value = false;
        handleSearch();
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const closeDialog1 = (formInstance) => {
  visible1.value = false;
  formInstance?.clearValidate();
};
const closeDialog2 = (formInstance) => {
  visible2.value = false;
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
    console.log(res, 111111111111);
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
    console.log(res, 2222222222222);

    tableData2.length = 0;
    tableData2.push(...res.data.data);
    pageInfo2.total = res.data.total;
  });
};

const handleSearch = () => {
  getTopLevel();
  getBottomLevel();
};

const handleSelectTaxland1 = (tax_land_id) => {
  let params = {
    channel_id: props.channel_id,
    bind_type: 1,
    tax_land_id,
  };
  bindChannelByTaxland(params).then((res) => {
    // console.log(res);
    channelList.length = 0;
    channelList.push(...res.data);
  });
};
const handleSelectTaxland2 = (tax_land_id) => {
  let params = {
    channel_id: props.channel_id,
    bind_type: 2,
    tax_land_id,
  };
  bindChannelByTaxland(params).then((res) => {
    // console.log(res);
    channelList.length = 0;
    channelList.push(...res.data);
  });
};

const setStatus = (id, status) => {
  switch (status) {
    case 1:
      ElMessageBox.confirm("是否启用用税地？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      });
      // .then(() => {
      //   setChannelTaxlandStatus({ id, status }).then((res) => {
      //     ElMessage.success({
      //       message: "禁用成功",
      //     });
      //     handleSearch();
      //   });
      // })
      // .catch(() => {
      //   ElMessage.info({
      //     message: "取消操作",
      //   });
      // });
      break;
    case 2:
      ElMessageBox.confirm("是否禁用税地？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      });
      // .then(() => {
      //   setChannelTaxlandStatus({ id, status }).then((res) => {
      //     ElMessage.success({
      //       message: "禁用成功",
      //     });
      //     handleSearch();
      //   });
      // })
      // .catch(() => {
      //   ElMessage.info({
      //     message: "取消操作",
      //   });
      // });
      break;
  }
};

const edit1 = (row) => {
  isAdd.value = false;
  visible1.value = true;
  newForm1.id = row.id;
  newForm1.tax_land_name = row.tax_land_name;
  newForm1.channel_name = row.channel_name;
  newForm1.point = row.point;
  newForm1.remark = row.remark;
  console.log(row);
};
const edit2 = (row) => {
  isAdd.value = false;
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
