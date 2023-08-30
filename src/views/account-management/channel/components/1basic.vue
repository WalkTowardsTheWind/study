<template>
  <div class="p-[37px]">
    <!-- 企业 -->
    <template v-if="channel_type == '1'">
      <el-form label-width="auto">
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="渠道类型">
              <el-input />
            </el-form-item>
            <el-form-item label="管理员联系号码">
              <el-input />
            </el-form-item>
            <el-form-item label="账号名称">
              <el-input />
            </el-form-item>
            <el-form-item label="统一社会信用代码">
              <el-input />
            </el-form-item>
            <el-form-item label="联系号码">
              <el-input />
            </el-form-item>
            <el-form-item label="银行账号">
              <el-input />
            </el-form-item>
            <el-form-item label="渠道佣金结算时间">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="渠道管理员">
              <el-input />
            </el-form-item>
            <el-form-item label="企业名称">
              <el-input />
            </el-form-item>
            <el-form-item label="密码">
              <el-input value="********" readonly />
              <span v-if="isEdit" class="resetPWD">重置密码</span>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input />
            </el-form-item>
            <el-form-item label="开户行">
              <el-input />
            </el-form-item>
            <el-form-item label="收款方式">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="合伙人协议">
              <MultiUpload />
            </el-form-item>
            <el-form-item label="营业执照">
              <MultiUpload />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <!-- 个人 -->
    <template v-if="channel_type == '2'">
      <el-form label-width="auto">
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="渠道类型">
              <el-input />
            </el-form-item>
            <el-form-item label="管理员联系号码">
              <el-input />
            </el-form-item>
            <el-form-item label="账号名称">
              <el-input />
            </el-form-item>
            <el-form-item label="联系人">
              <el-input />
            </el-form-item>
            <el-form-item label="开户行">
              <el-input />
            </el-form-item>
            <el-form-item label="收款方式">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="渠道管理员">
              <el-input />
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input />
            </el-form-item>
            <el-form-item label="密码">
              <el-input value="********" readonly />
              <span v-if="isEdit" class="resetPWD">重置密码</span>
            </el-form-item>
            <el-form-item label="联系号码">
              <el-input />
            </el-form-item>
            <el-form-item label="银行账号">
              <el-input />
            </el-form-item>
            <el-form-item label="渠道佣金结算时间">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="合伙人协议">
              <MultiUpload />
            </el-form-item>
            <el-form-item label="身份证">
              <MultiUpload />
            </el-form-item>
            <el-form-item label="银行卡">
              <MultiUpload />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <zxn-bottom-btn v-if="isEdit">
      <el-button type="primary">确认</el-button>
      <el-button>取消</el-button>
    </zxn-bottom-btn>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
});

const channel_type = ref("1");
</script>

<style scoped>
.resetPWD {
  position: absolute;
  right: 10px;
  color: #356ff3;
  cursor: pointer;
}
</style>
