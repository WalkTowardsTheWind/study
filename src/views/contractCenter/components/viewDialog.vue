<template>
  <el-dialog
    custom-class="my-dialog"
    v-model="dialogVisible"
    width="70%"
    :before-close="handleClose"
  >
    <template #header>
      <div class="my-header">
        <h4>{{ title }}</h4>
      </div>
    </template>
    <div>
      <el-form
        v-if="title == '新建合同' || title == '合同编辑'"
        :model="formItem"
        inline
        label-width="90px"
      >
        <div class="my-4 flex items-center text-sm">
          <el-radio-group v-model="radio3" class="ml-4">
            <el-radio label="1" size="small">线上</el-radio>
            <el-radio label="2" size="small">线下</el-radio>
          </el-radio-group>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同名称">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同类型">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同编号">
              <el-input v-model="formItem.name" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同期限">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="签约时间">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到期时间">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="签约点位">
              <el-input v-model="formItem.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="width: 100%; height: 50px" label="备注">
              <el-input v-model="formItem.name" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="文件上传">
              <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :auto-upload="false"
              >
                <template #trigger>
                  <el-button type="primary">select</el-button>
                </template>

                <el-button class="ml-3" type="success" @click="submitUpload">
                  upload
                </el-button>

                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片上传">
              <multi-upload v-model="formItem.multiPicUrls"></multi-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--  -->
      <el-form v-else :model="formItem" inline label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同名称">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同类型">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同编号">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同期限">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="签约时间">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到期时间">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="签约点位">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="width: 100%; height: 50px" label="备注">
              <el-text class="mx-1">{{ formItem.name }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item class="ml-8" label="图片">
              <el-image
                style="width: 100px; height: 100px"
                :src="formItem.multiPicUrls[0]"
                :zoom-rate="1.2"
                :preview-src-list="formItem.multiPicUrls"
                fit="cover"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import type { UploadInstance } from "element-plus";
const emit = defineEmits(["update:dialogVisible"]);
const props = defineProps({
  dialogVisible: { type: Boolean, default: false },
  title: { type: String, equired: true },
});
let dialogVisible = computed(() => props.dialogVisible);
const radio3 = ref("1");
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("你确认关闭弹窗？")
    .then(() => {
      done();
      emit("update:dialogVisible", false);
    })
    .catch(() => {
      // catch error
    })
    .then(() => {
      console.log(dialogVisible.value);
    });
};
// 上传
const uploadRef = ref<UploadInstance>();

const submitUpload = () => {
  uploadRef.value!.submit();
};
const handleSubmit = () => {};
const closeDialog = () => {};

const formItem = reactive({
  name: "",
  tags: [{ id: 2, label: "不限学历" }],
  multiPicUrls: [
    "https://oss.youlai.tech/default/2022/11/20/8af5567816094545b53e76b38ae9c974.webp",
    "https://oss.youlai.tech/default/2022/11/20/13dbfd7feaf848c2acec2b21675eb9d3.webp",
  ],
});
</script>
