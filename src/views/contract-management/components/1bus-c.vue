<template>
  <div class="p-24px">
    <zxn-search
      :formItem="formItem"
      @on-reset="handleReset"
      @on-search="handleSearch"
    >
      <el-form-item>
        <el-input
          placeholder="请输入合同编号、合同名称、甲方、乙方"
          v-model="formItem.keyword"
        >
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="合同状态">
        <el-select v-model="formItem.status" @change="handleSearch">
          <el-option
            v-for="item of contract_status"
            :key="item.status"
            :label="item.label"
            :value="item.status"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="创建日期">
        <zxn-date-range v-model="formItem.date" />
      </el-form-item>
    </zxn-search>

    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :pageInfo="pageInfo"
      hasSelect
      @page-change="pageChange"
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <el-button type="primary" @click="addClick">合同归档</el-button>
        <el-button type="primary" plain @click="onlineSignClick"
          >在线签署</el-button
        >
        <el-button type="primary" plain @click="handleExport"
          >批量下载</el-button
        >
      </template>
      <template #type>
        <span>企业合同</span>
      </template>
      <template #is_online="{ row }">
        <span>{{ row.is_online == 1 ? "线上签署" : "线下签署" }}</span>
      </template>
      <template #caozuo="{ row }">
        <el-button
          v-if="row.status == 0"
          type="primary"
          link
          @click="goToSign(row.id)"
          >发起签署</el-button
        >
        <el-button
          v-if="row.status == 0"
          type="primary"
          link
          @click="edit(row.id)"
          >编辑</el-button
        >
        <el-button
          v-if="row.status == 1"
          type="primary"
          link
          @click="setStatus(row.id, 0)"
          >撤回</el-button
        >
        <el-button
          v-if="row.status != 1 && row.status != 2"
          type="primary"
          link
          @click="delClick(row.id)"
          >删除</el-button
        >

        <el-button
          :disabled="!row.cert_url"
          v-if="row.status == 2 || row.status == 3"
          type="primary"
          link
          @click="checkUrl(row.cert_url)"
          >查看证书</el-button
        >
        <el-button
          v-if="row.status == 2"
          type="primary"
          link
          @click="setStatus(row.id, 3)"
          >合同解除</el-button
        >
        <el-button
          :disabled="!row.contract_url"
          type="primary"
          link
          @click="checkUrl(row.contract_url)"
          >查看合同</el-button
        >
        <el-button type="primary" link @click="toDetail(row.id)"
          >详情</el-button
        >
      </template>
    </zxn-table>
    <!-- 合同归档 -->
    <ContractAdd
      :visible="isAddShow"
      :contract_type="1"
      @add-close="addDialogClose"
      @add-confirm="addDialogConfirm"
    />
    <!-- 在线签署 -->
    <OnlineSign
      :visible="isOnline"
      :contract_type="1"
      @online-close="onlineClose"
      @online-confirm="onlineConfirm"
    />
    <!-- 合同详情 -->
    <ContractDetail
      :visible="detailShow"
      @detail-close="detailClose"
      :detailId="detailId"
    />
    <!-- 合同编辑 -->
    <ContractEdit
      :detailId="detailId"
      :visible="editShow"
      @edit-close="editClose"
      ref="editDialog"
    />
    <!-- 发起签署 -->
    <zxn-dialog
      :visible="signVisible"
      :title="signTitle"
      @close-dialog="closeSign"
    >
      <template #default>
        <el-form v-if="signStep == 1" label-width="auto">
          <el-form-item required label="姓名">
            <el-input v-model="signForm.name" />
          </el-form-item>
          <el-form-item required label="身份证号">
            <el-input maxlength="18" v-model="signForm.id_card" />
          </el-form-item>
        </el-form>
        <template v-if="signStep == 2">
          <p class="font-size-8">
            已成功生成您的个人电子签名，是否签署合同并推送给对方？
          </p>
          <zxn-image :imgList="[signImage]"></zxn-image>
        </template>
      </template>
      <template #bottom-btn>
        <div class="flex justify-center">
          <el-button
            :loading="isLoading"
            v-if="signStep == 1"
            type="primary"
            @click="scgrdzqm"
            >生成个人电子签名</el-button
          >
          <el-button
            :loading="isLoading"
            v-if="signStep == 2"
            type="primary"
            @click="qshtfswj"
            >签署合同并发送文件</el-button
          >
          <el-button type="primary" plain @click="closeSign">取消</el-button>
        </div>
      </template>
    </zxn-dialog>
  </div>
</template>

<script lang="ts" setup>
import ContractAdd from "./contract-add.vue";
import OnlineSign from "./online-sign.vue";
import ContractDetail from "./contract-detail.vue";
import ContractEdit from "./contract-edit.vue";

import {
  getContractList,
  setContractStatus,
  delContract,
  createContractSeal,
  goContractOnline,
} from "@/api/contract-m/index";

import { contract_status, color } from "./options";

import { useRoute } from "vue-router";
import { downloadByOnlineUrl } from "@/utils/download";

const route = useRoute();

// const tab_type = ref(1);
// const company_name = ref("");

