<template>
  <div :class="['zxn-pagination', { hidden }]">
    <div class="zxn-pagination-left">
      共{{ total }}条记录 第{{ currentPage }} /
      {{ Math.ceil(total / pageSize) }} 页
    </div>
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      @size-change="handlePageChange"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 20,
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 50],
  },
  layout: {
    type: String,
    default: "slot, prev, pager, next, sizes, jumper",
  },
  background: {
    type: Boolean,
    default: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["pagination"]);

// 双向绑定 currentPage 和 pageSize
const currentPage = ref(props.page);
const pageSize = ref(props.limit);

// 统一处理分页变化，简化逻辑
const handlePageChange = (newVal, type) => {
  if (type === "current") {
    currentPage.value = newVal;
  } else if (type === "size") {
    pageSize.value = newVal;
  }
  // 向父组件发送更新后的分页信息
  emit("pagination", { page: currentPage.value, limit: pageSize.value });
};
</script>

<style scoped lang="scss">
.zxn-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;

  &-left {
    flex: none;
    font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  :deep(.el-pagination) {
    .btn-prev,
    .btn-next {
      width: 36px;
      height: 36px;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;

      .el-icon {
        font-size: 14px;
        color: #333;
      }
    }

    .number {
      width: 36px;
      height: 36px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      opacity: 1;

      &.is-active {
        color: #366ff3;
        background: #fff;
        border-color: #366ff3;
      }
    }

    > .el-input {
      width: 100px;
    }

    .el-pagination__jump {
      color: #333;

      .el-input {
        width: 56px;
      }
    }
  }

  &.hidden {
    display: none;
  }
}
</style>
