<template>
  <div class="BaseDescribe">
    <el-form
      class="form"
      :model="formData"
      :label-width="labelWidth"
      :label-position="labelPosition"
    >
      <el-row gutter="20">
        <!-- 动态渲染表单项 -->
        <template v-for="(item, index) in option" :key="index">
          <template v-if="!Array.isArray(formData[item?.prop])">
            <el-col :span="item.span || 8">
              <el-form-item
                class="mt-12px"
                :label="item.label"
                :prop="item?.prop"
              >
                <!-- 动态渲染控件 -->
                <BaseText
                  v-if="item.type === 'text'"
                  :content="formData[item?.prop]"
                />
                <!-- 你可以在这里加其他控件，比如 select 或 input -->
              </el-form-item>
            </el-col>
          </template>

          <!-- 处理 Array 类型的数据 -->
          <template v-if="Array.isArray(formData[item?.prop])">
            <template
              v-for="(arrayItem, arrayIndex) in formData[item?.prop]"
              :key="arrayIndex"
            >
              <el-col :span="item.span || 8">
                <el-form-item
                  class="mt-12px"
                  :label="item.label"
                  :prop="item?.prop"
                >
                  <BaseText v-if="item.type === 'text'" :content="arrayItem" />
                  <!-- 你可以在这里加其他控件，比如 select 或 input -->
                </el-form-item>
              </el-col>
            </template>
          </template>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  labelWidth: {
    type: String,
    default: "120px",
  },
  labelPosition: {
    type: String,
    default: "right",
  },
  formData: {
    type: Object,
    required: true,
  },
  option: {
    type: Array,
    required: true,
  },
});

// 以下是给表单项提供的示例数据
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

<style scoped>
/* 你可以根据需要调整样式 */
.mt-12px {
  margin-top: 12px;
}
</style>
