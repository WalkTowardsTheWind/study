<template>
  <zxn-dialog
    width="55vw"
    :top="15"
    title="在线签署"
    :visible="visible"
    @close-dialog="onlineClose(addFormRef)"
    @confirm-dialog="onlineConfirm(addFormRef)"
  >
    <el-form
      :model="addForm"
      ref="addFormRef"
      :rules="rules"
      label-width="auto"
    >
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
              @change="handleSelectChange"
              value-key="id"
            >
              <el-option
                v-for="item in tempList"
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
      <el-form-item class="m-y-20px" label="签署单位" prop="part_b" required>
        <el-select v-model="addForm.part_b">
          <template v-if="contract_type == 1">
            <el-option
              v-for="item in signByType"
              :key="item.company_id"
              :label="item.company_name"
              :value="item.company_id"
            ></el-option>
          </template>
          <template v-if="contract_type == 2">
            <el-option
              v-for="item in signByType"
              :key="item.id"
              :label="item.channel_name"
              :value="item.id"
            ></el-option>
          </template>
        </el-select>
      </el-form-item>
      <div class="head p-x-20px m-y-20px">
        <div class="">参与方信息</div>
      </div>
      <div class="flex flex-wrap gap-x-40px">
        <el-form-item
          class="w-25%"
          required
          v-for="(item, index) in addForm.fields"
          :key="item.field_name"
          :label="item.label"
          :prop="'fields.' + index + '.field_value'"
          :rules="{
            required: true,
            message: '必填',
            trigger: 'blur',
          }"
        >
          <el-input clearable v-model="item.field_value" placeholder="请输入" />
        </el-form-item>
      </div>
    </el-form>
  </zxn-dialog>
</template>

<script lang="ts" setup>
import { getContractTempList, signContractOnline } from "@/api/contract-m";
import { getBusinessAccountList } from "@/api/account/business";
import { getChannelAccountList } from "@/api/account/channel";
import { contract_types } from "./options";

const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
  contract_type: {
    default: () => "",
  },
});
const emit = defineEmits(["online-close", "online-confirm"]);
const addFormRef = ref();
const addForm = reactive({
  contract_name: "",
  template_id: "",
  type: "",
  date: [],
  part_b: "",
  remark: "",
  fields: [],
});
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
  part_b: [
    {
      required: true,
      message: "必选",
      trigger: "change",
    },
  ],
};

const value1 = ref([]);

const isOnline = ref(false);

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
        part_b: addForm.part_b,
        effective_start_time: addForm.date[0] ?? "",
        effective_end_time: addForm.date[1] ?? "",
        fields: addForm.fields,
        remark: addForm.remark,
      };
      signContractOnline(params).then(() => {
        ElMessage.success("操作成功！");
        emit("online-confirm", false);
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
const tempList = ref([] as any);
const getTempList = () => {
  getContractTempList({ keyword: "", limit: 1000, page: 1 }).then((res) => {
    console.log(res);
    tempList.value = res.data.data;
  });
};
getTempList();

const handleSelectChange = (val) => {
  addForm.type = val.type;
  addForm.fields = val.fields;
};
const signByType = ref([]);

watch(
  () => addForm.type,
  (newVal) => {
    switch (newVal) {
      // 企业
      case 1:
        getBusinessAccountList({ limit: 1000, page: 1 }).then((res) => {
          signByType.value = res.data.data;
        });
        break;
      // 渠道
      case 2:
        getChannelAccountList({ limit: 1000, page: 1 }).then((res) => {
          signByType.value = res.data.data;
        });
        break;
    }
  }
);
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
