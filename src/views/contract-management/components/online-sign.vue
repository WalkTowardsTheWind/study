<template>
  <zxn-dialog
    width="70vw"
    :top="20"
    title="在线签署"
    :visible="visible"
    @close-dialog="onlineClose"
    @confirm-dialog="onlineConfirm"
  >
    <el-row :gutter="50">
      <el-col :span="8">
        <el-form-item label="合同名称">
          <el-input placeholder="请输入" />
        </el-form-item>
        <el-form-item label="合同类型">
          <el-select class="w-100" placeholder="请选择"></el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="选择模板">
          <el-select class="w-full" placeholder="请选择"></el-select>
        </el-form-item>
        <el-form-item label="合同期限">
          <div class="el-date">
            <el-date-picker
              style="width: 100%"
              v-model="value1"
              type="date"
              placeholder="请选择"
            />
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="备注要求">
          <el-input placeholder="请输入" type="textarea" />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 设置签署方 -->
    <div class="sign flex justify-between items-center mt-50px">
      <div class="title">设置签署方</div>
      <div>
        <el-button type="primary" plain @click="addBase"
          ><i-ep-Plus />添加主体</el-button
        >
      </div>
    </div>
    <div class="head p-x-20px m-y-20px">
      <div>参与主体</div>
      <div class="ml-25">参与方信息</div>
    </div>

    <div
      class="form mt-20px flex items-center"
      v-for="(item, index) of baseList"
      :key="index"
    >
      <el-row class="w-full" :gutter="20" type="flex">
        <el-col :span="3">
          <el-form-item>
            <el-select placeholder="个人/企业"></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input placeholder="签署方"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input placeholder="真实姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input placeholder="手机号/邮箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input placeholder="企业名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mt-6px" :span="1">
          <i-ep-close class="cursor-pointer" @click="delBase(index)" />
        </el-col>
      </el-row>
    </div>
  </zxn-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
});
const emit = defineEmits(["close", "confirm"]);

const baseList = ref([] as any);

const addBase = () => {
  baseList.value.push({});
};

const delBase = (index) => {
  baseList.value.splice(index, 1);
};

const value1 = ref("");

const isOnline = ref(false);

const onlineSignClick = () => {
  isOnline.value = true;
};
const onlineClose = () => {
  baseList.value.length = 0;
  emit("close", false);
};
const onlineConfirm = () => {
  emit("confirm");
};
</script>

<style scoped lang="scss">
.sign {
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
