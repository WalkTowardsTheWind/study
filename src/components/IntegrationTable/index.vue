<template>
  <div class="integration-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-if="hasSelect" type="selection" />
      <el-table-column v-if="hasIndex" type="index" />
      <template v-for="(item, index) in columnList" :key="index">
        <el-table-column v-if="item.slot" v-bind="item">
          <template #default="scope">
            <slot :name="item.slot" v-bind="scope" />
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
defineProps({
  hasSelect: { type: Boolean as PropType<boolean>, default: false },
  hasIndex: { type: Boolean as PropType<boolean>, default: true },
  tableData: { type: Array, default: () => [] },
  columnList: { type: Array, default: () => [] },
});
</script>
