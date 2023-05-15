<template>
  <zxn-plan>
    <div class="system-account">
      <el-form ref="form" :model="formItem" :rules="rules" label-width="0">
        <el-form-item label="" prop="nikeName">
          <el-input v-model="formItem.nikeName" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="formItem.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="" prop="repeatPassword">
          <el-input
            v-model="formItem.repeatPassword"
            placeholder="确认新密码"
          />
        </el-form-item>
        <el-button type="primary" class="w-[100%]">确认</el-button>
      </el-form>
    </div>
  </zxn-plan>
</template>
<script setup lang="ts">
const rules = reactive({
  nikeName: [{ required: true, message: "账号不能空", trigger: "blur" }],
});
const formItem = reactive({
  nikeName: "",
  password: "",
  repeatPassword: "",
});
</script>
<style lang="scss" scoped>
.system-account {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  :deep(.el-form) {
    .el-input {
      width: 300px;
      border-bottom: 1px solid #e5e5e5;

      .el-input__wrapper {
        box-shadow: none;

        .el-input__inner {
          height: 36px;
        }
      }
    }
  }
}
</style>
