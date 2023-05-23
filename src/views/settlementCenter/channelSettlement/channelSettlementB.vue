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
          <div class="tabTop m-t-[20px]">
            <div class="box"></div>
            <span class="title">任务信息</span>
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
                  <el-form-item label="任务名称">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行业">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="需求人数">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="公示周期">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="负责人">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="任务日期">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="任务时间">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="薪资待遇">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="人员要求">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="任务地点">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="其他要求">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="任务描述">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="tabTop m-t-[20px]">
            <div class="box"></div>
            <span class="title">结算信息</span>
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
                  <el-form-item label="任务人数">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结算人数">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="结算公司" label-width="140px">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="结算金额">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际打款">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="确认时间" label-width="140px">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="打款时间">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结算公司">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结算状态">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="发票状态">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="打款账户">
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
              <el-button link type="primary">查看回单</el-button>
              <el-button link type="primary">详情</el-button>
            </template>
          </lyTable>
        </div>
      </template>
      <template #3>
        <div class="p-[24px] p-b-[0]">
          <div class="p-[24px] p-l-[53px] p-b-[0]">
            <div class="tabTop m-t-[20px]">
              <div class="box"></div>
              <span class="title">验收凭证</span>
            </div>
            <div class="m-t-[20px]">
              <picture-preview
                :imageList="formItem.multiPicUrls"
              ></picture-preview>
            </div>
          </div>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import lyTable from "../components/lyTable.vue";
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "任务详情",
  },
  {
    name: "2",
    label: "任务成员",
  },
  {
    name: "3",
    label: "验收凭证",
  },
];

//表单信息
const formItem = reactive({
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
  { value: "020" },
  { value: "020" },
  { value: "020" },
]);
const columnList = [
  { label: "账户ID", prop: "value", width: 120 },
  { label: "结算状态", prop: "name", width: 120 },
  { label: "姓名", width: 120 },
  { label: "联系方式", width: 120 },
  { label: "收款银行", width: 120 },
  { label: "银行卡号", width: 120 },
  { label: "下发时间", width: 120 },
  { label: "结算金额", width: 120 },
  { label: "操作", slot: "operation", fixed: "right" },
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
