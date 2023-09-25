<template>
  <div class="p-[37px]">
    <el-button v-if="isEdit" type="primary" plain class="mb-[20px]" @click="add"
      >+新增</el-button
    >

    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="handlePageChange"
    >
      <template #tax_cost_point="{ row }"> {{ row.tax_cost_point }}% </template>
      <template #channel_point="{ row }"> {{ row.channel_point }}% </template>
      <template #tax_point="{ row }"> {{ row.tax_point }}% </template>
      <template #operation="{ row }">
        <template v-if="isEdit">
          <el-button
            v-if="row.status == 0"
            link
            type="primary"
            @click="setStatus(row.id, 1)"
            >绑定</el-button
          >
          <el-button v-else link type="primary" @click="setStatus(row.id, 0)"
            >解绑</el-button
          >
          <el-button link type="primary" @click="edit(row)">编辑</el-button>
        </template>
        <el-button link type="primary" @click="check(row.id)">查看</el-button>
      </template>
    </zxn-table>

    <!-- 新增/编辑 -->
    <zxn-dialog
      :title="newTitle"
      v-model:visible="visible"
      @close-dialog="closeDialog(newFormRef)"
      @confirm-dialog="confirmClick(newFormRef)"
    >
      <el-form
        :model="newForm"
        :rules="rules"
        label-width="100px"
        ref="newFormRef"
      >
        <el-row>
          <el-col :span="22">
            <el-form-item v-if="addType" label="税地名称" prop="tax_land_id">
              <el-select
                class="w-full"
                placeholder="请选择"
                v-model="newForm.tax_land_id"
              >
                <el-option
                  v-for="(item, index) in taxLandOption"
                  :key="index"
                  :value="item.id"
                  :label="item.tax_land_name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="税地名称" v-else>
              <el-input v-model="newForm.tax_land_name" disabled />
            </el-form-item>
            <el-form-item label="渠道点位" prop="channel_point">
              <el-input placeholder="请输入" v-model="newForm.channel_point">
                <template #append>%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="扣税点位" prop="tax_point">
              <el-input placeholder="请输入" v-model="newForm.tax_point">
                <template #append>%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="说明" v-if="!addType">
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
      title="查看点位"
      :width="1500"
      :hasBottomBtn="false"
      @close-dialog="checkVisible = false"
    >
      <zxn-table
        :table-data="tableData2"
        :column-list="columnList2"
        :hasPagination="false"
      ></zxn-table>
    </zxn-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  addChannelTaxland,
  getChannelAccountTaxland,
  getTaxlandInfoLogByChannelAccount,
  setChannelTaxlandStatus,
  updateChannelTaxland,
} from "@/api/account/channel";
import { getLandList } from "@/api/common";
import { useRoute } from "vue-router";
import { pointValidationRule } from "./options";
const route = useRoute();
defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
});

const newTitle = ref("");
const addType = ref(false);

const idv = ref("");
const pageInfo = reactive({
  limit: 20,
  page: 1,
  total: 0,
});
if (route.query.id) {
  idv.value = route.query.id.toString();
}
const tableData = reactive([] as any);
const columnList = [
  { label: "税地名称", prop: "tax_land_name", minWidth: 150 },
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
  },
  { label: "成本点位", prop: "tax_cost_point", slot: "tax_cost_point" },
  { label: "渠道点位", prop: "channel_point", slot: "channel_point" },
  { label: "扣税点位", prop: "tax_point", slot: "tax_point" },
  { label: "渠道佣金累计", prop: "amount", type: "money" },
  { label: "绑定时间", prop: "add_time" },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    align: "right",
    minWidth: 120,
  },
];

const tableData2 = reactive([] as any);
const columnList2 = [
  { label: "税地名称", prop: "tax_land_name" },
  { label: "修改类型", prop: "type" },
  { label: "修改说明", prop: "remark" },
  { label: "成本点位", prop: "tax_cost_point" },
  { label: "渠道点位", prop: "channel_point" },
  { label: "扣税点位", prop: "tax_point" },
  { label: "修改时间", prop: "add_time" },
  { label: "修改账号", prop: "account" },
];

