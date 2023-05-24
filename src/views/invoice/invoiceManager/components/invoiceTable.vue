<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      :label-width="100"
    >
      <el-form-item label="">
        <el-input v-model="formItem.invoice_name" placeholder="请输入关键字">
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="开票状态">
        <el-select v-model="formItem.status" placeholder="全部">
          <el-option
            v-for="item in proxy.$const['statusEnum.invoiceStatus']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="税源地区">
        <el-select v-model="formItem.tax_land_id" placeholder="请选择">
          <el-option
            v-for="item in proxy.$const['statusEnum.IndustryType']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开票类型">
        <el-select v-model="formItem.invoice_type" placeholder="请选择">
          <el-option
            v-for="item in proxy.$const['statusEnum.IndustryType']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开票行业类目" v-if="type === 'enterprise'">
        <el-cascader
          v-model="formItem.category_id"
          placeholder="请选择"
          :options="industryList"
          filterable
          clearable
          :props="{ label: 'name', value: 'id' }"
        />
      </el-form-item>
      <el-form-item prop="date" label="申请日期">
        <zxn-date-range v-model="formItem.timeData" />
      </el-form-item>
    </zxn-search>
    <zxn-table :table-data="tableData" :column-list="columnList" hasSelect>
      <template #tableTop>
        <el-dropdown trigger="click">
          <el-button type="primary">批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>驳回</el-dropdown-item>
              <el-dropdown-item>通过</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template #operation>
        <el-button link type="primary">驳回</el-button>
        <el-button link type="primary">上传发票</el-button>
        <el-button link type="primary">查看物流</el-button>
        <el-button link type="primary">详情</el-button>
        <el-button link type="primary">导出</el-button>
      </template>
    </zxn-table>
  </div>
</template>
<script setup lang="ts">
import type { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
import { getTreeList } from "@/api/common";
const props = defineProps({
  type: { type: String, default: "enterprise" },
});
const industryList = reactive([]);
const getIndustryList = async () => {
  const { data } = await getTreeList({ type: 2 });
  industryList.length = 0;
  industryList.push(...data);
};
const formItem = reactive({
  invoice_name: "",
  tax_land_id: "",
  invoice_type: "",
  category_id: "",
  timeData: [],
  status: "",
});
const columnList: any[] = reactive([
  { label: "发票任务编号", prop: "value", minWidth: 110 },
  { label: "关联任务数量", prop: "name", minWidth: 110 },
  { label: "申请开票企业", minWidth: 110 },
  { label: "开票样式", minWidth: 80 },
  { label: "申请开票金额", minWidth: 110 },
  { label: "税地发票面额", minWidth: 110 },
  { label: "发票张数", minWidth: 80 },
  { label: "开票要求", minWidth: 80 },
  { label: "申请时间", sortable: "custom", minWidth: 120 },
  { label: "结算确认函", minWidth: 120 },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.IndustryType",
    prop: "status",
    color: { 0: "blue", 1: "red" },
    minWidth: 80,
  },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
]);
const tableData: any[] = reactive([]);
onMounted(() => {
  if (props.type === "enterprise") {
    getIndustryList();
  }
});
</script>
