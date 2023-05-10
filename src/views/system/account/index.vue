<template>
  <zxn-plan>
    <div class="p-[24px] p-b-[0]">
      <el-form ref="form" :model="formItem" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号" prop="nikeName">
              <el-input v-model="formItem.nikeName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="密码" prop="password">
              <el-input v-model="formItem.password" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="确认密码" prop="repeatPassword">
              <el-input v-model="formItem.repeatPassword" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-button type="primary" class="w-[100%]">确认</el-button>
          </el-col>
        </el-row>
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
