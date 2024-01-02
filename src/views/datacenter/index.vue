<template>
  <div class="p-24px">
    <div class="sale">
      <SaleView />
    </div>
    <el-affix :offset="60">
      <div class="time_view">
        <TimeView ref="timeRef" @update="getData" />
      </div>
    </el-affix>
    <div class="chart">
      <ChartView :arr-data="arrData" />
    </div>
    <div class="cardbox">
      <div>
        <CardView :cardData="cardData1"> </CardView>
      </div>
      <div>
        <CardView :cardData="cardData2"> </CardView>
      </div>
    </div>
    <div class="cardbox">
      <div>
        <CardView :cardData="cardData3"> </CardView>
      </div>
      <div>
        <CardView :cardData="cardData4"> </CardView>
      </div>
    </div>
    <div class="cardbox">
      <div>
        <CardView :cardData="cardData5"> </CardView>
      </div>
    </div>
    <div class="cardbox">
      <div>
        <CardView :cardData="cardData6"> </CardView>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SaleView from "./components/sale_view.vue";
import TimeView from "./components/time_view.vue";
import ChartView from "./components/chart_view.vue";
import CardView from "./components/card_view.vue";
import { reactive } from "vue";
import { getDataCenter } from "../../api/datacenter";

const arrData = ref([]);

