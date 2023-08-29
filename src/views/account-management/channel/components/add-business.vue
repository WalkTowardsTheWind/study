<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList" />
    <div class="p-[52px]">
      <div class="m-b-[20px]">
        <zxn-title>基本信息</zxn-title>
      </div>
      <el-form :model="form" label-width="auto">
        <!-- 基本信息 -->
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="账号名称">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="联系号码">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="m-b-[20px] m-t-[50px]">
          <zxn-title>企业信息</zxn-title>
        </div>
        <!-- 企业信息 -->
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="企业名称">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="开户行">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="渠道管理员">
              <el-select placeholder="请选择" class="w-full"></el-select>
            </el-form-item>
            <el-form-item label="收款方式">
              <el-select placeholder="请选择" class="w-full"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="统一社会信用代码">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="银行账号">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="管理员联系号码">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="渠道佣金结算时间">
              <div class="w-full">
                <el-date-picker
                  style="width: 100%"
                  unlink-panels
                  value-format="YYYY-MM-DD"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合伙人协议">
              <MultiUpload />
            </el-form-item>
            <el-form-item label="营业执照">
              <MultiUpload />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="m-b-[30px] m-t-[50px] relative">
          <zxn-title>渠道税地信息</zxn-title>
          <div class="addTax" @click="addTaxLand">+新增税地</div>
        </div>
        <!-- 渠道税地信息 -->
        <zxn-table
          :table-data="tableData"
          :column-list="columnList"
          :hasPagination="false"
        >
          <template #operation></template>
        </zxn-table>
      </el-form>
      <!-- 新增税地 -->
      <zxn-dialog v-model:visible="visible" title="新增税地">
        <el-form :model="newForm" :rules="rules">
          <el-row>
            <el-col :span="22">
              <el-form-item label="税地名称" prop="tax_land_name">
                <el-select class="w-full" placeholder="请选择"></el-select>
              </el-form-item>
              <el-form-item label="渠道点位" prop="channel_point">
                <el-input placeholder="请输入">
                  <template #append>%</template>
                </el-input>
              </el-form-item>
              <el-form-item label="扣税点位" prop="point">
                <el-input placeholder="请输入">
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="flex align-center justify-center">
          <el-button type="primary" @click="confirmClick">确认</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </div>
      </zxn-dialog>
    </div>
  </zxn-plan>
</template>

<script lang="ts" setup>
const activeName = ref("1");
const tabsList = [{ label: "新建企业渠道", name: "1" }];
const form = reactive({});

const newForm = reactive({
  tax_land_name: "",
  channel_point: "",
  point: "",
});

const rules = {
  tax_land_name: [{ required: true, message: "必填" }],
  channel_point: [{ required: true, message: "必填" }],
  point: [{ required: true, message: "必填" }],
};

const tableData = reactive([]);
const columnList = [
  {
    label: "税地名称",
    prop: "",
  },
  {
    label: "成本点位",
    prop: "",
  },
  {
    label: "渠道点位",
    prop: "",
  },
  {
    label: "扣税点位",
    prop: "",
  },
  { label: "操作", slot: "operation", fixed: "right" },
];

// const rules = reactive({
// 	account: [{ required: true, message: "必填", trigger: "blur" }],
// 	pwd: [{ required: true, message: "必填", trigger: "blur" }],
// 	conf_pwd: [{ required: true, message: "必填", trigger: "blur" }],
// });

const visible = ref(false);

const closeDialog = () => {
  visible.value = false;
};

const confirmClick = () => {};
const addTaxLand = () => {
  visible.value = true;
};
</script>

<style scoped lang="scss">
.addTax {
  position: absolute;
  top: 5px;
  right: 60px;
  height: 33px;
  line-height: 32px;
  padding: 0 5px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #366ff3;
  color: #366ff3;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: #366ff3;
  }
}

:deep(.el-input__wrapper) {
  width: 100% !important;
}
</style>
