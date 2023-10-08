<template>
  <el-dialog
    custom-class="my-dialog"
    v-model="dialogVisible"
    width="800px"
    :before-close="handleClose"
  >
    <div class="enterprise-dialog-box">
      <div class="enterprise-dialog-box-title">发佣确认</div>
      <div class="enterprise-dialog-box-tip">
        <div>甲方&nbsp;&nbsp;武汉中新能科技有限公司</div>
        <div>乙方&nbsp;&nbsp;{{ formItem.channel_name }}</div>
      </div>
      <table class="enterprise-dialog-box-content" cellspacing="0" border="0">
        <tr>
          <td>收佣渠道</td>
          <td>{{ formItem.channel_name }}</td>
        </tr>
        <tr>
          <td>收款银行</td>
          <td>{{ formItem.bank }}</td>
        </tr>
        <tr>
          <td>收款账户</td>
          <td>{{ formItem.bank_account }}</td>
        </tr>
        <!--        <tr>-->
        <!--          <td>渠道状态</td>-->
        <!--          <td>收佣渠道</td>-->
        <!--        </tr>-->
        <tr v-if="formItem.confirm_time">
          <td>确认时间时间</td>
          <td>{{ formItem.confirm_time }}</td>
        </tr>
        <tr>
          <td>渠道佣金税前</td>
          <td>
            <money-text
              :model-value="formItem.after_commission"
              :mark-size="14"
              :moneySize="14"
              mark-color="#333333"
              money-color="#333333"
            />
          </td>
        </tr>
        <tr>
          <td>渠道佣金税后</td>
          <td>
            <money-text
              :model-value="formItem.after_commission"
              :mark-size="14"
              :moneySize="14"
              mark-color="#333333"
              money-color="#333333"
            />
          </td>
        </tr>
        <tr>
          <td>结算金额</td>
          <td>
            <money-text
              :model-value="formItem.settlement_amount"
              :mark-size="14"
              :moneySize="14"
              mark-color="#333333"
              money-color="#333333"
            />
          </td>
        </tr>
      </table>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="HandleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </span>
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
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 20px;
    padding-bottom: 0;
  }
  &-box {
    padding: 30px;
    background-image: url("@/assets/watermark.png");
    background-size: contain;
    font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
    &-title {
      font-size: 28px;
      font-weight: bold;
      color: #333333;
      text-align: center;
    }
    &-tip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 14px;
      color: #3d4a52;
    }
    &-content {
      width: 100%;
      border-top: 1px solid #dcdfe6;
      border-left: 1px solid #dcdfe6;
      tr {
        td {
          border-right: 1px solid #dcdfe6;
          border-bottom: 1px solid #dcdfe6;
          &:first-child {
            width: 26%;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            color: #656565;
          }
          &:last-child {
            padding-left: 30px;
            width: 74%;
            font-size: 14px;
            font-weight: 500;
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
