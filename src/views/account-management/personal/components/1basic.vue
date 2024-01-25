<template>
  <div class="m-36px">
    <el-form label-width="auto" :model="formData">
      <el-row :gutter="100">
        <el-col :span="8">
          <el-form-item label="姓名">
            <!-- <el-input readonly v-model="formData.name" /> -->
            <span> {{ formData.name }}</span>
          </el-form-item>
          <el-form-item label="联系方式">
            <!-- <el-input readonly v-model="formData.phone" /> -->
            <span> {{ formData.phone }}</span>
          </el-form-item>
          <el-form-item label="证件类型">
            <!-- <el-input readonly value="身份证" /> -->
            <span> 身份证</span>
          </el-form-item>
          <el-form-item label="证件号">
            <!-- <el-input readonly v-model="formData.idcard" /> -->
            <span> {{ formData.idcard }}</span>
          </el-form-item>
          <el-form-item label="开户行">
            <!-- <el-input readonly v-model="formData.bank" /> -->
            <span> {{ formData.bank }}</span>
          </el-form-item>
          <el-form-item label="银行卡号">
            <!-- <el-input readonly v-model="formData.bank_account" /> -->
            <span> {{ formData.bank_account }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证">
            <span>--</span>
            <!-- <PicturePreview :image-list="formData.idcard_img" /> -->
          </el-form-item>
          <el-form-item label="银行卡">
            <span>--</span>
            <!-- <PicturePreview :image-list="formData.bank_card_img" /> -->
          </el-form-item>
          <el-form-item label="认证视频">
            <span>--</span>
            <!-- <PicturePreview :image-list="formData.attestation_video_url" /> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { getDetail } from "@/api/account/personal";

const props = defineProps({
  idcard: {
    default: () => "",
  },
});

const formData = ref({} as any);

function getDetil() {
  getDetail(props.idcard).then((res) => {
    formData.value = res.data;
  });
}

getDetil();
</script>
