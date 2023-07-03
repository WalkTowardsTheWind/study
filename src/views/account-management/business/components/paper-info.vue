<template>
  <div class="p-[30px] relative box">
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
        <div class="bottom-btn">
          <el-button>取消</el-button>
          <el-button @click="updateBusinessAccount">保存</el-button>
        </div>
      </el-form>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </template>
    <!-- 详情 -->
    <template v-else>
      <el-form-item label="营业执照" label-width="120px">
        <PicturePreview
          v-if="formData.license[0]"
          :image-list="formData.license"
        />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="法人身份证" label-width="120px">
        <PicturePreview
          v-if="formData.idcard_img[0]"
          :image-list="formData.idcard_img"
        />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="纳税人类型证明" label-width="120px">
        <PicturePreview
          v-if="formData.taxpayer_type_img[0]"
          :image-list="formData.taxpayer_type_img"
        />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="公司门头照片" label-width="120px">
        <PicturePreview
          v-if="formData.header_img[0]"
          :image-list="formData.header_img"
        />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="办公地点照片" label-width="120px">
        <PicturePreview
          v-if="formData.office_img[0]"
          :image-list="formData.office_img"
        />
        <span v-else>--</span>
      </el-form-item>
    </template>
  </div>
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

const formData = ref({
  license: [],
  idcard_img: [],
  taxpayer_type_img: [],
  header_img: [],
  office_img: [],
} as any);

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
    console.log(res);

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
<style scoped lang="scss">
.box {
  padding-bottom: 100px;
}

.bottom-btn {
  position: absolute;
  bottom: 20px;
  left: 45%;
  transform: translateX(-50%);
}
</style>
