<template>
  <zxn-plan>
    <zxn-tabs
      v-model:activeName="activeName"
      :tabsList="tabsList"
      @tabChange="handleTabChange"
    >
      <template #enterprise>
        <enterprise-settlement ref="enterprise"></enterprise-settlement>
      </template>

      <template #channel>
        <channel-settlement ref="channel"></channel-settlement>
      </template>
      <template #channelCommission>
        <channel-commission-settlement
          ref="channelCommission"
        ></channel-commission-settlement>
      </template>
      <template #channelSharing>
        <channel-sharing-settlement
          ref="channelSharing"
        ></channel-sharing-settlement>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import enterpriseSettlement from "./enterpriseSettlement/index.vue";
import channelSettlement from "./channelSettlement/index.vue";
import channelCommissionSettlement from "./channelCommissionSettlement/channelCommissionSettlementList.vue";
import channelSharingSettlement from "./channelSharingSettlement/channelSharingSettlementList.vue";
const route = useRoute();
const activeName = ref("enterprise");
const tabsList = reactive([
  {
    name: "enterprise",
    label: "企业结算",
  },
  {
    name: "channel",
    label: "渠道结算",
  },
  {
    name: "channelCommission",
    label: "渠道佣金结算",
  },
  {
    name: "channelSharing",
    label: "渠道分成结算",
  },
]);

const enterprise = ref();
const channel = ref();
const channelCommission = ref();
const channelSharing = ref();
const handleTabChange = () => {
  if (route.query.activeName) {
    if (route.query.activeName === "enterprise") {
      activeName.value = "enterprise";
    } else if (route.query.activeName === "channel") {
      activeName.value = "channel";
    } else if (route.query.activeName === "channelCommission") {
      activeName.value = "channelCommission";
    } else if (route.query.activeName === "channelSharing") {
      activeName.value = "channelSharing";
    }
  }

  if (activeName.value === "enterprise") {
    enterprise.value.getTableData();
  } else if (activeName.value === "channel") {
    channel.value.getTableData();
  } else if (activeName.value === "channelCommission") {
    channelCommission.value.getTableData();
  } else if (activeName.value === "channelSharing") {
    channelSharing.value.getTableData();
  }
};
onMounted(() => {
  handleTabChange();
});
</script>
