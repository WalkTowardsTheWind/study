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
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="企业账户ID">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="统一社会信用代码" label-width="140px">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="法人">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式" label-width="140px">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="企业地址">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
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
import { useRouter } from "vue-router";
import lyTable from "../components/lyTable.vue";
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
const formItem = reactive({
  settlement_order_no: "",
  name: "name",
  date: "date",
  tags: [{ id: 2, label: "不限学历" }],
  multiPicUrls: [
    "https://oss.youlai.tech/default/2022/11/20/8af5567816094545b53e76b38ae9c974.webp",
    "https://oss.youlai.tech/default/2022/11/20/13dbfd7feaf848c2acec2b21675eb9d3.webp",
    "https://oss.youlai.tech/default/2022/11/20/18e206dae97b40329661537d1e433639.jpg",
  ],
});
//
const tableData = reactive([
  { value: "010" },
  { value: "010" },
  { value: "010" },
]);
const columnList = [
  { label: "任务编号", prop: "value", width: 120 },
  { label: "任务名称", prop: "name", width: 120 },
  { label: "需求人数", width: 120 },
  { label: "预算", width: 120 },
  { label: "申请时间", width: 120 },
  { label: "任务详情", slot: "operation", fixed: "right" },
];

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
