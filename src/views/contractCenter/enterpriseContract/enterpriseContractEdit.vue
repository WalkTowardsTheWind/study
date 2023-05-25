<template>
  <zxn-plan>
    <zxn-tabs
      :activeName="activeName"
      :tabsList="tabsList"
      :hasBack="true"
      :hasUpdate="false"
    >
      <template #1>
        <div class="p-[24px] p-b-[0]">
          <el-form class="zxn-box" :model="formItem" label-width="100px">
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item label="合同名称">
                  <span class="mx-1">{{ formItem.contract_name }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="编号">
                  <span class="mx-1">{{ formItem.contract_no }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="合同类型">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.contract_kind"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in contract_kindOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="甲方">
                  <el-input v-model="formItem.party_a" />
                </el-form-item>
                <el-form-item class="mt-25px" label="乙方">
                  <el-input v-model="formItem.party_b" />
                </el-form-item>
                <el-form-item class="mt-25px" label="签约点位">
                  <el-input v-model="formItem.tax_location" />
                </el-form-item>
                <el-form-item class="mt-25px" label="合同期限">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.contract_term"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in contract_termOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="签约时间">
                  <el-date-picker
                    v-model="formItem.sign_time"
                    type="date"
                    unlink-panels
                    placeholder="请选择"
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="到期时间">
                  <el-date-picker
                    v-model="formItem.end_time"
                    type="date"
                    unlink-panels
                    placeholder="请选择"
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="备注要求">
                  <el-input v-model="formItem.remarks" type="textarea" />
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="合同文件">
                  <multi-upload v-model="formItem.file_url"></multi-upload>
                </el-form-item>
                <el-form-item class="mt-13px" label="附件">
                  <multi-upload v-model="formItem.annex_url"></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <zxn-bottom-btn>
          <div class="but">
            <el-button type="primary" @click="handleEnterpriseContractEdit"
              >确 定</el-button
            >
            <el-button @click="handleClose">取 消</el-button>
          </div>
        </zxn-bottom-btn>
      </template>
      <template #2>
        <div class="p-[24px] p-b-[0]">无内容</div>
        <zxn-bottom-btn>
          <div class="but">
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </div>
        </zxn-bottom-btn>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { enterpriseContractEdit } from "@/api/contractCenter/enterpriseContract";
import { enterpriseContractEditType } from "@/api/contractCenter/enterpriseContract/types";
import { getContractDetails } from "@/api/contractCenter";
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "线上合同",
  },
  {
    name: "2",
    label: "线下合同",
  },
];
//
const contract_kindOptions = [
  {
    value: "1",
    label: "业务拓展协议(个人)",
  },
  {
    value: "2",
    label: "业务拓展协议(企业)",
  },
  {
    value: "3",
    label: "共享经济服务协议",
  },
  {
    value: "4",
    label: "自由职业者服务协议",
  },
];
const contract_termOptions = [
  {
    value: "1",
    label: "一年",
  },
];

//表单信息
var formItem = ref<enterpriseContractEditType>({
  contract_name: "",
  contract_no: "",
  online_type: 0,
  contract_kind: "",
  party_a: "",
  party_b: "",
  tax_location: "",
  contract_term: "",
  sign_time: "",
  end_time: "",
  remarks: "",
  file_url: [],
  annex_url: [],
});
const handleEnterpriseContractEdit = () => {
  const ID = Number(route.query.id);
  enterpriseContractEdit(ID, formItem.value).then().catch();
};
const handleSubmit = () => {
  getData();
};
const handleClose = () => {};

const route = useRoute();
const getData = () => {
  const ID = Number(route.query.id);
  getContractDetails(ID)
    .then((response) => {
      activeName.value = response.data.info.online_type + "";
      var {
        contract_name,
        contract_no,
        contract_kind,
        party_a,
        party_b,
        tax_location,
        contract_term,
        sign_time,
        end_time,
        remarks,
        file_url,
        annex_url,
      } = response.data.info;
      formItem.value = {
        contract_name,
        contract_no,
        online_type: 0,
        contract_kind: contract_kind + "",
        party_a,
        party_b,
        tax_location,
        contract_term,
        sign_time,
        end_time,
        remarks,
        file_url,
        annex_url,
      };
    })
    .catch();
};
getData();
onMounted(() => {});
</script>
<style lang="scss" scoped>
.zxn-box {
  :deep(.el-input) {
    width: 100%;

    :deep(.el-input__wrapper) {
      width: 100%;
    }
  }
}

.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}
</style>
