<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo w-full"
    :before-upload="handleBeforeUpload"
    :on-exceed="handleExceed"
    :http-request="handleUpload"
    :on-remove="handleRemove"
    :on-preview="previewImg"
    :limit="props.limit"
    v-bind="$attrs"
  >
    <!--
            :headers="headers"
        :action="action" 
            :on-success="handleSuccess"
        :before-remove="beforeRemove" -->
    <slot v-if="slot"></slot>
    <el-button v-else type="primary" plain>+上传文件</el-button>
    <template #tip>
      <div class="el-upload__tip">请上传zip文件</div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import {
  UploadRawFile,
  UploadRequestOptions,
  UploadFile,
  UploadProps,
} from "element-plus";
import { uploadFileApi } from "@/api/file";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  /**
   * 文件路径集合
   */
  modelValue: {
    type: Array<object>,
    default: [] as Array<object>,
  },
  /**
   * 文件上传数量限制
   */
  limit: {
    type: Number,
    default: 5,
  },
  /**
   *  文件类型
   */
  type: {
    type: Array<string>,
    default: [] as Array<string>,
  },
  /**
   *  是否默认
   */
  slot: {
    type: Boolean,
    default: false,
  },
});

const fileList = ref([]) as any;
watch(
  () => props.modelValue,
  (newVal: string[]) => {
    const filePaths = fileList.value.map((file: any) => file.baseUrl);
    // 监听modelValue文件集合值未变化时，跳过赋值
    if (
      filePaths.length > 0 &&
      filePaths.length === newVal.length &&
      filePaths.every((x: any) => newVal.some((y: any) => y === x)) &&
      newVal.every((y: any) => filePaths.some((x: any) => x === y))
    ) {
      return;
    }

    console.log(fileList.value, "fileList.value");

    fileList.value = newVal;
  },
  { immediate: true }
);

/**
 * 自定义图片上传
 *
 * @param params
 */
async function handleUpload(options: UploadRequestOptions): Promise<any> {
  console.log(fileList.value, "fileList.value111");

  // 上传API调用
  const { data: fileInfo } = await uploadFileApi(options.file);

  // 上传成功需手动替换文件路径为远程URL，否则图片地址为预览地址 blob:http://
  const fileIndex = fileList.value.findIndex((file) => {
    console.log(file, "file");

    if (file?.uid) {
      return file.uid == (options.file as any).uid;
    } else {
      return file == 1;
    }
  });
  console.log(fileList.value, "fileList.value222");

  fileList.value.splice(fileIndex, 1, {
    name: options.file.name,
    baseUrl: fileInfo.src,
  });
  emit("update:modelValue", fileList.value);
}
/**
 * 文件上传限制
 */
const handleExceed: UploadProps["onExceed"] = (files) => {
  ElMessage.warning(`上传文件不能超过${props.limit}个`);
  //   upload.value!.clearFiles()
  //   const file = files[0] as UploadRawFile
  //   file.uid = genFileId()
  //   upload.value!.handleStart(file)
};

/**
 * 删除文件
 */
function handleRemove(removeFile: UploadFile) {
  const filePath = removeFile.url;

  if (filePath) {
    // deleteFileApi(filePath).then(() => {
    // 删除成功回调
    emit(
      "update:modelValue",
      fileList.value.map((file: any) => file.baseUrl)
    );
    // });
  }
}

/**
 * 限制用户上传文件的格式和大小
 */
function handleBeforeUpload(file: UploadRawFile) {
  console.log(file, "file");

  var filePath = file.name; //文件路径
  var dotIdx = filePath.lastIndexOf("."); //获取最后一个.的位置
  var suffix = filePath.substring(dotIdx + 1); //获取文件后缀

  //判断是否是图片
  const isImage = (suffix: any) => {
    return ["png", "jpg", "jpeg", "gif"].indexOf(suffix.toLowerCase()) !== -1;
  };
  //判断是否是zip
  const isZip = (suffix: any) => {
    return ["zip"].indexOf(suffix.toLowerCase()) !== -1;
  };
  if (props.type.includes("zip")) {
    if (isZip(suffix)) {
      return true;
    } else {
      ElMessage.warning("请上传zip文件！");
      return false;
    }
  }
  if (props.type.includes("img")) {
    if (isImage(suffix)) {
      return true;
    } else {
      ElMessage.warning("请上传图片！");
      return false;
    }
  }
  if (file.size > 20 * 1048 * 1048) {
    ElMessage.warning("上传图片不能大于20M");
    return false;
  }
  return true;
}

/**
 * 预览文件
 */
const previewImg: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};
</script>
