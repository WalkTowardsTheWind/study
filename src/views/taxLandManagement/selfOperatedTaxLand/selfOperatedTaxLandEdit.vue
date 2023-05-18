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
          <el-form class="zxn-box" :model="formItem" label-width="120px">
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item label="税地负责人">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item class="mt-25px" label="税地来源">
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
                <el-form-item class="mt-25px" label="厂商">
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
                <el-form-item class="mt-25px" label="成本点位">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item class="mt-25px" label="计算方式">
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
                <el-form-item class="mt-25px" label="用工年限">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item class="mt-25px" label="税地地区">
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
                <el-form-item class="mt-25px" label="网址">
                  <el-input v-model="formItem.name" />
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="营业执照">
                  <multi-upload v-model="formItem.multiPicUrls"></multi-upload>
                </el-form-item>
                <el-form-item class="mt-13px" label="公司资质">
                  <multi-upload v-model="formItem.multiPicUrls"></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <zxn-bottom-btn
          ><div class="but">
            <el-button type="primary" @click="handleSubmit">保存</el-button>
            <el-button @click="handleClose">取消</el-button>
          </div></zxn-bottom-btn
        >
      </template>
      <template #2>
        <div class="p-[24px] p-b-[0]">
          <el-form class="zxn-box" :model="formItem" label-width="120px">
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item label="核账网址">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item label="核账网址账号">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item label="核账网址密码">
                  <el-input v-model="formItem.name" />
                </el-form-item>
                <el-form-item class="mt-25px" label="行业类型">
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
                <el-form-item class="mt-25px" label="发票面额">
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
                <el-form-item class="mt-25px" label="发票金额上限">
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
                <el-form-item class="mt-25px" label="税点">
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
                <el-form-item class="mt-25px" label="是否有支付接口">
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
                <el-form-item class="mt-25px" label="支付供应商">
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
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="发票票样">
                  <multi-upload v-model="formItem.multiPicUrls"></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <zxn-bottom-btn
          ><div class="but">
            <el-button type="primary" @click="handleSubmit">保存</el-button>
            <el-button @click="handleClose">取消</el-button>
          </div></zxn-bottom-btn
        >
      </template>
      <template #3>
        <div class="p-[24px] p-b-[0]">
          <el-form class="zxn-box" :model="formItem" label-width="120px">
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item class="mt-25px" label="认证形态">
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
                <el-form-item class="mt-25px" label="签约形态">
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
                <el-form-item class="mt-25px" label="行业限制">
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
                <el-form-item class="mt-25px" label="合同年限">
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
                <el-form-item class="mt-25px" label="进件资料">
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
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="协议">
                  <multi-upload v-model="formItem.multiPicUrls"></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <zxn-bottom-btn
          ><div class="but">
            <el-button type="primary" @click="handleSubmit">保存</el-button>
            <el-button @click="handleClose">取消</el-button>
          </div></zxn-bottom-btn
        >
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "基本信息",
  },
  {
    name: "2",
    label: "发票厂家信息",
  },
  {
    name: "3",
    label: "行业与合同信息",
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
  // activeName.value=route.query.activeName+''
  // rou()
});
</script>
<style lang="scss" scoped>
.steps {
  margin-top: 25px;
  margin-bottom: 50px;
  margin-left: 43px;
}

.zxn-box {
  :deep(.el-input) {
    width: 100%;

    .el-input__wrapper {
      width: 100%;
    }
  }
}

.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}
</style>
