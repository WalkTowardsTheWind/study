<template>
  <el-select v-model="taxIdValue" clearable filterable @change="handleTaxChange">
    <el-option v-if="isShowAll" label="全部税地" value="" />
    <el-option
      v-for="item in useUser.sourceList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script setup lang="ts">
import { useUserStoreHook } from "@/store/modules/user";
const useUser = useUserStoreHook();
const props = defineProps({
  taxId: {
    type: [String, Number],
    default: "",
  },
  adCode: {
    type: [String, Number],
    default: "",
  },
  isShowAll: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(["update:taxId", "change-tax"]);
const taxIdValue = computed({
  get() {
    return props.taxId ? props.taxId * 1 : "";
  },
  set(val) {
    emits("update:taxId", val);
  },
});
const handleTaxChange = (val: string) => {
  emits("change-tax", val);
};
</script>
