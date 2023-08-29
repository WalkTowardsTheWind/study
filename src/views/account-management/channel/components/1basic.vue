<template>
  <div class="p-[37px]">
    <!-- 企业 -->
    <template v-if="channel_type == 'business'">
      <el-form label-width="auto">
        <el-row :gutter="50">
          <el-col :span="8">
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
          <el-col :span="8">
            <el-form-item label="渠道管理员">
              <el-input />
            </el-form-item>
            <el-form-item label="企业名称">
              <el-input />
            </el-form-item>
            <el-form-item label="密码">
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
          <el-col :span="8">
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
    <template v-if="channel_type == 'person'">
      <el-form label-width="auto">
        <el-row :gutter="50">
          <el-col :span="8">
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
          <el-col :span="8">
            <el-form-item label="渠道管理员">
              <el-input />
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input />
            </el-form-item>
            <el-form-item label="密码">
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
          <el-col :span="8">
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
  </div>
</template>

<script lang="ts" setup>
const channel_type = ref("person");
</script>

<style scoped></style>
