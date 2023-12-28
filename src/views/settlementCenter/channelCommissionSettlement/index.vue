<template>
  <zxn-plan>
    <zxn-tabs
      v-model:activeName="activeName"
      :tabsList="tabsList"
      @tabChange="handleTabChange"
    >
      <template #channelCommission>
        <channel-commission-settlement
          ref="channelCommission"
        ></channel-commission-settlement>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import channelCommissionSettlement from "./channelCommissionSettlementList.vue";
const activeName = ref("channelCommission");
const tabsList = reactive([
  {
    name: "channelCommission",
    label: "渠道佣金结算",
  },
]);
const channelCommission = ref();
const handleTabChange = (tab: string) => {};

onMounted(() => {
  channelCommission.value.getTableData();
});
</script>
