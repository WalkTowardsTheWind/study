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
                  <span class="mx-1">{{ formItem.contract_name }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="编号">
                  <span class="mx-1">{{ formItem.contract_no }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="合同类型">
                  <span class="mx-1">{{ formItem.contract_kind }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="甲方">
                  <span class="mx-1">{{ formItem.party_a }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="乙方">
                  <span class="mx-1">{{ formItem.party_b }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="签约点位">
                  <span class="mx-1">{{ formItem.tax_location }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="合同期限">
                  <span class="mx-1">{{ formItem.contract_term }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="签约时间">
                  <span class="mx-1">{{ formItem.sign_time }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="到期时间">
                  <span class="mx-1">{{ formItem.end_time }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="备注要求">
                  <span class="mx-1">{{ formItem.remarks }}</span>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <!-- <el-form-item class="mb-[0]" label="合同文件">
                  <PicturePreview v-model="formItem.file_url"></PicturePreview>
                </el-form-item>
                <el-form-item class="mt-13px" label="附件">
                  <PicturePreview v-model="formItem.annex_url"></PicturePreview>
                </el-form-item> -->
              </div>
            </div>
          </el-form>
        </div>
        <zxn-bottom-btn>
          <div class="but">
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </div>
        </zxn-bottom-btn>
      </template>
      <template #2>
        <div class="p-[24px] p-b-[0]">无内容</div>
        <zxn-bottom-btn>
          <div class="but">
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </div>
        </zxn-bottom-btn>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { getContractDetails } from "@/api/contractCenter";
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

//表单信息
const formItem = ref({
  contract_name: "",
  contract_no: "",
  contract_kind: "",
  party_a: "",
  party_b: "",
  tax_location: "",
  contract_term: "",
  sign_time: "",
  end_time: "",

  remarks: "",
  // file_url: [
  //   "https://oss.youlai.tech/default/2022/11/20/8af5567816094545b53e76b38ae9c974.webp",
  // ],
  // annex_url: [
  //   "https://oss.youlai.tech/default/2022/11/20/8af5567816094545b53e76b38ae9c974.webp",
  // ],
});
const handleSubmit = () => {};
const handleClose = () => {};

const route = useRoute();
console.log(route.query.activeName);
//路由跳转
// const rou=()=>{
//   const uid = router.currentRoute.value.meta.title;
//   if(uid=="企业合同"){
//     activeName.value="1"
//    console.log(uid)
//   }
// }

const getData = () => {
  const ID = Number(route.query.id);
  getContractDetails(ID)
    .then((response) => {
      console.log(response.data.info.online_type);
      activeName.value = response.data.info.online_type + "";
      var {
        contract_name,
        contract_no,
        contract_kind,
        party_a,
        party_b,
        tax_location,
        contract_term,
        sign_time,
        end_time,
        remarks,
        // file_url,
        // annex_url,
      } = response.data.info;
      console.log(contract_name);
      formItem.value = {
        contract_name,
        contract_no,
        contract_kind: contract_kind + "",
        party_a,
        party_b,
        tax_location,
        contract_term,
        sign_time,
        end_time,
        remarks,
        // file_url,
        // annex_url,
      };
    })
    .catch();
};
getData();
onMounted(() => {
  activeName.value = route.query.activeName + "";
  // rou()
});
</script>
<style lang="scss" scoped>
.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}
</style>
