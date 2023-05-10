<template>
  <div class="zxn-tabs">
    <el-tabs v-model="activeValue" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabsList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <slot :name="item.name" />
      </el-tab-pane>
    </el-tabs>
    <div
      class="zxn-tabs-back"
      v-if="hasBack || hasUpdate"
      @click="handleClickRight"
    >
      <el-icon size="14" color="#474747">
        <i-ep-ArrowLeft v-if="hasBack" />
        <i-ep-RefreshRight v-if="hasUpdate" />
      </el-icon>
      <span>{{ hasUpdate ? "更新" : "返回上一级" }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, PropType } from "vue";
import type { TabsPaneContext } from "element-plus";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
type tabsListType = {
  label: string;
  name: string;
}[];
const props = defineProps({
  activeName: { type: String, default: "" },
  tabsList: { type: Array as PropType<tabsListType>, default: () => [] },
  hasBack: { type: Boolean, default: false },
  hasUpdate: { type: Boolean, default: true },
});
const emit = defineEmits(["update:activeName", "tab-click"]);
const activeValue = computed(() => props.activeName);
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
  emit("update:activeName", tab.props.name);
};
const handleClickRight = () => {
  if (props.hasBack) {
    return router.go(-1);
  }
  const { fullPath } = route;
  nextTick(() => {
    router.replace({ path: "/redirect" + fullPath }).catch((err) => {
      console.warn(err);
    });
  });
};
</script>
<style scoped lang="scss">
.zxn-tabs {
  display: flex;
  justify-content: space-between;
  padding-right: 24px;

  &-back {
    position: relative;
    display: flex;
    flex: none;
    align-items: center;
    cursor: pointer;

    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      content: "";
      background-color: #f5f5f5;
    }

    > span {
      font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #474747;
    }
  }

  :deep(.el-tabs) {
    flex: 1 auto;

    .el-tabs__header {
      margin-bottom: 0;

      .el-tabs__nav-wrap {
        &::after {
          height: 1px;
          background-color: #f5f5f5;
        }
      }

      .el-tabs__active-bar {
        height: 4px;
        background-color: $baseColor;
        border-radius: 2px;
      }

      .el-tabs__nav {
        padding-left: 53px;
      }

      .el-tabs__item {
        height: 63px;
        font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 63px;
        color: #474747;

        &.is-active {
          color: $baseColor;
        }
      }
    }
  }
}
</style>
