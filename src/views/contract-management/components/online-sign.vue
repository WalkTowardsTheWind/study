<template>
  <zxn-dialog
    width="55vw"
    :top="15"
    title="在线签署"
    :visible="visible"
    @close-dialog="onlineClose(addFormRef)"
    @confirm-dialog="onlineConfirm(addFormRef)"
  >
    <el-form :model="addForm" ref="addFormRef" :rules="rules" label-width="100">
      <el-row :gutter="50">
        <el-col :span="8">
          <el-form-item label="合同名称" prop="contract_name" required>
            <el-input placeholder="请输入" v-model="addForm.contract_name" />
          </el-form-item>
          <el-form-item label="合同期限" prop="date" required>
            <zxn-date-range class="w-full" v-model="addForm.date" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择模板" prop="template_id" required>
            <el-select
              v-model="addForm.template_id"
              filterable
              clearable
              class="w-full"
              placeholder="请选择"
              value-key="id"
              @change="handleSelectChange"
            >
              <el-option
                v-for="item of tempList"
                :key="item.id"
                :value="item"
                :label="item.template_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注要求" prop="remark">
            <el-input
              placeholder="请输入"
              type="textarea"
              v-model="addForm.remark"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同类型" prop="type">
            <el-select disabled class="w-100" v-model="addForm.type">
              <el-option
                v-for="item of contract_types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 设置签署方 -->
      <div class="sign">
        <div class="title">设置签署方</div>
      </div>

      <div class="flex m-t-20px">
        <template v-if="contract_type == 1">
          <el-form-item label="甲方" prop="part_a">
            <el-select v-model="addForm.part_a" filterable clearable>
              <el-option
                v-for="item of optionsListA"
                :key="item.company_id"
                :label="item.company_name"
                :value="item.company_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="乙方" prop="part_b">
            <el-select v-model="addForm.part_b" filterable clearable>
              <el-option
                v-for="item of optionsListB"
                :key="item.id"
                :label="item.tax_land_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
        <template v-if="contract_type == 2">
          <el-form-item label="甲方" prop="part_a">
            <el-select v-model="addForm.part_a" filterable clearable>
              <el-option label="武汉中新能科技有限公司" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="乙方" prop="part_b">
            <el-select v-model="addForm.part_b" filterable clearable>
              <el-option
                v-for="item of optionsListB"
                :key="item.id"
                :label="item.channel_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
      </div>
      <div class="head p-x-20px m-y-20px">
        <div class="">参与方信息</div>
      </div>
      <div class="flex flex-wrap gap-x-40px">
        <div
          class="w-400px"
          v-for="(item, index) in addForm.fields"
          :key="index"
        >
          <el-form-item
            label-width="200px"
            :key="item.field_name"
            :label="item.label"
          >
            <el-input
              clearable
              v-model="item.field_value"
              placeholder="请输入"
              class="w-full"
            />
          </el-form-item>
        </div>
      </div>
    </el-form>
  </zxn-dialog>
</template>

<script lang="ts" setup>
import { getContractTempList, signContractOnline } from "@/api/contract-m";
import { getBusinessAccountList } from "@/api/account/business";
import { getChannelAccountList } from "@/api/account/channel";
import { contract_types } from "./options";
import { getSelfOperatedTaxLandList } from "@/api/taxLandManagement/selfOperatedTaxLand";

const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
  contract_type: {
    default: () => 1,
  },
});
const emit = defineEmits(["online-close", "online-confirm"]);
const addFormRef = ref();
const addForm = reactive({
  contract_name: "",
  template_id: "",
  type: "",
  date: [],
  part_a: "",
  part_b: "",
  remark: "",
  fields: [],
} as any);
const rules = {
  contract_name: [
    {
      required: true,
      message: "必填",
      trigger: "blur",
    },
  ],
  template_id: [
    {
      required: true,
      message: "必选",
      trigger: "change",
    },
  ],
  date: [
    {
      required: true,
      message: "必选",
      trigger: "change",
    },
  ],
  part_a: [
    {
      required: true,
      message: "必选",
      trigger: "change",
    },
  ],
  part_b: [
    {
      required: true,
      message: "必选",
      trigger: "change",
    },
  ],
};

const onlineClose = (formI) => {
  if (formI) {
    formI.resetFields();
  }
  addForm.fields = [];
  emit("online-close", false);
};
const onlineConfirm = async (formI) => {
  if (!formI) return;
  await formI.validate((valid, fields) => {
    if (valid) {
      let params = {
        contract_name: addForm.contract_name,
        template_id: addForm.template_id.id,
        part_a: addForm.part_a,
        part_b: addForm.part_b,
        effective_start_time: addForm.date[0] ?? "",
        effective_end_time: addForm.date[1] ?? "",
        fields: addForm.fields,
        remark: addForm.remark,
      };
      if (!params.fields.every((item) => item.field_value !== "")) {
        ElMessageBox.confirm("注意：参与方信息选项未填写完整，是否继续？", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          center: true,
        }).then(() => {
          signContractOnline(params).then(() => {
            ElMessage.success("操作成功！");
            emit("online-confirm", false);
          });
        });
      } else {
        signContractOnline(params).then(() => {
          ElMessage.success("操作成功！");
          emit("online-confirm", false);
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
const tempList = ref([] as any);
const getTempList = () => {
  getContractTempList({
    keyword: "",
    limit: 1000,
    page: 1,
    type: props.contract_type,
  }).then((res) => {
    tempList.value = res.data.data;
  });
};
getTempList();

const handleSelectChange = (val: any) => {
  addForm.type = val.type;
  addForm.fields = val.fields;
  addForm.part_b = "";
};

const optionsListA = ref([] as any);
const optionsListB = ref([] as any);
const getOptionsList = () => {
  switch (props.contract_type) {
    case 1:
      getBusinessAccountList({ limit: 1000, page: 1, is_all: 1 }).then(
        (res) => {
          optionsListA.value.push(...res.data.data);
          for (const item of optionsListA.value) {
            item["label"] = item["company_name"];
            item["value"] = item["company_id"];
          }
        }
      );
      getSelfOperatedTaxLandList({ status: 1, tax_land_type: "" }).then(
        (res) => {
          optionsListB.value = res.data.data;
          for (const item of optionsListB.value) {
            item["label"] = item["tax_land_name"];
            item["value"] = item["id"];
          }
        }
      );
      break;
    case 2:
      getChannelAccountList({ limit: 1000, page: 1, is_all: 1 }).then((res) => {
        optionsListB.value = res.data.data;
        for (const item of optionsListB.value) {
          item["label"] = item["channel_name"];
          item["value"] = item["id"];
        }
      });
      break;
  }
};
getOptionsList();
</script>
<style scoped lang="scss">
.sign {
  margin-top: 20px;
  .title {
    font-size: 14px;
    font-family: SourceHanSansSC-Bold, SourceHanSansSC;
    font-weight: bold;
    color: #333333;
  }
}
.head {
  height: 56px;
  background: #eff4fe;
  display: flex;
  align-items: center;
}
.content {
  background: #eee;
  height: 30px;
}
.form {
  display: flex;
  align-items: center;
}
</style>
