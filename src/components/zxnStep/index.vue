<template>
  <div class="step">
    <div class="step-item" v-for="(item, index) in stepList" :key="index">
      <div
        class="step-item-left"
        :class="activeStep >= index ? 'is-active' : ''"
        @click="$emit('activeClick', index)"
      >
        <div class="round">{{ index + 1 }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
      <div
        class="step-item-right"
        :class="activeStep >= index ? 'is-active' : ''"
        v-if="index !== stepList.length - 1"
      >
        <div class="arrow">
          <!-- <el-icon size="20">
            <i-ep-DArrowRight />
          </el-icon> -->
          <div
            class="line"
            :class="activeStep >= index + 1 ? 'is-active' : ''"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IStepList {
  desc: string;
}

defineProps({
  stepList: {
    type: Array<IStepList>,
    required: true,
    default: () => [],
  },
  activeStep: {
    type: Number,
    required: true,
    default: () => 0,
  },
});
</script>

<style scoped lang="scss">
.step {
  display: flex;
  margin-top: 31px;
  font-size: 16px;
  align-items: center;
  justify-content: center;

  &-item {
    display: flex;

    &-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;

      .round {
        width: 40px;
        height: 40px;
        line-height: 40px;
        color: #999;
        text-align: center;
        border: 1px solid #999;
        border-radius: 50%;
      }

      .desc {
        margin-top: 10px;
        color: #333;
      }
    }

    &-right {
      margin-top: 20px;
      .arrow {
        color: #999;

        .line {
          width: 288px;
          height: 2px;
          background: #999;
        }
      }
    }
  }

  .is-active {
    .round {
      color: #fff;
      background: #356ff3;
      border: none;
    }

    .desc {
      color: #356ff3;
    }

    .arrow {
      color: #356ff3;
      background-color: #356ff3;
    }
  }
}
</style>
