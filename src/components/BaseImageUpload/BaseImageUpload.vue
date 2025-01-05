<!--
  多图上传组件
  @author: youlaitech
  @date 2022/11/20
-->

<template>
  <div class="ImageUpload">
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
      :zoom-rate="1.2"
      :zoomable="false"
      :url-list="[previewImgUrl]"
      :initial-index="0"
      z-index="999"
      @close="closeImgViewer"
      @rotate="rotate"
      :teleported="true"
    />
  </div>
</template>

<script setup lang="ts">
import {
  UploadRawFile,
  UploadRequestOptions,
  UploadFile,
  UploadProps,
} from "element-plus";
import { useEventListener } from "@vueuse/core";
import { isImage, isPdf, isBase64 } from "@/utils/is";
import pdfImg from "@/assets/pdf.png";

const emit = defineEmits(["update:modelValue", "change"]);

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
const isShow = ref("flex");
watch(
  () => props.modelValue,
  (newVal: string[]) => {
    const filePaths = fileList.value.map((file) => file.baseUrl);
    if (fileList?.value?.length < props.limit) {
      console.log(
        fileList?.value?.length,
        "fileList?.value?.length",
        props.limit
      );
      isShow.value = "flex";
    } else {
      isShow.value = "none";
    }

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
      } else if (isBase64(filePath)) {
        _url = filePath;
      }
      return { url: _url, baseUrl: filePath };
    });
  },
  { immediate: true }
);

/**
 * 图片压缩并转为 Base64
 * @param file 图片文件
 */
function compressAndConvertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.onload = () => {
        // 创建canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxWidth = 400; // 最大宽度限制
        const maxHeight = 400; // 最大高度限制
        let width = img.width;
        let height = img.height;

        // 根据最大尺寸比例进行缩放
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        // 设置canvas大小并绘制图片
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        // 将图片压缩并转为 Base64
        const base64 = canvas.toDataURL(file.type, 0.7); // 0.7表示压缩质量
        resolve(base64);
      };

      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * 自定义图片上传
 */
async function handleUpload(options: UploadRequestOptions): Promise<any> {
  const file = options.file as File;

  // 将图片转换为 Base64
  const base64Data = await compressAndConvertToBase64(file);

  // 手动更新文件列表，将 URL 替换为 Base64 数据
  const fileIndex = fileList.value.findIndex(
    (file) => file.uid == (options.file as any).uid
  );
  fileList.value.splice(fileIndex, 1, {
    url: base64Data, // 使用 Base64 替换 URL
    baseUrl: base64Data, // 使用 Base64 替换 baseUrl
  });

  emit(
    "update:modelValue",
    fileList.value.map((file) => file.baseUrl)
  );
  emit("change");
}
/**
 * 图片上传限制
 */
const handleExceed: UploadProps["onExceed"] = (files) => {
  ElMessage.warning(`上传图片不能超过${props.limit}张`);
};

/**
 * 删除图片
 */
function handleRemove(removeFile: UploadFile) {
  const filePath = removeFile.url;

  if (filePath) {
    emit(
      "update:modelValue",
      fileList.value.map((file) => file.baseUrl)
    );
    emit("change");
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
  if (isImage(uploadFile.baseUrl) || isBase64(uploadFile.baseUrl)) {
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
const rotate = () => {
  console.log(123321);
};

const closeImgViewer = () => {
  stopWheelListener?.();
  document.body.style.overflow = prevOverflow;
  dialogVisible.value = false;
};
</script>
<style lang="scss" scoped>
.ImageUpload {
  :deep(.el-upload-list) {
    //修改图片上传样式
    .el-upload-list__item {
      padding: 8px;
      width: 108px;
      height: 108px;
    }
    //
    .el-upload-list__item-status-label {
      //去右上角图标
      display: none;
    }

    .el-upload--picture-card {
      --el-upload-picture-card-size: 106px;
      background: #e5e5e5;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      display: v-bind(isShow);
    }
  }
}
</style>
