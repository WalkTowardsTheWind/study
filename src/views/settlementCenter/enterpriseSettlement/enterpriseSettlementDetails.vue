<template>
  <zxn-plan>
    <zxn-tabs
      :activeName="activeName"
      :tabsList="tabsList"
      :hasBack="true"
      :hasUpdate="false"
    >
      <template #1>
        <div class="p-[24px] p-l-[53px] p-b-[0]">
          <div class="top">
            <!-- <span class="title">结算单号</span> -->
            <el-text
              >结算单号&nbsp;&nbsp;{{ formItem.settlement_order_no }}</el-text
            >
          </div>
          <div class="tabTop m-t-[20px]">
            <div class="box"></div>
            <span class="title">企业信息</span>
          </div>
          <div class="m-t-[20px]">
            <el-form
              :model="formItem"
              inline
              label-width="90px"
              label-position="right"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="企业名称">
                    <el-text class="mx-1">{{ formItem.company_name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="企业账户ID">
                    <el-text class="mx-1">{{ formItem.company_id }}</el-text>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="统一社会信用代码" label-width="140px">
                    <el-text class="mx-1">{{ formItem.credit_code }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="法人">
                    <el-text class="mx-1">{{ formItem.legal_person }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人">
                    <el-text class="mx-1">{{ formItem.contacts }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式" label-width="140px">
                    <el-text class="mx-1">{{
                      formItem.contacts_mobile
                    }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="企业地址">
                    <el-text class="mx-1">{{
                      formItem.company_address
                    }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </template>
      <template #2>
        <div class="p-[24px] p-b-[0]">
          <lyTable :table-data="tableData" :column-list="columnList" hasSelect>
            <template #operation>
              <el-button link type="primary" @click="handleTo">查看</el-button>
            </template>
          </lyTable>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import lyTable from "../components/lyTable.vue";
import { getEnterpriseSettlementDetails } from "@/api/settlementCenter/enterpriseSettlement";
const route = useRoute();
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "结算详情",
  },
  {
    name: "2",
    label: "结算任务列表",
  },
];
const router = useRouter();
const handleTo = () => {
  router.push({ name: "enterpriseSettlementA", query: { activeName: "1" } });
};

//表单信息
const formItem = ref({
  settlement_order_no: "",
  company_name: "",
  company_id: "",
  credit_code: "",
  legal_person: "",
  contacts: "",
  contacts_mobile: "",
  company_address: "",
});
//
const tableData = reactive([{ settlement_order_no: "010" }]);
const columnList = [
  { label: "任务编号", prop: "task_no", width: 120 },
  { label: "任务名称", prop: "task_name", width: 120 },
  { label: "需求人数", prop: "person_count", width: 120 },
  { label: "预算", prop: "value", width: 120 },
  { label: "申请时间", prop: "value", width: 120 },
  { label: "任务详情", prop: "value", slot: "operation", fixed: "right" },
];
const getData = () => {
  const ID = Number(route.query.id);
  console.log(ID);
  getEnterpriseSettlementDetails(ID)
    .then((response) => {
      const {
        settlement_order_no,
        company_name,
        company_id,
        credit_code,
        legal_person,
        contacts,
        contacts_mobile,
        company_address,
      } = response.data.info;
      formItem.value = {
        settlement_order_no,
        company_name,
        company_id,
        credit_code,
        legal_person,
        contacts,
        contacts_mobile,
        company_address,
      };
    })
    .catch();
};
getData();
/**
 * 获取数据
 */
const getTableData = () => {
  // const data={...formItem}
  // getEnterpriseContractList(data).then((response)=>{
  //   tableData.length = 0
  //   tableData.push(...response.data.list)
  // }).catch(()=>{
  // })
};
getTableData();

onMounted(() => {});
</script>
<style lang="scss" scoped>
.tabTop {
  display: flex;
  align-items: center;

  .box {
    width: 4px;
    height: 18px;
    margin-right: 18px;
    background: #356ff3;
    border-radius: 4px;
  }

  .title {
    font-size: 14px;
    font-weight: 500;
    color: #356ff3;
  }
}
</style>
