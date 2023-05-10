<template>
  <el-steps :active="active" finish-status="success">
    <el-step title="Step 1" />
    <el-step title="Step 2" />
    <el-step title="Step 3" />
  </el-steps>

  <el-button style="margin-top: 12px" @click="next"
    >Next step{{ act }}</el-button
  >
</template>

<script lang="ts" setup>
// import { ref } from "vue";
//
const emit = defineEmits(["update:active"]);
const props = defineProps({
  active: { type: Number, default: 0 },
  //   title: { type: String, equired: true },
});
var active = computed(() => props.active);
//
var act = <any>active;

const next = () => {
  act.value++;
  emit("update:active", act);
};
</script>
<style scoped lang="scss">
.zxn-tabs {
  :deep(.el-tabs__header) {
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
      padding-left: 0;
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
</style>
