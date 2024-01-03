<template>
  <dashboard-card title="系统通知">
    <template #header-right>
      <!--			TODO-->
      <!--      <div class="look-more" @click="handleMore">-->
      <!--        <span class="look-more-text">查看更多</span>-->
      <!--        <el-icon size="14" color="#808080">-->
      <!--          <i-ep-arrow-right />-->
      <!--        </el-icon>-->
      <!--      </div>-->
    </template>
    <div class="bg-#fff pt-10px">
      <div class="notice-message">
        <div class="notice-message-switch">
          <div
            class="notice-message-switch-item"
            :class="{ active: type === 1 }"
            @click="handleTypeChange(1)"
          >
            <div class="notice-message-switch-item-text">待办通知</div>
            <!--          <span class="notice-message-switch-item-tip"></span>-->
          </div>
          <div
            class="notice-message-switch-item"
            :class="{ active: type === 2 }"
            @click="handleTypeChange(2)"
          >
            <div class="notice-message-switch-item-text">通知消息</div>
            <!--          <span class="notice-message-switch-item-tip">2</span>-->
          </div>
          <span class="selection"></span>
        </div>
      </div>
      <div
        ref="noticeMessage"
        class="message-box"
        :style="{
          height: `${boxHeight}px`,
          position: 'relative',
        }"
      >
        <el-scrollbar
          ref="scrollbar"
          wrap-class="scrollbar-wrapper"
          v-loading="false"
        >
          <TransitionGroup v-if="type === 1" name="list" tag="div">
            <div
              class="notice-message-item"
              v-for="(item, index) in tableData"
              :key="item.id"
            >
              <div class="notice-message-item-head">
                <div class="notice-message-item-head-title text-ellipsis">
                  {{ item.title }}
                </div>
                <div class="notice-message-item-head-btn">
                  <span @click="handleTop(item, index)">置顶</span>
                  <span @click="handleRead(item, index)">立刻处理</span>
                </div>
              </div>
              <div class="notice-message-item-content text-ellipsis-3">
                {{ item.content }}
              </div>
            </div>
          </TransitionGroup>
          <TransitionGroup v-else name="list" tag="div">
            <div
              class="notice-message-item"
              v-for="(item, index) in tableData"
              :key="item.id"
            >
              <div class="notice-message-item-head">
                <div class="notice-message-item-head-title text-ellipsis">
                  {{ item.title }}
                </div>
                <div class="notice-message-item-head-btn">
                  <span @click="handleTop(item, index)">置顶</span>
                  <span @click="handleRead(item, index)">立刻处理</span>
                </div>
              </div>
              <div class="notice-message-item-content text-ellipsis-3">
                {{ item.content }}
              </div>
            </div>
          </TransitionGroup>
        </el-scrollbar>
      </div>
    </div>
  </dashboard-card>
</template>
<script setup lang="ts">
import DashboardCard from "@/views/dashboard/components/DashboardCard.vue";
import { notifyIndex, notifyTop, notifyRead } from "@/api/message";
import { useRouter } from "vue-router";
import { useRouteParams } from "@/store/modules/routeParams";
const type = ref(1);

const tableData = reactive([]);
const handleTypeChange = (cur: number) => {
  type.value = cur;
  tableData.length = 0;
  /** TODO
  load();
		**/
};
const load = () => {
  getList();
};
const getList = async () => {
  const params = { type: type.value, limit: 20, status: 0 };
  try {
    const { data } = await notifyIndex(params);
    tableData.push(...data.data);
  } catch (e) {
    console.log(e);
  }
};
const handleTop = (cur, rank) => {
  tableData.unshift(...tableData.splice(rank, 1));
  notifyTop(cur.id);
};
const handleRead = (cur, rank) => {
  tableData.splice(rank, 1);
  notifyRead(cur.id);
  if (type.value === 1) {
    handleGoRouter(cur);
  }
};
const router = useRouter();

const { pushParams } = useRouteParams();
const routerName = {
  1: "recharge-center",
  2: "taskManagerIndex",
  3: "settlementCenter",
  4: "invoiceManager",
  5: "taxLandManagement",
};

const noticeMessage = ref<HTMLDivElement>();
let boxHeight = ref(0);
const handleGoRouter = (item: { type: number; target_id: number }) => {
  pushParams(routerName[item.type], { status: item.target_id });
  router.push({ name: routerName[item.type] });
};
const handleMore = () => {
  router.push({ name: "messageManager" });
};
onMounted(() => {
  setTimeout(() => {
    const { bottom } = (noticeMessage as any).value.getBoundingClientRect();
    boxHeight.value =
      window.innerHeight - bottom - 24 < 356
        ? 356
        : window.innerHeight - bottom - 24;
    // TODO
    // load();
  });
});
</script>
<style lang="scss" scoped>
.look-more {
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    .look-more-text {
      color: #356ff3;
    }
  }
  &-text {
    font-size: 14px;
    font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
    color: #999999;
  }
}
.notice-message {
  padding: 0 24px 16px 24px;
  background-color: #ffffff;
  &-switch {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 5px 8px;
    width: 240px;
    height: 40px;
    background: #f6f6f6;
    border-radius: 4px;
    box-sizing: border-box;
    .notice-message-switch-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1;
      &.active {
        .notice-message-switch-item-text {
          color: #356ff3;
        }
        .notice-message-switch-item-tip {
          background: #356ff3;
        }
      }

      &:nth-child(1) + .active ~ .selection {
        transform: translateX(100%);
      }
      .notice-message-switch-item-text {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
      }
      &-tip {
        margin-left: 6px;
        padding: 0 6px;
        height: 14px;
        line-height: 14px;
        font-size: 12px;
        font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
        font-weight: 500;
        color: #ffffff;
        background: #999999;
        border-radius: 7px 7px 7px 7px;
        opacity: 1;
      }
    }
    .selection {
      position: absolute;
      left: 8px;
      top: 5px;
      width: calc(50% - 8px);
      height: calc(100% - 10px);
      border-radius: 4px 4px 4px 4px;
      z-index: 0;
      transition: 0.2s ease;
      background: #ffffff;
    }
  }
  &-item {
    padding: 24px;
    border-bottom: 1px solid #f5f5f5;
    &:first-child {
      padding-top: 0;
    }
    &-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-title {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
        font-weight: 500;
        color: #656565;
        &:before {
          display: inline-block;
          content: "";
          width: 3px;
          height: 14px;
          background: #356ff3;
          margin-right: 4px;
          border-radius: 2px;
        }
      }
      &-btn {
        display: flex;
        span {
          padding: 0 8px;
          height: 29px;
          line-height: 29px;
          font-size: 14px;
          font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
          font-weight: 500;
          color: #999999;
          background: #ffffff;
          border-radius: 4px;
          cursor: pointer;
          &:first-child {
            margin-right: 12px;
            border: 1px solid #e5e5e5;
            &:hover {
              background: #e5e5e5;
              color: #000000;
            }
          }
          &:last-child {
            border: 1px solid #356ff3;
            color: #356ff3;
            &:hover {
              background: #356ff3;
              color: #ffffff;
            }
          }
        }
      }
    }
    &-content {
      margin-top: 14px;
      font-size: 14px;
      font-family: SourceHanSansSC, SourceHanSansSC, sans-serif;
      color: #333333;
    }
  }
}
.message-box {
  //&:before {
  //  content: "oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo";
  //  position: absolute;
  //  left: 0;
  //  right: 0;
  //  bottom: 0;
  //  width: 100%;
  //  font-size: 12px;
  //  filter: blur(5px) brightness(120%) grayscale(0.7);
  //  z-index: 999;
  //}
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
