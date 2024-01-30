<template>
  <div class="content p-[30px]">
    <zxn-table
      :table-data="state.tableData"
      :column-list="columnList"
      :hasPagination="false"
    >
      <template #tableTop>
        <el-button
          type="primary"
          plain
          @click="taxLandClick('add')"
          v-if="isEdit"
          >+新增税地</el-button
        >
      </template>
      <template #tax_point="scope">
        <div>{{ scope.row.tax_point }}%</div>
      </template>
      <template #operation="scope">
        <el-button
          link
          type="primary"
          v-if="isEdit"
          @click="handleStatus(scope.row.id, scope.row.status)"
          >{{ scope.row.status == 1 ? "禁用" : "启用" }}</el-button
        >
        <el-button
          v-if="isEdit"
          link
          type="primary"
          @click="taxLandClick('edit', scope.row)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="check(scope.row.id)"
          >查看</el-button
        >
      </template>
    </zxn-table>
    <!-- 新增 编辑 -->
    <el-dialog
      v-model="state.dialogVisible"
      :title="state.dialogTitle"
      width="25%"
      :close-on-click-modal="false"
      @close="cancelClick"
    >
      <el-form
        ref="formItem"
        :model="state.formItem"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="税地名称" prop="tax_land_id">
          <el-input
            v-if="state.dialogType == 'edit'"
            disabled
            :value="state.formItem.tax_land_name"
          />
          <el-select
            v-else
            class="w-full"
            placeholder="请选择"
            v-model="state.formItem.tax_land_id"
            :disabled="state.dialogType == 'edit'"
            value-key="id"
            @change="selecTaxland"
            filterable
            clearable
          >
            <el-option
              v-for="(item, index) in taxLandOption"
              :key="index"
              :value="item"
              :label="item.tax_land_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <template v-if="state.formItem.tax_land_type == 1">
          <el-form-item label="第三方账户">
            <el-input
              placeholder="请输入"
              v-model="state.formItem.third_user_name"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="第三方密码">
            <el-input
              placeholder="请输入"
              v-model="state.formItem.third_password"
            >
            </el-input>
          </el-form-item>
        </template>
        <el-form-item label="客户点位" prop="tax_point">
          <el-input placeholder="请输入" v-model="state.formItem.tax_point">
            <template #append>%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="认证规则" prop="auth_type">
          <el-select
            class="w-full"
            filterable
            clearable
            v-model="state.formItem.auth_type"
          >
            <el-option
              v-for="(item, index) in auth_type"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签约规则" prop="sign_type">
          <el-select
            class="w-full"
            placeholder="请选择（单选）"
            v-model="state.formItem.sign_type"
            filterable
            clearable
          >
            <el-option
              v-for="(item, index) in sign_type"
              :key="index"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开票要求" prop="invoice_require">
          <el-select
            class="w-full"
            placeholder="请选择（单选）"
            v-model="state.formItem.invoice_require"
            filterable
            clearable
          >
            <el-option
              v-for="item in invoice_requireOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="上传合同" prop="contract_img">
          <MultiUpload v-model="state.formItem.contract_img">
            <i-ep-Plus />
          </MultiUpload>
        </el-form-item> -->
        <div style="display: flex; justify-content: center">
          <el-button type="primary" @click="taxLandConfirm(formItem)"
            >确认</el-button
          >
          <el-button type="primary" plain @click="cancelClick">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <zxn-dialog
      title="查看点位"
      :visible="pointVisible"
      width="1200px"
      top="10"
      :hasBottomBtn="false"
      @close-dialog="pointClose"
    >
      <zxn-table
        :table-data="pointData"
        :column-list="pointColumnList"
        :hasPagination="false"
      ></zxn-table>
    </zxn-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getLandList } from "@/api/common";
import {
  setTaxLandStatus,
  editAccountTaxLand,
  createAccountTaxLand,
  getPointListById,
} from "@/api/account/business";

import { useRoute } from "vue-router";

const route = useRoute();

import { useStore } from "@/store/modules/taxLand";
import type { FormInstance } from "element-plus";

const emits = defineEmits(["update"]);

const taxPointValidator = (rule, value, callback) => {
  const decimalRegex = /^\d{1,3}(\.\d{1,2})?$/;
  if (value === "") {
    callback(new Error("必填"));
  } else if (!decimalRegex.test(value)) {
    callback(new Error("请输入最多三位整数和两位小数的数字"));
  } else if (value > 100) {
    callback(new Error("请输入正确的数字"));
  } else {
    callback(); // 校验通过时调用，没有传入参数即表示校验成功
  }
};

