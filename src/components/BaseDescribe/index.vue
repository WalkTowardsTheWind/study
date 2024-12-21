<template>
  <div class="BaseDescribe">
    <el-form
      class="form"
      :model="formData"
      :label-width="labelWidth"
      :label-position="labelPosition"
    >
      <el-row gutter="20">
        <!-- 使用v-for来动态生成每一行的内容 -->
        <template v-for="(item, index) in option" :key="index">
          <el-col v-if="!item.span" :span="8">
            <el-form-item
              class="mt-12px"
              :label="item.label"
              :prop="item?.prop"
            >
              <!-- <el-input
                  v-if="item.type === 'input'"
                  class="w-full"
                  v-model="formData[item?.prop]"
                  :placeholder="item.placeholder || ''"
                /> -->
              <BaseText v-if="item.type === 'text'" :content="s"></BaseText>
              <!-- <el-select
                  v-if="item.type === 'select'"
                  class="w-full"
                  filterable
                  clearable
                  v-model="formData[item?.prop]"
                  :placeholder="item.placeholder || ''"
                >
                  <el-option
                    v-for="selectItem in item.options"
                    :key="selectItem.value"
                    :label="selectItem.label"
                    :value="selectItem.value"
                  />
                </el-select> -->
            </el-form-item>
          </el-col>
          <el-col v-else-if="item.span" :span="item.span">
            <el-form-item
              class="mt-12px"
              :label="item.label"
              :prop="item?.prop"
            >
              <!-- <el-input
                  v-if="item.type === 'input'"
                  class="w-full"
                  v-model="formData[item?.prop]"
                  :placeholder="item.placeholder || ''"
                /> -->
              <BaseText v-if="item.type === 'text'" :content="s"></BaseText>
              <!-- <el-select
                  v-if="item.type === 'select'"
                  class="w-full"
                  filterable
                  clearable
                  v-model="formData[item?.prop]"
                  :placeholder="item.placeholder || ''"
                >
                  <el-option
                    v-for="selectItem in item.options"
                    :key="selectItem.value"
                    :label="selectItem.label"
                    :value="selectItem.value"
                  />
                </el-select> -->
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
const { proxy } = getCurrentInstance();

// label prop(字段名)
// select：type: "select",options:[],
// input: "input",placeholder:"请输入",
// text: "text",
const props = defineProps({
  labelWidth: {
    type: String,
    required: false,
    default: () => "120px",
  },
  labelPosition: {
    type: String,
    required: false,
    default: () => "right",
  },
  formData: {
    type: Array,
    required: true,
    default: () => {},
  },
  option: {
    type: Array,
    required: true,
    default: () => [],
  },
});
// const option = [
//   {
//     label: "选择框",
//     prop: "tax_land_type",
//     type: "select",
//     options: proxy.$const["taxLandManagementEnum.tax_land_type"],
//   },
//   {
//     label: "输入框",
//     prop: "tax_land_head",
//     type: "input",
//     placeholder: "请输入",
//     span: 16,
//   },
//   { label: "文本框", prop: "head_mobile", type: "text", span: 24 },
//   // 更多对象...
// ];
</script>
