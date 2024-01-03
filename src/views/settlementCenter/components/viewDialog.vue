<template>
  <el-dialog
    v-model="dialogVisible"
    title="发佣确认"
    modal-class="enterprise-dialog"
    width="800px"
  >
    <div class="enterprise-dialog-box">
      <div class="enterprise-dialog-box-tip">
        <div>甲方&nbsp;&nbsp;武汉中新能科技有限公司</div>
        <div>乙方&nbsp;&nbsp;{{ formItem.channel_name }}</div>
      </div>
      <div class="settle-info">
        <div class="settle-info-head">
          <div class="settle-info-head-item amount">
            <span class="settle-info-head-item-label font-bold text-size-16px"
              >结算金额</span
            >
            <money-text
              :modelValue="formItem.settlement_amount"
              markColor="#F35135"
              moneyColor="#F35135"
              moneySize="24"
              markSize="24"
              :bold="700"
            />
          </div>
          <div class="settle-info-head-item">
            <span class="settle-info-head-item-label">渠道佣金税前</span>
            <money-text
              :modelValue="formItem.after_commission"
              moneySize="18"
              markSize="18"
              :bold="600"
            />
          </div>
          <div class="settle-info-head-item">
            <span class="settle-info-head-item-label">渠道佣金税后</span>
            <money-text
              :modelValue="formItem.after_commission"
              moneySize="18"
              markSize="18"
              :bold="600"
            />
          </div>
        </div>
        <div class="settle-info-form">
          <div class="settle-info-form-item">
            <span>收佣渠道</span>
            <span>{{ formItem.channel_name }}</span>
          </div>
          <div class="settle-info-form-item">
            <span>收款银行</span>
            <span>{{ formItem.bank }}</span>
          </div>
          <div class="settle-info-form-item">
            <span>收款账户</span>
            <span>{{ formItem.bank_account }}</span>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button v-if="hasFooter" @click="HandleClose">取消</el-button>
      <el-button v-if="hasFooter" type="primary" @click="handleConfirm"
        >确认</el-button
      >
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { updateChannelSettlementStatus } from "@/api/settlementCenter/channelCommissionSettlement";
const emit = defineEmits(["update:dialogVisible", "up-Table"]);
const props = defineProps({
  dialogVisible: { type: Boolean, default: false },
  formItem: { type: Array, equired: true, default: () => {} },
  viewType: { type: Number, default: 0 },
  hasFooter: {
    type: Boolean,
    default: true,
  },
});

let dialogVisible = computed(() => props.dialogVisible);
let formItem = computed(() => {
  return props.formItem;
}) as any;
let viewType = computed(() => props.viewType);
const handleConfirm = async () => {
  if (viewType.value === 0) {
    try {
      let data = {
        id: formItem.value.id,
        status: "1",
      };
      await updateChannelSettlementStatus(data);
      emit("update:dialogVisible", false);
      ElMessage({
        type: "success",
        message: "成功发送结算单",
      });
      emit("up-Table");
    } catch (error) {
      console.log(error);
    }
  } else if (viewType.value === 1) {
    emit("update:dialogVisible", false);
  } else if (viewType.value === 2) {
    try {
      let data = {
        id: formItem.value.id,
        status: "1",
      };
      emit("update:dialogVisible", false);
      emit("up-Table");
    } catch (error) {
      console.log(error);
    }
  }
};
const HandleClose = () => {
  emit("update:dialogVisible", false);
};

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("你确认关闭弹窗？")
    .then(() => {
      done();
      emit("update:dialogVisible", false);
    })
    .catch(() => {
      // catch error
    })
    .then(() => {
      console.log(dialogVisible.value);
    });
};
</script>
<style lang="scss" scoped>
.enterprise-dialog {
  .el-dialog__body {
    padding: 20px;
    padding-bottom: 0;
  }
}
.enterprise-dialog-box {
  &-tip {
    display: flex;
    > div {
      width: 33%;
    }
  }
}
.settle-info {
  margin-top: 23px;
  padding: 22px 24px 18px 24px;
  background: rgba(243, 81, 53, 0.08);
  &-head {
    display: flex;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(243, 81, 53, 0.16);
    &-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 62px;
      font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
      &-label {
        font-size: 14px;
        color: #656565;
        &.text-size-16px {
          font-size: 16px;
          color: #333333;
        }
      }
      .balance {
        margin-left: 12px;
        font-size: 14px;
        font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
        font-weight: 500;
        color: #f36135;
      }
    }
  }
  .settle-info-form {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    &-item {
      display: flex;
      align-items: center;
      width: calc(100% / 3);
      span {
        &:last-child {
          flex: 1 auto;
          font-size: 14px;
          font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
          font-weight: 600;
          color: #333333;
        }
        &:first-child {
          flex: none;
          width: 80px;
          font-size: 14px;
          font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
          color: #656565;
        }
      }
    }
  }
}
</style>
