<template>
  <zxn-plan>
    <zxn-tabs
      :activeName="activeName"
      :tabsList="tabsList"
      :hasBack="true"
      :hasUpdate="false"
    >
      <template #1>
        <div class="p-[24px] p-b-[0]">
          <el-form class="zxn-box" :model="formItem" label-width="100px">
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item label="合同名称">
                  <el-text class="mx-1">{{ formItem.name }}</el-text>
                </el-form-item>
                <el-form-item class="mt-25px" label="编号">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.name"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in stateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="合同类型">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.name"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in stateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="甲方">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item class="mt-25px" label="乙方">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item class="mt-25px" label="签约点位">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item class="mt-25px" label="合同期限">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.name"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in stateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="签约时间">
                  <el-date-picker
                    v-model="formItem.date"
                    type="date"
                    unlink-panels
                    placeholder="请选择"
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="时间">
                  <el-date-picker
                    v-model="formItem.date"
                    type="date"
                    unlink-panels
                    placeholder="请选择"
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="备注要求">
                  <el-input v-model="formItem.name" type="textarea" />
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="合同文件">
                  <multi-upload v-model="formItem.multiPicUrls"></multi-upload>
                </el-form-item>
                <el-form-item class="mt-13px" label="附件">
                  <multi-upload v-model="formItem.multiPicUrls"></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <div class="but">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </div>
      </template>
      <template #2>
        <div class="p-[24px] p-b-[0]">
          <el-form class="zxn-box" :model="formItem" label-width="100px">
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item label="合同名称">
                  <el-text class="mx-1">{{ formItem.name }}</el-text>
                </el-form-item>
                <el-form-item class="mt-25px" label="编号">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.name"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in stateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="合同类型">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.name"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in stateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="甲方">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item class="mt-25px" label="乙方">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item class="mt-25px" label="签约点位">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item class="mt-25px" label="合同期限">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.name"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in stateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="签约时间">
                  <el-date-picker
                    v-model="formItem.date"
                    type="date"
                    unlink-panels
                    placeholder="请选择"
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="时间">
                  <el-date-picker
                    v-model="formItem.date"
                    type="date"
                    unlink-panels
                    placeholder="请选择"
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="备注要求">
                  <el-input v-model="formItem.name" type="textarea" />
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="合同文件">
                  <multi-upload v-model="formItem.multiPicUrls"></multi-upload>
                </el-form-item>
                <el-form-item class="mt-13px" label="附件">
                  <multi-upload v-model="formItem.multiPicUrls"></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <div class="but">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </div>
      </template>
      >
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "线上合同",
  },
  {
    name: "2",
    label: "线下合同",
  },
];
//
const stateOptions = ref([] as any);

//表单信息
const formItem = reactive({
  name: "",
  date: "",
  tags: [{ id: 2, label: "不限学历" }],
  multiPicUrls: [
    "https://oss.youlai.tech/default/2022/11/20/8af5567816094545b53e76b38ae9c974.webp",
  ],
});
const handleSubmit = () => {};
const handleClose = () => {};
/**
 * 下拉选择外部导入
 */
const getData = () => {
  let a = 8;
  stateOptions.value = [
    { label: `全部 (${a})`, value: 1 },
    { label: `启用中 (${a})`, value: 2 },
    { label: `待启用 (${a})`, value: 3 },
    { label: `预警 (${a})`, value: 4 },
    { label: `下架 (${a})`, value: 5 },
  ];
};
const route = useRoute();
console.log(route.query.activeName);
getData();
//路由跳转
// const rou=()=>{
//   const uid = router.currentRoute.value.meta.title;
//   if(uid=="企业合同"){
//     activeName.value="1"
//    console.log(uid)
//   }
// }

onMounted(() => {
  activeName.value = route.query.activeName + "";
  // rou()
});
</script>
<style lang="scss" scoped>
.zxn-box {
  :deep(.el-input) {
    width: 100%;

    .el-input__wrapper {
      width: 100%;
    }
    //  flex-grow: 1
  }
}

.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}
</style>
