<template>
  <el-tooltip class="box-item" effect="dark" placement="top">
    <template #content>
      <div v-for="(item, index) in data" :key="index">
        <span>{{ item }}</span
        ><br />
      </div>
    </template>
    <div>{{ data[0] }}<span v-if="data.length >= 2">...</span></div>
  </el-tooltip>
</template>
<script setup lang="ts">
const props = defineProps({
  data: { type: Array, equired: true, default: () => [] },
});
let data = computed(() => props.data);
</script>
