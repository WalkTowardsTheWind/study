<!--
  多图上传组件
  @author: youlaitech
  @date 2022/11/20
-->

<template>
  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    :before-upload="handleBeforeUpload"
    :on-exceed="handleExceed"
    :http-request="handleUpload"
    :on-remove="handleRemove"
    :on-preview="previewImg"
    :limit="props.limit"
    v-bind="$attrs"
    class="multi-upload"
  >
    <i-ep-plus style="width: 3em; height: 3em" />
  </el-upload>
  <el-image-viewer
    v-if="dialogVisible"
    :url-list="[previewImgUrl]"
    :initial-index="0"
    z-index="999"
    @close="closeImgViewer"
    :teleported="true"
  />
</template>

<script setup lang="ts">
import {
  UploadRawFile,
  UploadRequestOptions,
  UploadFile,
  UploadProps,
} from "element-plus";
import { uploadFileApi } from "@/api/file";
import { useEventListener } from "@vueuse/core";
import { isImage, isPdf } from "@/utils/is";
import pdfImg from "@/assets/pdf.png";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  /**
   * 文件路径集合
   */
  modelValue: {
    type: Array<string>,
    default: [] as Array<string>,
  },
  /**
   * 文件上传数量限制
   */
  limit: {
    type: Number,
    default: 5,
  },
  /**
   * 文件上传大小限制
   */
  size: {
    type: Number,
    default: 20,
  },
});

const previewImgUrl = ref("");
const dialogVisible = ref(false);

const fileList = ref([]);
watch(
  () => props.modelValue,
  (newVal: string[]) => {
    const filePaths = fileList.value.map((file) => file.baseUrl);
    // 监听modelValue文件集合值未变化时，跳过赋值
    if (
      filePaths.length > 0 &&
      filePaths.length === newVal.length &&
      filePaths.every((x) => newVal.some((y) => y === x)) &&
      newVal.every((y) => filePaths.some((x) => x === y))
    ) {
      return;
    }

    fileList.value = newVal.map((filePath) => {
      let _url = "";
      if (isImage(filePath)) {
        _url = filePath;
      } else if (isPdf(filePath)) {
        _url = pdfImg;
      }
      return { url: _url, baseUrl: filePath };
    });
  },
  { immediate: true }
);

/**
 * 自定义图片上传
 *
 * @param params
 */
async function handleUpload(options: UploadRequestOptions): Promise<any> {
  // 上传API调用
  const { data: fileInfo } = await uploadFileApi(options.file);

  // 上传成功需手动替换文件路径为远程URL，否则图片地址为预览地址 blob:http://
  const fileIndex = fileList.value.findIndex(
    (file) => file.uid == (options.file as any).uid
  );
  let _url = "";
  if (isImage(fileInfo.src)) {
    _url = fileInfo.src;
  } else if (isPdf(fileInfo.src)) {
    _url = pdfImg;
  }

  fileList.value.splice(fileIndex, 1, {
    url: _url,
    baseUrl: fileInfo.src,
  });
  emit(
    "update:modelValue",
    fileList.value.map((file) => file.baseUrl)
  );
}
/**
 * 图片上传限制
 */
const handleExceed: UploadProps["onExceed"] = (files) => {
  console.log(files);

  ElMessage.warning(`上传图片不能超过${props.limit}张`);
  //   upload.value!.clearFiles()
  //   const file = files[0] as UploadRawFile
  //   file.uid = genFileId()
  //   upload.value!.handleStart(file)
};

/**
 * 删除图片
 */
function handleRemove(removeFile: UploadFile) {
  const filePath = removeFile.url;

  if (filePath) {
    // deleteFileApi(filePath).then(() => {
    // 删除成功回调
    emit(
      "update:modelValue",
      fileList.value.map((file) => file.baseUrl)
    );
    // });
  }
}

/**
 * 限制用户上传文件的格式和大小
 */
function handleBeforeUpload(file: UploadRawFile) {
  if (file.size > props.size * 1048 * 1048) {
    ElMessage.warning(`上传图片不能大于${props.size}M`);
    return false;
  }
  return true;
}

let prevOverflow = "";

let stopWheelListener: (() => void) | undefined;

function wheelHandler(e: WheelEvent) {
  if (!e.ctrlKey) return;

  if (e.deltaY < 0) {
    e.preventDefault();
    return false;
  } else if (e.deltaY > 0) {
    e.preventDefault();
    return false;
  }
}
/**
 * 预览图片
 */
const previewImg: UploadProps["onPreview"] = (uploadFile) => {
  if (isImage(uploadFile.baseUrl)) {
    stopWheelListener = useEventListener("wheel", wheelHandler, {
      passive: false,
    });
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    previewImgUrl.value = uploadFile.url!;
    dialogVisible.value = true;
  } else if (isPdf(uploadFile.baseUrl)) {
    window.open(uploadFile.baseUrl, "_blank");
  }
};

const closeImgViewer = () => {
  stopWheelListener?.();
  document.body.style.overflow = prevOverflow;
  dialogVisible.value = false;
};
</script>
<style lang="scss">
//修改图片上传样式
.el-upload-list--picture-card .el-upload-list__item {
  width: 90px;
  height: 90px;
}

.el-upload--picture-card {
  --el-upload-picture-card-size: 88px;

  background: #e5e5e5;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
</style>
