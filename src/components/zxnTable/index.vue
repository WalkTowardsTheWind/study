<template>
  <div class="integration-table">
    <div v-if="$slots.tableTop" class="integration-table-top">
      <slot name="tableTop" />
    </div>
    <!--    <div v-if="selectedNumber" class="integration-table-selected">-->
    <!--      已选择 {{ selectedNumber }} 项-->
    <!--    </div>-->
    <el-table
      ref="zxnTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelect"
      @sort-change="handleSort"
      :max-height="tableHeight || maxHeight"
      class="zxn-table"
      :row-key="rowKey"
      :defaultExpandAll="defaultExpandAll"
      v-loading="loading"
    >
      <el-table-column
        v-if="hasSelect"
        type="selection"
        :selectable="selectable"
      />
      <el-table-column v-if="hasIndex" type="index" label="序号" width="65" />
      <template v-for="(item, index) in tableColumnList" :key="index">
        <el-table-column
          v-if="item.slot"
          v-bind="item"
          :showOverflowTooltip="true"
        >
          <template #default="scope">
            <slot :name="item.slot" v-bind="scope" />
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type"
          v-bind="item"
          :showOverflowTooltip="true"
        >
          <template #default="{ row }">
            <div
              v-if="
                item.type === 'enum' &&
                (isNumber(row[item.prop]) || row[item.prop])
              "
              v-text="proxy.$enumSet[item.path][row[item.prop]]"
              class="zxn-table-label"
              :style="item.color ? item.color[row[item.prop]] : {}"
            />
            <div v-if="item.type === 'deep'">{{ deepRender(row, item) }}</div>
            <div v-if="item.type === 'switch'">
              <el-switch
                v-model="row[item.prop]"
                @change="handleSwitchChange(row, item.prop)"
                :active-value="item.activeValue ? item.activeValue : 0"
                :inactive-value="item.inactiveValue ? item.inactiveValue : 1"
              />
            </div>
            <div v-if="item.type === 'money'">
              {{ proxy.$moneyFormat(row[item.prop]) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column v-else v-bind="item" :showOverflowTooltip="true" />
      </template>
    </el-table>
    <pagination
      v-if="hasPagination"
      :total="_total"
      :page="_page"
      :limit="_limit"
      @pagination="handlePageChange"
    />
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { TabsContextKey } from "@/components/constants";
import type { SortParams } from "./tableType";
import { isNumber } from "@/utils/is";

const tabsContext = inject(TabsContextKey, undefined);
const { proxy } = getCurrentInstance() as any;
const props = defineProps({
  hasSelect: { type: Boolean as PropType<boolean>, default: false },
  hasIndex: { type: Boolean as PropType<boolean>, default: true },
  tableData: { type: Array, default: () => [] },
  columnList: { type: Array, default: () => [] },
  hasPagination: { type: Boolean, default: true },
  pageInfo: { type: Object, default: () => ({}) },
  selectable: { type: Function },
  rowKey: { type: String },
  defaultExpandAll: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  tableHeight: { type: Number },
});
const emit = defineEmits([
  "sort-change",
  "selection-change",
  "page-change",
  "switch-change",
]);
const handleSort = ({ column, prop, order }: SortParams<any>) => {
  emit("sort-change", { column, prop, order });
};
const zxnTable = ref();
let selectedNumber = ref(0);
const handleSelect = (value: any) => {
  selectedNumber.value = value.length;
  emit("selection-change", value);
};
const getSelectionRows = () => {
  return zxnTable.value.getSelectionRows();
};
let _total = ref(0);
let _page = ref(1);
let _limit = ref(20);
const tableColumnList = ref([]);
watch(
  () => props.columnList,
  (val) => {
    tableColumnList.value = val.filter((it) => {
      return !Object.hasOwnProperty.call(it, "visible") || it.visible;
    });
  },
  { immediate: true, deep: true }
);
watchEffect(() => {
  const { total, page, limit } = props.pageInfo;
  // console.log(total, '2222')
  _total.value = total;
  _page.value = page;
  _limit.value = limit;
});
const deepRender = (row, item) => {
  const fields = item.prop.split(".");
  return fields.reduce((acc, cur) => {
    return acc[cur];
  }, row);
};
const handlePageChange = (current: { page: number; limit: number }) => {
  emit("page-change", current);
};
let maxHeight = ref(600);
const resetHeight = () => {
  setTimeout(() => {
    const el = zxnTable.value?.$el;
    const { top } = el.getBoundingClientRect();
    const VisibleHeight =
      window.innerHeight - top - (props.hasPagination ? 68 : 0);
    maxHeight.value = VisibleHeight > 500 ? VisibleHeight : 500;
    // zxnTable.value.doLayout()
  });
};
const getTable = () => {
  return zxnTable.value;
};

const handleSwitchChange = (row: any, prop: string) => {
  emit("switch-change", row, prop);
};
onMounted(() => {
  resetHeight();
  const context = reactive({
    $el: zxnTable.value?.$el,
    resetHeight,
  });
  tabsContext?.addTable(context);
});
defineExpose({
  resetHeight,
  getSelectionRows,
  getTable,
});
</script>
<style lang="scss" scoped>
.integration-table {
  &-top {
    margin-bottom: 16px;
  }
}
</style>
