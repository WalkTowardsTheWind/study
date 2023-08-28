<template>
  <zxn-plan>
    <zxn-tabs
      v-model:activeName="activeName"
      :tabsList="tabsList"
      @tabChange="handleTabChange"
    >
      <template #enterpriseSettlement>
        <enterprise-settlement ref="enterprise"></enterprise-settlement>
      </template>

      <template #channelSettlement>
        <channel-settlement ref="channel"></channel-settlement>
      </template>
      <template #channelSharingSettlement>
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
import channelSharingSettlement from "./channelSharingSettlement/channelSharingSettlementList.vue";
const route = useRoute();
const activeName = ref("enterpriseSettlement");
const tabsList = reactive([
  {
    name: "enterpriseSettlement",
    label: "企业结算",
  },
  {
    name: "channelSettlement",
    label: "渠道佣金结算",
  },
  {
    name: "channelSharingSettlement",
    label: "渠道分成结算",
  },
]);

const enterprise = ref();
const channel = ref();
const channelSharing = ref();
const handleTabChange = () => {
  if (route.query.activeName) {
    if (route.query.activeName === "enterprise") {
      activeName.value = "enterprise";
    } else if (route.query.activeName === "channel") {
      activeName.value = "channel";
    } else if (route.query.activeName === "channelSharing") {
      activeName.value = "channelSharing";
    }
  }

  if (activeName.value === "enterprise") {
    enterprise.value.getTableData();
  } else if (activeName.value === "channel") {
    channel.value.getTableData();
  } else if (activeName.value === "channelSharing") {
    channelSharing.value.getTableData();
  }
};
onMounted(() => {
  handleTabChange();
});
</script>
