<script setup lang="ts">
import {
  getCurrentInstance,
  nextTick,
  ref,
  watch,
  onMounted,
  ComponentInternalInstance,
} from "vue";
import { storeToRefs } from "pinia";

import path from "path-browserify";

import { useRoute, useRouter } from "vue-router";

import { translateRouteTitleI18n } from "@/utils/i18n";

import { usePermissionStore } from "@/store/modules/permission";
import { useTagsViewStore, TagView } from "@/store/modules/tagsView";
import ScrollPane from "./ScrollPane.vue";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
const route = useRoute();

const permissionStore = usePermissionStore();
const tagsViewStore = useTagsViewStore();

const { visitedViews } = storeToRefs(tagsViewStore);

const selectedTag = ref({});
const scrollPaneRef = ref();
const left = ref(0);
const top = ref(0);
const affixTags = ref<TagView[]>([]);

watch(
  route,
  () => {
    addTags();
    moveToCurrentTag();
  },
  {
    //初始化立即执行
    immediate: true,
  }
);

const tagMenuVisible = ref(false); // 标签操作菜单显示状态
watch(tagMenuVisible, (value) => {
  if (value) {
    document.body.addEventListener("click", closeTagMenu);
  } else {
    document.body.removeEventListener("click", closeTagMenu);
  }
});

function filterAffixTags(routes: any[], basePath = "/") {
  let tags: TagView[] = [];

  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }

    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path);
      if (childTags.length >= 1) {
        tags = tags.concat(childTags);
      }
    }
  });
  return tags;
}

function initTags() {
  const tags: TagView[] = filterAffixTags(permissionStore.routes);
  affixTags.value = tags;
  for (const tag of tags) {
    // Must have tag name
    if (tag.name) {
      tagsViewStore.addVisitedView(tag);
    }
  }
}

function addTags() {
  if (route.name) {
    tagsViewStore.addView(route);
  }
}

function moveToCurrentTag() {
  nextTick(() => {
    for (const r of tagsViewStore.visitedViews) {
      if (r.path === route.path) {
        scrollPaneRef.value.moveToTarget(r);
        // when query is different then update
        if (r.fullPath !== route.fullPath) {
          tagsViewStore.updateVisitedView(route);
        }
      }
    }
  });
}

function isActive(tag: TagView) {
  return tag.path === route.path;
}

function isAffix(tag: TagView) {
  return tag.meta && tag.meta.affix;
}

function isFirstView() {
  try {
    return (
      (selectedTag.value as TagView).fullPath ===
        tagsViewStore.visitedViews[1].fullPath ||
      (selectedTag.value as TagView).fullPath === "/index"
    );
  } catch (err) {
    return false;
  }
}

function isLastView() {
  try {
    return (
      (selectedTag.value as TagView).fullPath ===
      tagsViewStore.visitedViews[tagsViewStore.visitedViews.length - 1].fullPath
    );
  } catch (err) {
    return false;
  }
}

function refreshSelectedTag(view: TagView) {
  tagsViewStore.delCachedView(view);
  const { fullPath } = view;
  nextTick(() => {
    router.replace("/redirect" + fullPath).catch((err) => {
      console.warn(err);
    });
  });
}

function toLastView(visitedViews: TagView[], view?: any) {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView && latestView.fullPath) {
    router.push(latestView.fullPath);
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === "Dashboard") {
      // to reload home page
      router.replace({ path: "/redirect" + view.fullPath });
    } else {
      router.push("/");
    }
  }
}

function closeSelectedTag(view: TagView) {
  tagsViewStore.delView(view).then((res: any) => {
    if (isActive(view)) {
      toLastView(res.visitedViews, view);
    }
  });
}

function closeLeftTags() {
  tagsViewStore.delLeftViews(selectedTag.value).then((res: any) => {
    if (
      !res.visitedViews.find((item: any) => item.fullPath === route.fullPath)
    ) {
      toLastView(res.visitedViews);
    }
  });
}
function closeRightTags() {
  tagsViewStore.delRightViews(selectedTag.value).then((res: any) => {
    if (
      !res.visitedViews.find((item: any) => item.fullPath === route.fullPath)
    ) {
      toLastView(res.visitedViews);
    }
  });
}

function closeOtherTags() {
  router.push(selectedTag.value);
  tagsViewStore.delOtherViews(selectedTag.value).then(() => {
    moveToCurrentTag();
  });
}

function closeAllTags(view: TagView) {
  tagsViewStore.delAllViews().then((res: any) => {
    toLastView(res.visitedViews, view);
  });
}

function openTagMenu(tag: TagView, e: MouseEvent) {
  const menuMinWidth = 105;
  const offsetLeft = proxy?.$el.getBoundingClientRect().left; // container margin left
  const offsetWidth = proxy?.$el.offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const l = e.clientX - offsetLeft + 15; // 15: margin right

  if (l > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = l;
  }

  top.value = e.clientY;
  tagMenuVisible.value = true;
  selectedTag.value = tag;
}

function closeTagMenu() {
  tagMenuVisible.value = false;
}

function handleScroll() {
  closeTagMenu();
}

onMounted(() => {
  initTags();
});
</script>

<template>
  <div class="tags-container">
    <scroll-pane ref="scrollPaneRef" @scroll="handleScroll">
      <router-link
        :class="'tags-item ' + (isActive(tag) ? 'active' : '')"
        v-for="tag in visitedViews"
        :key="tag.path"
        :data-path="tag.path"
        :to="{ path: tag.path, query: tag.query }"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openTagMenu(tag, $event)"
      >
        {{ translateRouteTitleI18n(tag.meta?.title) }}
        <span
          v-if="!isAffix(tag)"
          class="tags-item-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <i-ep-CircleCloseFilled class="text-[11px] c-#666666" />
        </span>
      </router-link>
    </scroll-pane>

    <!-- tag标签操作菜单 -->
    <ul
      v-show="tagMenuVisible"
      class="tag-menu"
      :style="{ left: left + 'px', top: top + 'px' }"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        <svg-icon icon-class="refresh" />
        刷新
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <svg-icon icon-class="close" />
        关闭
      </li>
      <li @click="closeOtherTags">
        <svg-icon icon-class="close_other" />
        关闭其它
      </li>
      <li v-if="!isFirstView()" @click="closeLeftTags">
        <svg-icon icon-class="close_left" />
        关闭左侧
      </li>
      <li v-if="!isLastView()" @click="closeRightTags">
        <svg-icon icon-class="close_right" />
        关闭右侧
      </li>
      <li @click="closeAllTags(selectedTag)">
        <svg-icon icon-class="close_all" />
        关闭所有
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-container {
  width: 100%;
  //height: 34px;
  background-color: var(--el-bg-color);
  box-shadow: 0px 4px 5px 0 rgba(0, 0, 0, 0.15);

  .tags-item {
    position: relative;
    display: inline-block;
    padding: 3px 8px;
    font-size: 14px;
    color: #333;
    cursor: pointer;

    &::after {
      position: absolute;
      top: 50%;
      right: 0;
      display: inline-block;
      width: 1px;
      height: 16px;
      content: "";
      background: #e5e5e5;
      transform: translateY(-50%);
    }

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &:hover {
      color: var(--el-color-primary);
    }

    &.active {
      background-color: #f6f6f6;

      &::after {
        background-color: #f6f6f6;
      }
    }

    &-close {
      border-radius: 100%;
    }
  }
}

.tag-menu {
  position: absolute;
  z-index: 99;
  font-size: 12px;
  background: var(--el-bg-color-overlay);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);

  li {
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background: var(--el-fill-color-light);
    }
  }
}
</style>
