<template>
  <el-button type="primary" @click="dialogVisible = true">open</el-button>

  <el-dialog
    custom-class="my-dialog"
    v-model="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <template #header>
      <div class="my-header">
        <h4>发佣确认</h4>
      </div>
    </template>
    <div>
      <el-form
        :model="formItem"
        inline
        label-width="90px"
        label-position="left"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="结算单号">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算单状态">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务企业">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务时间">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="结算金额">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渠道点位">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收佣渠道">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税前佣金">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="税后佣金">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款银行">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收款账号">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="凭证">
              <multi-upload v-model="formItem.annex_url"></multi-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
const dialogVisible = ref(true);

const formItem = reactive({
  name: "",
  tags: [{ id: 2, label: "不限学历" }],
  multiPicUrls: [
    "https://oss.youlai.tech/default/2022/11/20/8af5567816094545b53e76b38ae9c974.webp",
    "https://oss.youlai.tech/default/2022/11/20/13dbfd7feaf848c2acec2b21675eb9d3.webp",
  ],
});
</script>
