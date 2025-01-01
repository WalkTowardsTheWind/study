<template>
  <div ref="buttonRef" v-click-outside="onClickOutside">
    <slot name="reference">
      <div v-if="type === 'input'">
        {{ activeValue == null || activeValue === "" ? lable : activeValue }}
      </div>
      <div v-else>
        {{ lable }}
      </div>
    </slot>
  </div>

  <el-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    :trigger="trigger"
    :title="title"
    :effect="effect"
    :placement="placement"
    virtual-triggering
  >
    <slot name="main">
      <el-input
        v-if="type === 'input'"
        ref="input"
        v-model.trim="activeValue"
        @change="updateActiveValue"
        style="width: 120px"
        clearable
        placeholder="请输入"
        v-bind="Attributes"
      />
      <el-checkbox-group
        v-else-if="type === 'checkbox'"
        v-model="activeValue"
        @change="updateActiveValue"
        v-bind="Attributes"
      >
        <el-checkbox
          v-for="item in checkboxList"
          :key="item"
          :label="item"
          :value="item"
        >
          {{ item }}
        </el-checkbox>
      </el-checkbox-group>
    </slot>
  </el-popover>
</template>

<script setup lang="js">
import { ref, unref, defineProps, defineEmits } from "vue";
import { ClickOutside as vClickOutside } from "element-plus";
// 接收父组件传递的 `value` 和 `title`
const props = defineProps({
modelValue: {
    type: [String, Array],
    required: true,
  },
  lable: {
    type: String,
    required: true,
  },
  Attributes: {
    type: Object,
    default: ()=>({}),
  },
  checkboxList: {
    type: Array,
    default: ()=>['A','B','C'],
  },
  type: {
    type: String,
    default: "input",
  },
  title: {
    type: String,
    default: "标题",
  },
  placement: {
    type: String,
    default: "bottom"
  },
  trigger: { type: String, default: "click" },
  effect: { type: String, default: "light" },
});
const emit = defineEmits(["update:modelValue", "data-change"]);
//
const input = ref(null);
const activeValue = useVModel(props, "modelValue", emit);
// 通过 input 事件更新父组件的值
const updateActiveValue = (value) => {
    if(props.type==='input'){
        hide()
    }
  emit("data-change", 2);
};

const hide=()=>{
    popoverRef.value.hide()
}

const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
defineExpose({
    hide
})
</script>
