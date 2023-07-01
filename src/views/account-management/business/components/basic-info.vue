<template>
  <div class="content">
    <div class="head">
      <div class="line"></div>
      <div class="head-title">企业基本信息</div>
      <div class="tag">{{ businessType[formData.status] }}</div>
    </div>
    <el-form :form="formData" label-width="150px">
      <div class="main">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="企业名称" align="right" label-width="130px">
              <el-input v-model="formData.company_name" v-if="isEdit" />
              <span v-else>{{ formData.company_name }}</span>
            </el-form-item>
            <el-form-item label="统一社会信用代码" label-width="130px">
              <el-input v-model="formData.credit_code" v-if="isEdit" />
              <span v-else>{{ formData.credit_code }}</span>
            </el-form-item>
            <el-form-item label="联系方式" label-width="130px">
              <el-input v-model="formData.contacts_mobile" v-if="isEdit" />
              <span v-else>{{ formData.contacts_mobile }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账户名称">
              <el-input v-model="formData.account" v-if="isEdit" />
              <span v-else>{{ formData.admin_id }}</span>
            </el-form-item>
            <el-form-item label="法人姓名">
              <el-input v-model="formData.legal_person" v-if="isEdit" />
              <span v-else>{{ formData.legal_person }}</span>
            </el-form-item>
            <el-form-item label="营业地址">
              <el-input v-model="formData.company_address" v-if="isEdit" />
              <span v-else>{{ formData.company_address }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人">
              <el-input v-model="formData.contacts" v-if="isEdit" />
              <span v-else>{{ formData.contacts }}</span>
            </el-form-item>
            <el-form-item label="营业执照到期时间" class="w-full">
              <el-date-picker
                class="w-full"
                v-if="isEdit"
                v-model="formData.license_end_date"
                unlink-panels
                value-format="YYYY-MM-DD"
              />
              <span v-else>{{ formData.license_end_date }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="head">
        <div class="line"></div>
        <div class="head-title">纳税&开票信息</div>
      </div>
      <div class="main">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="开户行" label-width="130px">
              <el-input v-model="formData.bank" v-if="isEdit" />
              <span v-else>{{ formData.bank }}</span>
            </el-form-item>
            <el-form-item label="纳税人类型" label-width="130px">
              <el-select
                class="w-full"
                v-model="formData.taxpayer_type"
                v-if="isEdit"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <span v-else>{{ taxpayerType[formData.taxpayer_type] }}</span>
            </el-form-item>
            <el-form-item label="接收人联系方式" label-width="130px">
              <el-input v-model="formData.consignee_mobile" v-if="isEdit" />
              <span v-else>{{ formData.consignee_mobile }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账号">
              <el-input v-model="formData.bank_account" v-if="isEdit" />
              <span v-else>{{ formData.bank_account }}</span>
            </el-form-item>
            <!-- <el-form-item label="渠道来源">
							<el-input v-if="isEdit" />
							<span v-else>江西某某某公司</span>
						</el-form-item> -->
            <el-form-item label="邮寄地址">
              <el-input v-model="formData.address" v-if="isEdit" />
              <span v-else>{{ formData.address }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识别号">
              <el-input v-model="formData.taxpayer_number" v-if="isEdit" />
              <span v-else> {{ formData.taxpayer_number }}</span>
            </el-form-item>
            <el-form-item label="发票接收人">
              <el-input v-model="formData.consignee" v-if="isEdit" />
              <span v-else>{{ formData.consignee }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="head">
        <div class="line"></div>
        <div class="head-title">税地信息</div>
      </div>
      <el-button
        v-if="isEdit"
        type="primary"
        class="my-[20px]"
        @click="addTaxLand"
        >+ 新增税地</el-button
      >
      <div class="" v-for="(item, index) in taxlandList" :key="index">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="税地名称" label-width="130px">
              <el-select
                class="w-full"
                v-model="item.tax_land_id"
                v-if="isEdit"
              >
                <el-option
                  v-for="(item, index) in taxLandOption"
                  :key="index"
                  :value="item.id"
                  :label="item.tax_land_name"
                ></el-option>
              </el-select>
              <span v-else> {{ item.taxpayer_number }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户点位">
              <el-input v-model="item.tax_point" v-if="isEdit" />
              <span v-else> {{ item.tax_point }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="del" @click="del(index)">删除</span>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
  <zxn-bottom-btn v-if="isEdit">
    <el-button @click="$router.go(-1)">取消</el-button>
    <el-button type="primary" @click="updateBusinessAccount">保存</el-button>
  </zxn-bottom-btn>
</template>

<script lang="ts" setup>
import {
  getBusinessAccountDetail,
  editBusinessAccount,
} from "@/api/account/business";
import { getLandList } from "@/api/common";

import { businessType, taxpayerType } from "@/enums/accountEnum";
import router from "@/router";

const options = Object.entries(taxpayerType)
  .map(([label, value]) => ({ label, value }))
  .filter((i) => typeof i.value !== "string");

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => 0,
  },
});

const formData = ref({} as any);
const taxLandOption = ref([] as any);

const taxlandList = ref([] as any);

async function updateBusinessAccount() {
  // 后台返回的 contacts_mobile 更新修改为 mobile
  let params = {
    ...formData.value,
    mobile: formData.value.contacts_mobile,
    contacts_mobile: undefined,
  };
  // console.log(params);
  try {
    await editBusinessAccount(params);
    ElMessage({
      message: "编辑成功",
      type: "success",
    });
    router.go(-1);
  } catch (error: any) {
    return new Error(error);
  }
}

async function getAccountDetail() {
  if (props.id) {
    const res = await getBusinessAccountDetail(props.id);
    console.log(res);

    try {
      formData.value = res.data;
    } catch (error: any) {
      return new Error("error", error);
    }
  }
}

function addTaxLand() {
  taxlandList.value.push({
    tax_land_id: "",
    tax_point: "",
  });
}

function getTaxLandOption() {
  taxLandOption.value.length = 0;
  getLandList().then((res) => {
    taxLandOption.value.push(...res.data);
  });
}

function del(index) {
  taxlandList.value.splice(index, 1);
}

getAccountDetail();
getTaxLandOption();
</script>

<style scoped lang="scss">
.content {
  padding: 30px;

  .head {
    display: flex;
    align-items: center;
    font-size: 14px;

    .line {
      width: 4px;
      height: 16px;
      background: #366ff3;
      border-radius: 2px;
    }

    &-title {
      margin: 0 16px 0 8px;
      font-weight: 500;
      color: #356ff3;
    }

    .tag {
      width: 56px;
      height: 24px;
      font-weight: 500;
      line-height: 25px;
      color: #356ff3;
      text-align: center;
      background: #dfe8fd;
      border-radius: 12px;
    }
  }

  .main {
    margin-top: 20px;
    font-weight: 500;
    color: #333;
  }
}

.del {
  color: #356ff3;
  cursor: pointer;
}
</style>
