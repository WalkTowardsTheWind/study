<template>
  <zxn-dialog
    title="合同归档"
    top="15"
    :visible="visible"
    @close-dialog="addDialogClose(addFormRef)"
    @confirm-dialog="addDialogConfirm(addFormRef)"
  >
    <el-form
      ref="addFormRef"
      :rules="rules"
      :model="addForm"
      label-width="auto"
    >
      <el-row>
        <el-col>
          <el-form-item label="合同类型" required prop="type">
            <el-select disabled class="w-full" v-model="addForm.type">
              <el-option
                v-for="item of contract_types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同名称" required prop="contract_name">
            <el-input placeholder="请输入" v-model="addForm.contract_name" />
          </el-form-item>
          <el-form-item label="合同期限" required prop="date">
            <zxn-date-range class="w-full" v-model="addForm.date" />
          </el-form-item>
          <!-- 企业合同 -->
          <template v-if="addForm.type == 1">
            <el-form-item label="甲方" required prop="part_a.name">
              <el-select
                class="w-full"
                v-model="addForm.part_a.name"
                value-key="id"
                @change="handleSelectChange1A"
                placeholder="请选择签署的企业"
              >
                <el-option
                  v-for="item of busOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="乙方" required prop="part_b.name">
              <el-select
                class="w-full"
                value-key="id"
                v-model="addForm.part_b.name"
                @change="handleSelectChange1B"
                placeholder="请选择签署的税地"
              >
                <el-option
                  v-for="item of taxlandOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
          <!-- 渠道合同 -->
          <template v-if="addForm.type == 2">
            <el-form-item label="甲方" required prop="part_a.name">
              <el-select
                class="w-full"
                value-key="value"
                v-model="addForm.part_a.name"
                @change="handleSelectChange2A"
              >
                <el-option
                  label="武汉中新能科技有限公司"
                  :value="{ label: '武汉中新能科技有限公司', value: 0 }"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="乙方" required prop="part_b.name">
              <el-select
                class="w-full"
                value-key="id"
                v-model="addForm.part_b.name"
                @change="handleSelectChange2B"
                placeholder="请选择签署的渠道"
              >
                <el-option
                  v-for="item of channelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
          <!-- 第三方税地 -->
          <template v-if="addForm.type == 3">
            <el-form-item label="甲方" required prop="part_a.name">
              <el-select
                class="w-full"
                value-key="id"
                v-model="addForm.part_a.name"
                @change="handleSelectChange3A"
                placeholder="请选择签署的税地"
              >
                <el-option
                  v-for="item of taxlandOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="乙方" required prop="part_b.name">
              <el-select
                class="w-full"
                value-key="value"
                v-model="addForm.part_b.name"
                @change="handleSelectChange3B"
              >
                <el-option
                  label="武汉中新能科技有限公司"
                  :value="{ label: '武汉中新能科技有限公司', value: 0 }"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
          <!-- 委托代征协议 -->
          <template v-if="addForm.type == 4">
            <el-form-item label="甲方" required prop="part_a.name">
              <el-input
                placeholder="请输入委托单位"
                v-model="addForm.part_a.name"
              />
            </el-form-item>
            <el-form-item label="乙方" required prop="part_b.name">
              <el-select
                class="w-full"
                value-key="id"
                v-model="addForm.part_b.name"
                @change="handleSelectChange4B"
                placeholder="请选择签署的税地"
              >
                <el-option
                  v-for="item of taxlandOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
          <el-form-item label="备注要求" prop="remark">
            <el-input
              placeholder="请输入"
              type="textarea"
              v-model="addForm.remark"
            />
          </el-form-item>
          <el-form-item label="合同文件" required prop="contract_url">
            <MultiUpload :limit="1" v-model="addForm.contract_url" />
            <span class="ml-20px">请上传pdf文件</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </zxn-dialog>
</template>

<script lang="ts" setup>
import { getBusinessAccountList } from "@/api/account/business";
import { contract_types } from "./options";

import { archiveContract } from "@/api/contract-m";
import { getSelfOperatedTaxLandList } from "@/api/taxLandManagement/selfOperatedTaxLand";
import { getChannelAccountList } from "@/api/account/channel";

const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
  contract_type: {
    type: Number,
    default: () => 1,
  },
});