const visible = ref(false);
const checkVisible = ref(false);

const add = () => {
  newTitle.value = "新增税地";
  addType.value = true;
  visible.value = true;
  newForm.channel_id = idv.value;
  newForm.tax_land_id = "";
  newForm.channel_point = "";
  newForm.tax_point = "";
};
const newFormRef = ref();
const newForm = reactive({
  id: "",
  tax_land_name: "",
  channel_id: "",
  tax_land_id: "",
  channel_point: "",
  tax_point: "",
  remark: "",
});

const rules = {
  tax_land_id: [{ required: true, message: "必填", trigger: "change" }],
  channel_point: pointValidationRule,
  tax_point: pointValidationRule,
};

const closeDialog = (formInstance: any) => {
  visible.value = false;
  formInstance.clearValidate();
};

const confirmClick = async (formInstance: any) => {
  // 新建
  if (addType.value) {
    if (!formInstance) return;
    await formInstance.validate((valid: any, fields: any) => {
      if (valid) {
        let params = {
          tax_land_id: newForm.tax_land_id,
          channel_id: newForm.channel_id,
          tax_point: newForm.tax_point,
          channel_point: newForm.channel_point,
        };
        addChannelTaxland(params).then(() => {
          ElMessage.success({
            message: "新增税地成功",
          });
          visible.value = false;
          handleSearch();
        });
      } else {
        console.log("error submit!", fields);
      }
    });
  } else {
    // 编辑
    let params = {
      id: newForm.id,
      tax_point: newForm.tax_point,
      channel_point: newForm.channel_point,
      remark: newForm.remark,
    };
    updateChannelTaxland(params).then(() => {
      ElMessage.success({
        message: "更新税地成功",
      });
      visible.value = false;
      handleSearch();
    });
  }
};

const handleSearch = () => {
  let params = {
    channel_id: idv.value,
    limit: pageInfo.limit,
    page: pageInfo.page,
  };
  getChannelAccountTaxland(params).then((res) => {
    tableData.length = 0;
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  });
};
const taxLandOption = ref([] as any);

function getTaxLandOption() {
  taxLandOption.value.length = 0;
  getLandList().then((res) => {
    taxLandOption.value.push(...res.data.tax_land_list);
  });
}

const handlePageChange = (cur: any) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  handleSearch();
};

const edit = (item: any) => {
  newTitle.value = "编辑税地";
  visible.value = true;
  addType.value = false;
  newForm.tax_land_name = item.tax_land_name;
  newForm.channel_point = item.channel_point;
  newForm.tax_point = item.tax_point;
  newForm.id = item.id;
  newForm.remark = item.remark;
};

const setStatus = (id: number, status: number) => {
  switch (status) {
    case 0:
      ElMessageBox.confirm("是否解绑税地？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      })
        .then(() => {
          setChannelTaxlandStatus({ id, status }).then(() => {
            ElMessage.success({
              message: "操作成功",
            });
            handleSearch();
          });
        })
        .catch(() => {
          ElMessage.info({
            message: "取消操作",
          });
        });
      break;
    case 1:
      ElMessageBox.confirm("是否绑定税地？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      })
        .then(() => {
          setChannelTaxlandStatus({ id, status }).then(() => {
            ElMessage.success({
              message: "操作成功",
            });
            handleSearch();
          });
        })
        .catch(() => {
          ElMessage.info({
            message: "取消操作",
          });
        });

      break;
  }
};

const check = (id: string) => {
  getTaxlandInfoLogByChannelAccount(id).then((res) => {
    console.log(res);
    tableData2.length = 0;
    tableData2.push(...res.data);
    checkVisible.value = true;
  });
};

getTaxLandOption();
handleSearch();
</script>

<style scoped></style>
