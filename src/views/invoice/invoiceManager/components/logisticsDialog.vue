<template>
  <el-dialog v-model="visible" class="zxn-dialog" title="查看物流" width="816">
    <div class="logistics">
      <div class="logistics-img">
        <span class="logistics-img-label">票样</span>
        <el-image
          style="width: 88px; height: 88px"
          :src="formItem.invoice_sample_url"
          :preview-src-list="[formItem.invoice_sample_url as string]"
          fit="fill"
        />
      </div>
      <div class="logistics-info"></div>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { getExpressDetail } from "@/api/invoice";
export default {
  name: "addInvoice",
};
</script>
<script setup lang="ts">
let visible = ref(false);
const formItem = reactive({
  invoice_sample_url: "",
});
const init = (id: number): void => {
  visible.value = true;
  getInfo(id);
};
const getInfo = async (id: number) => {
  const { data } = await getExpressDetail(id);
  console.log(data);
};
onMounted(() => {});
defineExpose({
  init,
});
</script>
<style lang="scss" scoped>
.logistics {
  display: flex;

  &-img {
    display: flex;
    flex: none;

    &-label {
      margin-right: 10px;
      margin-left: 30px;
      font-size: 14px;
      font-weight: 500;
      color: #656565;
    }
  }

  &-info {
    flex: 1 auto;
  }
}
</style>