const formItem = reactive({
  keyword: "",
  status: "",
  date: [],
  tax_land_id: "",
});
const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});
const handleReset = () => {
  formItem.keyword = "";
  formItem.status = "";
  formItem.date = [];
  handleSearch();
};
const handleSearch = () => {
  let params = {
    keyword: formItem.keyword,
    start_time: formItem.date[0] || "",
    end_time: formItem.date[1] || "",
    status: formItem.status,
    tax_land_id: formItem.tax_land_id,
    type: "1", // 1企业合同 2渠道合同 3其他合同
    limit: pageInfo.limit,
    page: pageInfo.page,
  };
  tableData.length = 0;
  getContractList(params).then((res) => {
    tableData.push(...res.data.data);
    pageInfo.total = res.data.total;
  });
};
const detailId = ref(0);
const tableData = reactive([] as any);
const columnList = [
  { label: "合同编号", prop: "contract_no" },
  { label: "合同名称", prop: "contract_name" },
  { label: "合同类型", slot: "type" },
  {
    label: "状态",
    prop: "status",
    type: "enum",
    path: "contractListEnum.contractStatus",
    color: color,
  },
  { label: "签署形式", slot: "is_online" },
  { label: "甲方", prop: "part_a_name" },
  { label: "乙方", prop: "part_b_name" },
  { label: "签约时间", prop: "sign_time", minWidth: 150 },
  { label: "到期时间", prop: "effective_end_time", minWidth: 150 },
  {
    label: "操作",
    slot: "caozuo",
    minWidth: 250,
    align: "right",
    fixed: "right",
  },
];

const isAddShow = ref(false);

const detailShow = ref(false);

const detailClose = (visible: boolean) => {
  detailShow.value = visible;
};

const ids = ref([] as any);
const handleSelect = (val) => {
  ids.value = val.map((item) => item.id);
};

const pageChange = (cur) => {
  const { limit, page } = cur;
  pageInfo.limit = limit;
  pageInfo.page = page;
  handleSearch();
};

const isOnline = ref(false);
const onlineSignClick = () => {
  isOnline.value = true;
};

const addClick = () => {
  isAddShow.value = true;
};
const addDialogClose = (visible: boolean) => {
  isAddShow.value = visible;
};
const addDialogConfirm = (visible) => {
  isAddShow.value = visible;
  handleSearch();
};

const onlineClose = (visible: boolean) => {
  isOnline.value = visible;
};
const onlineConfirm = (visible) => {
  isOnline.value = visible;
  handleSearch();
};

const checkUrl = (url) => {
  window.open(url, "_blank");
};
const setStatus = (id, status) => {
  switch (status) {
    case 0:
      ElMessageBox.confirm("是否撤回当前合同?", "", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        setContractStatus(id, status).then(() => {
          ElMessage({
            type: "success",
            message: "操作成功",
          });
          handleSearch();
        });
      });
      break;
    case 3:
      ElMessageBox.confirm("是否解除当前合同?", "", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        setContractStatus(id, status).then(() => {
          ElMessage({
            type: "success",
            message: "操作成功",
          });
          handleSearch();
        });
      });

      break;
  }
};

const delClick = (id) => {
  ElMessageBox.confirm("是否删除当前合同?", "", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  }).then(() => {
    delContract(id).then(() => {
      ElMessage({
        type: "success",
        message: "操作成功",
      });
      handleSearch();
    });
  });
};

const toDetail = (id) => {
  detailId.value = id;
  detailShow.value = true;
};

const signVisible = ref(false);
const signTitle = ref("");
const signStep = ref(1);
const signImage = ref("");
const isLoading = ref(false);
const signForm = reactive({
  name: "",
  id_card: "",
});
const closeSign = () => {
  signVisible.value = false;
  signStep.value = 1;
  signForm.name = "";
  signForm.id_card = "";
  cfi.psn_id = "";
  cfi.seal = "";
  isLoading.value = false;
};
const goToSign = (id) => {
  // 1 生成印章
  // createContractSeal();
  signVisible.value = true;
  signTitle.value = "填写负责人信息";
  cfi.id = id;
};

const scgrdzqm = () => {
  if (!signForm.name || !signForm.id_card) return;
  isLoading.value = true;
  createContractSeal(signForm)
    .then((res) => {
      setTimeout(() => {
        isLoading.value = false;
        signStep.value = 2;
        signTitle.value = "生成成功";
        signImage.value = `data:image/jpeg;base64,${res.data.seal}`;
        cfi.psn_id = res.data.psn_id;
        cfi.seal = res.data.seal;
      }, 2000);
    })
    .catch(() => {
      isLoading.value = false;
    });
};
const cfi = reactive({
  id: "",
  psn_id: "",
  seal: "",
});

const qshtfswj = () => {
  isLoading.value = true;
  goContractOnline(cfi)
    .then(() => {
      setTimeout(() => {
        isLoading.value = false;
        ElMessage.success("操作成功");
        signVisible.value = false;
        signStep.value = 1;
        handleSearch();
      }, 2000);
    })
    .catch(() => {
      isLoading.value = false;
    });
};
const getListByRoute = () => {
  const company_name: any = route.query.company_name || "";
  formItem.keyword = company_name;
  handleSearch();
};
if (route.query.company_name && route.query.type == "1") {
  getListByRoute();
} else {
  handleSearch();
}

const editDialog = ref();
const editShow = ref(false);
const editClose = (visible, isUpdate) => {
  editShow.value = visible;
  if (isUpdate) {
    handleSearch();
  }
};
const edit = (id) => {
  detailId.value = id;
  editDialog.value.getDetailById(id);
  editShow.value = true;
};

const handleExport = async () => {
  if (ids.value.length == 0) {
    return ElMessage.warning("请先选择要下载的合同");
  }
  await downloadByOnlineUrl("/adminapi/contract/get_contract_download", {
    ids: ids.value,
  });
};
</script>
