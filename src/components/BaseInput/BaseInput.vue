<template>
  <div>
    <el-dropdown ref="dropdown" trigger="click" placement="top">
      <div v-if="!activeValue" class="header">
        <div>{{ title }}</div>
        <!-- <img style="width: 20px; height: 20px;" src="../../../assets/avatar.png" /> -->
      </div>
      <div v-else class="selected">
        <div class="lable">
          {{ activeValue }}
          <i-ep-CircleClose
            style="color: #000; margin-left: 10px"
            @click="clearValue"
          />
        </div>
      </div>

      <template #dropdown>
        <!-- @clear="clearValue"  @blur="closeDropdown"-->
        <el-input
          ref="input"
          v-model.trim="activeValue"
          @change="updateActiveValue"
          @blur="closeDropdown"
          style="width: 120px"
          clearable
          placeholder="请输入"
        />
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// 接收父组件传递的 `value` 和 `title`
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
const dropdown = ref(null);
const input = ref(null);
const closeDropdown = () => {
  // 使用 expose 暴露的 handleClose 方法来关闭下拉菜单
  dropdown.value?.handleClose();
};
// 发出 `update:value` 事件，通知父组件更新 `value`
const emit = defineEmits(["update:modelValue", "data-change"]);
// const activeValue = ref(props.value);
const activeValue = useVModel(props, "modelValue", emit);
// 清空值
const clearValue = () => {
  // activeValue.value=''
  input.value?.clear();
};

// 通过 input 事件更新父组件的值
const updateActiveValue = (value) => {
  emit("data-change", 2);
  if (value) {
    input.value?.blur();
  }
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.selected {
  display: flex;
  align-items: center;
  justify-content: center;
  .lable {
    color: red;
    display: flex;
    align-items: center;
  }
}
</style>