const formItem = ref<FormInstance>();

const taxLandStore = useStore();

const auth_type = ref([] as any);
const sign_type = ref([] as any);
import { invoice_requireType } from "@/enums/accountEnum";
const invoice_requireOptions = Object.entries(invoice_requireType)
  .map(([label, value]) => ({ label, value }))
  .filter((i) => typeof i.value !== "string");

const taxLandOption = ref([] as any);
function getTaxLandOption() {
  taxLandOption.value.length = 0;
  getLandList().then((res) => {
    taxLandOption.value.push(...res.data.tax_land_list);
  });
}

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => 0,
  },
  taxLandList: {
    type: Array,
  },
});

watch(
  () => props.taxLandList,
  (newVal) => {
    state.tableData = newVal;
  }
);

const state = reactive({
  tableData: [] as any,
  dialogTitle: "",
  dialogVisible: false,
  dialogType: "",
  formItem: {
    id: "",
    company_id: "",
    tax_land_id: "" as any,
    tax_land_name: "",
    tax_land_type: 0,
    third_user_name: "",
    third_password: "",
    tax_point: "",
    auth_type: "",
    sign_type: "",
    invoice_require: "",
  },
});

const rules = reactive({
  tax_land_id: [{ required: true, message: "必填", trigger: "change" }],
  tax_point: [
    { required: true, trigger: "change", validator: taxPointValidator },
  ],
  auth_type: [{ required: true, message: "必填", trigger: "change" }],
  sign_type: [{ required: true, message: "必填", trigger: "change" }],
  invoice_require: [{ required: true, message: "必填", trigger: "change" }],
  contract_img: [{ required: true, message: "必填", trigger: "change" }],
});

const columnList = [
  { label: "税地名称", prop: "tax_land_name", minWidth: 250 },
  {
    label: "状态",
    type: "enum",
    path: "accountEnum.taxLandStatusType",
    prop: "status",
    color: {
      0: {
        color: "#F35036",
        background: "#FDE3DF",
      },
      1: {
        color: "#356FF3",
        background: "#DFE8FD",
      },
    },
    minWidth: 100,
  },
  {
    label: "客户点位",
    prop: "tax_point",
    slot: "tax_point",
    minWidth: 120,
  },
  { label: "税地银行", prop: "bank", minWidth: 250 },
  { label: "银行账户", prop: "sub_account_no", minWidth: 200 },
  { label: "账户余额", prop: "balance", type: "money", minWidth: 200 },
  {
    label: "开票要求",
    prop: "invoice_require",
    type: "enum",
    path: "accountEnum.invoice_requireType",
    minWidth: 100,
  },
  {
    label: "认证规则",
    prop: "sign_type",
    type: "enum",
    path: "accountEnum.signType",
    minWidth: 150,
  },
  {
    label: "签约规则",
    prop: "auth_type",
    type: "enum",
    path: "accountEnum.authType",
    minWidth: 350,
  },

  {
    label: "操作",
    slot: "operation",
    align: "right",
    fixed: "right",
    minWidth: 180,
  },
];

const taxLandClick = (active: string, item?: any) => {
  formItem.value?.resetFields();
  state.dialogVisible = true;
  if (active == "add") {
    state.dialogTitle = "新增税地";
    state.dialogType = active;
    state.formItem.id = "";
    state.formItem.tax_land_id = "";
    state.formItem.tax_land_type = 0;
    state.formItem.company_id = "";
    state.formItem.tax_point = "";
    state.formItem.sign_type = "";
    state.formItem.invoice_require = "";
    state.formItem.auth_type = "";
    state.formItem.company_id = route.query.id as string;
  }
  if (active == "edit") {
    // console.log(item);
    state.dialogTitle = "编辑税地";
    state.dialogType = active;
    state.formItem.id = item.id;
    state.formItem.company_id = item.company_id;
    state.formItem.tax_land_id = item.tax_land_id;
    state.formItem.tax_land_name = item.tax_land_name;
    selecTaxland({ id: item.tax_land_id, tax_land_type: item.tax_land_type });
    state.formItem.tax_point = item.tax_point;
    state.formItem.sign_type = item.sign_type;
    state.formItem.invoice_require = item.invoice_require;
    state.formItem.auth_type = item.auth_type;
  }
};
// 选择税地后才有对应规则
const selecTaxland = ({ id, tax_land_type }) => {
  state.formItem.auth_type = "";
  state.formItem.sign_type = "";
  taxLandStore.updateTaxLandList(id);
  state.formItem.tax_land_type = tax_land_type;

  auth_type.value = taxLandStore.auth_type;
  sign_type.value = taxLandStore.sign_type;
};

