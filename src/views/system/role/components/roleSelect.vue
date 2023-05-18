<template>
  <div class="role-select">
    <div
      class="role-select-module"
      v-for="module in roleList"
      :key="module.label"
    >
      <div class="role-select-module-top">
        <el-checkbox
          v-model="module.checked"
          :indeterminate="module.indeterminate"
        />
        <span>{{ module.label }}</span>
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
  width: 100%;

  &-module {
    width: 100%;
    margin-top: 16px;

    &-top {
      display: flex;
      align-items: center;

      > span {
        margin-left: 8px;
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
        width: 25%;
        padding-right: 16px;
        margin-bottom: 16px;
        background: #fff;

        &-checkbox {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 56px;
          padding: 0 20px;
          background-color: #eff4fe;

          > span {
            font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: #333;
          }
        }

        &-box {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e5e5;
          //display: grid;
          //grid-template-rows: repeat(1, 36px);
          //grid-template-columns: 1fr 1fr 1fr;
          //grid-gap: 10px;
        }

        &-operation {
          height: 36px;
          padding: 0 10px;
          margin-top: 16px;
          margin-right: 16px;
          font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 36px;
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
