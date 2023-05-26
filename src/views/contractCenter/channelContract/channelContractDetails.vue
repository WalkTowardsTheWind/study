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
                  <span class="mx-1">{{ contractName }}</span>
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
                <el-form-item class="mb-[0]" label="合同文件">
                  <PicturePreview
                    :image-list="formItem.file_url"
                  ></PicturePreview>
                </el-form-item>
                <el-form-item class="mt-13px" label="附件">
                  <PicturePreview
                    :image-list="formItem.annex_url"
                  ></PicturePreview>
                </el-form-item>
              </div>
              <!-- 表格 -->
              <div class="w-[33%] box">
                <el-row>
                  <el-col class="top" :span="5">产品列表</el-col>
                  <el-col :span="5"> <div class="bg tac">产品</div></el-col>
                  <el-col class="bg tac" :span="8">票面种类及税点</el-col>
                  <el-col class="bg tac" :span="6">合作价格</el-col>
                </el-row>
                <el-row v-for="(item, index) in formItem.product" :key="index">
                  <el-col class="tac" :offset="5" :span="5">
                    <el-select v-model="item.product_type" placeholder="请输入">
                      <el-option
                        v-for="item in productOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-col>
                  <el-col class="tac" :span="8">
                    <el-select v-model="item.invoice_type" placeholder="请输入">
                      <el-option
                        v-for="item in productOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-col>
                  <el-col class="tac" :span="6">
                    <el-input
                      v-model="item.cooperate_point"
                      placeholder="请输入"
                    ></el-input>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
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
import { channelContractDetailsType } from "@/api/contractCenter/channelContract/types";
import { getContractDetails } from "@/api/contractCenter";
const route = useRoute();
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "线上合同",
  },
  // {
  //   name: "2",
  //   label: "线下合同",
  // },
];
const contract_kindOptions = [
  {
    value: "1",
    label: "业务拓展协议(个人)",
  },
  {
    value: "2",
    label: "业务拓展协议(企业)",
  },
  {
    value: "3",
    label: "共享经济服务协议",
  },
  {
    value: "4",
    label: "自由职业者服务协议",
  },
];
// const contract_termOptions = [
//   {
//     value: "1",
//     label: "一年",
//   },
// ];
const productOptions = [
  {
    value: "1",
    label: "一年",
  },
];

//表单信息
const formItem = ref<channelContractDetailsType>({
  contract_no: "",
  contract_kind: "",
  party_a: "",
  party_b: "",
  tax_location: "",
  contract_term: "",
  sign_time: "",
  end_time: "",

  remarks: "",
  file_url: [],
  annex_url: [],
  product: [{ product_type: null, invoice_type: null, cooperate_point: "" }],
});
// 计算属性
var contractName = computed(() => {
  var contractKind = contract_kindOptions.find((item) => {
    if (item.value == formItem.value.contract_kind) {
      return item;
    }
  });
  return formItem.value.party_a + (contractKind?.label || "");
}) as any;
const handleSubmit = () => {};
const handleClose = () => {};

const getData = () => {
  const ID = Number(route.query.id);
  getContractDetails(ID)
    .then((response) => {
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
        file_url,
        annex_url,
      } = response.data.info;
      const product = response.data.product.map((item) => {
        return {
          product_type: item.product_type,
          invoice_type: item.invoice_type,
          cooperate_point: item.cooperate_point,
        };
      });

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
        file_url,
        annex_url,
        product,
      };
    })
    .catch();
};
getData();
onMounted(() => {});
</script>
<style lang="scss" scoped>
.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}

.box {
  .top {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0 12px 0 0;
    font-size: 14px;
    line-height: 32px;
    color: rgb(96 98 102);
  }

  .bg {
    background-color: #eff4fe;
  }

  .tac {
    display: flex;
    align-items: center;
    height: 50px;
  }
}
</style>
