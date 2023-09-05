<template>
  <div class="p-[37px]">
    <!-- 上级渠道 -->
    <div class="high">
      <div class="title">
        <zxn-title>上级渠道</zxn-title>
        <el-button class="add" plain type="primary" @click="addHigh"
          >+新增</el-button
        >
      </div>
      <zxn-table
        :table-data="tableData1"
        :column-list="columnList1"
      ></zxn-table>
      <zxn-dialog
        v-model:visible="visible1"
        title="新增上级渠道"
        @confirm-dialog="confirmClick1"
        @close-dialog="closeDialog1"
      >
        <el-form :model="newForm1" :rules="rules1">
          <el-row>
            <el-col :span="22">
              <el-form-item label="上级渠道" prop="tax_land_name">
                <el-select class="w-full" placeholder="请选择"></el-select>
              </el-form-item>
              <el-form-item label="税地名称" prop="channel_point">
                <el-select class="w-full" placeholder="请选择"></el-select>
              </el-form-item>
              <el-form-item label="我的点位" prop="point">
                <el-input placeholder="请输入">
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zxn-dialog>
    </div>
    <!-- 下级渠道 -->
    <div class="low mt-[50px]">
      <div class="title">
        <zxn-title>下级渠道</zxn-title>
        <el-button class="add" plain type="primary" @click="addLow"
          >+新增</el-button
        >
      </div>
      <zxn-table
        :table-data="tableData2"
        :column-list="columnList2"
      ></zxn-table>
      <zxn-dialog
        v-model:visible="visible2"
        title="新增下级渠道"
        @confirm-dialog="confirmClick2"
        @close-dialog="closeDialog2"
      >
        <el-form :model="newForm2" :rules="rules2">
          <el-row>
            <el-col :span="22">
              <el-form-item label="下级渠道" prop="tax_land_name">
                <el-select class="w-full" placeholder="请选择"></el-select>
              </el-form-item>
              <el-form-item label="税地名称" prop="channel_point">
                <el-select class="w-full" placeholder="请选择"></el-select>
              </el-form-item>
              <el-form-item label="我的点位" prop="point">
                <el-input placeholder="请输入">
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zxn-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
const tableData1 = reactive([]);
const tableData2 = reactive([]);

const visible1 = ref(false);
const visible2 = ref(false);

const columnList1 = [
  { label: "上级渠道" },
  { label: "绑定税地名称" },
  { label: "上级点位" },
  { label: "我的点位" },
  { label: "绑定时间" },
  { label: "操作" },
];
const columnList2 = [
  { label: "下级渠道" },
  { label: "绑定税地名称" },
  { label: "我的点位" },
  { label: "下级点位" },
  { label: "绑定时间" },
  { label: "操作" },
];

const newForm1 = reactive({});
const newForm2 = reactive({});

const rules1 = {};
const rules2 = {};

const addHigh = () => {
  visible1.value = true;
};
const addLow = () => {
  visible2.value = true;
};

const confirmClick1 = () => {};
const confirmClick2 = () => {};

const closeDialog1 = () => {
  visible1.value = false;
};
const closeDialog2 = () => {
  visible2.value = false;
};
</script>

<style scoped lang="scss">
.title {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