const cardData1 = reactive({
  name: "利润数据",
  route: "asset-management",
  subItem: [
    {
      name: "利润总额（元）",
      value: 0,
      isNeedFormat: true,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "销售总额（元）",
      value: 0,
      isNeedFormat: true,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "渠道利润（元）",
      value: 0,
      isNeedFormat: true,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
  ],
});
const cardData2 = reactive({
  name: "账户数据",
  route: "business-account",
  subItem: [
    {
      name: "总账户数量",
      value: 0,
      subItem: [
        {
          name: "新增",
          value: 0,
        },
      ],
    },
    {
      name: "企业账户",
      value: 0,
      subItem: [
        {
          name: "新增",
          value: 0,
        },
      ],
    },
    {
      name: "渠道账户",
      value: 0,
      subItem: [
        {
          name: "新增",
          value: 0,
        },
      ],
    },
    {
      name: "自由职业者",
      value: 0,
      subItem: [
        {
          name: "新增",
          value: 0,
        },
        {
          name: "下发数量",
          value: 0,
        },
      ],
    },
  ],
});
const cardData3 = reactive({
  name: "税地数据",
  route: "taxLandManagement",
  subItem: [
    {
      name: "总税地",
      value: 0,
      subItem: [
        {
          name: "新增",
          value: 0,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "自营税地",
      value: 0,
      subItem: [
        {
          name: "新增",
          value: 0,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "采购税地",
      value: 0,
      subItem: [
        {
          name: "新增",
          value: 0,
          isUpOrDown: "",
        },
      ],
    },
  ],
});
const cardData4 = reactive({
  name: "充值数据",
  route: "recharge-center",
  subItem: [
    {
      name: "充值总额（元）",
      value: 0,
      isNeedFormat: true,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "充值企业数量",
      value: 0,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "充值次数",
      value: 0,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
  ],
});
const cardData5 = reactive({
  name: "结算数据",
  route: "settlementCenter",
  subItem: [
    {
      name: "结算总额（元）",
      value: 0,
      width: 588,
      isNeedFormat: true,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
        {
          name: "企业结算（元）",
          value: 0,
          isNeedFormat: true,
        },
        {
          name: "渠道结算（元）",
          value: 0,
          isNeedFormat: true,
        },
      ],
    },
    {
      name: "结算企业数量",
      value: 0,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "企业结算次数",
      value: 0,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "渠道结算数量",
      value: 0,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "渠道结算次数",
      value: 0,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "个人结算笔数",
      value: 0,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
  ],
});
const cardData6 = reactive({
  name: "开票数据",
  route: "invoiceManager",
  subItem: [
    {
      name: "已开总额（元）",
      value: 0,
      isNeedFormat: true,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "待开总额（元）",
      value: 0,
      isNeedFormat: true,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "开票企业数量",
      value: 0,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
    {
      name: "开票次数",
      value: 0,
      subItem: [
        {
          name: "环比",
          value: 0,
          isPercent: true,
          isUpOrDown: "",
        },
      ],
    },
  ],
});

const timeRef = ref();

const getData = (tax_land_id = "", start_time = 0, end_time = 0) => {
  const params = {
    tax_land_id,
    start_time,
    end_time,
  };
  getDataCenter(params).then((res) => {
    arrData.value = res.data.income;

    cardData1.subItem[0].value = res.data.profit;
    cardData1.subItem[0].subItem[0].value = res.data.round_profit;
    cardData1.subItem[0].subItem[0].isUpOrDown = res.data.round_profit_type;

    cardData1.subItem[1].value = res.data.sale_profit;
    cardData1.subItem[1].subItem[0].value = res.data.round_sale_profit;
    cardData1.subItem[1].subItem[0].isUpOrDown =
      res.data.round_sale_profit_type;

    cardData1.subItem[2].value = res.data.channel_profit;
    cardData1.subItem[2].subItem[0].value = res.data.round_channel_profit;
    cardData1.subItem[2].subItem[0].isUpOrDown =
      res.data.round_channel_profit_type;

    cardData2.subItem[0].value = res.data.total_account;
    cardData2.subItem[0].subItem[0].value = res.data.new_total_account;

    cardData2.subItem[1].value = res.data.company;
    cardData2.subItem[1].subItem[0].value = res.data.new_company;

    cardData2.subItem[2].value = res.data.channel;
    cardData2.subItem[2].subItem[0].value = res.data.new_channel;

    cardData2.subItem[3].value = res.data.user;
    cardData2.subItem[3].subItem[0].value = res.data.new_user;

    cardData3.subItem[0].value = res.data.all_num;
    cardData3.subItem[0].subItem[0].value = res.data.new_all_num;

    cardData3.subItem[1].value = res.data.self_num;
    cardData3.subItem[1].subItem[0].value = res.data.new_self_num;

    cardData3.subItem[2].value = res.data.third_num;
    cardData3.subItem[2].subItem[0].value = res.data.new_third_num;

    cardData4.subItem[0].value = res.data.total_recharge;
    cardData4.subItem[0].subItem[0].value = res.data.round_recharge;
    cardData4.subItem[0].subItem[0].isUpOrDown = res.data.round_recharge_type;

    cardData4.subItem[1].value = res.data.company_num;
    cardData4.subItem[1].subItem[0].value = res.data.round_company_num;
    cardData4.subItem[1].subItem[0].isUpOrDown =
      res.data.round_company_num_type;

    cardData4.subItem[2].value = res.data.recharge_num;
    cardData4.subItem[2].subItem[0].value = res.data.round_recharge_num;
    cardData4.subItem[2].subItem[0].isUpOrDown =
      res.data.round_recharge_num_type;

    cardData5.subItem[0].value = res.data.settlement_total;
    cardData5.subItem[0].subItem[0].value = res.data.round_settlement_total;
    cardData5.subItem[0].subItem[0].isUpOrDown =
      res.data.round_settlement_total_type;
    cardData5.subItem[0].subItem[1].value = res.data.settlement_company_total;
    cardData5.subItem[0].subItem[2].value = res.data.settlement_channel_total;

    cardData5.subItem[1].value = res.data.settlement_company_num;
    cardData5.subItem[1].subItem[0].value =
      res.data.round_settlement_company_num;
    cardData5.subItem[1].subItem[0].isUpOrDown =
      res.data.round_settlement_company_num_type;

    cardData5.subItem[2].value = res.data.settlement_num;
    cardData5.subItem[2].subItem[0].value =
      res.data.round_settlement_company_count;
    cardData5.subItem[2].subItem[0].isUpOrDown =
      res.data.round_settlement_company_count_type;

    cardData5.subItem[3].value = res.data.settlement_channel_num;
    cardData5.subItem[3].subItem[0].value =
      res.data.round_settlement_channel_num;
    cardData5.subItem[3].subItem[0].isUpOrDown =
      res.data.round_settlement_channel_num_type;

    cardData5.subItem[4].value = res.data.settlement_channel_count;
    cardData5.subItem[4].subItem[0].value =
      res.data.round_settlement_channel_count;
    cardData5.subItem[4].subItem[0].isUpOrDown =
      res.data.round_settlement_channel_count_type;

    cardData5.subItem[5].value = res.data.settlement_user_num;
    cardData5.subItem[5].subItem[0].value = res.data.round_settlement_user_num;
    cardData5.subItem[5].subItem[0].isUpOrDown =
      res.data.round_settlement_user_num_type;

    cardData6.subItem[0].value = res.data.apply_amount;
    cardData6.subItem[0].subItem[0].value = res.data.round_invoice_amount;
    cardData6.subItem[0].subItem[0].isUpOrDown =
      res.data.round_invoice_amount_type;

    cardData6.subItem[1].value = res.data.wait_apply_amount;
    cardData6.subItem[1].subItem[0].value = res.data.round_wait_invoice_amount;
    cardData6.subItem[1].subItem[0].isUpOrDown =
      res.data.round_wait_invoice_amount_type;

    cardData6.subItem[2].value = res.data.apply_company_num;
    cardData6.subItem[2].subItem[0].value = res.data.round_invoice_company_num;
    cardData6.subItem[2].subItem[0].isUpOrDown =
      res.data.round_invoice_company_num_type;

    cardData6.subItem[3].value = res.data.apply_num;
    cardData6.subItem[3].subItem[0].value = res.data.round_invoice_apply_num;
    cardData6.subItem[3].subItem[0].isUpOrDown =
      res.data.round_invoice_apply_num_type;
  });
};

// const scrollFun = () => {
//   const stickyDiv = document.querySelector(".time_view") as HTMLElement;
//   const initialPosition = stickyDiv.getBoundingClientRect().top;
//   if (window.scrollY > initialPosition) {
//     stickyDiv.style.position = "fixed";
//     stickyDiv.style.top = "0";
//     stickyDiv.style.width = `89vw`;
//     stickyDiv.style.zIndex = "9999";
//   } else {
//     stickyDiv.style.position = "static";
//   }
// };

// onMounted(() => {
//   window.addEventListener("scroll", scrollFun);
// });

// onBeforeMount(() => {
//   window.removeEventListener("scroll", scrollFun);
// });

getData();
</script>

<style lang="scss">
$backgound: #fff;
$border-radius: 16px;

.p-24px {
  padding: 24px;
}
.sale {
  width: 100%;
  height: 264px;
  background: $backgound;
  border-radius: $border-radius;
}

.time_view {
  position: static;
  margin: 24px 0;
  width: 100%;
  height: 120px;
  background: $backgound;
  border-radius: $border-radius;
  overflow: hidden;
}

.chart {
  width: 100%;
  height: 420px;
  padding: 20px;
  background: $backgound;
  border-radius: $border-radius;
}
.cardbox {
  margin-top: 24px;
  width: 100%;
  display: flex;
  gap: 24px;
  & > div {
    flex: 1;
    background: $backgound;
    border-radius: $border-radius;
    padding: 24px;
  }
}
</style>
