<template>
  <el-select v-model="taxIdValue" class="w-[272px]" filterable>
    <el-option label="全部税地" value="" />
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
});
const emits = defineEmits(["update:taxId"]);
const taxIdValue = computed({
  get() {
    return props.taxId ? props.taxId * 1 : "";
  },
  set(val) {
    emits("update:taxId", val);
  },
});
</script>
