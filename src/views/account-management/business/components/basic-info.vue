<template>
  <div class="content">
    <div class="head">
      <div class="line"></div>
      <div class="head-title">企业基本信息</div>
      <div class="tag">{{ businessType[formData.status] }}</div>
    </div>
    <el-form :form="formData" label-width="120px">
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
            <el-form-item label="营业执照有效期">
              <el-date-picker
                v-if="isEdit"
                v-model="date"
                type="daterange"
                unlink-panels
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
              />
              <span v-else>{{
                formData.license_start_date + " - " + formData.license_end_date
              }}</span>
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
            <el-form-item label="开户行" label-width="110px">
              <el-input v-model="formData.bank" v-if="isEdit" />
              <span v-else>{{ formData.bank }}</span>
            </el-form-item>
            <el-form-item label="纳税人类型" label-width="110px">
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
            <el-form-item label="接收人联系方式" label-width="110px">
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
            <el-form-item label="纳税人识别号" label-width="100px">
              <el-input v-model="formData.taxpayer_number" v-if="isEdit" />
              <span v-else> {{ formData.taxpayer_number }}</span>
            </el-form-item>
            <el-form-item label="发票接收人" label-width="100px">
              <el-input v-model="formData.consignee" v-if="isEdit" />
              <span v-else>{{ formData.consignee }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
  <zxn-bottom-btn v-if="isEdit">
    <el-button>取消</el-button>
    <el-button @click="updateBusinessAccount">保存</el-button>
  </zxn-bottom-btn>
</template>

<script lang="ts" setup>
import {
  getBusinessAccountDetail,
  editBusinessAccount,
} from "@/api/account/business";
import { businessType, taxpayerType } from "@/enums/accountEnum";

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

const date = ref([] as any);

async function updateBusinessAccount() {
  // 后台返回的 contacts_mobile 更新修改为 mobile
  let params = {
    ...formData.value,
    mobile: formData.value.contacts_mobile,
    license_start_date: date.value ? date.value[0] : "",
    license_end_date: date.value ? date.value[1] : "",
    contacts_mobile: undefined,
  };
  // console.log(params);
  try {
    await editBusinessAccount(params);
    ElMessage({
      message: "编辑成功",
      type: "success",
    });
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
      date.value = [res.data.license_start_date, res.data.license_end_date];
    } catch (error: any) {
      return new Error("error", error);
    }
  }
}

getAccountDetail();
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
    margin-top: 40px;
    font-weight: 500;
    color: #333;
  }
}
</style>
