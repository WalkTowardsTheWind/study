<template>
  <div class="content">
    <h2>数据列表</h2>

    <div class="item" v-for="item in dataList" :key="item.id">
      <div class="item-head">
        <div class="item-head-left">
          <div class="item-head-left-name">{{ item.name }}</div>
          <div class="item-head-left-time">{{ item.time }}</div>
        </div>

        <div class="item-head-delete" @click="deleteItem(item.id)">删除</div>
      </div>
      <div class="item-content">
        <el-input
          v-model="item.contens"
          :autosize="{ minRows: 2, maxRows: 10 }"
          type="textarea"
          placeholder="Please input"
          @change="handleChange(item.id)"
        />
      </div>
      <div class="item-imageList">
        <BaseImageUpload
          v-model="item.imgs"
          @change="handleChange(item.id)"
          :limit="3"
        >
        </BaseImageUpload>
      </div>
    </div>
    <div class="add" @click="addNewItem">添加新项</div>
    <zxn-bottom-btn>
      <div class="but">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </zxn-bottom-btn>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import BaseImageUpload from "@/components/BaseImageUpload/BaseImageUpload.vue";

// 假设这是从后端获取的数据
const backendData = [
  {
    id: "",
    name: "张三",
    contens: "123",
    imgs: [],
    time: "2024-12-24 2:12:12",
  },
  {
    id: "",
    name: "李四",
    contens: "456",
    imgs: [],
    time: "2024-12-24 12:12:12",
  },
  {
    id: "",
    name: "王五",
    contens: "789",
    imgs: [],
    time: "2024-12-24 12:12:12",
  },
];

// 添加唯一 id
const dataList = reactive(
  backendData.map((item, index) => ({
    ...item,
    id: `${Date.now()}-${index}`, // 使用时间戳和 index 组合生成唯一 id
  }))
);

// 添加新项
const addNewItem = () => {
  const newItem = {
    id: `${Date.now()}-${dataList.length}`, // 使用时间戳和当前长度生成唯一 id
    name: "张三",
    contens: "",
    imgs: [],
    time: getFormattedTime(),
  };
  dataList.push(newItem);
  console.log("添加新项:", dataList);
};

// 删除某一项
const deleteItem = (id) => {
  const index = dataList.findIndex((item) => item.id === id);
  if (index !== -1) {
    dataList.splice(index, 1);
  }
  console.log("删除某一项:", dataList);
};

// 提交数据
const handleSubmit = () => {
  // 更新 imgs 数组：根据 imgsString 字段重新计算 imgs
  dataList.forEach((item) => {
    // 删除 id 字段
    delete item.id;
  });

  console.log("提交的数据:", dataList);
  // 在这里你可以进行 AJAX 请求，将 dataList 提交到后端
};

const handleChange = (id) => {
  dataList.forEach((item) => {
    if (item.id == id) {
      item.time = getFormattedTime();
    }
  });
  console.log("正在改变：", id);
};
const handleClose = () => {};

function getFormattedTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以加1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.item {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-left {
      display: flex;
      align-items: center;
      &-name {
        color: #f40;
      }
      &-time {
        margin-left: 20px;
        color: pink;
      }
    }
  }
  &-content {
    width: 80%;
  }
  &-imageList {
    width: 80%;
  }
}

.add {
  width: 80%;
  height: 50px;
  color: #000;
  text-align: center;
  line-height: 50px;
  border: 1px solid salmon;
}
.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}
</style>
