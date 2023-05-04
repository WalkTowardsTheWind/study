<template>
  <el-tabs v-model="activeValue" class="zxn-tabs" @tab-click="handleClick">
    <el-tab-pane
      v-for="item in tabsList"
      :key="item.name"
      :label="item.label"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
type tabsListType = {
  label: string;
  name: string;
}[];
const props = defineProps({
  activeName: { type: String, default: "" },
  tabsList: { type: Array as PropType<tabsListType>, default: () => [] },
});
const emit = defineEmits(["update:activeName", "tab-click"]);
const activeValue = computed(() => props.activeName);
const handleClick = (value: string): void => {
  emit("update:activeName", value);
  emit("tab-click", value);
};
</script>
<!--<style scoped lang="scss">-->
<!--.zxn-tabs {-->
<!--}-->
<!--</style>-->