// 0 禁用 1 启用
const handleStatus = (id: string, status: number | string) => {
  status == 1 ? (status = 0) : (status = 1);
  ElMessageBox.confirm(`是否${status == 1 ? "启用" : "禁用"}企业账号?`, {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    center: true,
  })
    .then(() => {
      setTaxLandStatus(id, status).then((res: any) => {
        ElMessage({
          message: res.msg,
          type: "success",
        });
        setTimeout(() => {
          location.reload();
        }, 500);
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消操作",
      });
    });
};

const taxLandConfirm = async (formEl: FormInstance) => {
  if (state.dialogType == "add") {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        let params = {
          company_id: state.formItem.company_id,
          tax_land_id: state.formItem.tax_land_id.id,
          third_user_name: state.formItem.third_user_name,
          third_password: state.formItem.third_password,
          tax_point: state.formItem.tax_point,
          auth_type: state.formItem.auth_type,
          sign_type: state.formItem.sign_type,
          invoice_require: state.formItem.invoice_require,
        };
        createAccountTaxLand(params).then((res) => {
          ElMessage({
            message: "新建税地成功",
            type: "success",
          });
          state.dialogVisible = false;
          setTimeout(() => {
            location.reload();
          }, 200);
        });
      }
    });
  }
  if (state.dialogType == "edit") {
    await formEl.validate((valid, fields) => {
      if (valid) {
        let params = {
          id: state.formItem.id,
          company_id: state.formItem.company_id,
          tax_land_id: state.formItem.tax_land_id,
          third_user_name: state.formItem.third_user_name,
          third_password: state.formItem.third_password,
          tax_point: state.formItem.tax_point,
          auth_type: state.formItem.auth_type,
          sign_type: state.formItem.sign_type,
          invoice_require: state.formItem.invoice_require,
        };
        editAccountTaxLand(params).then((res) => {
          ElMessage({
            message: "编辑税地成功",
            type: "success",
          });
          state.dialogVisible = false;
          setTimeout(() => {
            // location.reload();
            emits("update");
          }, 200);
        });
      }
    });
  }
};
const cancelClick = () => {
  state.dialogVisible = false;
  state.formItem.id = "";
  state.formItem.third_user_name = "";
  state.formItem.third_password = "";
  state.formItem.company_id = "";
  state.formItem.tax_land_id = "";
  state.formItem.tax_point = "";
  state.formItem.sign_type = "";
  state.formItem.invoice_require = "";
  state.formItem.auth_type = "";
};

const pointVisible = ref(false);
const pointPageInfo = reactive({
  page: 1,
  limit: 1000,
  total: 0,
});
const pointId = ref("");
const pointPageChange = (cur) => {
  pointPageInfo.page = cur.page;
  pointPageInfo.limit = cur.limit;
  check(pointId.value);
};
const pointData = ref([] as any);
const pointColumnList = [
  { label: "税地名称", prop: "tax_land_name" },
  { label: "成本点位", prop: "cost_point" },
  { label: "企业点位", prop: "tax_point" },
  { label: "修改时间", prop: "add_time" },
  { label: "修改账户", prop: "account" },
];
const check = (id) => {
  pointId.value = id;
  getPointListById({
    id: pointId.value,
    limit: pointPageInfo.limit,
    page: pointPageInfo.page,
  }).then((res) => {
    pointData.value = res.data.data;
    pointPageInfo.total = res.data.total;
    pointVisible.value = true;
  });
};

const pointClose = () => {
  pointVisible.value = false;
  pointData.value = [];
};
getTaxLandOption();
</script>

<style scoped lang="scss">
.content {
  position: relative;
  height: calc(100vh - 200px);
}

.bottom-btn {
  position: absolute;
  bottom: 20px;
  left: 45%;
  transform: translateX(-50%);
}
</style>