const addFormRef = ref();
const addForm = reactive({
  type: props.contract_type,
  contract_name: "",
  date: [],
  part_a: {
    name: "",
    id: "",
  },
  part_b: {
    name: "",
    id: "",
  },
  remark: "",
  contract_url: [],
}) as any;

const busOptions = ref([] as any);
const taxlandOptions = ref([] as any);
const channelOptions = ref([] as any);

const rules = {
  type: [
    {
      required: true,
      message: "必填",
      trigger: "change",
    },
  ],
  contract_name: [
    {
      required: true,
      message: "必填",
      trigger: "blur",
    },
  ],
  date: [
    {
      required: true,
      message: "必填",
      trigger: "blur",
    },
  ],
  "part_a.name": [
    {
      required: true,
      message: "必填",
      trigger: "change",
    },
  ],
  "part_b.name": [
    {
      required: true,
      message: "必填",
      trigger: "change",
    },
  ],
  contract_url: [
    {
      required: true,
      message: "必填",
      trigger: "change",
    },
  ],
};

const emit = defineEmits(["add-close", "add-confirm"]);

const addDialogClose = (formI) => {
  if (!formI) return;
  formI.resetFields();
  emit("add-close", false);
};
const addDialogConfirm = async (formI) => {
  let params = {
    type: addForm.type,
    contract_name: addForm.contract_name,
    effective_start_time: addForm.date[0],
    effective_end_time: addForm.date[1],
    part_a_name: addForm.part_a.name,
    part_a: addForm.part_a.id,
    part_b_name: addForm.part_b.name,
    part_b: addForm.part_b.id,
    remark: addForm.remark,
    contract_url: addForm.contract_url,
  };
  if (!formI) return;
  await formI.validate((valid, fields) => {
    if (valid) {
      archiveContract(params).then((res) => {
        ElMessage.success("操作成功");
        emit("add-confirm", false);
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const getOptionByContractType = () => {
  switch (addForm.type) {
    case 1:
      getBusinessAccountList({ limit: 1000, page: 1, is_all: 1 }).then(
        (res) => {
          busOptions.value = res.data.data;
          for (const item of busOptions.value) {
            item["label"] = item["company_name"];
            item["value"] = item["company_id"];
          }
        }
      );
      getSelfOperatedTaxLandList({ status: 1, tax_land_type: "" }).then(
        (res) => {
          taxlandOptions.value = res.data.data;
          for (const item of taxlandOptions.value) {
            item["label"] = item["tax_land_name"];
            item["value"] = item["id"];
          }
        }
      );
      break;
    case 2:
      getChannelAccountList({ limit: 1000, page: 1, is_all: 1 }).then((res) => {
        channelOptions.value = res.data.data;
        for (const item of channelOptions.value) {
          item["label"] = item["channel_name"];
          item["value"] = item["id"];
        }
      });
      break;
    case 3:
      getSelfOperatedTaxLandList({ status: 1, tax_land_type: "1" }).then(
        (res) => {
          taxlandOptions.value = res.data.data;
          for (const item of taxlandOptions.value) {
            item["label"] = item["tax_land_name"];
            item["value"] = item["id"];
          }
        }
      );
      break;
    case 4:
      getSelfOperatedTaxLandList({ status: 1, tax_land_type: "0" }).then(
        (res) => {
          taxlandOptions.value = res.data.data;
          for (const item of taxlandOptions.value) {
            item["label"] = item["tax_land_name"];
            item["value"] = item["id"];
          }
        }
      );
      break;
  }
};

const handleSelectChange1A = (val) => {
  addForm.part_a.id = val.company_id;
  addForm.part_a.name = val.company_name;
};
const handleSelectChange1B = (val) => {
  addForm.part_b.id = val.id;
  addForm.part_b.name = val.tax_land_name;
};

const handleSelectChange2A = (val) => {
  addForm.part_a.id = val.value;
  addForm.part_a.name = val.label;
};
const handleSelectChange2B = (val) => {
  console.log(val);
  addForm.part_b.id = val.id;
  addForm.part_b.name = val.channel_name;
};

const handleSelectChange3A = (val) => {
  addForm.part_a.id = val.id;
  addForm.part_a.name = val.tax_land_name;
};
const handleSelectChange3B = (val) => {
  addForm.part_b.id = val.value;
  addForm.part_b.name = val.label;
};
const handleSelectChange4B = (val) => {
  addForm.part_b.id = val.id;
  addForm.part_b.name = val.tax_land_name;
};
getOptionByContractType();
</script>
