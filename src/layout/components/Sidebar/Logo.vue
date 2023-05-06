<script lang="ts" setup>
import { useSettingsStore } from "@/store/modules/settings";

const settingsStore = useSettingsStore();

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

// const logo = ref(new URL(`../../../assets/logo.png`, import.meta.url).href);
</script>

<template>
  <div class="w-full h-[56px] bg-white dark:bg-[var(--el-bg-color-overlay)]">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="h-full w-full flex items-center flex-start p-l-16px"
        to="/"
      >
        <span
          v-if="settingsStore.sidebarLogo"
          class="w-[24px] h-[24px] bg-#3661E9 b-rd-50%"
        />
      </router-link>

      <router-link
        v-else
        key="expand"
        class="h-full w-full flex items-center flex-start p-l-16px"
        to="/"
      >
        <span
          v-if="settingsStore.sidebarLogo"
          class="w-[24px] h-[24px] bg-#3661E9 b-rd-50%"
        />
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
// https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component
.sidebarLogoFade-enter-active {
  transition: opacity 2s;
}

.sidebarLogoFade-leave-active,
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
