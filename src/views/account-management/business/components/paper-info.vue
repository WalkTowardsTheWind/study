<template>
  <div class="p-[30px]">
    <!-- 编辑 -->
    <template v-if="isEdit">
      <el-form :form="formData" label-width="120px">
        <el-form-item label="营业执照">
          <MultiUpload v-model="formData.license">
            <i-ep-Plus />
          </MultiUpload>
        </el-form-item>
        <el-form-item label="法人身份证">
          <MultiUpload v-model="formData.idcard_img">
            <i-ep-Plus />
          </MultiUpload>
        </el-form-item>
        <el-form-item label="纳税人类型证明">
          <MultiUpload v-model="formData.taxpayer_type_img">
            <i-ep-Plus />
          </MultiUpload>
        </el-form-item>
        <el-form-item label="公司门头照片">
          <MultiUpload v-model="formData.header_img">
            <i-ep-Plus />
          </MultiUpload>
        </el-form-item>
        <el-form-item label="办公地点照片">
          <MultiUpload v-model="formData.office_img">
            <i-ep-Plus />
          </MultiUpload>
        </el-form-item>
      </el-form>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </template>
    <!-- 详情 -->
    <template v-else>
      <el-form-item label="营业执照" label-width="120px">
        <PicturePreview :image-list="formData.license" />
      </el-form-item>
      <el-form-item label="法人身份证" label-width="120px">
        <PicturePreview :image-list="formData.idcard_img" />
      </el-form-item>
      <el-form-item label="纳税人类型证明" label-width="120px">
        <PicturePreview :image-list="formData.taxpayer_type_img" />
      </el-form-item>
      <el-form-item label="公司门头照片" label-width="120px">
        <PicturePreview :image-list="formData.header_img" />
      </el-form-item>
      <el-form-item label="办公地点照片" label-width="120px">
        <PicturePreview :image-list="formData.office_img" />
      </el-form-item>
    </template>
  </div>
  <zxn-bottom-btn v-if="isEdit">
    <el-button>取消</el-button>
    <el-button @click="updateBusinessAccount">保存</el-button>
  </zxn-bottom-btn>
</template>

<script lang="ts" setup>
import {
  getBusinessAccountDetail,
  editBusinessAccount,
} from "@/api/account/business";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => "",
  },
});

const formData = ref({} as any);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

/**
 * 更新
 */
async function updateBusinessAccount() {
  // console.log(formData.value);
  // 后台返回的 contacts_mobile 更新修改为 mobile
  let params = {
    ...formData.value,
    mobile: formData.value.contacts_mobile,
    contacts_mobile: undefined,
  };
  try {
    await editBusinessAccount(params);
    ElMessage({
      message: "编辑成功",
      type: "success",
    });
  } catch (error: any) {
    return new Error(error);
  }
}

async function getAccountDetail() {
  if (props.id) {
    const res = await getBusinessAccountDetail(props.id);
    try {
      formData.value = res.data;
      // console.log(formData.value);
    } catch (error: any) {
      return new Error("error", error);
    }
  }
}

getAccountDetail();
</script>
