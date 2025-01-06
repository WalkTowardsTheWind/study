<template>
  <div class="custom-tree-container">
    <p>Using scoped slot</p>
    <el-tree
      style="max-width: 300px"
      :data="dataSource"
      node-key="id"
      default-expand-all
      :props="defaultProps"
      :expand-on-click-node="true"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>

          <el-dropdown trigger="click">
            <span class="el-dropdown-link"> ... </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="append(data)">添加</el-dropdown-item>
                <el-dropdown-item @click="remove(node, data)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item>Action 3</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- <span>
              <a @click="append(data)"> 添加 </a>
              <a style="margin-left: 8px" @click="remove(node, data)"> 删除 </a>
            </span> -->
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type Node from "element-plus/es/components/tree/src/model/node";
import TreePopover from "@/components/BaseTree/TreePopover.vue";

const defaultProps = {
  children: "children",
  label: "label",
  //   disabled: 'disabled',
};

interface Tree {
  id: number;
  label: string;
  children?: Tree[];
}
let id = 1000;

const append = (data: Tree) => {
  const newChild = { id: id++, label: "testtest", children: [] };
  if (!data.children) {
    data.children = [];
  }
  data.children.push(newChild);
  dataSource.value = [...dataSource.value];
};

const remove = (node: Node, data: Tree) => {
  const parent = node.parent;
  const children: Tree[] = parent.data.children || parent.data;
  const index = children.findIndex((d) => d.id === data.id);
  children.splice(index, 1);
  dataSource.value = [...dataSource.value];
};

const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
          },
          {
            id: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
    ],
  },
]);
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
