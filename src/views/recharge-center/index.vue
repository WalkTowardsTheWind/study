<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName">
      <template #1>
        <div class="recharge">
          累计充值<span class="money"
            >{{ proxy.$moneyFormat(total_amount) }} &nbsp;<span
              class="text-[14px]"
            >
              元
            </span></span
          >
        </div>
        <div class="p-[24px]">
          <zxn-search
            :formItem="formItem"
            @on-search="handleSearch"
            @on-reset="handleReset"
          >
            <el-form-item label="">
              <el-input
                v-model="formItem.name"
                placeholder="请输入企业名称、税地名称"
              >
                <template #prefix>
                  <i-ep-Search />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="tax_land_id" label="税地名称">
              <tax-source-select
                v-model:taxId="formItem.tax_land_id"
                @change-tax="handleSearch"
              />
            </el-form-item>
            <el-form-item label="充值状态">
              <el-select
                v-model="formItem.status"
                placeholder="请选择"
                @change="handleSearch"
                filterable
                clearable
              >
                <el-option
                  v-for="item in taskStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="date" label="创建日期">
              <el-date-picker
                v-model="date"
                type="daterange"
                value-format="YYYY-MM-DD"
                unlink-panels
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <!-- <el-form-item label="行业">
							<el-select v-model="formItem.category_id" placeholder="请选择">
								<el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item> -->
          </zxn-search>
          <zxn-table
            :table-data="tableData"
            :column-list="columnList"
            field-total="amount"
            :page-info="pageInfo"
            @page-change="pageChange"
            @selection-change="handleSelect"
          >
            <template #tableTop>
              <el-button type="primary" @click="refundByBusiness()"
                >退款</el-button
              >
              <!-- <el-dropdown class="" trigger="click">
                <el-button type="primary" plain>批量操作</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="1">删除</el-dropdown-item>
                    <el-dropdown-item command="2" @click="toUpload"
                      >导出</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown> -->
              <!--              <el-dropdown trigger="click" @command="handleExport">-->
              <!--                <el-button type="primary">导出</el-button>-->
              <!--                <template #dropdown>-->
              <!--                  <el-dropdown-menu>-->
              <!--                    <el-dropdown-item command="1">表格</el-dropdown-item>-->
              <!--                  </el-dropdown-menu>-->
              <!--                </template>-->
              <!--              </el-dropdown>-->
            </template>
            <template #recharge_order_no="scope">
              <span>{{
                scope.row.recharge_order_no ? scope.row.recharge_order_no : "--"
              }}</span>
            </template>
            <template #certificate="scope">
              <zxn-image
                :imgList="scope.row.certificate"
                :width="40"
                :height="40"
                targetClick
              />
            </template>
            <template #refundCertificate="scope">
              <div
                class="flex align-items"
                v-if="[2, 4, 5].includes(scope.row.status)"
              >
                <zxn-image
                  v-if="scope.row.refund_url.length"
                  :imgList="scope.row.refund_url"
                  :width="40"
                  :height="40"
                  targetClick
                />
                <el-button
                  v-else
                  type="primary"
                  link
                  @click="refund(scope.row.recharge_id)"
                  >{{
                    scope.row.status == "2" ? "退款" : "重新上传"
                  }}</el-button
                >
                <el-button
                  class="m-l-[20px]"
                  v-if="scope.row.refund_url.length"
                  type="primary"
                  link
                  @click="delImg(scope.row.recharge_id)"
                  >删除</el-button
                >
              </div>
            </template>
            <template #operation="scope">
              <el-button
                v-if="[5].includes(scope.row.status)"
                link
                type="primary"
                @click="delRefund(scope.row.recharge_id)"
                >删除</el-button
              >
            </template>
          </zxn-table>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
  <el-dialog
    v-model="visible"
    title="上传退款凭证"
    :before-close="dialogClose"
    width="30%"
  >
    <multi-upload v-model="fileList" :limit="3"></multi-upload>
    <el-button class="mt-[20px]" type="primary" @click="gotoUpload"
      >开始上传</el-button
    >
  </el-dialog>
  <!-- 企业退款 -->
  <el-dialog
    v-model="visible2"
    title="企业退款"
    width="25%"
    :close-on-click-modal="false"
    @close="dialogClose2"
    :destroy-on-close="true"
  >
    <el-form
      label-width="auto"
      label-position="right"
      :model="refundModel"
      :rules="refundRules"
      ref="refundRef"
    >
      <el-row>
        <el-col>
          <el-form-item label="企业名称" prop="company_id">
            <el-select
              class="w-full"
              v-model="refundModel.company_id"
              @change="selectTaxlandByCompany"
              filterable
              clearable
            >
              <el-option
                v-for="item of allBusiness"
                :key="item.id"
                :label="item.company_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="税地名称" prop="tax_land_id">
            <el-select
              class="w-full"
              v-model="refundModel.tax_land_id"
              @change="getMoneyByTaxland"
              filterable
              clearable
            >
              <el-option
                v-for="item of refundTaxland"
                :key="item.tax_land_id"
                :value="item.tax_land_id"
                :label="item.tax_land_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业余额" prop="money">
            <el-input readonly v-model="refundModel.money" />
          </el-form-item>
          <el-form-item label="退款金额" prop="amount">
            <el-input
              placeholder="请输入"
              v-model="refundModel.amount"
              @input="validateAmount"
            />
          </el-form-item>
          <el-form-item label="退款回单号" prop="recharge_order_no">
            <el-input
              placeholder="请输入"
              v-model="refundModel.recharge_order_no"
              @input="validateNumber"
            />
          </el-form-item>
          <el-form-item label="退款凭证" prop="refund_url">
            <multi-upload
              v-model="refundModel.refund_url"
              :limit="3"
            ></multi-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="flex justify-center">
      <el-button class="is-cancel" type="info" @click="dialogClose2"
        >取消</el-button
      >
      <el-button class="" type="primary" @click="dialog2Click(refundRef)"
        >确认</el-button
      >
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  getCategoryList,
  uploadRechargeCert,
  deleteRechargeCert,
} from "@/api/category";
import { getLandList } from "@/api/common";
import {
  businessReturnMoney,
  delRefundById,
  getBusinessMoney,
  getBusinessRefund,
  getRechargeTaskList,
  getTaxlandByCompanyId,
} from "@/api/recharge";
import { useRouteParams } from "@/store/modules/routeParams";
import { isNumber } from "@/utils/is";
const { proxy } = getCurrentInstance() as any;
// 上传退款凭证
const visible = ref(false);
const visible2 = ref(false);
const fileList = ref([]);
const upload_id = ref("");
function dialogClose() {
  fileList.value = [];
  visible.value = false;
}
function dialogClose2() {
  visible2.value = false;
  refundTaxland.value = [];
  resetRefundModel();
}
function gotoUpload() {
  let params = {
    id: upload_id.value,
    refund_url: [...fileList.value],
  };
  uploadRechargeCert(params)
    .then((res: any) => {
      ElMessage.success({
        message: res.msg,
      });
      visible.value = false;
      fileList.value = [];
      setTimeout(() => {
        handleSearch();
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    });
}
const delImg = (id: string) => {
  ElMessageBox.confirm("是否删除凭证？", "", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    center: true,
  }).then(() => {
    deleteRechargeCert(id).then((res: any) => {
      ElMessage.success({
        message: res.msg,
      });
      handleSearch();
      // console.log(res);
    });
  });
};
//
const tabsList = [
  {
    name: "1",
    label: "任务充值",
  },
];

const taskStatus = [
  {
    label: "全部",
    value: "",
  },
  // {
  // 	label: "未到账 ",
  // 	value: "0",
  // },
  {
    label: "已到账 ",
    value: "1",
  },
  {
    label: "异常充值 ",
    value: "2",
  },
  {
    label: "服务费退回 ",
    value: "3",
  },
  {
    label: "财务退款 ",
    value: "4",
  },
];
const total_amount = ref();

const taxLand = ref([
  {
    id: "",
    tax_land_name: "全部",
  },
] as any);

const categoryList = ref([
  {
    id: "",
    name: "全部",
  },
] as any);

const activeName = ref("1");

const date = ref("");

const formItem = reactive({
  name: "",
  status: "",
  tax_land_id: "",
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const tableData = reactive([] as any);
const columnList = computed(() => {
  return [
    {
      label: "充值单号",
      slot: "recharge_order_no",
      Width: 110,
      fixed: "left",
    },
    {
      label: "状态",
      prop: "status",
      type: "enum",
      path: "accountEnum.taskType",
      color: {
        0: {
          color: "#36C5F3",
          background: "#dff6fd",
        },
        1: {
          color: "#366FF3",
          background: "#dfe8fd",
        },
        2: {
          color: "#F35135",
          background: "#FDE3DF",
        },
        3: {
          color: "#333",
          background: "#dedede",
        },
        4: {
          color: "#fff",
          background: "#999999",
        },
        5: {
          color: "#333",
          background: "#f1f3f4",
        },
      },
      width: 120,
      fixed: "left",
    },
    { label: "企业名称", prop: "company_name", minWidth: 120 },
    { label: "税地名称", prop: "tax_land_name", width: 120 },
    { label: "税地账户", prop: "bank_account", width: 200 },
    { label: "充值金额", prop: "amount", type: "money", minWidth: 100 },
    { label: "充值时间", prop: "add_time", width: 200 },
    { label: "充值人姓名", prop: "pay_name", minWidth: 120 },
    { label: "充值人银行", prop: "pay_bank", minWidth: 120 },
    { label: "充值人银行帐号", prop: "pay_bank_account", minWidth: 200 },
    { label: "充值凭证", slot: "certificate", fixed: "right", width: 80 },
    {
      label: "退款凭证",
      slot: "refundCertificate",
      fixed: "right",
      width: 120,
    },
    { label: "操作", slot: "operation", fixed: "right", width: 100 },
  ];
});
// 退款
const refund = (id: number) => {
  visible.value = true;
  upload_id.value = String(id);
};
/**
 * 导出批量操作
 */
// const handleExport = (command: string | number | object) => {

// };

function handleSearch() {
  let params = {
    ...pageInfo,
    ...formItem,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
  };
  getRechargeTaskList(params).then((res) => {
    tableData.length = 0;
    total_amount.value = res.data.total_amount;
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  });
}

function getCategory() {
  getCategoryList({ type: "0" }).then((res) => {
    categoryList.value.push(...res.data);
  });
}

function getTaxLand() {
  getLandList().then((res) => {
    taxLand.value.push(...res.data);
  });
}
function pageChange(current: any) {
  const { page, limit } = current;
  pageInfo.limit = limit;
  pageInfo.page = page;
  handleSearch();
}

const ids = ref([]);
function handleReset() {
  formItem.name = "";
  formItem.tax_land_id = "";
  formItem.status = "";
  date.value = [];
  // formItem.category_id = "";
  handleSearch();
}

function handleSelect(vals: any) {
  console.log(vals);
  ids.value =
    vals.length &&
    vals.map((item: any) => {
      return item.recharge_id;
    });
}
onMounted(() => {
  const { pullParams } = useRouteParams();
  const searchParams: any = pullParams("recharge-center");
  if (searchParams) {
    formItem.status =
      isNumber(searchParams.status) || searchParams.status
        ? searchParams.status + ""
        : "";
  }
  handleSearch();
  getTaxLand();
  // getCategory();
});

const allBusiness = ref([] as any);
const refundTaxland = ref([] as any);
const refundRef = ref();
const refundModel = reactive({
  company_id: "",
  refund_url: [],
  amount: "",
  tax_land_id: "",
  recharge_order_no: "",
  money: "",
} as any);
const refundRules = {
  company_id: [
    {
      required: true,
      message: "必填",
      trigger: "change",
    },
  ],
  refund_url: [
    {
      required: true,
      message: "必填",
      trigger: "change",
    },
  ],
  amount: [
    {
      required: true,
      message: "必填",
      trigger: "blur",
    },
  ],
  tax_land_id: [
    {
      required: true,
      message: "必填",
      trigger: "change",
    },
  ],
};

const dialog2Click = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (parseFloat(refundModel.amount) > parseFloat(refundModel.money)) {
        return ElMessage.error("退款金额不能大于企业余额");
      }
      if (refundModel.amount == 0) {
        return ElMessage.error("退款金额不能为0");
      }
      businessReturnMoney(refundModel).then((res) => {
        ElMessage.success("操作成功");
        visible2.value = false;
        resetRefundModel();
        handleSearch();
      });

      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const getAllBusiness = () => {
  getBusinessRefund().then((res) => {
    allBusiness.value = res.data;
  });
};

const selectTaxlandByCompany = (company_id) => {
  refundModel.tax_land_id = "";
  refundModel.money = "";
  getTaxlandByCompanyId({ company_id }).then((res) => {
    refundTaxland.value = res.data;
  });
};

const getMoneyByTaxland = (tax_land_id) => {
  getBusinessMoney({ company_id: refundModel.company_id, tax_land_id }).then(
    (res) => {
      refundModel.money = res.data.balance;
    }
  );
};
const validateAmount = () => {
  const reg = /^\d+(\.\d{0,2})?$/;
  if (!reg.test(refundModel.amount)) {
    refundModel.amount = refundModel.amount
      .replace(/[^\d.]/g, "")
      .replace(/^(\d+\.?\d{0,2}).*$/, "$1");
  }
};

const validateNumber = () => {
  const reg = /^\d+$/;
  if (!reg.test(refundModel.recharge_order_no)) {
    refundModel.recharge_order_no = refundModel.recharge_order_no.replace(
      /[^\d]/g,
      ""
    );
  }
};

const resetRefundModel = () => {
  refundModel.company_id = "";
  refundModel.refund_url = [];
  refundModel.tax_land_id = "";
  refundModel.money = "";
  refundModel.amount = "";
  refundModel.recharge_order_no = "";
};

const refundByBusiness = () => {
  visible2.value = true;
  getAllBusiness();
};

const delRefund = (id) => {
  ElMessageBox.confirm("是否删除退款？", "", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    center: true,
  }).then(() => {
    delRefundById(id).then((res: any) => {
      ElMessage.success("操作成功");
      handleSearch();
    });
  });
};
</script>

<style lang="scss" scoped>
.line {
  margin: 0 2px;
  font-size: 1px;
  color: #ccc;
  border: none !important;
}

.recharge {
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 25px;
  margin-top: 25px;
  margin-right: 28px;
  margin-left: 25px;
  font-size: 14px;
  line-height: 50px;
  background: #fef1ef;
  border-radius: 2px;
}

.money {
  margin-left: 19px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
</style>
