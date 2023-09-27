<template>
  <div class="p-[37px]">
    <zxn-search
      :formItem="formItem"
      @on-reset="handleReset"
      @on-search="handleSearch"
    >
      <el-form-item>
        <el-input placeholder="请输入" v-model="formItem.keyword">
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="绑定日期">
        <zxn-date-range v-model="date" />
      </el-form-item>
    </zxn-search>
    <el-button v-if="isEdit" type="primary" plain class="mb-[20px]" @click="add"
      >+新增</el-button
    >
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="pageChange"
    >
      <template v-if="isEdit" #opera="{ row }">
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
    </zxn-table>
    <zxn-dialog
      v-model:visible="visible"
      title="新增企业"
      @close-dialog="handleClose(newFormRef)"
      @confirm-dialog="handleConfirm(newFormRef)"
    >
      <el-form
        :model="newForm"
        :rules="rules"
        ref="newFormRef"
        label-width="80"
      >
        <el-row>
          <el-col :span="22">
            <el-form-item label="税地名称" prop="tax_land_id">
              <el-select
                class="w-full"
                placeholder="请选择"
                v-model="newForm.tax_land_id"
                @change="handleSelect"
              >
                <el-option
                  v-for="i of taxlandList"
                  :key="i.tax_land_id"
                  :value="i.tax_land_id"
                  :label="i.tax_land_name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业名称" prop="company_id">
              <el-select
                class="w-full"
                placeholder="请选择"
                v-model="newForm.company_id"
              >
                <el-option
                  v-for="i of companyList"
                  :key="i.id"
                  :value="i.id"
                  :label="i.company_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zxn-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  channelBindCompanyByTaxland,
  getChannelProxyCompanyInfo,
  getCompanyByTaxland,
  setStatusChannelByCompany,
} from "@/api/account/channel";

const props = defineProps({
  channel_id: {
    type: String || Number,
  },
  isEdit: {
    type: Boolean,
  },
});

const taxlandList = ref([] as any);
const companyList = ref([] as any);

const formItem = reactive({
  keyword: "",
});

const pageInfo = reactive({
  limit: 20,
  page: 1,
  total: 0,
});

const pageChange = (cur: any) => {
  const { limit, page } = cur;
  pageInfo.limit = limit;
  pageInfo.page = page;
  handleSearch();
};
const date = ref([]);
const visible = ref(false);

const tableData = reactive([] as any);
const columnList = [
  { label: "企业名称", prop: "company_name" },
  { label: "绑定税地名称", prop: "tax_land_name" },
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
  { label: "企业点位", prop: "company_point" },
  { label: "渠道点位", prop: "tax_land_point" },
  { label: "企业累计下发金额", prop: "company_amount", type: "money" },
  {
    label: "渠道佣金收益（税后）",
    prop: "channel_amount",
    type: "money",
    minWidth: 100,
  },
  { label: "扣税点位", prop: "tax_point" },
  { label: "绑定时间", prop: "add_time" },
  {
    label: "操作",
    slot: "opera",
    fixed: "right",
    align: "right",
    minWidth: 50,
  },
];

const newFormRef = ref();
const newForm = reactive({
  tax_land_id: "",
  company_id: "",
});
const rules = {
  company_id: [{ required: true, message: "必填", trigger: "blur" }],
  tax_land_id: [{ required: true, message: "必填", trigger: "blur" }],
};

const handleSearch = () => {
  let params = {
    channel_id: props.channel_id,
    keyword: formItem.keyword,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
    page: pageInfo.page,
    limit: pageInfo.limit,
  };
  getChannelProxyCompanyInfo(params).then((res) => {
    // console.log(res);
    tableData.length = 0;
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  });
};
const handleReset = () => {
  formItem.keyword = "";
  date.value = [];
  handleSearch();
};

const add = async () => {
  visible.value = true;
  getCompanyByTaxland({ channel_id: props.channel_id }).then((res) => {
    // console.log(res);
    taxlandList.value.length = 0;

    taxlandList.value.push(...res.data);
  });
};

const handleClose = (formInstance: any) => {
  visible.value = false;
  formInstance?.resetFields();
};
const handleConfirm = async (formInstance: any) => {
  if (!formInstance) return;
  // 新增
  await formInstance.validate((valid, fields) => {
    if (valid) {
      let params = {
        channel_id: props.channel_id,
        tax_land_id: newForm.tax_land_id,
        company_id: newForm.company_id,
      };
      channelBindCompanyByTaxland(params).then(() => {
        ElMessage.success({
          message: "新增成功",
        });
        visible.value = false;
        handleSearch();
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const handleSelect = (tax_land_id: string) => {
  const element = taxlandList.value.find((i) => i.tax_land_id == tax_land_id);
  companyList.value.length = 0;
  companyList.value = element.company_list;
  newForm.company_id = "";
  // element.company_list
  //   ? (companyList.value = element.company_list)
  //   : (companyList.value = []);
  // newForm.company_id = "";
};

const setStatus = (id: any, status: any) => {
  const func = () => {
    setStatusChannelByCompany({ id, status }).then(() => {
      ElMessage.success({
        message: "操作成功",
      });
      handleSearch();
    });
  };
  switch (status) {
    case 1:
      ElMessageBox.confirm("是否绑定企业？", {
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
      ElMessageBox.confirm("是否解绑企业？", {
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

handleSearch();
</script>

<style scoped></style>
