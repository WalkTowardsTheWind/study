<template>
  <div class="text-container">
    <div class="text-wrapper">
      <transition
        name="expand-collapse"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div v-if="true" class="text" :style="textStyle" ref="textContent">
          {{ content }}
        </div>
      </transition>
    </div>

    <span v-if="showButton" @click="toggleText" class="toggle-btn">
      {{ isCollapsed ? "展开" : "收起" }}
    </span>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  maxLines: {
    type: Number,
    default: 3,
  },
});

const isCollapsed = ref(true); // 默认折叠
const showButton = ref(false); // 控制按钮的显示
const textStyle = ref({});
const textHeight = ref(0);
const maxHeight = ref(0);
const textContent = ref(null); // 使用 ref 获取 DOM 元素

// 监听 content 的变化，判断是否需要显示展开/收起按钮
watch(
  () => props.content,
  () => {
    // 每次 content 改变时，重新检查按钮的显示
    checkButtonVisibility();
  },
  { immediate: true }
);

// 检查是否超出最大行数，决定是否显示展开按钮
function checkButtonVisibility() {
  nextTick(() => {
    const textElement = textContent.value;
    if (textElement) {
      const lineHeight = parseInt(
        window.getComputedStyle(textElement).lineHeight
      );
      textHeight.value = textElement.scrollHeight - 1;
      maxHeight.value = lineHeight * props.maxLines;
      if (textHeight.value > maxHeight.value) {
        showButton.value = true;
      } else {
        showButton.value = false;
      }

      updateTextStyle();
    }
  });
}

// 切换展开/收起状态
function toggleText() {
  isCollapsed.value = !isCollapsed.value;
  updateTextStyle();
}

// 在 mounted 时获取文本的高度，并设置初始状态
onMounted(() => {
  nextTick(() => {
    const textElement = textContent.value;
    if (textElement) {
      const lineHeight = parseInt(
        window.getComputedStyle(textElement).lineHeight
      );
      textHeight.value = textElement.scrollHeight - 1;
      maxHeight.value = lineHeight * props.maxLines;

      // 设置初始文本样式
      updateTextStyle();

      // 监听窗口变化，动态调整文本样式
      window.addEventListener("resize", checkButtonVisibility);
    }
  });
});

// 清理监听器
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkButtonVisibility);
});

// 更新文本样式，控制文本是否折叠
function updateTextStyle() {
  const textElement = textContent.value;
  if (textElement) {
    const lineHeight = parseInt(
      window.getComputedStyle(textElement).lineHeight
    );
    const currentHeight = textElement.scrollHeight;

    textStyle.value = {
      maxHeight: isCollapsed.value
        ? `${lineHeight * props.maxLines}px`
        : `${currentHeight}px`,
      overflow: "hidden",
      transition: "max-height 0.3s ease-out",
      wordWrap: "break-word", // 强制长词换行
      wordBreak: "break-word", // 强制文本在边界处换行
      display: "-webkit-box",
      WebkitLineClamp: isCollapsed.value ? props.maxLines : "none", // 控制最大行数
      WebkitBoxOrient: "vertical",
    };
  }
}

// 动画钩子函数
function beforeEnter(el) {
  el.style.maxHeight = "0";
}

function enter(el, done) {
  const height = el.scrollHeight;
  el.style.transition = "max-height 0.3s ease-out";
  el.style.maxHeight = `${height}px`;
  done();
}

function leave(el, done) {
  el.style.transition = "max-height 0.3s ease-in";
  el.style.maxHeight = "0";
  done();
}
</script>

<style scoped>
.text-container {
  position: relative;
  font-size: 14px;
  line-height: 1.6em;
  color: #333;
}

.text-wrapper {
  overflow: hidden;
}

.text {
  word-wrap: break-word;
  word-break: break-word; /* 确保长单词换行 */
}

.toggle-btn {
  position: absolute;
  bottom: -20px;
  left: 0;
  color: #0066cc;
  border: none;
  cursor: pointer;
  font-size: 12px;
  border-radius: 4px;
  transition: 0.3s ease;
}

.toggle-btn:hover {
  color: red;
}

/* 过渡动画 */
.expand-collapse-enter-active,
.expand-collapse-leave-active {
  transition: max-height 0.3s ease-out;
}

.expand-collapse-enter, .expand-collapse-leave-to /* .expand-collapse-leave-active in <2.1.8 */ {
  max-height: 0;
}
</style>
