<template>
  <div class="integration-table">
    <div class="integration-table-top">
      <slot name="tableTop" />
    </div>
    <div v-if="selectedNumber" class="integration-table-selected">
      已选择 {{ selectedNumber }} 项
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelect"
      @sort-change="handleSort"
    >
      <el-table-column v-if="hasSelect" type="selection" />
      <el-table-column v-if="hasIndex" type="index" label="序号" width="65" />
      <template v-for="(item, index) in columnList" :key="index">
        <el-table-column v-if="item.slot" v-bind="item">
          <template #default="scope">
            <slot :name="item.slot" v-bind="scope" />
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.type" v-bind="item">
          <template #default>
            <div v-if="type === 'enum'">sss</div>
          </template>
        </el-table-column>
        <el-table-column v-else v-bind="item" />
      </template>
    </el-table>
    <pagination />
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import type { SortParams } from "./tableType";
defineProps({
  hasSelect: { type: Boolean as PropType<boolean>, default: false },
  hasIndex: { type: Boolean as PropType<boolean>, default: true },
  tableData: { type: Array, default: () => [] },
  columnList: { type: Array, default: () => [] },
});
const emit = defineEmits(["sort-change", "selection-change"]);
const handleSort = ({ column, prop, order }: SortParams<any>) => {
  emit("sort-change", { column, prop, order });
};
let selectedNumber = ref(0);
const handleSelect = (value: any) => {
  selectedNumber.value = value.length;
  console.log(selectedNumber);
  emit("selection-change", value);
};
</script>
