<template>
  <div class="integration-table">
    <div v-if="$slots.tableTop" class="integration-table-top">
      <slot name="tableTop" />
    </div>

    <div v-if="selectedNumber" class="integration-table-selected">
      <span>已选择 {{ selectedNumber }} 项</span>
      <span v-if="fieldTotal">,共 {{ selectTotal }} {{ totalUnit }}</span>
    </div>

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
      :tooltip-options="{
        popperClass: 'el-table-tip',
      }"
      v-loading="loading"
    >
      <el-table-column
        v-if="hasSelect"
        type="selection"
        :selectable="selectable"
        fixed="left"
      />
      <el-table-column
        v-if="hasIndex"
        type="index"
        label="序号"
        width="60"
        fixed="left"
      />

      <template v-for="(item, index) in tableColumnList" :key="index">
        <el-table-column
          v-bind="item"
          :showOverflowTooltip="
            isBoolean(item.showOverflowTooltip)
              ? item.showOverflowTooltip
              : true
          "
        >
          <template #header="scope">
            <slot :name="`header-${item.prop}`" v-bind="scope">
              {{ item.label }}
              <!-- 默认表头显示 -->
            </slot>
          </template>
          <template #default="scope">
            <slot :name="item.slot" v-bind="scope" v-if="item.slot" />
            <div
              v-else-if="
                item.type === 'enum' &&
                (isNumber(scope.row[item.prop]) || scope.row[item.prop])
              "
            >
              <span
                v-text="proxy.$enumSet[item.path][scope.row[item.prop]]"
                class="zxn-table-label"
                :style="item.color ? item.color[scope.row[item.prop]] : {}"
              />
            </div>
            <div v-else-if="item.type === 'deep'">
              {{ deepRender(scope.row, item) }}
            </div>
            <div v-else-if="item.type === 'switch'">
              <el-switch
                v-model="scope.row[item.prop]"
                @change="handleSwitchChange(scope.row, item.prop)"
                :active-value="item.activeValue || 0"
                :inactive-value="item.inactiveValue || 1"
              />
            </div>
            <div v-else-if="item.type === 'money'">
              <money-text :modelValue="scope.row[item.prop]" />
            </div>
            <div v-else-if="item.type === 'phone'">
              {{ formatPhone(scope.row[item.prop]) }}
            </div>
            <div v-else-if="item.type === 'card'">
              {{ formatCard(scope.row[item.prop]) }}
            </div>
            <zxn-image
              v-if="item.type === 'image'"
              :imgList="scope.row[item.prop]"
              :width="item.imgWidth || 40"
              :height="item.imgHeight || 40"
              targetClick
              ellipsis
            />
          </template>
        </el-table-column>
      </template>
    </el-table>

    <BasePagination
      v-if="hasPagination"
      :total="_total"
      :page="_page"
      :limit="_limit"
      :pageSizes="pageSizes"
      @pagination="handlePageChange"
    />
  </div>
</template>

<script setup lang="js">
  import { defineProps, defineEmits, ref, reactive, onMounted, watch, watchEffect, getCurrentInstance, inject } from 'vue';
import BasePagination from './BasePagination.vue'
  import currency from 'currency.js';

  const props = defineProps({
    hasSelect: Boolean,
    hasIndex: { type: Boolean, default: true },
    tableData: { type: Array, default: () => [] },
    columnList: { type: Array, default: () => [] },
    hasPagination: { type: Boolean, default: true },
    pageInfo: { type: Object, default: () => ({}) },
    selectable: Function,
    rowKey: { type: String, default: 'id' },
    defaultExpandAll: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    tableHeight: Number,
    bottomGap: { type: Number, default: 0 },
    fieldTotal: [String, Function],
    totalUnit: { type: String, default: '元' },
    pageSizes: { type: Array, default: () => [10, 20, 30, 50] }
  });

  const emit = defineEmits(['sort-change', 'selection-change', 'page-change', 'switch-change']);
  const zxnTable = ref();
  const selectedNumber = ref(0);
  const selectTotal = ref(0);
  const _total = ref(0);
  const _page = ref(1);
  const _limit = ref(20);
  const tableColumnList = ref([]);
  const maxHeight = ref(600);

  const { proxy } = getCurrentInstance();
  const tabsContext = inject('TabsContextKey', undefined);

  // Watchers for dynamic changes
  watch(
    () => props.columnList,
    (val) => {

      tableColumnList.value = val.filter(item => !Object.prototype.hasOwnProperty.call(item, 'visible') || item.visible);
      // console.log(val,'val',tableColumnList.value)
    },
    { immediate: true, deep: true }
  );

  watch(
    () => props.tableData,
    () => {
      zxnTable.value.clearSelection();
    },
    { deep: true }
  );

  watchEffect(() => {
    const { total, page, limit } = props.pageInfo;
    _total.value = total;
    _page.value = page;
    _limit.value = limit;
  });

  // Helper functions
  const is = (val, type) => Object.prototype.toString.call(val) === `[object ${type}]`;
  const isNumber = (val) => is(val, 'Number');
  const isBoolean = (val) => is(val, 'Boolean');
  const formatPhone = (phone) => phone ? `${phone.slice(0, 3)}****${phone.slice(-4)}` : '';
  const formatCard = (card) => card ? `${card.slice(0, 4)}**********${card.slice(-4)}` : '';
  const deepRender = (row, item) => item.prop.split('.').reduce((acc, cur) => acc[cur], row);

  // Event handlers
  const handleSort = ({ column, prop, order }) => {
    emit('sort-change', { column, prop, order });
  };

  const handleSelect = (value) => {
    selectedNumber.value = value.length;
    if (props.fieldTotal) {
      typeof props.fieldTotal === 'function' ? props.fieldTotal(value) : getSelectTotal(value);
    }
    emit('selection-change', value);
  };

  const getSelectTotal = (selected) => {
    selectTotal.value = selected.reduce((acc, cur) => currency(acc).add(cur[props.fieldTotal]), 0);
  };

  const handlePageChange = (current) => {
    emit('page-change', current);
  };

  const resetHeight = () => {
    setTimeout(() => {
      const el = zxnTable.value?.$el;
      const { top } = el.getBoundingClientRect();
      const VisibleHeight = window.innerHeight - top - props.bottomGap - (props.hasPagination ? 68 : 0);
      maxHeight.value = VisibleHeight > 500 ? VisibleHeight : 500;
    }, 0);
  };

  const handleSwitchChange = (row, prop) => {
    emit('switch-change', row, prop);
  };

  onMounted(() => {
    resetHeight();
    tabsContext?.addTable(reactive({ $el: zxnTable.value?.$el, resetHeight }));
  });
</script>

<style lang="scss" scoped>
.integration-table {
  &-top {
    margin-bottom: 16px;
  }

  &-selected {
    height: 48px;
    padding: 0 24px;
    margin-bottom: 16px;
    font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 48px;
    color: #333;
    background: #fef1f0;
    border-radius: 4px;
  }
}
</style>
