<template>
  <el-scrollbar
    class="w-[auto] p-r-[16px]"
    @mousewheel="handleWheel"
    ref="scrollbar"
  >
    <div class="area-select">
      <div
        class="area-select-province"
        v-for="item in curAreaList"
        :key="item.label"
      >
        <div class="area-select-province-checkbox">
          <el-checkbox
            v-model="item.checked"
            :indeterminate="item.indeterminate"
            @change="handleCityAllChange(item)"
          />
          <span>{{ item.label }}</span>
        </div>
        <div class="area-select-province-box">
          <div
            class="area-select-province-city"
            :class="{ 'is-active': modelValue.includes(city.code) }"
            v-for="city in item.children"
            :key="city.code"
            @click="handleCityChange(city)"
          >
            {{ city.label }}
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>
<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import { useThrottleFn } from "@vueuse/core";

const props = defineProps({
  modelValue: { type: Array<number>, default: () => [] },
  areaList: { type: Array, default: () => [] },
  labelField: { type: String, default: "label" },
  valueField: { type: String, default: "code" },
});
const emit = defineEmits(["update:modelValue"]);
const { labelField, valueField } = toRefs(props);
const curAreaList = computed(() => {
  return props.areaList.map((it: any) => {
    const checkNum = it.children.filter((city: any) =>
      props.modelValue.includes(city[valueField.value])
    );
    return {
      label: it[labelField.value],
      checked: checkNum.length === it.children.length,
      indeterminate: Boolean(
        checkNum.length && checkNum.length !== it.children.length
      ),
      children: it.children,
    };
  });
});
const handleCityAllChange = (pro: any): void => {
  const cityCodes = pro.children.map((it: any) => it.code);
  let cur: any[] = [];
  if (!pro.checked) {
    cur = deleteCity(props.modelValue, cityCodes);
  } else {
    cur = Array.from(new Set([...props.modelValue, ...cityCodes]));
  }
  emitValue(cur);
};
const handleCityChange = (city: any): void => {
  const _modelValue = [...props.modelValue];
  const rank = _modelValue.findIndex((it) => it === city[valueField.value]);
  if (rank !== -1) {
    _modelValue.splice(rank, 1);
  } else {
    _modelValue.push(city[valueField.value]);
  }
  emitValue(_modelValue);
};
const deleteCity = (cur: number[], del: number[]): [] => {
  return [...cur].filter((it) => !del.includes(it)) as [];
};
const emitValue = (value: any) => {
  emit("update:modelValue", value);
};
const scrollbar = ref(ElScrollbar);
const handleWheel = useThrottleFn((e: MouseEvent) => {
  const { deltaY } = e as any;
  const left = scrollbar.value.wrapRef.scrollLeft;
  scrollbar.value.setScrollLeft(left + deltaY);
}, 100);
</script>
<style lang="scss" scoped>
.area-select {
  display: flex;
  white-space: nowrap;

  &-province {
    padding: 10px;
    margin-right: 16px;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;

    &-checkbox {
      display: flex;
      align-items: center;

      > span {
        margin-left: 10px;
      }
    }

    &-box {
      display: grid;
      grid-template-rows: repeat(1, 36px);
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 10px;
    }

    &-city {
      padding: 0 10px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      cursor: pointer;
      border: 1px solid #e5e5e5;
      border-radius: 4px;

      &:hover,
      &.is-active {
        color: #366ff3;
        border-color: #366ff3;
      }
    }
  }
}
</style>
