<template>
  <div class="role-select">
    <div
      class="role-select-module"
      v-for="module in roleList"
      :key="module.label"
    >
      <div class="role-select-module-top">
        <span>{{ module.label }}</span>
        <el-checkbox
          v-model="module.checked"
          :indeterminate="module.indeterminate"
        />
      </div>
      <div class="role-select-module-content">
        <div
          class="page-select"
          v-for="item in module.children"
          :key="item.label"
        >
          <div class="page-select-checkbox">
            <span>{{ item.label }}</span>
            <el-checkbox v-model="item.checked" />
          </div>
          <div class="page-select-box">
            <div
              class="page-select-operation"
              :class="{ 'is-active': modelValue.includes(operation.code) }"
              v-for="operation in item.children"
              :key="operation.code"
            >
              {{ operation.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  modelValue: { type: Array<number>, default: () => [] },
  roleList: { type: Array, default: () => [] },
  labelField: { type: String, default: "label" },
  valueField: { type: String, default: "code" },
});
</script>
<style lang="scss" scoped>
.role-select {
  &-module {
    &-top {
      display: flex;
      align-items: center;

      > span {
        margin-right: 8px;
        font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: #333;
      }
    }

    &-content {
      display: flex;
      flex-wrap: wrap;

      .page-select {
        padding: 10px;
        margin-right: 16px;
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 4px;

        &-checkbox {
          display: flex;
          align-items: center;
          justify-content: space-between;

          > span {
            //margin-left: 10px;
          }
        }

        &-box {
          display: grid;
          grid-template-rows: repeat(1, 36px);
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 10px;
        }

        &-operation {
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
  }
}
</style>
